import React, { useState, useEffect } from "react";
import Button from "./Button";
import { device } from "../helpers/breakpoints";
import styled from "styled-components";

import interviewIco from "../assets/images/todo-interview.png";
import travelIco from "../assets/images/todo-travel.png";
import shopIco from "../assets/images/todo-shop.png";
import houseIco from "../assets/images/todo-house.png";

const ButtonDelete = styled.div`
    position: absolute;
    right: 20px;
    top: 42px;
    font-size: var(--p2);
    text-transform: uppercase;
    background: none;
    border: none;
    z-index: 10;
    transition: all ease-in 0.35s;

    @media ${device.mobile} {
        top: -12px;
    }

    @media ${device.tablet} {
        top: -12px;
    }

    @media ${device.laptop} {
        top: -12px;
    }

    &:hover::after {
        content: "Delete Todo";
        text-transform: lowercase;
        position: absolute;
        color: var(--white);
        font-size: var(--p3);
        padding: 6px 12px;
        background: var(--expired-box-gradient);
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
        background: var(--expired-box-gradient);
        transform: rotate(45deg);
        top: -15px;
        left: 7px;
        transition: all ease-in 0.35s;
    }
`;

const ButtonComplete = styled.div`
    position: absolute;
    right: 70px;
    top: 42px;
    font-size: var(--p2);
    text-transform: uppercase;
    background: none;
    border: none;
    z-index: 10;
    transition: all ease-in 0.35s;

    @media ${device.mobile} {
        top: -12px;
    }

    @media ${device.tablet} {
        top: -12px;
    }

    @media ${device.laptop} {
        top: -12px;
    }

    &:hover::after {
        content: "Complete Todo";
        text-transform: lowercase;
        position: absolute;
        color: var(--white);
        font-size: var(--p3);
        padding: 6px 12px;
        background: var(--completed-box-gradient);
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
        background: var(--completed-box-gradient);
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
        background-color: var(--blue);
    }
`;

const TodosTopRow = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    height: 100px;

    @media ${device.mobile} {
        height: 110px;
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
        border-top: 1px solid var(--gray);
        border-right: 1px solid var(--gray);
        transform: rotate(45deg);
        left: -35px;
        transition: all ease-in 0.2s;

        @media ${device.mobile} {
            top: 55px;
        }
    }
`;

const TodosTitle = styled.div`
    font-size: var(--h4);
    font-family: var(--heading-font-family);
    font-weight: 600;
    margin: 0 40px 0 0;
    width: 300px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    @media ${device.mobile} {
        width: 80%;
        white-space: unset;
        overflow: unset;
        word-break: break-word;
        align-self: flex-start;
        line-height: 1rem;
        margin: 14px 0 12px 0;
    }

    @media ${device.tablet} {
        width: 170px;
    }
`;

const TodosDueDate = styled.div`
    font-size: var(--p2);
    color: var(--gray);
    font-weight: 400;
    width: 300px;

    span.expired__due-date {
        color: var(--expired);
    }

    span.expiring__due-date {
        color: var(--expiring);
    }

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
    color: var(--gray);
    font-weight: 400;

    @media ${device.mobile} {
        width: 100%;
        line-height: 1.5rem;
    }
`;

const TodosItem = styled.div`
    margin: 10px 0;
    padding: 0 10px 0 50px;
    border: 2px solid transparent;
    border-radius: 15px;
    display: flex;
    overflow: hidden;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    background: var(--el-bcg);
    z-index: 1;
    cursor: pointer;

    &.is-interview-cat {
        background-image: url(${interviewIco});
        background-repeat: no-repeat;
        background-size: 140px;
        background-position: right -20px bottom -30px;
    }

    &.is-travel-cat {
        background-image: url(${travelIco});
        background-repeat: no-repeat;
        background-size: 140px;
        background-position: right -20px bottom -30px;
    }

    &.is-shop-cat {
        background-image: url(${shopIco});
        background-repeat: no-repeat;
        background-size: 140px;
        background-position: right -20px bottom -30px;
    }

    &.is-home-cat {
        background-image: url(${houseIco});
        background-repeat: no-repeat;
        background-size: 140px;
        background-position: right -20px bottom -30px;
    }

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
        overflow: hidden;
        background-image: ;
        &::after {
            content: "expired";
            position: absolute;
            right: unset;
            left: -54px;
            height: 40px;
            -webkit-transform: rotate(-90deg);
            -ms-transform: rotate(-90deg);
            transform: rotate(-90deg);
            top: 32px;
            min-width: 104px;
            z-index: -1;
            font-size: var(--p3);
            text-transform: lowercase;
            padding: 3px 6px;
            border-radius: 15px 15px 0 0;
            background: var(--expired-box-gradient);
            color: var(--white);
            text-align: center;

            @media ${device.mobile} {
                left: -67px;
                height: 40px;
                top: 45px;
                min-width: 128px;
            }
        }
    }

    &.is-expiring {
        &::after {
            content: "expiring";
            position: absolute;
            right: unset;
            left: -54px;
            height: 40px;
            -webkit-transform: rotate(-90deg);
            -ms-transform: rotate(-90deg);
            transform: rotate(-90deg);
            top: 32px;
            min-width: 104px;
            z-index: -1;
            font-size: var(--p3);
            text-transform: lowercase;
            padding: 3px 6px;
            border-radius: 15px 15px 0 0;
            background: var(--expiring-box-gradient);
            color: var(--white);
            text-align: center;

            @media ${device.mobile} {
                left: -67px;
                height: 40px;
                top: 45px;
                min-width: 128px;
            }
        }
    }

    &.is-complete {
        ${TodosTopRow} {
            text-decoration: line-through;
        }

        ${TodosTitle},
        ${TodosDueDate},
        ${TodosCat},
        ${TodosDescription} {
            opacity: 0.3;
        }

        &::after {
            content: "completed";
            position: absolute;
            right: unset;
            left: -54px;
            height: 40px;
            -webkit-transform: rotate(-90deg);
            -ms-transform: rotate(-90deg);
            transform: rotate(-90deg);
            top: 32px;
            min-width: 104px;
            z-index: -1;
            font-size: var(--p3);
            text-transform: lowercase;
            padding: 3px 6px;
            border-radius: 15px 15px 0 0;
            background: var(--completed-box-gradient);
            color: var(--white);
            text-align: center;

            @media ${device.mobile} {
                left: -67px;
                height: 40px;
                top: 45px;
                min-width: 128px;
            }
        }
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
                    ${todo.category === "Interviews" ? "is-interview-cat" : ""}
                    ${todo.category === "Travel spots" ? "is-travel-cat" : ""}
                    ${todo.category === "Shop lists" ? "is-shop-cat" : ""}
                    ${todo.category === "Home notes" ? "is-home-cat" : ""}
                `}
                onClick={toggleHover}
            >
                <TodosTopRow>
                    <TodosTitle>{todo.title}</TodosTitle>
                    <TodosDueDate>
                        Due date:{" "}
                        <span
                            className={`${
                                todo.expired ? "expired__due-date" : ""
                            } ${todo.expiring ? "expiring__due-date" : ""}`}
                        >
                            {todo.date}
                        </span>
                    </TodosDueDate>
                    <TodosCat>Category: {todo.category}</TodosCat>
                </TodosTopRow>
                <TodosDescription>{todo.description}</TodosDescription>
            </TodosItem>
        </TodosContainer>
    );
}
