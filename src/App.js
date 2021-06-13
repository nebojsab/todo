import React from "react";
import ReactDOM from "react-dom";
import RandomUsers from "./components/RandomUsers";
import TodoContainer from "./components/TodoContainer";
import { device } from "./helpers/breakpoints";
import styled from "styled-components";

const ToDoContainer = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 1100px;
    width: 100%;
    margin: 60px auto;

    @media ${device.mobile} {
        margin: 30px auto;
        padding: 0 20px;
    }

    @media ${device.tablet} {
        padding: 0 20px;
    }

    @media ${device.laptop} {
        padding: 0 20px;
    }
`;

const App = () => {
    return (
        <ToDoContainer>
            <RandomUsers />
            <TodoContainer />
        </ToDoContainer>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));
