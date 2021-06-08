import React from "react";
import johnDoe from "../assets/images/profile-pics/john-doe.png";
import maryPoppins from "../assets/images/profile-pics/mary-poppins.png";
import jasonSmith from "../assets/images/profile-pics/jason-smith.png";
import connieAustin from "../assets/images/profile-pics/connie-austin.png";

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

    const user = users.sort(() => Math.random() - Math.random()).slice(0, 1);
    return (
        <>
            {user &&
                user.map((user, index) => (
                    <div key={index}>
                        <img
                            src={user.src}
                            alt={user.name}
                            width="150"
                            height="150"
                        />
                        <h3>{user.name}</h3>
                    </div>
                ))}
        </>
    );
}
