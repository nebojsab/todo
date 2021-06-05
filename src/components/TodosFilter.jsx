import React from "react";

export default function TodosFilter({ setStatus }) {
    const statusHandler = (e) => {
        setStatus(e.target.value);
    };
    return (
        <div>
            <select onBlur={statusHandler} onChange={statusHandler}>
                <option value="All">All</option>
                <option value="Complete">Complete</option>
                <option value="Expired">Expired</option>
                <option value="Expiring">Expiring</option>
                <option value="Interviews">Interviews</option>
                <option value="Travel spots">Travel spots</option>
                <option value="Shop lists">Shop lists</option>
                <option value="Home notes">Home notes</option>
            </select>
        </div>
    );
}
