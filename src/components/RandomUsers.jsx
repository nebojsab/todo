import React, { useEffect } from "react";
import styled from "styled-components";

import johnDoe from "../assets/images/profile-pics/john-doe.png";
import maryPoppins from "../assets/images/profile-pics/mary-poppins.png";
import jasonSmith from "../assets/images/profile-pics/jason-smith.png";
import connieAustin from "../assets/images/profile-pics/connie-austin.png";

const UserBar = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 110px;
    border-radius: 15px 15px 0 0;
    background-image: var(--radial-gradient);
    padding: 0 35px;
`;

const UserImage = styled.div`
    margin-top: -37px;
`;

const UserName = styled.h3`
    font-family: var(--heading-font-family);
    font-size: var(--h3);
    font-weight: 400;
    color: var(--white);
`;

export default function RandomUsers() {
    const users = [
        {
            name: "John Doe",
            src: johnDoe,
        },
        {
            name: "Mary Poppins",
            src: maryPoppins,
        },
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
