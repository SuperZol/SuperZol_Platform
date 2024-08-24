import {
    ButtonsDiv,
    CartProductBody,
    CartProductDiv, CartProductFooter,
    CartProductImage, CartProductPrice, CartProductQuantity,
    CartProductTitle, RemoveButton
} from "./cart-product.styled";
import React from "react";
import _ from "lodash";
import {QuantityButton} from "./main-product.styled";

export const CartProduct = ({product, productId, productImage, handleAdd, handleSubtract, handleRemove}) => {
    const {ItemCode, ItemName, ItemPrice, MinPrice, MaxPrice} = product;

    const isImageValid = () => {
        return _.isEmpty(productImage) || (!productImage.endsWith("jpg") && !productImage.endsWith("png")) || productImage.includes("not-available");
    }
    return (
        <CartProductDiv>
            <RemoveButton onClick={() => handleRemove(productId)}>×</RemoveButton>
            <CartProductBody>
                <CartProductTitle>{ItemName}</CartProductTitle>
                <CartProductImage src={`https://m.pricez.co.il/ProductPictures/${ItemCode}.jpg`} alt={ItemName}/>
            </CartProductBody>
            <CartProductFooter>
                <CartProductPrice>
                    {MinPrice !== MaxPrice
                        ? `₪ ${MinPrice} - ${MaxPrice}`
                        : `₪ ${ItemPrice}`}
                </CartProductPrice>
                <ButtonsDiv>
                    <QuantityButton onClick={() => handleAdd(productId)}>+</QuantityButton>
                    <CartProductQuantity>{product.quantity}</CartProductQuantity>
                    <QuantityButton onClick={() => handleSubtract(productId)}>-</QuantityButton>
                </ButtonsDiv>
            </CartProductFooter>
        </CartProductDiv>
    );
};