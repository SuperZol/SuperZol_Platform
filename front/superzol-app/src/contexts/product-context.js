import {createContext, useCallback, useContext, useEffect, useMemo, useRef, useState} from "react";
import _ from "lodash";
import {
    getCheapestSupermarkets,
    getProductById,
    getProducts,
    getProductsByCategory,
    getProductsByName,
    getProductsByNameAndCategory,
    getProductsImages
} from '../api'

const ProductContext = createContext(undefined);
export const useProduct = () => useContext(ProductContext);

export const ProductProvider = ({children}) => {
    const [products, setProducts] = useState([]);
    const [productsImages, setProductsImages] = useState([]);
    const [error, setError] = useState("");


    const imagesFetched = useRef(false);

    useEffect(() => {
        const fetchProductsImages = async () => {
            console.log(imagesFetched);
            if (!imagesFetched.current) {
                await getProductImage();
                imagesFetched.current = true;
            }
        }
        console.log(imagesFetched);
        fetchProductsImages();
    });

    const getAllProducts = useCallback(async (page, pageSize) => {
        setProducts(await getProducts(page, pageSize));
    }, []);

    const getProductsById = async (shoppingList) => {
        let products = {};
        for (const productId in shoppingList) {
            let product = await getProductById(productId);
            products[productId] = {...product, quantity: 1};
        }
        return products;
    };

    const searchProductsByName = useCallback(async (product, page, pageSize) => {
        if (!_.isNil(product) && !_.isEmpty(product)) {
            setProducts(await getProductsByName(product, page, pageSize));
        }
    }, []);
    const searchProductsByCategory = useCallback(async (category, page, pageSize) => {
        if (!_.isNil(category) && !_.isEmpty(category)) {
            setProducts(await getProductsByCategory(category, page, pageSize));
        }
    }, []);

    const findCheapestSupermarkets = async (products, lat, lng, distance_preference) => {
        return await getCheapestSupermarkets(products, lat, lng, distance_preference);
    };

    const searchProductsByNameAndCategory = useCallback(async (name, category, page, pageSize) => {
        if (!_.isNil(name) && !_.isEmpty(name) && !_.isNil(category) && !_.isEmpty(category)) {
            setProducts(await getProductsByNameAndCategory(name, category, page, pageSize));
        }
    }, []);

    const getProductImage = useCallback(async () => {
        setProductsImages(await getProductsImages());
    }, []);

    const value = useMemo(() => ({
        error,
        setError,
        products,
        searchProductsByName,
        getAllProducts,
        getProductsById,
        findCheapestSupermarkets,
        searchProductsByCategory,
        searchProductsByNameAndCategory,
        productsImages
    }), [error, products, getAllProducts, productsImages, searchProductsByCategory, searchProductsByName, searchProductsByNameAndCategory]);

    return (
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    );
}
