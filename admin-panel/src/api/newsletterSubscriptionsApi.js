// src/api/newsletterSubscriptionsApi.js
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const subscribeToNewsletter = async (email) => {
    try {
        const response = await axios.post(`${BASE_URL}/newsletter/subscribe`, { email });
        return response.data;
    } catch (error) {
        console.error('Error subscribing to newsletter:', error);
        throw error;
    }
};

export const getAllSubscriptions = async (token) => {
    try {
        const response = await axios.get(`${BASE_URL}/newsletter/subscriptions`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error getting all subscriptions:', error);
        throw error;
    }
};
// src/api/newsletterSubscriptionsApi.js
export const blockSubscription = async (subscribeId, token) => {
    try {
        const response = await axios.patch(`${BASE_URL}/newsletter/subscriptions/block/${subscribeId}`, null, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error blocking subscription:', error);
        throw error;
    }
};

export const deleteSubscription = async (subscribeId, token) => {
    try {
        const response = await axios.delete(`${BASE_URL}/newsletter/subscriptions/${subscribeId}`,{
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting subscription:', error);
        throw error;
    }
};

// Add more newsletter subscription-related API calls as needed
