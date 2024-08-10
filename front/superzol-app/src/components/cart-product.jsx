import default_product_image from '../resources/default_product.png';
import {
    ButtonsDiv,
    CartProductBody,
    CartProductDiv, CartProductFooter,
    CartProductImage, CartProductPrice, CartProductQuantity,
    CartProductTitle, CartQuantityButton, RemoveButton
} from "./cart-product.styled";
import React from "react";
import deleteIcon from "../resources/delete.png";

export const CartProduct = ({product, productId, handleAdd, handleSubtract, handleRemove}) => {
    const {ItemName, ItemPrice, MinPrice, MaxPrice} = product;
    return (
        <CartProductDiv>
            <CartProductBody>

                <CartProductTitle>{ItemName}</CartProductTitle>
                <CartProductImage src={default_product_image} alt={ItemName}/>
            </CartProductBody>
            <CartProductFooter>
                <ButtonsDiv>
                    <CartQuantityButton onClick={() => handleAdd(productId)}>+</CartQuantityButton>
                    <CartProductQuantity>{product.quantity}</CartProductQuantity>
                    <CartQuantityButton onClick={() => handleSubtract(productId)}>-</CartQuantityButton>
                    <RemoveButton onClick={() => handleRemove(productId)}>
                        <img src={deleteIcon} alt={"delete"}/>
                    </RemoveButton>
                </ButtonsDiv>
                <CartProductPrice>
                    {MinPrice !== MaxPrice
                        ? `${MinPrice} - ${MaxPrice} ₪`
                        : `${ItemPrice} ₪`}
                </CartProductPrice>
            </CartProductFooter>
        </CartProductDiv>
    );
};