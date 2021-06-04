import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import TodosForm from "./components/TodosForm";
import TodosList from "./components/TodosList";
import data from "./data/todos.json";

const App = () => {
    const todosList = data;
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [category, setCategory] = useState("");
    const [todos, setTodos] = useState(todosList);
    const [filterdTodos, setFilteredTodos] = useState([]);

    const handleTitleOnChange = (e) => setTitle(e.target.value);
    const handleDescriptionOnChange = (e) => setDescription(e.target.value);
    const handleDateOnChange = (e) => setDate(e.target.value);
    const handleCategoryOnChange = (e) => setCategory(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();
        setTodos([
            ...todos,
            {
                title: title,
                description: description,
                date: date,
                category: category,
                id: Math.random() * 100,
                complete: false,
            },
        ]);
        setTitle("");
        setDescription("");
        setDate("");
        setCategory("");
    };

    useEffect(() => {
        const json = localStorage.getItem("newData");
        if (json) {
            setTodos(JSON.parse(json));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("newData", JSON.stringify(todos));
    });

    return (
        <div>
            <h1>ToDo App</h1>
            <TodosForm
                handleSubmit={handleSubmit}
                handleTitleOnChange={handleTitleOnChange}
                handleDescriptionOnChange={handleDescriptionOnChange}
                handleDateOnChange={handleDateOnChange}
                handleCategoryOnChange={handleCategoryOnChange}
                title={title}
                description={description}
                date={date}
                category={category}
            />
            <TodosFilter />
            <TodosList todos={todos} setTodos={setTodos} />
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));
