import {createContext, useContext, useMemo, useState} from "react";
import {createUser, getUser, saveShoppingList, updateUser} from "../api";

const UserContext = createContext(undefined);
export const useUser = () => useContext(UserContext);

export const UserProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState();
    const [error, setError] = useState("");

    const register = async (email, password) => {
        try {
            await createUser(email, password);
        } catch (error) {
            if (error.response && error.response.data) {
                throw new Error(error.response.data.detail);
            }
        }
    };

    const login = async (email, password) => {
        try {
            const user = await getUser(email, password);
            setCurrentUser(user);
        } catch (err) {
            throw new Error(err.response.data.detail);
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
    const updateUserToServer = async (email, data) => {
        try {
            console.log("here!");
            return await updateUser(email, data);
        } catch (error) {
            throw new Error(error.response.data.detail);

        }
    };

    const saveShoppingListToHistory = async (shoppingList) => {
        if (Object.keys(shoppingList).length >= 1) {
            const dictShoppingList = {};
            Object.keys(shoppingList).forEach((productId) => {
                const {ItemCode, quantity} = shoppingList[productId];
                dictShoppingList[ItemCode] = quantity;
            });
            const isSaved = await saveShoppingList(currentUser.email, dictShoppingList)
            if (isSaved) {
                currentUser.shopping_history.push(dictShoppingList)
            }
        }
    }

    const value = useMemo(() => ({
        currentUser,
        error,
        setError,
        login,
        register,
        logout,
        updateUserToServer,
        updateCurrentUser,
        saveShoppingListToHistory
    }), [currentUser, saveShoppingListToHistory, error]);


    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};