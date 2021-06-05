import React from "react";
import styled from "styled-components";

import Todo from "./Todo";

const Todos = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
`;

export default function TodosList({ todos, setTodos, filterTodos }) {
    // console.log(filterTodos);
    return (
        <>
            <Todos className="todos">
                {filterTodos.map((todo) => (
                    <Todo
                        key={todo.id}
                        setTodos={setTodos}
                        todo={todo}
                        todos={todos}
                    />
                ))}
            </Todos>
        </>
    );
}
