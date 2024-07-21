import {ProductCard} from './product-card';
import {Button, Grid} from "@mui/material";
import _ from "lodash";

export const ProductList = ({products, addToCart}) => {
    return (
        <div className="product-list">
            <Grid container spacing={2}>
                {!_.isNil(products) ? (products.map((product) => (
                    <Grid item key={product.ItemCode} xs={12} sm={6} md={4} lg={3}>
                        <ProductCard product={product}/>
                        <Button onClick={() => addToCart(product)}>add to cart</Button>
                    </Grid>)
                )) : (<></>)}
            </Grid>
        </div>
    );
};