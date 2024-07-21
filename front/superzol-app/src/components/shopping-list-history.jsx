import React from 'react';
import {Button} from "@mui/material";

export const ShoppingListHistory = ({shoppingLists, handleChosenShoppingList}) => {
    return (
        <div>
            <h3>Total Shopping Lists: {shoppingLists.length}</h3>
            {shoppingLists.map((list, index) => (
                <div key={index}>
                    <h4>Shopping List {index + 1}</h4>
                    <p>Number of products: {Object.keys(list).length}</p>
                    <Button onClick={()=>handleChosenShoppingList(shoppingLists[index])}>בחירה</Button>
                </div>
            ))}
        </div>
    );
};