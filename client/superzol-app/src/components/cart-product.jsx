import {
    ButtonsDiv,
    CartProductBody,
    CartProductDiv, CartProductFooter,
    CartProductImage, CartProductPrice, CartProductQuantity,
    CartProductTitle, RemoveButton
} from "./cart-product.styled";
import React, {useState} from "react";
import {QuantityButton} from "./main-product.styled";
import default_product_image from "../resources/default_product.png";

export const CartProduct = ({product, productId, handleAdd, handleSubtract, handleRemove}) => {
    const {ItemCode, ItemName, ItemPrice, MinPrice, MaxPrice} = product;
    const [imageSrc, setImageSrc] = useState(`https://m.pricez.co.il/ProductPictures/${ItemCode}.jpg`);

    const handleError = () => {
        setImageSrc(default_product_image);
    };

    return (
        <CartProductDiv>
            <RemoveButton onClick={() => handleRemove(productId)}>×</RemoveButton>
            <CartProductBody>
                <CartProductTitle>{ItemName}</CartProductTitle>
                <CartProductImage src={imageSrc} alt={ItemName} onError={handleError}/>
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