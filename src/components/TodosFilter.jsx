import React from "react";
import styled from "styled-components";

import chevronDown from "../assets/images/chevron-down.png";

const TodosFilterWrap = styled.div`
    position: relative;
    background-color: var(--el-bcg);
    display: flex;
    width: 250px;
    height: 50px;
    border-radius: 10px;
    z-index: 0;

    &::after {
        content: "";
        background-image: url(${chevronDown});
        background-repeat: no-repeat;
        background-size: contain;
        width: 20px;
        height: 10px;
        display: block;
        position: absolute;
        right: 10px;
        top: 20px;
    }

    select {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        border: none;
        background-color: transparent;
        padding: 0 0 0 13px;
        width: 100%;
        outline: 0;
        z-index: 1;
    }
`;

export default function TodosFilter({ setStatus }) {
    const statusHandler = (e) => {
        setStatus(e.target.value);
    };
    return (
        <TodosFilterWrap>
            <select onBlur={statusHandler} onChange={statusHandler}>
                <option value="All">All</option>
                <option value="Complete">Complete</option>
                <option value="Expired">Expired</option>
                <option value="Expiring">Expiring</option>
                <option value="Interviews">Interviews</option>
                <option value="Travel spots">Travel spots</option>
                <option value="Shop lists">Shop lists</option>
                <option value="Home notes">Home notes</option>
            </select>
        </TodosFilterWrap>
    );
}
