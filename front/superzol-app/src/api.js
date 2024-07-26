import axios from "axios";

const BASE_URL = 'http://localhost:8000';


export const createUser = async (email, password) => {
    try {
        const response = await axios.post(`${BASE_URL}/users/`, {
            email: email,
            password: password
        });
        return response.data;
    } catch (error) {
        console.log("Error in createUser:", error);
        throw error;
    }
};

export const getUser = async (email, password) => {
    try {
        const response = await axios.get(`${BASE_URL}/users/login/${email}/${password}`);
        return response.data;
    } catch (error) {
        throw error
    }
};

export const getProducts = async () => {
    const products = await axios.get(`${BASE_URL}/product/products`)
        .catch((err) => console.log(`Error: ${err}`));
    return products.data
}

export const getProductsByName = async (productName) => {
    const products = await axios.get(`${BASE_URL}/product/name/${productName}`)
        .catch((err) => console.log(`Error: ${err}`));
    return products.data;
};

export const updateUser = async (email, data) => {
    try {
        return await axios.put(`${BASE_URL}/users/edit/${email}`, data);
    } catch (err) {
        console.log(`Error: ${err.response}`);
    }
};


export const getProductById = async (productId) => {
    const products = await axios.get(`${BASE_URL}/product/id/${productId}`)
        .catch((err) => console.log(`Error: ${err}`));
    return products.data[0];
};


export const saveShoppingList = async (email, shoppingList) => {
    try {
        await axios.put(`${BASE_URL}/users/history/${email}`, shoppingList);
        return true;
    } catch (err) {
        console.log(`Error: ${err}`);
        return false;
    }
};

export const getCheapestSupermarkets = async (products, lat, lng, distance_preference) => {
    console.log(products, lat, lng, distance_preference)
    try {
        const supermarkets = await axios.post(`${BASE_URL}/supermarket/cheapest_supermarkets`, {
            shopping_list: products,
            lat: lat,
            lng: lng,
            distance_preference: distance_preference
        });
        return supermarkets.data;
    } catch (err) {
        console.log(`Error: ${err}`);
        return null;
    }
}
