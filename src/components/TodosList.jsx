import React from "react";
import { useSpring, useTransition, config, animated } from "react-spring";

import styled from "styled-components";

import Todo from "./Todo";

const Todos = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
`;

export default function TodosList({ todos, setTodos, filterTodos }) {
    const listTransitions = useTransition(filterTodos, {
        config: config.gentle,
        from: { opacity: 0, transform: "translate3d(-25%, 0px, 0px)" },
        enter: { opacity: 1, transform: "translate3d(0%, 0px, 0px)" },
        leave: {
            opacity: 0,
            height: 0,
            transform: "translate3d(25%, 0px, 0px)",
        },
        keys: filterTodos.map((item, index) => index),
    });

    return (
        <>
            <Todos className="todos">
                {listTransitions((styles, todo) => (
                    <animated.div style={styles}>
                        <Todo
                            key={todo.id}
                            setTodos={setTodos}
                            todo={todo}
                            todos={todos}
                        />
                    </animated.div>
                ))}
            </Todos>
        </>
    );
}
