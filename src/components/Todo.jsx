import React, { useState, useEffect } from "react";
import Button from "./Button";
import styled from "styled-components";

const ButtonDelete = styled.div`
    position: absolute;
    right: 20px;
    top: 16px;
    color: #333;
    font-size: var(--p2);
    text-transform: uppercase;
    background: none;
    border: none;
    z-index: 10;

    &:hover::after {
        content: "Delete Todo";
        text-transform: lowercase;
        position: absolute;
        color: var(--white);
        font-size: var(--p3);
        padding: 6px 12px;
        background-color: var(--red);
        border-radius: 4px;
        transition: ease-in 0.2s;
        min-width: 120px;
        text-align: center;
        left: -50px;
        top: -35px;
    }

    &:hover::before {
        content: "";
        width: 10px;
        height: 10px;
        position: absolute;
        display: block;
        background-color: var(--red);
        transform: rotate(45deg);
        top: -15px;
        left: 7px;
    }
`;

const ButtonComplete = styled.div`
    position: absolute;
    right: 70px;
    top: 16px;
    color: #333;
    font-size: var(--p2);
    text-transform: uppercase;
    background: none;
    border: none;
    z-index: 10;

    &:hover::after {
        content: "Complete Todo";
        text-transform: lowercase;
        position: absolute;
        color: var(--white);
        font-size: var(--p3);
        padding: 6px 12px;
        background-color: var(--green);
        border-radius: 4px;
        transition: ease-in 0.2s;
        min-width: 120px;
        text-align: center;
        left: -50px;
        top: -35px;
    }

    &:hover::before {
        content: "";
        width: 10px;
        height: 10px;
        position: absolute;
        display: block;
        background-color: var(--green);
        transform: rotate(45deg);
        top: -15px;
        left: 7px;
    }
`;

const TodosContainer = styled.div`
    position: relative;
    z-index: 0;
`;

const TodosDescription = styled.div`
    position: relative;
    line-height: 1.2rem;
    height: 0;
    overflow: hidden;
    color: var(--black);
    font-size: var(--p2);
    font-weight: 300;
    transition: all ease-in 0.35s;
    padding-left: 15px;

    &::before {
        position: absolute;
        left: 0;
        top: 0;
        content: "";
        display: block;
        width: 5px;
        height: 100px;
        background-color: var(--secondary-button-color);
    }
`;

const TodosTopRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    height: 60px;
`;

const TodosItem = styled.div`
    margin: 14px 0;
    padding: 0 10px 0 50px;
    border: 2px solid transparent;
    border-radius: 10px;
    display: flex;
    overflow: hidden;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    background: var(--white);
    z-index: 1;

    &.is-hovered ${TodosDescription} {
        height: auto;
        margin-bottom: 20px;
        transition: all ease-in 0.35s;
    }

    &.is-expired {
        border: 2px solid var(--expired);

        &::after {
            content: "expired";
            position: absolute;
            right: 13px;
            top: -18px;
            min-width: 90px;
            font-size: var(--p3);
            text-transform: lowercase;
            padding: 3px 6px;
            border-radius: 5px 5px 0 0;
            background-color: var(--expired);
            color: var(--red);
            text-align: center;
        }
    }

    &.is-expiring {
        border: 2px solid var(--orange);

        &::after {
            content: "expiring";
            position: absolute;
            right: 13px;
            top: -18px;
            min-width: 90px;
            font-size: var(--p3);
            text-transform: lowercase;
            padding: 3px 6px;
            border-radius: 5px 5px 0 0;
            background-color: var(--orange);
            color: var(--red);
            text-align: center;
        }
    }

    &.is-complete {
        border: 2px solid var(--green);

        &::after {
            content: "complete";
            position: absolute;
            right: 13px;
            top: -18px;
            min-width: 90px;
            font-size: var(--p3);
            text-transform: lowercase;
            padding: 3px 6px;
            border-radius: 5px 5px 0 0;
            background-color: var(--green);
            color: var(--white);
            text-align: center;
        }
    }
`;

const TodosTitle = styled.h2`
    font-size: var(--p2);
    font-weight: bold;
    margin: 0;
    text-transform: uppercase;
    color: var(--dark-text-blue);
    width: 300px;
`;

const TodosDueDate = styled.div`
    font-weight: 500;
    font-size: 1rem;
    font-weight: normal;
    color: var(--dark-text-blue);
    width: 300px;
`;

const TodosCat = styled.div`
    font-size: var(--p2);
    font-weight: 500;
    color: var(--dark-text-blue);
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

    const deleteHandler = () => {
        setTodos(todos.filter((el) => el.id !== todo.id));
    };

    useEffect(() => {
        expiredHandler();
    }, []);

    return (
        <TodosContainer>
            <ButtonDelete>
                <Button onClick={deleteHandler} type="deleteButton"></Button>
            </ButtonDelete>
            <ButtonComplete>
                {todo.expired ? null : (
                    <Button
                        onClick={completedHandler}
                        type="checkedButton"
                    ></Button>
                )}
            </ButtonComplete>
            <TodosItem
                id={todo.id}
                key={todo.title}
                className={`
                    ${hovered ? "is-hovered" : ""}
                    ${todo.expired ? "is-expired" : ""}
                    ${todo.expiring ? "is-expiring" : ""}
                    ${todo.complete ? "is-complete" : ""}
                `}
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
                </TodosTopRow>
                <TodosDescription>{todo.description}</TodosDescription>
            </TodosItem>
        </TodosContainer>
    );
}
