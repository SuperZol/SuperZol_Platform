import React, {useEffect, useState} from "react";
import {Box, Button} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {SearchBar} from "./search-bar";
import {useUser} from "../contexts/user-context";
import {ProductList} from "./product-list";
import {useProduct} from "../contexts/product-context";
import {ShoppingCart} from './shopping-cart';
import Toolbar from "./toolbar";
import {CategoriesModal} from "./categories-modal";
import {ClipLoader} from "react-spinners";


export const Home = () => {
    const navigate = useNavigate();
    const {currentUser, currentSearch, logout, setError} = useUser();
    const {
        products,
        searchProductsByName,
        getAllProducts,
        searchProductsByCategory,
        searchProductsByNameAndCategory
    } = useProduct();
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [shoppingList, setShoppingList] = useState({});
    const [page, setPage] = useState(1);
    const [pageSize] = useState(24);
    const [isSearchByName, setIsSearchByName] = useState(false);
    const [isSearchByCategory, setIsSearchByCategory] = useState(false);
    const [category, setCategory] = useState("");
    const [searchName, setSearchName] = useState("");
    const [isModalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!currentUser) {
            setError("");
            navigate("/login");
        }
    }, [currentUser, navigate, setError]);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                if (isSearchByName && isSearchByCategory) {
                    await searchProductsByNameAndCategory(searchName, category, page, pageSize);
                } else if (isSearchByName) {
                    setLoading(false);
                    await searchProductsByName(searchName, page, pageSize);
                } else if (isSearchByCategory) {
                    await searchProductsByCategory(category, page, pageSize);
                } else {
                    await getAllProducts(page, pageSize);
                }
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [page, pageSize, isSearchByName, isSearchByCategory, category, searchName, getAllProducts, searchProductsByCategory, searchProductsByName, searchProductsByNameAndCategory]);

    useEffect(() => {
        setPage(1);
    }, [isSearchByName, isSearchByCategory]);

    const handleSearchByName = (productName) => {
        if (productName !== "") {
            setIsSearchByName(true);
            setSearchName(productName);
        } else {
            setIsSearchByName(false);
            setSearchName("");
        }
    };

    const filterCategory = (category) => {
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
            const newList = { ...prev };
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

    const handleCategoriesClick = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const disableCategory = () => {
        setCategory("");
        setIsSearchByCategory(false);
    }

    return (
        <>
            <Toolbar onLogout={logout} />
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                minHeight="100vh"
                sx={{ textAlign: "center" }}
                marginTop="70px"
            >
                {loading ? (
                    <ClipLoader size={150} color={"#123abc"} loading={loading} />
                ) : (
                    <>
                        <SearchBar onSearch={handleSearchByName} onCategoriesClick={handleCategoriesClick} />
                        {isSearchByCategory && (
                            <Button onClick={() => disableCategory()}>{category} x</Button>
                        )}
                        <CategoriesModal isOpen={isModalOpen} onClose={handleCloseModal} filterCategory={filterCategory}></CategoriesModal>
                        <ProductList products={products} addToCart={addToCart} />
                        <Button onClick={() => handleNextPage()}>הבא</Button>
                        <Button onClick={() => handlePrevPage()}>הקודם</Button>
                    </>
                )}
                {isSidebarOpen && (
                    <ShoppingCart shoppingList={shoppingList} setShoppingList={setShoppingList} removeFromCart={removeFromCart} setSidebarOpen={setSidebarOpen} />
                )}
            </Box>
            {!loading && (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setSidebarOpen(true)}
                    sx={{ mt: 3 }}
                >
                    Cart
                </Button>
            )}
        </>
    );
};
