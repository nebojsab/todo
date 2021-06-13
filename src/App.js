import React from "react";
import ReactDOM from "react-dom";
import RandomUsers from "./components/RandomUsers";
import TodoContainer from "./components/TodoContainer";
import Button from "./components/Button";
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
            {/* <Button type="closeButton" text="Some button text"></Button> */}
            <RandomUsers />
            <TodoContainer />
        </ToDoContainer>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));
