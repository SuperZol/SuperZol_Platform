import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {SearchBar} from "./search-bar";
import {useUser} from "../contexts/user-context";
import {ProductList} from "./product-list";
import {useProduct} from "../contexts/product-context";
import {ShoppingCart} from './shopping-cart';
import Toolbar from "./toolbar";
import {CategoriesModal} from "./categories-modal";
import {CartButton, CartButtonContainer, CartBadge} from "./cart-button.styled";
import cartImage from '../resources/shopping-cart.png';
import {
    ClipLoaderHome, CurrentCategoryContainer,
    MainContainer,
    NavigationButtons,
    PageButton,
    ProductsBox, RemoveCurrentCategory
} from "./home-page.styled";
import Cookies from "js-cookie";
import {DARK_BLUE} from "../utils/colors";

export const Home = () => {
    const navigate = useNavigate();
    const {currentUser, currentSearch, logout, setError} = useUser();
    const {
        products,
        searchProductsByName,
        getAllProducts,
        searchProductsByCategory,
        searchProductsByNameAndCategory,
        productsImages
    } = useProduct();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [shoppingList, setShoppingList] = useState({});
    const [page, setPage] = useState(1);
    const [pageSize] = useState(25);
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
        if (currentUser) {
            const savedList = Cookies.get(`shoppingList_${currentUser.email}`);
            if (savedList) {
                setShoppingList(JSON.parse(savedList));
            } else {
                setShoppingList({});
            }
        }
    }, [currentUser]);
    useEffect(() => {
        if (currentUser) {
            Cookies.set(`shoppingList_${currentUser.email}`, JSON.stringify(shoppingList), {expires: 2});
        }
    }, [shoppingList, currentUser]);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                if (isSearchByName && isSearchByCategory) {
                    await searchProductsByNameAndCategory(searchName, category, page, pageSize);
                } else if (isSearchByName) {
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
            setModalOpen(false);
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

    const getTotalProductCount = () => {
        return Object.values(shoppingList).reduce((total, product) => total + product.quantity, 0);
    };

    return (
        <MainContainer $isOpen={isSidebarOpen}>
            <Toolbar onLogout={logout} isOpen={isSidebarOpen}/>
            <ProductsBox>
                <SearchBar onSearch={handleSearchByName} onCategoriesClick={handleCategoriesClick}/>
                {(isSearchByCategory && !loading) && (
                    <CurrentCategoryContainer>
                        <span>{category}</span>
                        <RemoveCurrentCategory onClick={() => disableCategory()}> x</RemoveCurrentCategory>
                    </CurrentCategoryContainer>
                )}
                {!loading &&
                    <CategoriesModal isOpen={isModalOpen} onClose={handleCloseModal} filterCategory={filterCategory}/>}
                {loading ? (
                    <ClipLoaderHome loading={loading} size={100} color={DARK_BLUE}/>
                ) : (
                    <>
                        <ProductList products={products} addToCart={addToCart} productsImages={productsImages}/>
                        {products.length > 0 &&
                            <NavigationButtons>
                                <PageButton disabled={pageSize > products.length}
                                            onClick={() => handleNextPage()}>הבא</PageButton>
                                <PageButton disabled={page === 1} onClick={() => handlePrevPage()}>הקודם</PageButton>
                            </NavigationButtons>}
                    </>
                )}
                {isSidebarOpen && (
                    <ShoppingCart
                        shoppingList={shoppingList}
                        setShoppingList={setShoppingList}
                        removeFromCart={removeFromCart}
                        isSidebarOpen={isSidebarOpen}
                        setIsSidebarOpen={setIsSidebarOpen}
                    />
                )}
            </ProductsBox>
            <CartButtonContainer>
                <CartButton onClick={() => setIsSidebarOpen(true)}>
                    <img src={cartImage} alt="cart"/>
                    {getTotalProductCount() > 0 && (
                        <CartBadge>{getTotalProductCount()}</CartBadge>
                    )}
                </CartButton>
            </CartButtonContainer>
        </MainContainer>
    );
};