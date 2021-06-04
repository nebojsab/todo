import React, { useEffect } from "react";

const categories = ["Intervies", "Travel spots", "Shop lists", "Home notes"];

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
                    value={description}
                    onChange={handleDescriptionOnChange}
                    id={description}
                    required
                ></textarea>
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
