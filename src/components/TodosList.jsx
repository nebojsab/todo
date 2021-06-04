import React from "react";
import styled from "styled-components";

import Todo from "./Todo";

const Todos = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
`;

export default function TodosList({ todos, setTodos }) {
    return (
        <>
            <Todos className="todos">
                {todos.map((todo) => (
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
