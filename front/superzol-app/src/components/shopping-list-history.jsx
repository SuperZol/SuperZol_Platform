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
            {shoppingLists.map((list, index) => (
                <ShoppingListItem key={index}>
                    <h4>רשימה מס' {index + 1}</h4>
                    <p>מספר המוצרים: {Object.keys(list).length}</p>
                    <HorizontalDiv>
                        <RemoveButton>
                            <img src={deleteIcon} alt={"delete"}/>
                        </RemoveButton>
                        <SelectButton
                            onClick={() => handleChosenShoppingList(shoppingLists[index])}>בחירה
                        </SelectButton>
                    </HorizontalDiv>

                </ShoppingListItem>
            ))}
        </ShoppingListHistoryContainer>
    );
};