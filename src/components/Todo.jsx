import React, { useEffect } from "react";
import styled from "styled-components";

const TodosItem = styled.div`
    padding: 1rem;
    margin: 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    border: 1px solid #ccc;
`;

const TodosTopRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
`;

const TodosTitle = styled.h2`
    font-size: 1.5rem;
    font-weight: bold;
    margin: 0;
`;

const TodosDescription = styled.div`
    font-size: 1rem;
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

const ButtonDelete = styled.button`
    color: #333;
    font-size: 0.85rem;
    text-transform: uppercase;
    background: none;
    border: none;
`;

const ButtonComplete = styled.button`
    color: #333;
    font-size: 0.85rem;
    text-transform: uppercase;
    background: none;
    border: none;
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
                    return { ...item, complete: true };
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

    const sortExpiringHandler = () => {
        setTodos(
            todos.map((item) => {
                if (item.expired) {
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
        expiringHandler();
    }, []);

    useEffect(() => {
        expiredHandler();
    }, []);

    useEffect(() => {
        sortExpiringHandler();
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
            <TodosTopRow>
                <TodosTitle>{todo.title}</TodosTitle>
                <TodosDueDate>
                    Due date: <span>{todo.date}</span>
                </TodosDueDate>
                <TodosCat>{todo.category} category</TodosCat>
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
