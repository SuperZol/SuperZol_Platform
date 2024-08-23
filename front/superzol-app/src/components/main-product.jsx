import default_product_image from '../resources/default_product.png';
import {
    ProductHeader,
    MainProductDiv,
    ProductImage,
    MainProductBody,
    ProductTitle,
    ProductPrice
} from "./main-product.styled.jsx";
import _ from "lodash";

export const MainProduct = ({product, productImage}) => {
    const {ItemName, ItemPrice, MinPrice, MaxPrice} = product;
    const isImageValid = () => {
        return _.isEmpty(productImage) || (!productImage.endsWith("jpg") && !productImage.endsWith("png")) || productImage.includes("not-available");
    }
    return (
        <MainProductDiv>
            <ProductHeader>
                <ProductImage src={isImageValid() ? default_product_image : productImage} alt={ItemName}/>
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