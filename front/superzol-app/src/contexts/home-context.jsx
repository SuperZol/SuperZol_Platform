import {createContext, useContext, useMemo, useState} from "react";
import axios from "axios";

const HomeContext = createContext(undefined);

export const useHome = () => useContext(HomeContext);
export const HomeProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState();
    const [currentSearch, setcurrentSearch] = useState();
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("");
    const search = async (product) => {
        const response = await axios.get("http://localhost:8000/product/products",
            product
        ).catch((err) => console.log(`Error: ${err}`));
    };

    const value = useMemo(() => ({
        currentUser,
        currentSearch,
        error,
        setError,
        loading,
        setLoading,
        search
    }),[currentSearch ,loading]);
    return (
        <HomeContext.Provider value={value}>
            {!loading && children}
        </HomeContext.Provider>
    )
};