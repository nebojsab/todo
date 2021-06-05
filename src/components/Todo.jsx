import React, { useEffect } from "react";
import styled from "styled-components";

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

export default function Todo({ todos, todo, setTodos }) {
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

    const completedHandler = () => {
        setTodos(
            todos.map((item) => {
                if (item.id === todo.id) {
                    return { ...item, complete: !item.complete };
                }
                return item;
            })
        );
    };

    const expiredHandler = () => {
        setTodos(
            todos.map((item) => {
                if (getTimeRemaining(item.date).days < 0) {
                    return { ...item, expired: true };
                }
                return item;
            })
        );
    };

    const expiringHandler = () => {
        setTodos(
            todos.map((item) => {
                if (getTimeRemaining(item.date).days <= 2) {
                    return { ...item, expiring: true };
                }
                return item;
            })
        );
    };

    const deleteHandler = () => {
        setTodos(todos.filter((el) => el.id !== todo.id));
    };

    useEffect(() => {
        expiredHandler();
        expiringHandler();
    }, []);

    return (
        <TodosItem
            id={todo.id}
            key={todo.title}
            className={`todos__item
                        ${
                            getTimeRemaining(todo.date).days < 0
                                ? "red"
                                : getTimeRemaining(todo.date).days <= 2
                                ? "orange"
                                : ""
                        }
                        ${todo.complete ? "todos__complete" : ""}
                    `}
        >
            <button onClick={deleteHandler}>delete</button>
            <button onClick={completedHandler}>completed</button>
            <button onClick={expiredHandler}>set expired true</button>
            <TodosTitle>{todo.title}</TodosTitle>
            <TodosDescription>{todo.description}</TodosDescription>
            <TodosDueDate>
                Due date: <span>{todo.date}</span>
            </TodosDueDate>
            <TodosCat>{todo.category} category</TodosCat>
        </TodosItem>
    );
}
