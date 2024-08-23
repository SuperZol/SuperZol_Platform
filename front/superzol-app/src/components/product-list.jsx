import {MainProduct} from './main-product';
import _ from "lodash";
import {useEffect, useState} from "react";
import {
    AddButton,
    GridContainer,
    GridItem,
    MainProductFooter,
    ProductListContainer,
    ProductQuantity,
    ProductWithQuantity,
    QuantityButton
} from "./main-product.styled.jsx";

export const ProductList = ({products, addToCart, productsImages}) => {
    const [quantities, setQuantities] = useState({});

    useEffect(() => {
        if (products) {
            const initialQuantities = products.reduce((acc, product) => {
                acc[product.ItemCode] = 1; // Default quantity of 1 for each product
                return acc;
            }, {});
            setQuantities(initialQuantities);
        }
    }, [products]);

    const addQuantity = (itemCode) => {
        setQuantities({
            ...quantities,
            [itemCode]: (quantities[itemCode] || 0) + 1,
        });
    };

    const subtractQuantity = (itemCode) => {
        setQuantities({
            ...quantities,
            [itemCode]: Math.max((quantities[itemCode] || 0) - 1, 1),
        });
    };

    const getImageUrlByItemCode = (itemCode) => {
        console.log(productsImages, itemCode)
        const productImage = productsImages.find(product => product.ItemCode === itemCode);
        return productImage ? productImage.image_url : "";
    };

    return (
        <ProductListContainer>
            <GridContainer>
                {!_.isNil(products) ? (
                    products.map((product) => (
                        <GridItem key={product.ItemCode}>
                            <ProductWithQuantity>
                                <MainProduct product={product} productImage={getImageUrlByItemCode(product.ItemCode)}/>
                                <MainProductFooter>
                                    <QuantityButton
                                        onClick={() => subtractQuantity(product.ItemCode)}
                                    >
                                        -
                                    </QuantityButton>
                                    <ProductQuantity>
                                        {quantities[product.ItemCode]}
                                    </ProductQuantity>
                                    <QuantityButton
                                        onClick={() => addQuantity(product.ItemCode)}
                                    >
                                        +
                                    </QuantityButton>
                                    <AddButton
                                        onClick={() => addToCart(product, quantities[product.ItemCode])}
                                    >
                                        הוספה
                                    </AddButton>
                                </MainProductFooter>
                            </ProductWithQuantity>
                        </GridItem>
                    ))
                ) : (
                    <></>
                )}
            </GridContainer>
        </ProductListContainer>
    );
};
