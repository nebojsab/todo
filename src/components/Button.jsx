import React from "react";
import { device } from "../helpers/breakpoints";
import styled from "styled-components";

const ButtonComponent = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    cursor: pointer;
    transition: all ease-in-out 0.2s;
    font-size: var(--p1);

    &:hover {
        transition: all ease-in-out 0.2s;
    }

    &.default__button {
        border-radius: 10px;
        background-color: var(--blue);
        min-width: 240px;
        color: var(--blue-02);
        height: 50px;

        &:hover {
            color: var(--white);
        }
    }

    &.button__delete {
        border-radius: 50%;
        background-color: var(--gray);
        width: 24px;
        height: 24px;

        @media ${device.mobile} {
            transform: scale(1.5);
        }

        &::before {
            position: absolute;
            content: "";
            width: 12px;
            height: 2px;
            border-radius: 1px;
            background-color: var(--white);
            transform: rotate(45deg);
            transition: all ease-in-out 0.2s;
        }

        &::after {
            position: absolute;
            content: "";
            width: 2px;
            height: 12px;
            border-radius: 1px;
            background-color: var(--white);
            transform: rotate(45deg);
            transition: all ease-in-out 0.2s;
        }

        &:hover {
            background-color: var(--blue);
            &::before,
            &::after {
                background-color: var(--white);
                transition: all ease-in-out 0.2s;
            }
        }
    }

    &.button__close {
        border-radius: 50%;
        background-color: var(--gray);
        width: 24px;
        height: 24px;

        &::before {
            position: absolute;
            content: "";
            width: 12px;
            height: 2px;
            border-radius: 1px;
            background-color: var(--white);
            transform: rotate(45deg);
            transition: all ease-in-out 0.2s;
        }

        &::after {
            position: absolute;
            content: "";
            width: 2px;
            height: 12px;
            border-radius: 1px;
            background-color: var(--white);
            transform: rotate(45deg);
            transition: all ease-in-out 0.2s;
        }

        &:hover {
            background-color: var(--blue);
            &::before,
            &::after {
                background-color: var(--white);
                transition: all ease-in-out 0.2s;
            }
        }
    }

    &.button__checked {
        border-radius: 50%;
        background-color: var(--gray);
        width: 24px;
        height: 24px;

        @media ${device.mobile} {
            transform: scale(1.5);
        }

        &::before {
            position: absolute;
            content: "";
            width: 10px;
            height: 6px;
            border-bottom: 2px solid var(--white);
            border-left: 2px solid var(--white);
            transform: rotate(-45deg);
            transition: all ease-in-out 0.2s;
        }

        &:hover {
            background-color: var(--blue);
            &::before {
                border-bottom: 2px solid var(--white);
                border-left: 2px solid var(--white);
                transition: all ease-in-out 0.2s;
            }
        }
    }

    &.button__add {
        border-radius: 50%;
        background-color: var(--blue);
        width: 50px;
        height: 50px;

        &::before {
            position: absolute;
            content: "";
            width: 24px;
            height: 4px;
            border-radius: 2px;
            background-color: var(--blue-02);
            transition: all ease-in-out 0.2s;
        }

        &::after {
            position: absolute;
            content: "";
            width: 4px;
            height: 24px;
            border-radius: 2px;
            background-color: var(--blue-02);
            transition: all ease-in-out 0.2s;
        }

        &:hover {
            &::before,
            &::after {
                background-color: var(--white);
                transition: all ease-in-out 0.2s;
            }
        }
    }
`;

const Button = ({ children, onClick, disabled, text, type }) => {
    return (
        <ButtonComponent
            className={`
        ${
            type === "closeButton"
                ? "button__close"
                : type === "deleteButton"
                ? "button__delete"
                : type === "checkedButton"
                ? "button__checked"
                : type === "addButton"
                ? "button__add"
                : "default__button"
        } 
    `}
            type={type}
            text={text}
            onClick={!disabled ? onClick : () => {}}
        >
            {children || text}
        </ButtonComponent>
    );
};

export default Button;
