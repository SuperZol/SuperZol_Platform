import React from 'react';
import {
    HorizontalDiv,
    SelectButton,
    ShoppingListHistoryContainer,
    ShoppingListItem
} from "./shopping-list-history.styled";
import {round} from "lodash";

export const ShoppingListHistory = ({shoppingLists, handleChosenShoppingList}) => {
    return (
        <ShoppingListHistoryContainer>
            {shoppingLists.map((list, index) => {
                const {CreatedAt, Products, CartMinPrice, CartMaxPrice} = list;
                return (
                    <ShoppingListItem key={index}>
                        <p style={{margin: "5px"}}>תאריך: {new Date(CreatedAt).toLocaleDateString()}</p>
                        <p style={{margin: "5px"}}>מספר המוצרים
                            בסל: {Object.values(Products).reduce((acc, quantity) => acc + quantity, 0)}
                        </p>
                        <p style={{margin: "5px"}}>{CartMaxPrice === CartMinPrice ? `₪${round(CartMinPrice, 2)}` : `₪ ${round(CartMinPrice, 2)}-${round(CartMaxPrice, 2)}`}</p>
                        <HorizontalDiv>
                            <SelectButton
                                onClick={() => handleChosenShoppingList(Products)}
                            >
                                בחירה
                            </SelectButton>
                        </HorizontalDiv>
                    </ShoppingListItem>
                );
            })}
        </ShoppingListHistoryContainer>
    );
};