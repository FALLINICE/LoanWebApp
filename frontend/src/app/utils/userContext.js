"use client"
import { Password } from "@mui/icons-material";
import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => { // Capitalized the component name
    const [user, setUser] = useState({name:null,email:null,password: null,userId:null});

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);