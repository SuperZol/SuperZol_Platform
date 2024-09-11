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
    TopBarButton, BackToCartButton, SaveConfirmation, NoSupermarketsMessage
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
    const [showSaveConfirmation, setShowSaveConfirmation] = useState(false);
    const [noSupermarketsFound, setNoSupermarketsFound] = useState(false);

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
        let response = await findCheapestSupermarkets(
            transformShoppingListToDictionary(shoppingList),
            currentUser.lat,
            currentUser.lng,
            currentUser.distance_preference
        );
        if (response.length === 0) {
            setNoSupermarketsFound(true);
            setTimeout(() => setNoSupermarketsFound(false), 2500);
            setShowCheapestSupermarkets(false);
        } else {
            setSupermarkets(response);
            setShowCheapestSupermarkets(true);
        }
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
        if (cartMinPrice === cartMaxPrice) {
            return "₪ " + cartMaxPrice.toFixed(2);
        } else {
            return "₪ " + cartMinPrice.toFixed(2) + ' - ' + cartMaxPrice.toFixed(2);
        }
    }

    const handleSaveShoppingList = () => {
        if (!_.isEmpty(shoppingList)) {
            memoizedSaveShoppingListToHistory(shoppingList);
            setShowSaveConfirmation(true);
            setTimeout(() => setShowSaveConfirmation(false), 2500);
        }
    };


    return (
        <ShoppingCartContainer $isOpen={isSidebarOpen}>
            <ExitButton onClick={() => setIsSidebarOpen(false)}>
                <img src={closeIcon} alt="close"/>
            </ExitButton>
            <Title>{showCheapestSupermarkets ? "הסופרים הזולים באזורך" : showShoppingHistory ? "היסטוריית קניות" : "סל הקניות"}</Title>
            {showSaveConfirmation && (
                <SaveConfirmation>
                    הרשימה נשמרה בהצלחה!
                </SaveConfirmation>
            )}
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
                    <TopBarButton
                        onClick={handleSaveShoppingList}
                        disabled={_.isEmpty(shoppingList)}>
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
            {noSupermarketsFound && (
                <NoSupermarketsMessage>
                    לא נמצאו סופרמרקטים באזורך
                </NoSupermarketsMessage>
            )}
            {(showShoppingHistory && currentUser.shopping_history.length > 0 ?
                <ShoppingListHistory shoppingLists={currentUser.shopping_history}
                                     handleChosenShoppingList={handleChosenShoppingList}/> : showShoppingHistory ?
                    <NoItemsTitle>לא קיימות רשימות קניות</NoItemsTitle> :
                    (showCheapestSupermarkets ?
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
