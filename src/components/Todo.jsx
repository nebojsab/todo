import React, { useState, useEffect } from "react";
import Button from "./Button";
import { device } from "../helpers/breakpoints";
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
    transition: all ease-in 0.35s;

    @media ${device.mobile} {
        top: -16px;
    }

    @media ${device.tablet} {
        top: -16px;
    }

    @media ${device.laptop} {
        top: -16px;
    }

    &:hover::after {
        content: "Delete Todo";
        text-transform: lowercase;
        position: absolute;
        color: var(--red);
        font-size: var(--p3);
        padding: 6px 12px;
        background-color: var(--expired);
        border-radius: 4px;
        min-width: 120px;
        text-align: center;
        left: -50px;
        top: -35px;
        transition: all ease-in 0.35s;
    }

    &:hover::before {
        content: "";
        width: 10px;
        height: 10px;
        position: absolute;
        display: block;
        background-color: var(--expired);
        transform: rotate(45deg);
        top: -15px;
        left: 7px;
        transition: all ease-in 0.35s;
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
    transition: all ease-in 0.35s;

    @media ${device.mobile} {
        top: -16px;
    }

    @media ${device.tablet} {
        top: -16px;
    }

    @media ${device.laptop} {
        top: -16px;
    }

    &:hover::after {
        content: "Complete Todo";
        text-transform: lowercase;
        position: absolute;
        color: var(--white);
        font-size: var(--p3);
        padding: 6px 12px;
        background-color: var(--green);
        border-radius: 4px;
        min-width: 120px;
        text-align: center;
        left: -50px;
        top: -35px;
        transition: all ease-in 0.35s;
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
        transition: all ease-in 0.35s;
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

    @media ${device.mobile} {
        margin: 15px 15px 0 0;
    }

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
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    height: 60px;

    @media ${device.mobile} {
        height: 100px;
        flex-direction: column;
        justify-content: flex-start;
        text-align: left;
    }

    &::before {
        content: "";
        display: block;
        position: absolute;
        width: 12px;
        height: 12px;
        border-top: 2px solid var(--dark-text-blue);
        border-right: 2px solid var(--dark-text-blue);
        transform: rotate(45deg);
        left: -35px;
        transition: all ease-in 0.2s;

        @media ${device.mobile} {
            top: 45px;
        }
    }
`;

const TodosTitle = styled.h2`
    font-size: var(--p2);
    font-weight: bold;
    margin: 0 40px 0 0;
    text-transform: uppercase;
    color: var(--dark-text-blue);
    width: 300px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    @media ${device.mobile} {
        width: unset;
        white-space: unset;
        overflow: unset;
        word-break: break-all;
        align-self: flex-start;
        line-height: 1rem;
        margin: 12px 0 12px 0;
    }

    @media ${device.tablet} {
        width: 170px;
    }
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
    cursor: pointer;

    @media ${device.mobile} {
        margin: 24px 0;
    }

    &.is-hovered ${TodosDescription} {
        height: auto;
        margin-bottom: 20px;
        transition: all ease-in 0.35s;
    }

    &.is-hovered ${TodosTopRow} {
        &::before {
            transform: rotate(135deg);
            transition: all ease-in 0.2s;
        }
    }

    &.is-expired {
        &::after {
            content: "expired";
            position: absolute;
            right: 13px;
            top: -20px;
            min-width: 90px;
            font-size: var(--p3);
            text-transform: lowercase;
            padding: 3px 6px;
            border-radius: 5px 5px 0 0;
            background-color: var(--expired);
            color: var(--red);
            text-align: center;

            @media ${device.mobile} {
                right: unset;
                left: 13px;
            }

            @media ${device.tablet} {
                right: unset;
                left: 13px;
            }

            @media ${device.laptop} {
                right: unset;
                left: 13px;
            }
        }
    }

    &.is-expiring {
        &::after {
            content: "expiring";
            position: absolute;
            right: 13px;
            top: -20px;
            min-width: 90px;
            font-size: var(--p3);
            text-transform: lowercase;
            padding: 3px 6px;
            border-radius: 5px 5px 0 0;
            background-color: var(--orange);
            color: var(--red);
            text-align: center;

            @media ${device.mobile} {
                right: unset;
                left: 13px;
            }

            @media ${device.tablet} {
                right: unset;
                left: 13px;
            }

            @media ${device.laptop} {
                right: unset;
                left: 13px;
            }
        }
    }

    &.is-complete {
        ${TodosTopRow} {
            text-decoration: line-through;
        }

        &::after {
            content: "complete";
            position: absolute;
            right: 13px;
            top: -20px;
            min-width: 90px;
            font-size: var(--p3);
            text-transform: lowercase;
            padding: 3px 6px;
            border-radius: 5px 5px 0 0;
            background-color: var(--green);
            color: var(--white);
            text-align: center;

            @media ${device.mobile} {
                right: unset;
                left: 13px;
            }

            @media ${device.tablet} {
                right: unset;
                left: 13px;
            }

            @media ${device.laptop} {
                right: unset;
                left: 13px;
            }
        }
    }
`;

const TodosDueDate = styled.div`
    font-weight: 500;
    font-size: 1rem;
    font-weight: normal;
    color: var(--dark-text-blue);
    width: 300px;

    @media ${device.mobile} {
        width: 100%;
        line-height: 1.5rem;
    }

    @media ${device.tablet} {
        width: 180px;
    }
`;

const TodosCat = styled.div`
    font-size: var(--p2);
    font-weight: 500;
    color: var(--dark-text-blue);

    @media ${device.mobile} {
        width: 100%;
        line-height: 1.5rem;
    }
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
