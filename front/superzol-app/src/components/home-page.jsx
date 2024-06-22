import React, {useEffect, useState} from "react";
import {Box, Typography, Button} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {SearchBar} from "./search-bar";
import {useAuth} from "../contexts/user-context";
import {ProductList} from "./product-list";
import {useProduct} from "../contexts/product-context";
import {ShoppingCart} from './shopping-cart';


export const Home = () => {
    const navigate = useNavigate();
    const {currentUser, currentSearch, logout, setError} = useAuth();
    const {products, searchProducts, getAllProducts} = useProduct();
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        if (!currentUser) {
            setError("");
            navigate("/login");
        }
        if (products && products.length <= 0) {
            getAllProducts();
        }
    }, [products, currentUser, getAllProducts, navigate, setError]);

    const handleLogout = async (e) => {
        e.preventDefault();

        try {
            await logout();
        } catch (e) {
            setError("Failed to logout");
        }
    };

    const handleSearch = (query) => {
        if (currentSearch !== "") {
            searchProducts(query);
        } else {
            getAllProducts();
        }
    };
    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    return (<>
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
            {isSidebarOpen && <ShoppingCart />}
        </Box>
        <Button
            variant="contained"
            color="primary"
            onClick={toggleSidebar}
            sx={{mt: 3}}
        >
            Cart
        </Button>
    </>)
};