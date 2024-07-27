import {ProductCard} from './product-card';
import {Grid} from "@mui/material";
import _ from "lodash";
import {useEffect, useState} from "react";
import {
    AddButton,
    ProductCardFooter,
    ProductListContainer,
    ProductQuantity,
    ProductWithQuantity,
    QuantityButton
} from "./product-card.styled.jsx";

export const ProductList = ({products, addToCart}) => {
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

    return (
        <ProductListContainer>
            <Grid container spacing={2}>
                {!_.isNil(products) ? (
                    products.map((product) => (
                        <Grid item key={product.ItemCode} xs={12} sm={6} md={4} lg={2}>
                            <ProductWithQuantity>
                                <ProductCard product={product}/>
                                <ProductCardFooter>
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
                                </ProductCardFooter>
                            </ProductWithQuantity>
                        </Grid>
                    ))
                ) : (
                    <></>
                )}
            </Grid>
        </ProductListContainer>
    );
};
