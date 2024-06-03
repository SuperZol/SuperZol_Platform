import {createContext, useContext, useMemo, useState} from "react";
import _ from "lodash";
import {getProducts, getProductsByName} from '../api'

const ProductContext = createContext(undefined);
export const useProduct = () => useContext(ProductContext);

export const ProductProvider = ({children}) => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState("");

    const getAllProducts = async () => {
        setProducts(await getProducts())
    }

    const searchProducts = async (product) => {
        if (!_.isNil(product) && !_.isEmpty(product)) {
            setProducts(await getProductsByName(product))
        } else {
            setProducts(await getProducts());
        }
    };

    const value = useMemo(() => ({
        error,
        setError,
        products,
        searchProducts,
        getAllProducts
    }), [error, products]);

    return (
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    );
}
