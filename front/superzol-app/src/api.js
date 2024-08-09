import axios from "axios";

const BASE_URL = 'http://localhost:8000';


export const createUser = async (email, password) => {
    try {
        const response = await axios.post(`${BASE_URL}/users/`, {
            email: email, password: password
        });
        return response.data;
    } catch (error) {
        console.log("Error in createUser:", error);
        throw error;
    }
};

export const updateUser = async (email, data) => {
    try {
        const response = await axios.put(`${BASE_URL}/users/edit/${email}`, data);
        return response.status;
    } catch (error) {
        throw error
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

export const getProducts = async (page, pageSize) => {
    try {
        const products = await axios.get(`${BASE_URL}/product/products`, {
            params: {
                page, page_size: pageSize
            }
        })
        return products.data
    } catch (error) {
        throw error
    }
}

export const getProductsByName = async (productName, page, pageSize) => {
    try {
        const products = await axios.get(`${BASE_URL}/product/name/${productName}`, {
            params: {
                page: page, page_size: pageSize
            }
        })
        return products.data
    } catch (error) {
        throw error
    }
}

export const getProductsByCategory = async (category, page, pageSize) => {
    try {
        const products = await axios.get(`${BASE_URL}/product/category/${category}`, {
            params: {
                page: page, page_size: pageSize
            }
        })
        return products.data
    } catch (error) {
        throw error
    }
}

export const getProductsByNameAndCategory = async (name, category, page, pageSize) => {
    try {
        const products = await axios.get(`${BASE_URL}/product/nameAndCategory`, {
            params: {
                name: name,
                category: category,
                page: page,
                page_size: pageSize
            }
        })
        return products.data
    } catch (error) {
        throw error
    }
}

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
            shopping_list: products, lat: lat, lng: lng, distance_preference: distance_preference
        });
        return supermarkets.data;
    } catch (err) {
        console.log(`Error: ${err}`);
        return null;
    }
}

export const forgotPassword = async (email) => {
    try {
        return await axios.post(`${BASE_URL}/users/forgot-password/${email}`);
    } catch (err) {
        return err.response;
    }
}


export const resetPassword = async (token,newPassword) => {
    try {

        return await axios.post(`${BASE_URL}/users/reset-password`, null, {
            params: {
                token: token,
                new_password: newPassword
            }
        });
    } catch (err) {
        return err.response;
    }
}