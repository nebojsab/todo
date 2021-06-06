import React, { useState, useEffect } from "react";
import styled from "styled-components";

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

const TextInput = styled.input`
    background-color: #efeeee;
    border: none;
    border-radius: 6px;
    height: 40px;
    padding: 0 0 0 6px;
    margin: 0 0 35px 0;
    width: 100%;
    box-shadow: 9px 9px 16px 9px rgba(0, 0, 0, 0.1),
        -9px -9px 9px 9px rgba(255, 255, 255, 0.5),
        9px 9px 20px 8px rgba(0, 0, 0, 0) inset,
        -9px -9px 18px 8px rgba(255, 255, 255, 0) inset;
`;

const TextArea = styled.input`
    background-color: #efeeee;
    border: none;
    border-radius: 6px;
    height: 140px;
    padding: 0 0 0 6px;
    margin: 0 0 35px 0;
    width: 100%;
    box-shadow: 9px 9px 16px 9px rgba(0, 0, 0, 0.1),
        -9px -9px 9px 9px rgba(255, 255, 255, 0.5),
        9px 9px 20px 8px rgba(0, 0, 0, 0) inset,
        -9px -9px 18px 8px rgba(255, 255, 255, 0) inset;
`;

const SelectField = styled.select`
    background-color: #efeeee;
    border: none;
    border-radius: 6px;
    height: 40px;
    padding: 0 0 0 6px;
    margin: 0 0 35px 0;
    width: 100%;
    box-shadow: 9px 9px 16px 9px rgba(0, 0, 0, 0.1),
        -9px -9px 9px 9px rgba(255, 255, 255, 0.5),
        9px 9px 20px 8px rgba(0, 0, 0, 0) inset,
        -9px -9px 18px 8px rgba(255, 255, 255, 0) inset;
`;

const ButtonPrimary = styled.button`
    background-color: #3a73a9;
    color: #fff;
    border: none;
    border-radius: 6px;
    height: 40px;
    padding: 0 20px;
    margin: 0 auto 15px;
    min-width: 200px;
    transition: all ease-in-out 0.2s;
    cursor: pointer;

    &:hover {
        background-color: #9ac7f0;
        color: #000;
        transition: all ease-in-out 0.2s;
    }
`;

const DateField = styled.input`
    background-color: #efeeee;
    border: none;
    border-radius: 6px;
    height: 40px;
    padding: 0 0 0 6px;
    margin: 0 0 35px 0;
    width: 100%;
    box-shadow: 9px 9px 16px 9px rgba(0, 0, 0, 0.1),
        -9px -9px 9px 9px rgba(255, 255, 255, 0.5),
        9px 9px 20px 8px rgba(0, 0, 0, 0) inset,
        -9px -9px 18px 8px rgba(255, 255, 255, 0) inset;
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
        const charLength = e.target.value.length;
        if (charLength > 119) {
            setTextAreaCount("Max 120 characters allowed!");
        } else if (charLength > 0 && charLength < 119) {
            setTextAreaCount(`${charLength} / 120`);
        } else {
            null;
        }
    };

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
                <TextInput
                    type="text"
                    placeholder="ToDo Title"
                    name={title}
                    value={title}
                    onChange={handleTitleOnChange}
                    required
                />
                <TextArea
                    name={description}
                    maxLength="120"
                    value={description}
                    onChange={handleDescriptionOnChange}
                    onKeyDown={charCountHandler}
                    id={description}
                    required
                ></TextArea>
                <span>{textAreaCount}</span>
                <DateField
                    type="date"
                    id="datePicker"
                    name={date}
                    value={date}
                    onChange={handleDateOnChange}
                    required
                />
                <SelectField
                    required
                    id="animal"
                    value={category}
                    onChange={handleCategoryOnChange}
                    onBlur={handleCategoryOnChange}
                >
                    <option />
                    {categories.map((cat) => (
                        <option value={cat} key={cat}>
                            {cat}
                        </option>
                    ))}
                </SelectField>
                <ButtonPrimary type="submit" value="Add new ToDo">
                    Add new ToDo
                </ButtonPrimary>
            </form>
        </ToDoForm>
    );
}
