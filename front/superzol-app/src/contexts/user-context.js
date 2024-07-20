import {createContext, useContext, useState, useMemo} from "react";
import {createUser, getUser, saveShoppingList} from "../api";

const UserContext = createContext(undefined);
export const useUser = () => useContext(UserContext);

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

    const saveShoppingListToHistory = async (shoppingList) => {
        if (Object.keys(shoppingList).length >= 1) {
            const dictShoppingList = {};
            Object.keys(shoppingList).forEach((productId) => {
                const {ItemCode, quantity} = shoppingList[productId];
                dictShoppingList[ItemCode] = quantity;
            });
            const isSaved = await saveShoppingList(currentUser.email, dictShoppingList)
            if(isSaved){
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
        updateCurrentUser,
        saveShoppingListToHistory
    }), [currentUser, error]);


    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};