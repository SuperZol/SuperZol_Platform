import default_product_image from '../resources/default_product.png';
import {
    ProductCardHeader,
    ProductCardDiv,
    ProductImage,
    ProductCardBody,
    ProductTitle,
    ProductPrice
} from "./product-card.styled.jsx";

export const ProductCard = ({product}) => {
    const {ItemName, ItemPrice, MinPrice, MaxPrice} = product;
    return (
        <ProductCardDiv>
            <ProductCardHeader>
                <ProductImage src={default_product_image} alt={ItemName}/>
            </ProductCardHeader>
            <ProductCardBody>
                <ProductTitle>{ItemName}</ProductTitle>
                <ProductPrice>
                    {MinPrice !== MaxPrice
                        ? `${MinPrice} - ${MaxPrice} ₪`
                        : `${ItemPrice} ₪`}
                </ProductPrice>
            </ProductCardBody>
        </ProductCardDiv>
    );
};