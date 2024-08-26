import React, {useEffect, useState} from 'react';
import {useUser} from "../contexts/user-context";
import {ShoppingListHistory} from "./shopping-list-history";
import {useProduct} from "../contexts/product-context";
import {SupermarketsCard} from "./supermarkets-card";
import {CartProduct} from "./cart-product";
import {ClipLoader} from "react-spinners";

import _ from "lodash";
import {
    CartCost,
    ExitButton,
    HorizontalDiv,
    Item,
    NoItemsTitle,
    ShoppingCartContainer,
    ShoppingCartContent,
    SubmitButton,
    LoaderContainer,
    Title,
    SubmitDiv,
    TopBarButton, BackToCartButton
} from "./shopping-cart.styled";
import loadIcon from "../resources/load.png";
import saveIcon from "../resources/bookmark.png";
import deleteIcon from "../resources/delete.png";
import closeIcon from "../resources/close.png";
import leftArrow from "../resources/left-arrow.png";
import {DARK_BLUE} from "../utils/colors";


export const ShoppingCart = ({shoppingList, setShoppingList, removeFromCart, isSidebarOpen, setIsSidebarOpen}) => {

    const {currentUser, memoizedSaveShoppingListToHistory} = useUser();
    const {getProductsById, findCheapestSupermarkets} = useProduct();
    const [showShoppingHistory, setShowShoppingHistory] = useState(false);
    const [showCheapestSupermarkets, setShowCheapestSupermarkets] = useState(false);
    const [supermarkets, setSupermarkets] = useState([]);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        if (supermarkets && supermarkets.length > 0) {
            setShowCheapestSupermarkets(true);
        }
    }, [supermarkets]);


    const handleAdd = (productId) => {
        setShoppingList((prev) => {
            const newList = {...prev};
            if (newList[productId]) {
                newList[productId].quantity += 1;
            }
            return newList;
        });
    };


    const handleSubtract = (productId) => {
        setShoppingList((prev) => {
            const newList = {...prev};
            if (newList[productId] && newList[productId].quantity > 1) {
                newList[productId].quantity -= 1;
            } else {
                delete newList[productId];
            }
            return newList;
        });
    };

    const handleRemove = (productId) => {
        removeFromCart(productId);
    };

    const handleChosenShoppingList = async (chosen_shopping_list) => {
        const newList = await getProductsById(chosen_shopping_list);
        setShoppingList(newList);
        setShowShoppingHistory(false);
    }

    const transformShoppingListToDictionary = (shoppingList) => {
        const shoppingDict = {};
        Object.values(shoppingList).forEach(product => {
            shoppingDict[String(product.ItemCode)] = product.quantity;
        });
        return shoppingDict;
    };

    const handleFindCheapestSupermarkets = async () => {
        setLoading(true);
        let response = await findCheapestSupermarkets(transformShoppingListToDictionary(shoppingList), currentUser.lat, currentUser.lng, currentUser.distance_preference);
        setSupermarkets(response);
        setLoading(false);

    }

    const handleBackToCart = () => {
        setShowCheapestSupermarkets(false);
        setShowShoppingHistory(false);
        setSupermarkets([]);
    }

    const getCartCostString = (shoppingList) => {
        let cartMinPrice = 0.0;
        let cartMaxPrice = 0.0;
        for (const shoppingListKey in shoppingList) {
            cartMaxPrice += parseFloat(shoppingList[shoppingListKey].MaxPrice * shoppingList[shoppingListKey].quantity);
            cartMinPrice += parseFloat(shoppingList[shoppingListKey].MinPrice * shoppingList[shoppingListKey].quantity);
        }
        return "₪ " + cartMinPrice.toFixed(2) + ' - ' + cartMaxPrice.toFixed(2);
    }


    return (
        <ShoppingCartContainer isOpen={isSidebarOpen}>
            <ExitButton onClick={() => setIsSidebarOpen(false)}>
                <img src={closeIcon} alt="close"/>
            </ExitButton>
            <Title>{showCheapestSupermarkets ? "הסופרים הזולים באזורך" : showShoppingHistory ? "היסטוריית קניות" : "סל הקניות"}</Title>
            {showCheapestSupermarkets || showShoppingHistory ?
                <BackToCartButton onClick={() => handleBackToCart()}>
                    <img src={leftArrow} alt="back"/>
                    חזור לעגלה
                </BackToCartButton> : <HorizontalDiv>
                    <TopBarButton onClick={() => setShowShoppingHistory(!showShoppingHistory)}>
                        טעינת סל קניות
                        <img src={loadIcon} alt="טעינה"/>
                    </TopBarButton>
                    <TopBarButton onClick={() => setShoppingList({})}>
                        נקה עגלה
                        <img src={deleteIcon} alt="נקה"/>
                    </TopBarButton>
                    <TopBarButton onClick={() => memoizedSaveShoppingListToHistory(shoppingList)}>
                        שמירת רשימה
                        <img src={saveIcon} alt="שמור"/>
                    </TopBarButton>
                </HorizontalDiv>
            }
            {loading && (
                <LoaderContainer>
                    <ClipLoader loading={loading} size={50} color={DARK_BLUE}/>
                </LoaderContainer>
            )}
            {(showShoppingHistory ? <ShoppingListHistory shoppingLists={currentUser.shopping_history}
                                                         handleChosenShoppingList={handleChosenShoppingList}/> : (showCheapestSupermarkets ?
                <SupermarketsCard supermarkets={supermarkets}/> : (Object.keys(shoppingList).length < 1 ?
                    <ShoppingCartContent>
                        <NoItemsTitle>אופס... נראה שלא הוספת מוצרים לעגלה</NoItemsTitle>
                    </ShoppingCartContent> : <ShoppingCartContent>
                        {Object.keys(shoppingList).map((productId) => {
                            const product = shoppingList[productId];
                            return (<Item key={productId}>
                                <CartProduct product={product} productId={productId}
                                             handleAdd={handleAdd}
                                             handleSubtract={handleSubtract}
                                             handleRemove={handleRemove}/>
                            </Item>);
                        })}
                    </ShoppingCartContent>)))}
            {!showCheapestSupermarkets && !showShoppingHistory ?
                <SubmitDiv>
                    <CartCost>{_.isNil(shoppingList) || _.isEmpty(shoppingList) ? "" : getCartCostString(shoppingList)}</CartCost>
                    <SubmitButton disabled={_.isNil(shoppingList) || _.isEmpty(shoppingList)}
                                  onClick={() => handleFindCheapestSupermarkets()}>מציאת הסופרים</SubmitButton>
                </SubmitDiv>
                : <></>}
        </ShoppingCartContainer>);
};
