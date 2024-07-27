import React, {useEffect, useState} from "react";
import {Box, Button} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {SearchBar} from "./search-bar";
import {useUser} from "../contexts/user-context";
import {ProductList} from "./product-list";
import {useProduct} from "../contexts/product-context";
import {ShoppingCart} from './shopping-cart';
import Toolbar from "./toolbar";


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

    const handleSearch = (query) => {
        if (currentSearch !== "") {
            searchProductsByName(query);
        } else {
            getAllProducts();
        }

    };

    const addToCart = (product, quantity) => {
        setShoppingList((prev) => {
            const newList = {...prev};
            if (newList[product.ItemCode]) {
                newList[product.ItemCode].quantity += quantity;
            } else {
                newList[product.ItemCode] = {...product, quantity: quantity};
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
        <Toolbar onLogout={logout}/>
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="100vh"
            sx={{textAlign: "center"}}
            marginTop="70px"
        >
            <SearchBar onSearch={handleSearch}/>
            <ProductList products={products} addToCart={addToCart}/>
            {isSidebarOpen &&
                <ShoppingCart shoppingList={shoppingList} setShoppingList={setShoppingList}
                              removeFromCart={removeFromCart} setSidebarOpen={setSidebarOpen}/>}
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