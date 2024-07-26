import default_product_image from '../resources/default_product.png';
import {Image} from "react-bootstrap";
import '../css/product-card.css';

export const ProductCard = ({product}) => {
    const {ItemName, ItemPrice, MinPrice, MaxPrice} = product;
    return (
        <div className="product-card">
            <div className="product-card-header">
                <Image src={default_product_image} alt={ItemName} className="product-image"/>
            </div>
            <div className="product-card-body">
                <h3 className="product-title">{ItemName}</h3>
                <p className="product-price">
                    {MinPrice !== MaxPrice
                        ? `${MinPrice} - ${MaxPrice} ₪`
                        : `${ItemPrice} ₪`}
                </p>
            </div>
        </div>
    );
};