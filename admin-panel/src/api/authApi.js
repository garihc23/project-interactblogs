// admin-panel/src/api/authApi.js
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;
console.log("BASE__URL", process.env.REACT_APP_API_BASE_URL);
export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${BASE_URL}/auth/register`, userData);
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};

export const loginUser = async (credentials) => {
    try {
        // const config = {
        //     headers: { 'Content-Type': 'application/json' },
        //     withCredentials: true
        //     } 
        const response = await axios.post(`${BASE_URL}/auth/login`, credentials, { headers: { 'Content-Type': 'application/json' }, withCredentials: true });
        // console.log("LOGIN RES",response.data);
        return response.data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};

export const logoutUser = async () => {
    try {
        await axios.post(`${BASE_URL}/auth/logout`);
    } catch (error) {
        console.error('Error logging out:', error);
        throw error;
    }
};

// Add more authentication-related API calls as needed
