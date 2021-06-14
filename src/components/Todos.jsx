import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import TodosList from "./TodosList";
import TodosFilter from "./TodosFilter";
import Modal from "./Modal";
import Button from "./Button";
import { device } from "../helpers/breakpoints";

const AllTodos = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    min-height: 160px;
    flex-basis: 100%;
    background: var(--default-box-gradient);
    border-radius: 15px;
    padding: 36px 36px 24px;
    margin-right: 14px;

    @media ${device.mobile} {
        min-height: unset;
        width: 40%;
        padding: 20px;
        margin-bottom: 14px;
        flex-basis: unset;
        text-align: center;
        min-height: 140px;

        span {
            margin-bottom: 0 !important;
        }
    }

    @media ${device.tablet} {
        width: 40%;
        margin-bottom: 14px;
        margin-right: 14px;
        flex-basis: unset;
    }

    @media ${device.laptop} {
        padding: 24px;
    }

    span {
        font-size: var(--p1);
        font-family: var(--heading-font-family);
        font-weight: 500;
        letter-spacing: 1px;
        color: var(--white);
        margin-bottom: 12px;
    }

    div {
        font-size: var(--h1);
        font-family: var(--heading-font-family);
        font-weight: 100;
        color: var(--white);
    }
`;

const ExpiredTodos = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    min-height: 160px;
    flex-basis: 100%;
    background: var(--expired-box-gradient);
    border-radius: 15px;
    padding: 36px 36px 24px;
    margin-right: 14px;

    @media ${device.mobile} {
        min-height: unset;
        width: 40%;
        padding: 20px;
        margin-bottom: 14px;
        margin-right: 0;
        flex-basis: unset;
        text-align: center;
        min-height: 140px;

        span {
            margin-bottom: 0 !important;
        }
    }

    @media ${device.tablet} {
        width: 40%;
        margin-bottom: 14px;
        margin-right: 0;
        flex-basis: unset;
    }

    @media ${device.laptop} {
        padding: 24px;
    }

    span {
        font-size: var(--p1);
        font-family: var(--heading-font-family);
        font-weight: 500;
        color: var(--white);
        margin-bottom: 12px;
    }

    div {
        font-size: var(--h1);
        font-family: var(--heading-font-family);
        font-weight: 100;
        color: var(--white);
    }
`;

const ExpiringTodos = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    min-height: 160px;
    flex-basis: 100%;
    background: var(--expiring-box-gradient);
    border-radius: 15px;
    padding: 36px 36px 24px;
    margin-right: 14px;

    @media ${device.mobile} {
        min-height: unset;
        width: 40%;
        padding: 20px;
        margin-bottom: 14px;
        flex-basis: unset;
        text-align: center;
        min-height: 140px;

        span {
            margin-bottom: 0 !important;
        }
    }

    @media ${device.tablet} {
        width: 40%;
        margin-right: 14px;
        flex-basis: unset;
    }

    @media ${device.laptop} {
        padding: 24px;
    }

    span {
        font-size: var(--p1);
        font-family: var(--heading-font-family);
        font-weight: 500;
        color: var(--white);
        margin-bottom: 12px;
    }

    div {
        font-size: var(--h1);
        font-family: var(--heading-font-family);
        font-weight: 100;
        color: var(--white);
    }
`;

const CompleteTodos = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    min-height: 160px;
    flex-basis: 100%;
    background: var(--completed-box-gradient);
    border-radius: 15px;
    padding: 36px 36px 24px;

    @media ${device.mobile} {
        min-height: unset;
        width: 40%;
        padding: 20px;
        margin-bottom: 14px;
        flex-basis: unset;
        text-align: center;
        min-height: 140px;

        span {
            margin-bottom: 0 !important;
        }
    }

    @media ${device.tablet} {
        width: 40%;
        flex-basis: unset;
    }

    @media ${device.laptop} {
        padding: 24px;
    }

    span {
        font-size: var(--p1);
        font-family: var(--heading-font-family);
        font-weight: 500;
        color: var(--white);
        margin-bottom: 12px;
    }

    div {
        font-size: var(--h1);
        font-family: var(--heading-font-family);
        font-weight: 100;
        color: var(--white);
    }
`;

