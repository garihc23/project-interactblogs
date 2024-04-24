// admin-panel/src/api/authorApi.js
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const addAuthorApi = async (authorData, token) => {
  try {
    const formData = new FormData();
    // const config = {
    //   headers: { 'Content-Type': 'application/json' },
    //   withCredentials: true
    //   } 

    // Append all fields to FormData
    Object.keys(authorData).forEach((key) => {
      formData.append(key, authorData[key]);
    });
    console.log("Author-FORMDTA--", formData);
    console.log("JWT-token", token);
    const response = await axios.post(`${BASE_URL}/authors`, formData, {
      headers: {
        'Content-Type': 'application/json', 
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true
    });

    return response.data;
  } catch (error) {
    console.error('Error adding author:', error);
    throw error;
  }
};

export const updateAuthorApi = async (authorId, updatedAuthorData, token) => {
  try {
    const response = await axios.patch(`${BASE_URL}/authors/${authorId}`, updatedAuthorData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json' 
      },
      withCredentials: true
    });

    return response.data;
  } catch (error) {
    console.error('Error updating author:', error);
    throw error;
  }
};

export const getAllAuthorsApi = async (searchQuery) => {
  try {
    // console.log("SearcQUERy API",searchQuery)
    const queryParams = searchQuery ? `?name=${encodeURIComponent(searchQuery)}` : '';
    const response = await axios.get(`${BASE_URL}/authors${queryParams}`);
    return response.data;
  } catch (error) {
    console.error('Error getting authors:', error.response?.data || error.message);
    throw error;
  }
};

export const deleteAuthorApi = async (authorId, token) => {
  try {
    const response = await axios.delete(`${BASE_URL}/authors/${authorId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json' 
      },
      withCredentials: true
    });

    return response.data;
  } catch (error) {
    console.error('Error deleting author:', error);
    throw error;
  }
};

// Add more author-related API calls as needed
