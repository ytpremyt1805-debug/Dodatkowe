import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export default function UserProvider({ children }) {

    const [user, setUser] = useState(() => {

        const saved = localStorage.getItem("user");

        return saved
            ? JSON.parse(saved)
            : {
                gender: "",
                height: "",
                weight: "",
                bodyType: "",
                topSize: "",
                bottomSize: "",
                shoeSize: "",
                skinTone: "",
                hairColor: "",
                hairLength: ""
            };

    });

    useEffect(() => {

        localStorage.setItem(
            "user",
            JSON.stringify(user)
        );

    }, [user]);

    const updateUser = (data) => {

        setUser(prev => ({
            ...prev,
            ...data
        }));

    };

    return (

        <UserContext.Provider
            value={{
                user,
                updateUser
            }}
        >

            {children}

        </UserContext.Provider>

    );

}