const TodosCounter = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media ${device.mobile} {
        flex-wrap: wrap;
        justify-content: center;
    }

    @media ${device.tablet} {
        flex-wrap: wrap;
        justify-content: center;
    }
`;

const TodosContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 35px;
    border-radius: 15px;
    margin-top: -15px;

    @media ${device.mobile} {
        padding: 12px;
    }

    @media ${device.tablet} {
        padding: 24px;
    }

    @media ${device.laptop} {
        padding: 35px;
    }
`;

const TodosControlBar = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 48px 0 24px;
    position: relative;

    @media ${device.mobile} {
        margin: 12px 0 36px;
    }
`;

const FilterWrap = styled.div`
    display: flex;
    align-items: center;
    max-width: 500px;

    @media ${device.mobile} {
        flex-direction: column;
        align-items: center;
        margin: auto;
    }

    span {
        font-size: var(--p2);
        color: var(--light-gray);
        margin-right: 10px;

        @media ${device.mobile} {
            margin-bottom: 6px;
        }

        @media ${device.tablet} {
            margin-bottom: 6px;
        }

        @media ${device.laptop} {
            margin-bottom: 6px;
        }
    }
`;

const ButtonAdd = styled.div`
    display: flex;
    align-items: center;

    span {
        margin-left: 10px;
        color: var(--light-gray);
        font-size: var(--p2);

        @media ${device.mobile} {
            display: none;
        }

        @media ${device.tablet} {
            display: none;
        }
    }

    @media ${device.mobile} {
        position: fixed;
        right: 30px;
        bottom: 30px;
        z-index: 10;
        left: unset;
        top: unset;
    }

    &:hover::after {
        content: "Add new Todo";
        text-transform: lowercase;
        position: absolute;
        color: var(--white);
        font-size: var(--p3);
        padding: 6px 12px;
        background: var(--default-box-gradient);
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
        background: var(--default-box-gradient);
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

    const handleTitleOnChange = (e) => setTitle(e.target.value);
    const handleDescriptionOnChange = (e) => setDescription(e.target.value);
    const handleDateOnChange = (e) => setDate(e.target.value);
    const handleCategoryOnChange = (e) => setCategory(e.target.value);

    const allTodos = todos.length;
    const expiredTodos = todos.filter((todo) => todo.expired == true);
    const expiringTodos = todos.filter((todo) => todo.expiring == true);
    const completedTodos = todos.filter((todo) => todo.complete == true);

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

    return (
        <TodosContainer>
            <TodosCounter>
                <AllTodos>
                    <span>All ToDo's</span> <div>{allTodos}</div>
                </AllTodos>
                <ExpiredTodos>
                    <span>Expired ToDo's</span>{" "}
                    <div>
                        {expiredTodos.length > 0 ? expiredTodos.length : "—"}
                    </div>
                </ExpiredTodos>
                <ExpiringTodos>
                    <span>Expiring ToDo's</span>{" "}
                    <div>
                        {expiringTodos.length > 0 ? expiringTodos.length : "—"}
                    </div>
                </ExpiringTodos>
                <CompleteTodos>
                    <span>Completed ToDo's</span>{" "}
                    <div>
                        {completedTodos.length > 0
                            ? completedTodos.length
                            : "—"}
                    </div>
                </CompleteTodos>
            </TodosCounter>
            <TodosControlBar>
                <ButtonAdd>
                    <Button type="addButton" onClick={toggleModal}></Button>
                    <span>add new ToDo</span>
                </ButtonAdd>
                <FilterWrap>
                    <span>filter by status or by category</span>
                    <TodosFilter todos={todos} setStatus={setStatus} />
                </FilterWrap>
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
