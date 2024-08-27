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

export const ProductList = ({products, addToCart}) => {
    const [quantities, setQuantities] = useState({});

    useEffect(() => {
        if (products) {
            const initialQuantities = products.reduce((acc, product) => {
                acc[product.ItemCode] = 1;
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

    return (
        <ProductListContainer isOpen="false">
            <GridContainer>
                {!_.isNil(products) && !_.isEmpty(products) ? (
                    products.map((product) => (
                        <GridItem key={product.ItemCode}>
                            <ProductWithQuantity>
                                <MainProduct product={product}/>
                                <MainProductFooter>
                                    <QuantityButton
                                        onClick={() => subtractQuantity(product.ItemCode)}>-</QuantityButton>
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
                    <h2>לא נמצאו מוצרים מתאימים</h2>
                )}
            </GridContainer>
        </ProductListContainer>
    );
};
