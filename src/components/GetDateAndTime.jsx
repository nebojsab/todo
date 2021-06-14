import React, { useState, useEffect } from "react";
import styled from "styled-components";

const DateAndTime = styled.div`
    color: var(--light-gray);
    font-size: var(--p3);
`;

export default function GetDateAndTime() {
    const [dateVal, setDateVal] = useState(new Date());

    useEffect(() => {
        var timer = setInterval(() => setDateVal(new Date()), 1000);
        return function cleanup() {
            clearInterval(timer);
        };
    }, []);

    return (
        <DateAndTime>
            {dateVal.toLocaleDateString("default", {
                month: "long",
                day: "2-digit",
                year: "numeric",
            })}{" "}
            — {dateVal.toLocaleTimeString()}
        </DateAndTime>
    );
}
