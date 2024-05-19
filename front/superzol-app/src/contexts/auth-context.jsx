import {createContext, useContext, useState, useMemo, useEffect} from "react";
import axios from "axios";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [products, setProducts] = useState();

    const register = async (email, password) => {
        const response = await axios.post("http://localhost:8000/users/", {
            email: email,
            password: password
        }).catch((err) => console.log(`Error: ${err}`));
    };

    const login = async (email, password) => {
        try {
            const url = `http://localhost:8000/users/login/${email}/${password}`;
            const response = await axios.get(url);
            setCurrentUser(response.data);  // Set the entire response.data object as the currentUser

        } catch (err) {
            console.log(`Error: ${err}`);
        }
    };
    const logout = async () => {
        setCurrentUser(null);
    };
    useEffect(() => {
        console.log(currentUser);

    }, [currentUser]);

    const getProducts = async () => {
        const products = await axios.get(`http://localhost:8000/product/products`)
            .catch((err) => console.log(`Error: ${err}`));
        setProducts(products.data)
    }
    const search = async (product) => {
        const products = await axios.get(`http://localhost:8000/product/${product}`)
            .catch((err) => console.log(`Error: ${err}`));
    };

    const value = useMemo(() => ({
        currentUser,
        error,
        setError,
        login,
        register,
        logout,
        setLoading,
        loading,
        products,
        getProducts,
        search
    }), [currentUser, error, loading]); // Dependencies array


    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};