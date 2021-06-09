import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import TodosList from "./TodosList";
import TodosFilter from "./TodosFilter";
import Modal from "./Modal";
import data from "../data/todos.json";

const TodosContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 35px;
    background-color: var(--white);
`;

export default function Todos() {
    const todosList = data;
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [category, setCategory] = useState("");
    const [status, setStatus] = useState("All");
    const [todos, setTodos] = useState(todosList);
    const [filterTodos, setFilteredTodos] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

    const handleTitleOnChange = (e) => setTitle(e.target.value);
    const handleDescriptionOnChange = (e) => setDescription(e.target.value);
    const handleDateOnChange = (e) => setDate(e.target.value);
    const handleCategoryOnChange = (e) => setCategory(e.target.value);

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    const modalRef = useRef(null);

    const filteredTodos = () => {
        switch (status) {
            case "All":
                setFilteredTodos(
                    todos.filter(
                        (todo) =>
                            todo.category === "Travel spots" ||
                            "Interviews" ||
                            "Shop lists" ||
                            "Home notes"
                    )
                );
                break;
            case "Complete":
                setFilteredTodos(todos.filter((todo) => todo.complete == true));
                break;
            case "Expired":
                setFilteredTodos(todos.filter((todo) => todo.expired == true));
                break;
            case "Expiring":
                setFilteredTodos(todos.filter((todo) => todo.expiring == true));
                break;
            case "Interviews":
                setFilteredTodos(
                    todos.filter((todo) => todo.category === "Interviews")
                );
                break;
            case "Travel spots":
                setFilteredTodos(
                    todos.filter((todo) => todo.category === "Travel spots")
                );
                break;
            case "Shop lists":
                setFilteredTodos(
                    todos.filter((todo) => todo.category === "Shop lists")
                );
                break;
            case "Home notes":
                setFilteredTodos(
                    todos.filter((todo) => todo.category === "Home notes")
                );
                break;
            default:
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setTodos([
            ...todos,
            {
                title: title,
                description: description,
                date: date,
                category: category,
                id: Math.random() * 10,
                complete: false,
                expired: false,
                expiring: false,
            },
        ]);
        setTitle("");
        setDescription("");
        setDate("");
        setCategory("");
        toggleModal();
    };

    useEffect(() => {
        function handleModalClickOutside(event) {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setModalVisible(false);
            }
        }
        document.addEventListener("mousedown", handleModalClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleModalClickOutside);
        };
    }, [modalRef]);

    useEffect(() => {
        const json = localStorage.getItem("newData");
        if (json) {
            setTodos(JSON.parse(json));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("newData", JSON.stringify(todos));
    });

    useEffect(() => {
        filteredTodos();
    }, [todos, status]);

    return (
        <TodosContainer>
            <button onClick={toggleModal}>Add ToDo</button>
            <TodosFilter todos={todos} setStatus={setStatus} />
            <TodosList
                todos={todos}
                setTodos={setTodos}
                filterTodos={filterTodos}
            />
            <Modal
                handleSubmit={handleSubmit}
                handleTitleOnChange={handleTitleOnChange}
                handleDescriptionOnChange={handleDescriptionOnChange}
                handleDateOnChange={handleDateOnChange}
                handleCategoryOnChange={handleCategoryOnChange}
                title={title}
                description={description}
                date={date}
                category={category}
                modalVisible={modalVisible}
                toggleModal={toggleModal}
                modalRef={modalRef}
            />
        </TodosContainer>
    );
}
