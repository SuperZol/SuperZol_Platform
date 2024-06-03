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
        const url = `${BASE_URL}/users/login/${email}/${password}`;
        const user = await axios.get(url);
        return user.data;  // Set the entire response.data object as the currentUser
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
    const products = await axios.get(`${BASE_URL}/product/${productName}`)
        .catch((err) => console.log(`Error: ${err}`));
    return products.data;
};
