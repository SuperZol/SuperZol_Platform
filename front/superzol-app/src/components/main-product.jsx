import default_product_image from '../resources/default_product.png';
import {
    ProductHeader,
    MainProductDiv,
    ProductImage,
    MainProductBody,
    ProductTitle,
    ProductPrice, ProductPriceContainer
} from "./main-product.styled.jsx";
import _ from "lodash";

export const MainProduct = ({product, productImage}) => {
    const {ItemCode, ItemName, ItemPrice, MinPrice, MaxPrice} = product;
    const isImageValid = () => {
        return _.isEmpty(productImage) || (!productImage.endsWith("jpg") && !productImage.endsWith("png")) || productImage.includes("not-available");
    }
    return (
        <MainProductDiv>
            <ProductHeader>
                <ProductImage src={`https://m.pricez.co.il/ProductPictures/${ItemCode}.jpg`} alt={ItemName}/>
            </ProductHeader>
            <MainProductBody>
                <ProductTitle>{ItemName}</ProductTitle>
                <ProductPriceContainer>
                    <ProductPrice>
                        {MinPrice !== MaxPrice
                            ? `${MinPrice} - ${MaxPrice} ₪`
                            : `${ItemPrice} ₪`}
                    </ProductPrice>
                </ProductPriceContainer>
            </MainProductBody>
        </MainProductDiv>
    );
};