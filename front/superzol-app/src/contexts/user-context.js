import {createContext, useContext, useState, useMemo, useCallback} from "react";
import {createUser, getUser, saveShoppingList, updateUser} from "../api";
import Cookies from 'js-cookie';

const UserContext = createContext(undefined);
export const useUser = () => useContext(UserContext);

export const UserProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(() => {
        const savedUser = Cookies.get('currentUser');
        try {
            return savedUser ? JSON.parse(savedUser) : undefined;
        } catch (error) {
            return undefined;
        }
    });
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
            Cookies.set('currentUser', JSON.stringify(user), {expires: 7});
        } catch (err) {
            throw new Error(err.response.data.detail);
        }
    };

    const logout = async () => {
        setCurrentUser(null);
        Cookies.remove('currentUser');
    };

    const updateCurrentUser = (updatedUser) => {
        setCurrentUser((prevUser) => {
            const newUser = {...prevUser, ...updatedUser};
            Cookies.set('currentUser', JSON.stringify(newUser), {expires: 7});
            return newUser;
        });
    };

    const updateUserToServer = async (email, data) => {
        try {
            return await updateUser(email, data);
        } catch (error) {
            throw new Error(error.response.data.detail);

        }
    };

    const memoizedSaveShoppingListToHistory = useCallback(
        async (shoppingList) => {
            if (Object.keys(shoppingList).length >= 1) {
                const dictShoppingList = {};
                Object.keys(shoppingList).forEach((productId) => {
                    const {ItemCode, quantity} = shoppingList[productId];
                    dictShoppingList[ItemCode] = quantity;
                });
                const isSaved = await saveShoppingList(currentUser.email, dictShoppingList);
                if (isSaved) {
                    currentUser.shopping_history.push(dictShoppingList);
                    Cookies.set('currentUser', JSON.stringify(currentUser), {expires: 7});
                }
            }
        },
        [currentUser]
    );

    const value = useMemo(() => ({
        currentUser,
        error,
        setError,
        login,
        register,
        logout,
        updateUserToServer,
        updateCurrentUser,
        memoizedSaveShoppingListToHistory,
    }), [currentUser, memoizedSaveShoppingListToHistory, error]);

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};
