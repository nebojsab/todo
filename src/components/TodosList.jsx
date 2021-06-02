import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Todos = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;

const TodosItem = styled.div`
    padding: 1rem;
    margin: 20px;
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    width: calc(33% - 6rem);
    height: 400px;
    max-width: calc(33% - 6rem);
    border: 1px solid #ccc;
`;

const TodosTitle = styled.h2`
    font-size: 4rem;
    font-weight: bold;
`;

const TodosDescription = styled.div`
    font-size: 1.25rem;
    line-height: 1.5rem;
    font-weight: lighter;
`;

const TodosDueDate = styled.div`
    font-weight: 500;
    font-size: 1rem;
    font-weight: normal;
`;

const TodosCat = styled.div`
    font-weight: 500;
    font-size: 0.855rem;
    text-transform: uppercase;
`;

export default function TodosList() {
    const [todos, setTodos] = useState([]);

    function getTimeRemaining(endTime) {
        const total = Date.parse(endTime) - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
        const days = Math.floor(total / (1000 * 60 * 60 * 24));

        return {
            total,
            days,
            hours,
            minutes,
            seconds,
        };
    }

    useEffect(() => {
        const json = localStorage.getItem("newData");
        if (json) {
            setTodos(JSON.parse(json));
        }
        console.log(JSON.parse(json));
    }, []);

    return (
        <Todos className="todos">
            {todos.map((item) => (
                <TodosItem
                    key={item.title}
                    className={`todos__item
                        ${
                            getTimeRemaining(item.date).days < 0
                                ? "red"
                                : getTimeRemaining(item.date).days <= 2
                                ? "orange"
                                : ""
                        }
                    `}
                >
                    <TodosTitle>{item.title}</TodosTitle>
                    <TodosDescription>{item.description}</TodosDescription>
                    <TodosDueDate>
                        Due date: <span>{item.date}</span>
                    </TodosDueDate>
                    <TodosCat>{item.category} category</TodosCat>
                </TodosItem>
            ))}
        </Todos>
    );
}
