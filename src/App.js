import React from "react";
import ReactDOM from "react-dom";
import Todos from "./components/Todos";
import RandomUsers from "./components/RandomUsers";
import styled from "styled-components";

const ToDoContainer = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 1200px;
    width: 100%;
    margin: 60px auto;
`;

const App = () => {
    return (
        <ToDoContainer>
            <RandomUsers />
            <Todos />
        </ToDoContainer>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));
