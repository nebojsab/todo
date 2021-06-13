import React, { useState, useEffect } from "react";
import Todos from "./Todos";
import styled from "styled-components";
import data from "../data/todos.json";

const ToDoContainer = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 1200px;
    width: 100%;
`;

export default function TodoContainer() {
    const todosList = data;
    const [todos, setTodos] = useState(todosList);

    useEffect(() => {
        localStorage.setItem("newData", JSON.stringify(todos));
    });

    return (
        <ToDoContainer>
            <Todos todos={todos} setTodos={setTodos} />
        </ToDoContainer>
    );
}
