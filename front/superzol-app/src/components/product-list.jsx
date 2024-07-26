import {ProductCard} from './product-card';
import {Button, Grid} from "@mui/material";
import _ from "lodash";
import '../css/product-card.css';
import {useEffect, useState} from "react";

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
        <div className="test-container">
            <Grid container spacing={2}>
                {!_.isNil(products) ? (
                    products.map((product) => (
                        <Grid item key={product.ItemCode} xs={12} sm={6} md={4} lg={2}>
                            <div className="product-with-quantity">
                                <ProductCard product={product}/>
                                <div className="product-card-footer">
                                    <button
                                        className="quantity-button"
                                        onClick={() => subtractQuantity(product.ItemCode)}
                                    >
                                        -
                                    </button>
                                    <span className="product-quantity">
                                        {quantities[product.ItemCode]}
                                    </span>
                                    <button
                                        className="quantity-button"
                                        onClick={() => addQuantity(product.ItemCode)}
                                    >
                                        +
                                    </button>
                                    <button
                                        className="add-button"
                                        onClick={() => addToCart(product, quantities[product.ItemCode])}
                                    >
                                        הוספה
                                    </button>
                                </div>
                            </div>
                        </Grid>
                    ))
                ) : (
                    <></>
                )}
            </Grid>
        </div>
    );
};
