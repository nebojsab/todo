import React from "react";
import styled from "styled-components";

const ButtonComponent = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    cursor: pointer;
    transform: scale(1.02);
    transition: all ease-in-out 0.2s;
    font-size: var(--p1);

    &:hover {
        transition: all ease-in-out 0.2s;
        transform: scale(1);
    }

    &.default__button {
        border-radius: 10px;
        background-color: var(--primary-blue);
        min-width: 240px;
        color: var(--secondary-blue);
        height: 50px;
        box-shadow: 0 2px 4px var(--button-primary-blue-shadow);

        &:hover {
            box-shadow: 0 2px 3px var(--button-primary-blue-shadow);
            color: var(--white);
        }
    }

    &.button__delete,
    &.button__close {
        border-radius: 50%;
        background-color: var(--primary-blue);
        width: 24px;
        height: 24px;
        box-shadow: 0 2px 4px var(--button-primary-blue-shadow);

        &::before {
            position: absolute;
            content: "";
            width: 12px;
            height: 2px;
            border-radius: 1px;
            background-color: var(--secondary-blue);
            transform: rotate(45deg);
        }

        &::after {
            position: absolute;
            content: "";
            width: 2px;
            height: 12px;
            border-radius: 1px;
            background-color: var(--secondary-blue);
            transform: rotate(45deg);
        }

        &:hover {
            box-shadow: 0 2px 3px var(--button-primary-blue-shadow);

            &::before,
            &::after {
                background-color: var(--white);
            }
        }
    }

    &.button__checked {
        border-radius: 50%;
        background-color: var(--primary-blue);
        width: 24px;
        height: 24px;
        box-shadow: 0 2px 4px var(--button-primary-blue-shadow);

        &::before {
            position: absolute;
            content: "";
            width: 10px;
            height: 6px;
            border-bottom: 2px solid var(--secondary-blue);
            border-left: 2px solid var(--secondary-blue);
            transform: rotate(-45deg);
        }

        &:hover {
            box-shadow: 0 2px 3px var(--button-primary-blue-shadow);

            &::before {
                border-bottom: 2px solid var(--white);
                border-left: 2px solid var(--white);
            }
        }
    }

    &.button__add {
        border-radius: 50%;
        background-color: var(--primary-blue);
        width: 50px;
        height: 50px;
        box-shadow: 0 2px 4px var(--button-primary-blue-shadow);

        &::before {
            position: absolute;
            content: "";
            width: 24px;
            height: 4px;
            border-radius: 2px;
            background-color: var(--secondary-blue);
        }

        &::after {
            position: absolute;
            content: "";
            width: 4px;
            height: 24px;
            border-radius: 2px;
            background-color: var(--secondary-blue);
        }

        &:hover {
            box-shadow: 0 2px 3px var(--button-primary-blue-shadow);

            &::before,
            &::after {
                background-color: var(--white);
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
