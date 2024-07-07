import axios from "axios";

const BASE_URL = 'http://localhost:8000';


export const createUser = async (email, password) => {
    await axios.post(`${BASE_URL}/users/`, {
        email: email,
        password: password
    }).catch((err) => console.log(`Error: ${err}`));
};

export const getUser = async (email, password) => {
    try {
        const user = await axios.get(`${BASE_URL}/users/login/${email}/${password}`);
        return user.data;
    } catch (err) {
        console.log(`Error: ${err}`);
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
