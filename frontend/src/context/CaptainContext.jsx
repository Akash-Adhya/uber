// React context for managing captain authentication state and info.
import React, { createContext, useState } from 'react';

export const captainDataContext = createContext();

const CaptainContext = ({ children }) => {
    // Store captain info in state and provide setter
    const [captain, setCaptain] = useState({
        fullname: {
            firstname: "",
            lastname: "",
        },
        email: "",
    });

    return (
        <captainDataContext.Provider value={{ captain, setCaptain }}>
            {children}
        </captainDataContext.Provider>
    );
};

export default CaptainContext;