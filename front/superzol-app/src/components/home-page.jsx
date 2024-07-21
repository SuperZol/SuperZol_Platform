import React, {useEffect, useState} from "react";
import {Box, Typography, Button} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {SearchBar} from "./search-bar";
import {useUser} from "../contexts/user-context";
import {ProductList} from "./product-list";
import {useProduct} from "../contexts/product-context";
import {ShoppingCart} from './shopping-cart';


export const Home = () => {
    const navigate = useNavigate();
    const {currentUser, currentSearch, logout, setError} = useUser();
    const {products, searchProductsByName, getAllProducts} = useProduct();
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [shoppingList, setShoppingList] = useState({});

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
            searchProductsByName(query);
        } else {
            getAllProducts();
        }

    };

    const addToCart = (product) => {
        setShoppingList((prev) => {
            const newList = {...prev};
            if (newList[product.ItemCode]) {
                newList[product.ItemCode].quantity += 1;
            } else {
                newList[product.ItemCode] = { ...product, quantity: 1 };
            }
            return newList;
        });
    };

    const removeFromCart = (productId) => {
        setShoppingList((prev) => {
            const newList = {...prev};
            if (newList[productId]) {
                    delete newList[productId];
            }
            return newList;
        });
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
            <ProductList products={products} addToCart={addToCart}/>
            <Button
                variant="contained"
                color="primary"
                onClick={handleLogout}
                sx={{mt: 3}}
            >
                Logout
            </Button>
            {isSidebarOpen &&
                <ShoppingCart shoppingList={shoppingList} setShoppingList={setShoppingList} removeFromCart={removeFromCart} setSidebarOpen={setSidebarOpen}/>}
        </Box>
        <Button
            variant="contained"
            color="primary"
            onClick={() => setSidebarOpen(true)}
            sx={{mt: 3}}
        >
            Cart
        </Button>
    </>)
};