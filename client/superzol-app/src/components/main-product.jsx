import default_product_image from '../resources/default_product.png';
import {
    ProductHeader,
    MainProductDiv,
    ProductImage,
    MainProductBody,
    ProductTitle,
    ProductPrice, ProductPriceContainer
} from "./main-product.styled.jsx";
import {useState} from "react";

export const MainProduct = ({product}) => {
    const {ItemCode, ItemName, ItemPrice, MinPrice, MaxPrice} = product;
    const [imageSrc, setImageSrc] = useState(`https://m.pricez.co.il/ProductPictures/${ItemCode}.jpg`);

    const handleError = () => {
        setImageSrc(default_product_image);
    };
    return (
        <MainProductDiv>
            <ProductHeader>
                <ProductImage src={imageSrc} alt={ItemName} onError={handleError}/>
            </ProductHeader>
            <MainProductBody>
                <ProductTitle>{ItemName}</ProductTitle>
                <ProductPriceContainer>
                    <ProductPrice>
                        {MinPrice !== MaxPrice
                            ? `₪ ${MinPrice} - ${MaxPrice}`
                            : `₪ ${ItemPrice}`}
                    </ProductPrice>
                </ProductPriceContainer>
            </MainProductBody>
        </MainProductDiv>
    );
};