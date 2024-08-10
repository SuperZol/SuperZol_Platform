import React, {useEffect, useState} from 'react';
import {useUser} from "../contexts/user-context";
import {ShoppingListHistory} from "./shopping-list-history";
import {useProduct} from "../contexts/product-context";
import {SupermarketsCard} from "./supermarkets-card";
import {CartProduct} from "./cart-product";
import {
    ExitButton, HorizontalDiv,
    Item,
    ShoppingCartContainer,
    ShoppingCartContent,
    SubmitButton,
    Title, TopBarButton
} from "./shopping-cart.styled";
import loadIcon from "../resources/load.png";
import saveIcon from "../resources/bookmark.png";
import deleteIcon from "../resources/delete.png";


export const ShoppingCart = ({shoppingList, setShoppingList, removeFromCart, isSidebarOpen, setIsSidebarOpen}) => {

    const {currentUser, saveShoppingListToHistory} = useUser();
    const {getProductsById, findCheapestSupermarkets} = useProduct();
    const [showShoppingHistory, setShowShoppingHistory] = useState(false);
    const [showCheapestSupermarkets, setShowCheapestSupermarkets] = useState(false);
    const [supermarkets, setSupermarkets] = useState([])

    useEffect(() => {
        if (supermarkets.length > 0) {
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
        let response = await findCheapestSupermarkets(transformShoppingListToDictionary(shoppingList), currentUser.lat, currentUser.lng, currentUser.distance_preference);
        setSupermarkets(response);
    }


    return (
        <ShoppingCartContainer isOpen={isSidebarOpen}>
            <ExitButton onClick={() => setIsSidebarOpen(false)}>x</ExitButton>
            <Title>עגלת הקניות</Title>
            <HorizontalDiv>
                <TopBarButton onClick={() => setShowShoppingHistory(!showShoppingHistory)}>
                    טעינת סל קניות
                    <img src={loadIcon} alt="Load"/>
                </TopBarButton>
                <TopBarButton onClick={() => setShoppingList({})}>
                    נקה עגלה
                    <img src={deleteIcon} alt="Load"/>
                </TopBarButton>
                <TopBarButton onClick={() => saveShoppingListToHistory(shoppingList)}>
                    שמירת רשימה
                    <img src={saveIcon} alt="Load"/>
                </TopBarButton>
            </HorizontalDiv>
            {(showShoppingHistory
                ?
                <ShoppingListHistory shoppingLists={currentUser.shopping_history}
                                     handleChosenShoppingList={handleChosenShoppingList}/>
                : (showCheapestSupermarkets
                    ?
                    <SupermarketsCard supermarkets={supermarkets}/>
                    :
                    <ShoppingCartContent>
                        {Object.keys(shoppingList).map((productId) => {
                            const product = shoppingList[productId];
                            return (
                                <Item key={productId}>
                                    <CartProduct product={product} productId={productId} handleAdd={handleAdd}
                                                 handleSubtract={handleSubtract} handleRemove={handleRemove}/>
                                </Item>
                            );
                        })}
                    </ShoppingCartContent>))}
            <SubmitButton onClick={() => handleFindCheapestSupermarkets()}>מציאת הסופרים</SubmitButton>
        </ShoppingCartContainer>
    );
};
