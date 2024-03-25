import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
    const [usernameGlobal, setUsernameGlobal] = useState('');

    return (
        <UserContext.Provider value={{ usernameGlobal, setUsernameGlobal}}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    return useContext(UserContext);
}
