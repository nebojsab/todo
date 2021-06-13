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
    background-color: #f1f1f1;
    border: none;
    border-radius: 6px;
    height: 45px;
    padding: 0 0 0 6px;
    margin: 0 0 35px 0;
    width: 100%;
`;

const TextArea = styled.textarea`
    background-color: #f1f1f1;
    border: none;
    border-radius: 6px;
    height: 140px;
    padding: 10px 0 0 6px;
    margin: 0 0 35px 0;
    width: 100%;
`;

const SelectField = styled.select`
    background-color: #f1f1f1;
    border: none;
    border-radius: 6px;
    height: 45px;
    padding: 0 0 0 6px;
    margin: 0 0 35px 0;
    width: 100%;
`;

const ButtonPrimary = styled.button`
    background-color: var(--primary-blue);
    color: var(--white);
    border: none;
    border-radius: 6px;
    height: 45px;
    padding: 0 20px;
    margin: 0 auto 15px;
    min-width: 200px;
    transition: all ease-in-out 0.2s;
    cursor: pointer;
    transform: scale(1.01);
    box-shadow: 0 2px 4px var(--button-primary-blue-shadow);

    &:hover {
        transition: all ease-in-out 0.2s;
        box-shadow: 0 2px 2px var(--button-primary-blue-shadow);
        transform: scale(1);
    }
`;

const DateField = styled.input`
    background-color: #f1f1f1;
    border: none;
    border-radius: 6px;
    height: 40px;
    padding: 0 0 0 6px;
    margin: 0 0 35px 0;
    width: 100%;
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
