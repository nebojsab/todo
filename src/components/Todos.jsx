import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import TodosList from "./TodosList";
import TodosFilter from "./TodosFilter";
import Modal from "./Modal";
import Button from "./Button";

import logo from "../assets/images/todo-logo.png";

const TodosContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 35px;
    background-color: var(--pale-blue);
    border-radius: 15px;
    margin-top: -15px;
    box-shadow: var(--box-shadow-default);
`;

const TodosControlBar = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 15px 0 30px;
    position: relative;
`;

const TodosLogo = styled.div``;

const FilterWrap = styled.div`
    display: flex;
    align-items: center;
    max-width: 500px;

    span {
        font-size: var(--p2);
        color: var(--dark-text-blue);
        margin-right: 10px;
    }
`;

const CurrentDateAndTime = styled.div`
    letter-spacing: 1px;
    font-size: var(--p2);
    color: var(--secondary-button-color);
    background-color: var(--secondary-button-bcg);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 2rem;
    border-radius: 10px;
    box-shadow: 0 1px 4px var(--secondary-button-color);
    height: 50px;
`;

const ButtonAdd = styled.div`
    position: absolute;
    left: 170px;
    top: -75px;

    &:hover::after {
        content: "Add new Todo";
        text-transform: lowercase;
        position: absolute;
        color: var(--white);
        font-size: var(--p3);
        padding: 6px 12px;
        background-color: var(--primary-blue);
        border-radius: 4px;
        min-width: 120px;
        text-align: center;
        left: -35px;
        top: -35px;
        transition: all ease-in 0.35s;
    }

    &:hover::before {
        content: "";
        width: 10px;
        height: 10px;
        position: absolute;
        display: block;
        background-color: var(--primary-blue);
        transform: rotate(45deg);
        top: -15px;
        left: 20px;
        transition: all ease-in 0.35s;
    }
`;

export default function Todos({ todos, setTodos }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [category, setCategory] = useState("");
    const [status, setStatus] = useState("All");
    const [filterTodos, setFilteredTodos] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [dateVal, setDateVal] = useState(new Date());

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
        filteredTodos();
    }, [todos, status]);

    useEffect(() => {
        var timer = setInterval(() => setDateVal(new Date()), 1000);
        return function cleanup() {
            clearInterval(timer);
        };
    });

    return (
        <TodosContainer>
            <TodosControlBar>
                <CurrentDateAndTime>
                    {dateVal.toLocaleDateString()} —{" "}
                    {dateVal.toLocaleTimeString()}
                </CurrentDateAndTime>
                <ButtonAdd>
                    <Button type="addButton" onClick={toggleModal}></Button>
                </ButtonAdd>
                <FilterWrap>
                    <span>filter by status or by category</span>
                    <TodosFilter todos={todos} setStatus={setStatus} />
                </FilterWrap>
                <TodosLogo>
                    <img src={logo} alt="Todo App" width="150" />
                </TodosLogo>
            </TodosControlBar>
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
