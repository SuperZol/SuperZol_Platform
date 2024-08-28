import React from 'react';
import {
    HorizontalDiv,
    SelectButton,
    ShoppingListHistoryContainer,
    ShoppingListItem
} from "./shopping-list-history.styled";

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
                        <p style={{margin: "5px"}}>₪ {CartMinPrice}-{CartMaxPrice}</p>
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