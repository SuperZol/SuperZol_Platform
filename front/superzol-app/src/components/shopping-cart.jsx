import React, {useEffect, useState} from 'react';
import '../css/shopping-cart.css';
import {Button} from "@mui/material";
import {ProductCard} from "./product-card";
import {useUser} from "../contexts/user-context";
import {ShoppingListHistory} from "./shopping-list-history";
import {useProduct} from "../contexts/product-context";
import {SupermarketsCard} from "./supermarkets-card";

export const ShoppingCart = ({shoppingList, setShoppingList, removeFromCart, setSidebarOpen}) => {

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
        <div className="shopping-cart">
            <Button onClick={() => setSidebarOpen(false)}>x</Button>
            <h2>עגלת הקניות</h2>
            <>
                <Button onClick={() => setShowShoppingHistory(!showShoppingHistory)}>Load</Button>
                <Button onClick={() => setShoppingList({})}>Delete</Button>
                <Button onClick={() => saveShoppingListToHistory(shoppingList)}>Save</Button>
            </>
            {(showShoppingHistory
                ?
                <ShoppingListHistory shoppingLists={currentUser.shopping_history}
                                     handleChosenShoppingList={handleChosenShoppingList}/>
                : (showCheapestSupermarkets
                    ?
                    <SupermarketsCard supermarkets={supermarkets}/>
                    :
                    <div className="shopping-cart-content">
                        {Object.keys(shoppingList).map((productId) => {
                            const product = shoppingList[productId];
                            return (
                                <div className="item" key={productId}>
                                    <ProductCard product={product}/>
                                    <p>כמות: {product.quantity}</p>
                                    <Button onClick={() => handleAdd(productId)}>add</Button>
                                    <Button onClick={() => handleSubtract(productId)}>subtract</Button>
                                    <Button onClick={() => handleRemove(productId)}>remove</Button>
                                </div>
                            );
                        })}
                    </div>))}
            <Button onClick={() => handleFindCheapestSupermarkets()}>מציאת הסופרים</Button>
        </div>
    );
};
