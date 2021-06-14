import React, { useState, useEffect } from "react";
import Button from "./Button";
import styled from "styled-components";

import chevronDown from "../assets/images/chevron-down.png";

const categories = ["Interviews", "Travel spots", "Shop lists", "Home notes"];

const ToDoForm = styled.div`
    form {
        margin: 40px auto;
        display: flex;
        align-items: center;
        flex-direction: column;
        width: 85%;
    }
`;

const TextInput = styled.div`
    position: relative;
    background-color: var(--el-bcg);
    display: flex;
    width: 100%;
    height: 50px;
    border-radius: 10px;
    z-index: 0;
    margin-bottom: 36px;

    input[type="text"] {
        color: var(--blue-06);
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        border: none;
        background-color: transparent;
        padding: 13px;
        width: 100%;
        outline: 0;
        z-index: 1;
    }
`;

const TextArea = styled.div`
    position: relative;
    background-color: var(--el-bcg);
    display: flex;
    width: 100%;
    height: 150px;
    border-radius: 10px;
    z-index: 0;
    margin-bottom: 36px;

    textarea {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        border: none;
        background-color: transparent;
        padding: 13px;
        width: 100%;
        outline: 0;
        z-index: 1;
    }

    span {
        position: absolute;
        left: 10px;
        bottom: -25px;
        font-size: var(--p3);
        color: var(--text-dark-blue);

        &.is-invalid {
            color: var(--expired);
        }
    }
`;

const SelectField = styled.div`
    position: relative;
    background-color: var(--el-bcg);
    display: flex;
    width: 100%;
    height: 50px;
    border-radius: 10px;
    z-index: 0;
    margin-bottom: 36px;

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

const ButtonPrimary = styled.div`
    background-color: transparent;
    border: none;
`;

const DateField = styled.div`
    position: relative;
    background-color: var(--el-bcg);
    display: flex;
    width: 100%;
    height: 50px;
    border-radius: 10px;
    z-index: 0;
    margin-bottom: 36px;

    &::after {
        content: "";
        width: 20px;
        height: 10px;
        display: block;
        position: absolute;
        right: 10px;
        top: 20px;
    }

    input {
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

export default function TodosForm({
    date,
    title,
    description,
    category,
    handleSubmit,
    handleTitleOnChange,
    handleDescriptionOnChange,
    handleDateOnChange,
    handleCategoryOnChange,
}) {
    const [textAreaCount, setTextAreaCount] = useState("");

    const charCountHandler = (e) => {
        const textAreaSpan = document.querySelector(".form__textarea span");
        const charLength = e.target.value.length;
        if (charLength > 119) {
            setTextAreaCount("Max 120 characters allowed!");
            textAreaSpan.classList.add("is-invalid");
        } else if (charLength > 0 && charLength < 119) {
            setTextAreaCount(`${charLength} / 120`);
            textAreaSpan.classList.remove("is-invalid");
        } else {
            null;
            textAreaSpan.classList.remove("is-invalid");
        }

        console.log(textAreaCount);
    };

    useEffect(() => {});

    useEffect(() => {
        document.getElementById("datePicker").min = new Date(
            new Date().getTime() - new Date().getTimezoneOffset() * 60000
        )
            .toISOString()
            .split("T")[0];
    }, []);

    return (
        <ToDoForm>
            <form onSubmit={handleSubmit}>
                <TextInput>
                    <input
                        type="text"
                        placeholder="ToDo title..."
                        name={title}
                        value={title}
                        onChange={handleTitleOnChange}
                        required
                    />
                </TextInput>
                <TextArea className="form__textarea">
                    <textarea
                        name={description}
                        placeholder="ToDo description..."
                        maxLength="120"
                        value={description}
                        onChange={handleDescriptionOnChange}
                        onKeyDown={charCountHandler}
                        id={description}
                        required
                    />
                    <span>{textAreaCount}</span>
                </TextArea>
                <DateField>
                    <input
                        type="date"
                        id="datePicker"
                        name={date}
                        value={date}
                        onChange={handleDateOnChange}
                        required
                    />
                </DateField>
                <SelectField>
                    <select
                        required
                        id="animal"
                        value={category}
                        onChange={handleCategoryOnChange}
                        onBlur={handleCategoryOnChange}
                    >
                        <option value="" disabled>
                            Select category
                        </option>
                        {categories.map((cat) => (
                            <option value={cat} key={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                </SelectField>
                <ButtonPrimary type="submit" value="Add new ToDo">
                    <Button>Add new ToDo</Button>
                </ButtonPrimary>
            </form>
        </ToDoForm>
    );
}
