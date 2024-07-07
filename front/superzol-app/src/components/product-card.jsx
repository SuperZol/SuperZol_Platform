import default_product_image from '../resources/default_product.png';
import {Image} from "react-bootstrap";

export const ProductCard = ({product}) => {
    const {ItemName, ItemPrice, MinPrice, MaxPrice} = product;
    return (
        <div>
            <Image
                src={default_product_image} //TODO: if the image exists set image else set default image
                style={{width: '25%', height: '25%', objectFit: 'contain'}}
                alt={ItemName}
            />
            <h3>{ItemName}</h3>
            <p>
                {MinPrice !== MaxPrice
                    ? `${MinPrice} - ${MaxPrice} ₪`
                    : `${ItemPrice} ₪`}
            </p>
        </div>
    )
};