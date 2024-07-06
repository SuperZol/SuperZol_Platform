import {createContext, useContext, useState, useMemo} from "react";
import {createUser, getUser} from "../api";

const UserContext = createContext(undefined);
export const useAuth = () => useContext(UserContext);

export const UserProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState();
    const [error, setError] = useState("");

    const register = async (email, password) => {
        await createUser(email, password);
    };

    const login = async (email, password) => {
        try {
            setCurrentUser(await getUser(email, password));
        } catch (err) {
            console.log(`Error: ${err}`);
        }
    };

    const logout = async () => {
        setCurrentUser(null);
    };
    const updateCurrentUser = (updatedUser) => {
        setCurrentUser((prevUser) => ({
            ...prevUser,
            ...updatedUser,
        }));
    };

    const value = useMemo(() => ({
        currentUser,
        error,
        setError,
        login,
        register,
        logout,
        updateCurrentUser,
    }), [currentUser, error]);


    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};