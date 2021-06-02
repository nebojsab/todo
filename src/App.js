import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import TodosForm from "./components/TodosForm";
import TodosList from "./components/TodosList";
import data from "./data/todos.json";

const App = () => {
    const todosList = data;
    const [items, setItems] = useState(todosList);

    useEffect(() => {
        const json = localStorage.getItem("newData");
        if (json) {
            setItems(JSON.parse(json));
        }
        console.log(JSON.parse(json));
    }, []);

    return (
        <div>
            <h1>ToDo App</h1>
            <TodosForm />
            <TodosList items={items} />
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));
