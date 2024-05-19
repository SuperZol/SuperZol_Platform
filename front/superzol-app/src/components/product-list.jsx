import {ProductCard} from './product-card';

export const ProductList = ({products}) => {
    console.log(products)
    return (
        <div className="product-list">
            {products.map((product) => (
                <ProductCard key={product.id} product={product}/>
            ))}
        </div>
    );
};