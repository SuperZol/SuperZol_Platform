import default_product_image from '../resources/default_product.png';
import {
    ProductHeader,
    MainProductDiv,
    ProductImage,
    MainProductBody,
    ProductTitle,
    ProductPrice
} from "./main-product.styled.jsx";

export const MainProduct = ({product}) => {
    const {ItemName, ItemPrice, MinPrice, MaxPrice} = product;
    return (
        <MainProductDiv>
            <ProductHeader>
                <ProductImage src={default_product_image} alt={ItemName}/>
            </ProductHeader>
            <MainProductBody>
                <ProductTitle>{ItemName}</ProductTitle>
                <ProductPrice>
                    {MinPrice !== MaxPrice
                        ? `${MinPrice} - ${MaxPrice} ₪`
                        : `${ItemPrice} ₪`}
                </ProductPrice>
            </MainProductBody>
        </MainProductDiv>
    );
};