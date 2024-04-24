// client/src/api/newsletterApi.js
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

export const subscribeToNewsletter = async (email) => {
  try {
    const response = await axios.post(`${BASE_URL}/newsletter/subscribe`, { email });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      // Check if the error message indicates that the email is already subscribed
      const errorMessage = error.response.data.error;
      if (errorMessage === 'Email already subscribed to newsletter') {
        throw new Error(errorMessage);
      } else {
        throw new Error(errorMessage);
      }
    }
    throw error;
  }
};