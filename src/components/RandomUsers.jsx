import React, { useEffect } from "react";
import GetDateAndTime from "./GetDateAndTime";
import styled from "styled-components";
import { device } from "../helpers/breakpoints";

import logo from "../assets/images/todo-logo.png";
import jasonSmith from "../assets/images/profile-pics/jason-smith.png";
import connieAustin from "../assets/images/profile-pics/connie-austin.png";

const UserBar = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 15px 15px 0 0;
    padding: 0 35px;
    width: 100%;
    margin: 0 auto 30px;
`;

const TodosLogo = styled.div`
    @media ${device.mobile} {
        position: absolute;
        top: 20px;
        right: 20px;
    }
`;

const UserInfo = styled.div`
    display: flex;
    align-items: center;
    width: 50%;

    @media ${device.mobile} {
        flex-direction: column;
        width: 100%;
        align-items: flex-start;
    }

    @media ${device.tablet} {
        flex-direction: column;
        width: 50%;
        align-items: flex-start;
    }
`;

const UserImage = styled.div`
    background-color: var(--blue);
    border-radius: 15px;
    display: flex;
    overflow: hidden;

    img {
        width: 120px;
        height: auto;
    }

    @media ${device.mobile} {
        img {
            width: 120px;
            height: auto;
        }
    }
`;

const InfoWrap = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 24px;

    @media ${device.mobile} {
        margin-left: 0;
    }

    @media ${device.tablet} {
        margin: 24px 0 0 0;
    }
`;

const UserName = styled.h2`
    font-family: var(--heading-font-family);
    font-size: var(--h3);
    font-weight: 700;
    color: var(--black);
    margin-top: -15px;

    @media ${device.mobile} {
        font-size: var(--h3);
        margin-top: 15px;
    }
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
                                <UserInfo>
                                    <UserImage>
                                        <img
                                            src={user.src}
                                            alt={user.name}
                                            width="150"
                                            height="150"
                                        />
                                    </UserImage>
                                    <InfoWrap>
                                        <UserName>Hi {user.name}</UserName>
                                        <GetDateAndTime />
                                    </InfoWrap>
                                </UserInfo>

                                <TodosLogo>
                                    <img
                                        src={logo}
                                        alt="Todo App"
                                        width="150"
                                    />
                                </TodosLogo>
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
