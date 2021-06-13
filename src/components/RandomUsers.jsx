import React, { useEffect } from "react";
import styled from "styled-components";

import jasonSmith from "../assets/images/profile-pics/jason-smith.png";
import connieAustin from "../assets/images/profile-pics/connie-austin.png";

const UserBar = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 110px;
    border-radius: 15px 15px 0 0;
    /* background: var(--header-background-blue); */
    background: rgb(153, 198, 239);
    background: linear-gradient(
        207deg,
        rgba(153, 198, 239, 1) 0%,
        rgba(81, 127, 153, 1) 38%,
        rgba(0, 17, 27, 1) 100%
    );
    padding: 0 35px;
    width: 96%;
    margin: auto;
`;

const UserImage = styled.div`
    margin-top: -52px;
`;

const UserName = styled.h2`
    font-family: var(--heading-font-family);
    font-size: var(--h2);
    font-weight: 100;
    color: var(--white);
    margin-top: -15px;
`;

export default function RandomUsers() {
    const users = [
        {
            name: "Jason Smith",
            src: jasonSmith,
        },
        {
            name: "Connie Austin",
            src: connieAustin,
        },
    ];

    function RandomUser() {
        const user = users
            .sort(() => Math.random() - Math.random())
            .slice(0, 1);
        if (user) {
            return (
                <>
                    {user &&
                        user.map((user, index) => (
                            <UserBar key={index}>
                                <UserImage>
                                    <img
                                        src={user.src}
                                        alt={user.name}
                                        width="150"
                                        height="150"
                                    />
                                </UserImage>
                                <UserName>{user.name}</UserName>
                            </UserBar>
                        ))}
                </>
            );
        }
    }

    useEffect(() => {
        window.addEventListener("beforeunload", RandomUser);
        return () => {
            window.removeEventListener("beforeunload", RandomUser);
        };
    }, []);

    return <RandomUser />;
}
