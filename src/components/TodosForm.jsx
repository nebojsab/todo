import React, { useState, useEffect } from "react";

const categories = ["Interviews", "Travel spots", "Shop lists", "Home notes"];

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
        <>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="ToDo Title"
                    name={title}
                    value={title}
                    onChange={handleTitleOnChange}
                    required
                />
                <textarea
                    name={description}
                    maxLength="120"
                    value={description}
                    onChange={handleDescriptionOnChange}
                    onKeyDown={charCountHandler}
                    id={description}
                    required
                ></textarea>
                <span>{textAreaCount}</span>
                <input
                    type="date"
                    id="datePicker"
                    name={date}
                    value={date}
                    onChange={handleDateOnChange}
                    required
                />
                <select
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
                </select>
                <input type="submit" value="Submit todos" />
            </form>
        </>
    );
}
