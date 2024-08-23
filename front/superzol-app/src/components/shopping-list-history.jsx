import React from 'react';
import {
    HorizontalDiv,
    SelectButton,
    ShoppingListHistoryContainer,
    ShoppingListItem
} from "./shopping-list-history.styled";
import {RemoveButton} from "./cart-product.styled";
import deleteIcon from "../resources/delete.png";

export const ShoppingListHistory = ({shoppingLists, handleChosenShoppingList}) => {
    return (
        <ShoppingListHistoryContainer>
            {shoppingLists.map((list, index) => {
                const {CreatedAt, Products, CartMinPrice, CartMaxPrice} = list;

                return (
                    <ShoppingListItem key={index}>
                        <p>תאריך: {new Date(CreatedAt).toLocaleDateString()}</p>
                        <p>מספר
                            המוצרים: {Object.values(Products).reduce((acc, quantity) => acc + quantity, 0)}</p>
                        <p>{CartMinPrice}-{CartMaxPrice}₪ :סה"כ עלות</p>
                        <HorizontalDiv>
                            <RemoveButton>
                                <img src={deleteIcon} alt={"delsete"}/>
                            </RemoveButton>
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