import {Button} from "@mui/material";

export const ProductCard = ({product}) => {
    const {ItemName, ItemPrice} = product;

    return (
        <div>
            <h3>{ItemName}</h3>
            <p>{ItemPrice} ₪</p>
            <Button>add to cart</Button>
        </div>
    )
};