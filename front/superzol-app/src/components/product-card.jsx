export const ProductCard = ({product}) => {
    const {image, title, price, description} = product;

    return (
        <div>
            <img src={image} alt={"test"}/>
            <h3>{title}</h3>
            <p>{price}</p>
            <p>{description}</p>
        </div>
    )
};