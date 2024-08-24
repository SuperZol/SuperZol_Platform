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
import _ from "lodash";

export const CartProduct = ({product, productId, productImage, handleAdd, handleSubtract, handleRemove}) => {
    const {ItemCode, ItemName, ItemPrice, MinPrice, MaxPrice} = product;

    const isImageValid = () => {
        return _.isEmpty(productImage) || (!productImage.endsWith("jpg") && !productImage.endsWith("png")) || productImage.includes("not-available");
    }
    return (
        <CartProductDiv>
            <CartProductBody>
                <CartProductTitle>{ItemName}</CartProductTitle>
                <CartProductImage src={`https://m.pricez.co.il/ProductPictures/${ItemCode}.jpg`} alt={ItemName}/>
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