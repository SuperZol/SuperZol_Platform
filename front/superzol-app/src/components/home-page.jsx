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
    const {products, searchProductsByName, getAllProducts, searchProductsByCategory} = useProduct();
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [shoppingList, setShoppingList] = useState({});
    const [page, setPage] = useState(1);
    const [pageSize] = useState(24);
    const [isSearchByName, setIsSearchByName] = useState(false);
    const [isSearchByCategory, setIsSearchByCategory] = useState(false);
    const [category, setCategory] = useState("");
    const [searchName, setSearchName] = useState("");

    useEffect(() => {
        if (!currentUser) {
            setError("");
            navigate("/login");
        }
    }, [currentUser, navigate, setError]);

    useEffect(() => {
        if (isSearchByName) {
            searchProductsByName(searchName, page, pageSize);
        } else if (isSearchByCategory) {
            searchProductsByCategory(category, page, pageSize);
        } else {
            getAllProducts(page, pageSize)
        }
    }, [page, pageSize, isSearchByName, isSearchByCategory]);

    useEffect(() => {
        setPage(1);
    }, [isSearchByName, isSearchByCategory]);


    const handleSearchByName = (productName) => {
        if (productName !== "") {
            setIsSearchByName(true);
            setSearchName(productName);
        }
        else{
            setIsSearchByName(false);
            setSearchName("");
        }
    };

    const handleSearchByCategory = (category) => {
        if (currentSearch !== "") {
            searchProductsByCategory(category, page, pageSize);
            setIsSearchByCategory(true);
            setCategory(category);
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

    const handleNextPage = () => {
        setPage(prevPage => prevPage + 1);
    };

    const handlePrevPage = () => {
        setPage(prevPage => (prevPage > 1 ? prevPage - 1 : 1));
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
            <SearchBar onSearch={handleSearchByName}/>
            <ProductList products={products} addToCart={addToCart}/>
            <Button onClick={() => handleNextPage()}>הבא</Button>
            <Button onClick={() => handlePrevPage()}>הקודם</Button>
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