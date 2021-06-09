import React, { useState, useEffect } from "react";
import styled from "styled-components";

const TodosDescription = styled.div`
    font-size: 1rem;
    line-height: 1.5rem;
    height: 0;
    overflow: hidden;
    color: var(--white);
    transition: all ease-in 0.35s;
`;

const TodosTopRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 60px;
`;

const TodosItem = styled.div`
    margin: 14px 0;
    padding: 0 10px 0 50px;
    border-radius: 10px;
    display: flex;
    overflow: hidden;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    background: var(--todo-item);

    &.is-hovered ${TodosDescription} {
        height: auto;
        padding-bottom: 20px;
        transition: all ease-in 0.35s;
    }

    ${(p) => (p.isExpired ? "background: var(--expired)" : "")}
    ${(p) => (p.isExpiring ? "background: var(--expiring)" : "")}
    ${(p) => (p.isComplete ? "background: var(--complete)" : "")}
`;

const TodosTitle = styled.h2`
    font-size: 1rem;
    font-weight: bold;
    margin: 0;
    text-transform: uppercase;
    color: var(--white);
`;

const TodosDueDate = styled.div`
    font-weight: 500;
    font-size: 1rem;
    font-weight: normal;
    color: var(--white);
`;

const TodosCat = styled.div`
    font-size: 1rem;
    font-weight: 500;
    color: var(--white);
`;

const ButtonDelete = styled.button`
    color: #333;
    font-size: 1rem;
    text-transform: uppercase;
    background: none;
    border: none;
`;

const ButtonComplete = styled.button`
    color: #333;
    font-size: 1rem;
    text-transform: uppercase;
    background: none;
    border: none;
`;

export default function Todo({ todos, todo, setTodos }) {
    const [hovered, setHovered] = useState(false);
    const toggleHover = () => setHovered(!hovered);

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
                } else if (getTimeRemaining(item.date).days <= 2) {
                    return { ...item, expiring: true };
                } else if (item.expired) {
                    return { ...item, expiring: false };
                }
                return item;
            })
        );
    };

    // const expiringHandler = () => {
    //     setTodos(
    //         todos.map((item) => {
    //             if (getTimeRemaining(item.date).days <= 2) {
    //                 return { ...item, expiring: true };
    //             }
    //             return item;
    //         })
    //     );
    // };

    // const sortExpiringHandler = () => {
    //     setTodos(
    //         todos.map((item) => {
    //             if (item.expired) {
    //                 return { ...item, expiring: false };
    //             }
    //             return item;
    //         })
    //     );
    // };

    const deleteHandler = () => {
        setTodos(todos.filter((el) => el.id !== todo.id));
    };

    // useEffect(() => {
    //     expiringHandler();
    // }, []);

    // useEffect(() => {
    //     sortExpiringHandler();
    // }, []);

    useEffect(() => {
        expiredHandler();
    }, []);

    return (
        <TodosItem
            id={todo.id}
            key={todo.title}
            className={hovered ? "is-hovered" : ""}
            isExpired={todo.expired}
            isExpiring={todo.expiring}
            isComplete={todo.complete}
            onClick={toggleHover}
        >
            <TodosTopRow>
                <TodosTitle>{todo.title}</TodosTitle>
                <TodosDueDate>
                    <b>Due date: </b> <span>{todo.date}</span>
                </TodosDueDate>
                <TodosCat>
                    <b>Category: </b> {todo.category}
                </TodosCat>
                <div>
                    <ButtonDelete onClick={deleteHandler}>delete</ButtonDelete>
                    <ButtonComplete onClick={completedHandler}>
                        completed
                    </ButtonComplete>
                </div>
            </TodosTopRow>
            <TodosDescription>{todo.description}</TodosDescription>
        </TodosItem>
    );
}
