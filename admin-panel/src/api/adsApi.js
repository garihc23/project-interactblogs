// src/api/adsApi.js
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const createAdvertisement = async (adData, token) => {
  try {
    const formData = new FormData();

    // Append all fields to FormData
    Object.keys(adData).forEach((key) => {
      formData.append(key, adData[key]);
    });
    // console.log("ad-FORMDTA--", formData);

    const response = await axios.post(`${BASE_URL}/ads`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data', // Important for file uploads
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error creating advertisement:', error);
    throw error;
  }
};

export const getAllAdvertisements = async (searchQuery) => {
  try {
    // Add a query parameter for the search query
    const response = await axios.get(`${BASE_URL}/ads`, {
      params: {
        title: searchQuery // Assuming your API supports searching by title
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error getting all advertisements:', error);
    throw error;
  }
};

export const getAdvertisementById = async (adId) => {
  try {
    const response = await axios.get(`${BASE_URL}/ads/${adId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching advertisement by ID:', error);
    throw error;
  }
};

export const updateAdvertisement = async (adId, adData, token) => {
  try {
    // console.log("ADUPD",adId, adData, token);
    const response = await axios.patch(`${BASE_URL}/ads/${adId}`, adData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating advertisement:', error);
    throw error;
  }
};

export const archiveAdvertisement = async (adId, token) => {
  try {
    const response = await axios.put(`${BASE_URL}/ads/${adId}/archive`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error archiving advertisement:', error);
    throw error;
  }
};

export const deleteAdvertisement = async (adId, token) => {
  try {
    const response = await axios.delete(`${BASE_URL}/ads/${adId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting advertisement:', error);
    throw error;
  }
};

export const incrementViews = async (adId) => {
  try {
    await axios.get(`${BASE_URL}/ads/${adId}/views`);
  } catch (error) {
    console.error('Error incrementing views:', error);
    throw error;
  }
};

export const incrementClicks = async (adId) => {
  try {
    await axios.get(`${BASE_URL}/ads/${adId}/clicks`);
  } catch (error) {
    console.error('Error incrementing clicks:', error);
    throw error;
  }
};

// Add more advertisement-related API calls as needed
