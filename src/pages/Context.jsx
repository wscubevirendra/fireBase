import React, { createContext, useEffect, useState } from 'react'
const MainContext = createContext()

export default function Context(props) {
    const [user, SetUser] = useState(null)

    useEffect(
        () => {
            const lsUser = localStorage.getItem("user");
            if (lsUser != undefined) {
                SetUser(JSON.parse(lsUser))

            }
        },
        []
    )

    const login = (data) => {
        SetUser(data);
        localStorage.setItem("user", JSON.stringify(data));
    }

    const logout = (data) => {
        SetUser(null);
        localStorage.removeItem("user");
    }

    return (
        <MainContext.Provider value={{ user, SetUser, login ,logout}}>
            {
                props.children
            }

        </MainContext.Provider>
    )
}

export { MainContext }
