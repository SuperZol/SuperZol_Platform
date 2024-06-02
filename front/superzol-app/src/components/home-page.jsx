import React, {useEffect} from "react";
import {Box, Typography, Button} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {SearchBar} from "./search-bar";
import {useAuth} from "../contexts/user-context";
import {ProductList} from "./product-list";
import {useProduct} from "../contexts/product-context";

export const Home = () => {
    const navigate = useNavigate();
    const {currentUser, currentSearch, logout, setError} = useAuth();
    const {products, searchProducts, getAllProducts} = useProduct();

    useEffect(() => {
        if (!currentUser) {
            setError("");
            navigate("/login");
        } else {
            getAllProducts();
        }
    }, [currentUser, getAllProducts, navigate, setError]);

    const handleLogout = async (e) => {
        e.preventDefault();

        try {
            await logout();
        } catch (e) {
            setError("Failed to logout");
        }
    };

    const handleSearch = (query) => {
        console.log("query = " + query);
        if (currentSearch !== "") {
            searchProducts(query);
        } else {
            getAllProducts();
        }
    };

    return (
        <>
            <Button
                variant="contained"
                color="primary"
                onClick={() => navigate('/user_preferences')}
                sx={{mt: 3}}
            >
                User Preferences
            </Button>
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                minHeight="100vh"
                sx={{textAlign: "center"}}
            >
                <Typography variant="h1" gutterBottom>
                    סופרזול
                </Typography>
                <SearchBar onSearch={handleSearch}/>
                <ProductList products={products}/>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleLogout}
                    sx={{mt: 3}}
                >
                    Logout
                </Button>
            </Box>
        </>
    )
};