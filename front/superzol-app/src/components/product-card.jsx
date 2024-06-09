import {Button} from "@mui/material";

export const ProductCard = ({product}) => {
    const {ItemName, ItemPrice, MinPrice, MaxPrice} = product;

    return (
        <div>
            <h3>{ItemName}</h3>
            <p>
                {MinPrice !== MaxPrice
                    ? `${MinPrice} - ${MaxPrice} ₪`
                    : `${ItemPrice} ₪`}
            </p>
            <Button>add to cart</Button>
        </div>
    )
};