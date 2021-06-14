import React from "react";
import GetDateAndTime from "./GetDateAndTime";
import styled from "styled-components";
import { device } from "../helpers/breakpoints";

import logo from "../assets/images/todo-logo.png";

const HeaderBar = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 15px 15px 0 0;
    padding: 0 35px;
    width: 100%;
    margin: 0 auto 30px;
`;

const TodosLogo = styled.div`
    @media ${device.mobile} {
        position: absolute;
        top: 20px;
        right: 20px;
        transform: scale(0.8);
    }
`;

const HeaderInfo = styled.div`
    display: flex;
    align-items: center;
    width: 50%;

    @media ${device.mobile} {
        flex-direction: column;
        margin-left: -14px;
        width: 100%;
        align-items: flex-start;
    }

    @media ${device.tablet} {
        flex-direction: column;
        width: 50%;
        align-items: flex-start;
    }
`;

const ToDoTitle = styled.h1`
    font-family: var(--heading-font-family);
    font-weight: 700;
    font-size: var(--h1);

    @media ${device.mobile} {
        font-size: var(--h3);
    }
`;

const InfoWrap = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 24px;

    @media ${device.mobile} {
        margin-left: 0;
    }

    @media ${device.tablet} {
        margin: 24px 0 0 0;
    }
`;

export default function Header() {
    return (
        <HeaderBar>
            <HeaderInfo>
                <InfoWrap>
                    <ToDoTitle>ToDo App</ToDoTitle>
                    <GetDateAndTime />
                </InfoWrap>
            </HeaderInfo>

            <TodosLogo>
                <img src={logo} alt="Todo App" width="150" />
            </TodosLogo>
        </HeaderBar>
    );
}
