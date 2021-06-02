import React, { useState, useEffect } from "react";
import data from "../data/todos.json";

const categories = ["Intervies", "Travel spots", "Shop lists", "Home notes"];

export default function TodosForm() {
    const todosList = data;
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [category, setCategory] = useState("");
    const [items, updateItems] = useState(todosList);

    const handleSubmit = (e) => {
        e.preventDefault();
        updateItems([
            ...items,
            {
                title: title,
                description: description,
                date: date,
                category: category,
            },
        ]);
        setTitle("");
        setDescription("");
        setDate("");
        setCategory("");
    };

    useEffect(() => {
        document.getElementById("datePicker").min = new Date(
            new Date().getTime() - new Date().getTimezoneOffset() * 60000
        )
            .toISOString()
            .split("T")[0];
    }, []);

    useEffect(() => {
        const newData = localStorage.getItem("newData");

        if (newData) {
            updateItems(JSON.parse(newData));
            console.log(JSON.parse(newData));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("newData", JSON.stringify(items));
        // console.log(JSON.stringify(items));
    });

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="ToDo Title"
                    name={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <textarea
                    name={description}
                    onChange={(e) => setDescription(e.target.value)}
                    id={description}
                    required
                ></textarea>
                <input
                    type="date"
                    id="datePicker"
                    name={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />
                <select
                    id="animal"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    onBlur={(e) => setCategory(e.target.value)}
                >
                    <option />
                    {categories.map((cat) => (
                        <option value={cat} key={cat}>
                            {cat}
                        </option>
                    ))}
                </select>
                <input type="submit" value="Submit todos" />
            </form>
        </>
    );
}
