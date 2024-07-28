import {createContext, useContext, useMemo, useState} from "react";
import _ from "lodash";
import {getCheapestSupermarkets, getProductById, getProducts, getProductsByCategory, getProductsByName} from '../api'

const ProductContext = createContext(undefined);
export const useProduct = () => useContext(ProductContext);

export const ProductProvider = ({children}) => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState("");

    const getAllProducts = async (page, pageSize) => {
        setProducts(await getProducts(page, pageSize))
        console.log(page,pageSize)
    }

    const getProductsById = async (shoppingList) => {
        console.log(shoppingList)
        let products = {};
        for (const productId in shoppingList) {
            let product = await getProductById(productId);
            products[productId] = {...product, quantity: 1};
        }
        return products;
    }

    const searchProductsByName = async (product, page, pageSize) => {
        if (!_.isNil(product) && !_.isEmpty(product)) {
            setProducts(await getProductsByName(product, page, pageSize))
        } else {
            setProducts(await getProducts());
        }
    };
    const searchProductsByCategory = async (category, page, pageSize) => {
        if (!_.isNil(category) && !_.isEmpty(category)) {
            setProducts(await getProductsByCategory(category, page, pageSize))
        } else {
            setProducts(await getProducts());
        }
    };

    const findCheapestSupermarkets = async (products, lat, lng, distance_preference) => {
        return await getCheapestSupermarkets(products, lat, lng, distance_preference)
    }


    const value = useMemo(() => ({
        error,
        setError,
        products,
        searchProductsByName,
        getAllProducts,
        getProductsById,
        findCheapestSupermarkets,
        searchProductsByCategory
    }), [error, products]);

    return (
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    );
}
