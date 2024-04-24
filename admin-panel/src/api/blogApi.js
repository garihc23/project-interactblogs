// admin-panel/src/api/blogApi.js
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const createBlogPost = async (blogData, token) => {
  try {
    const formData = new FormData();

    // Append all fields to FormData
    Object.keys(blogData).forEach((key) => {
      formData.append(key, blogData[key]);
    });
    console.log("FORMDTA--", formData);
    const response = await axios.post(`${BASE_URL}/posts`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error creating blog post:', error);
    throw error;
  }
};

export const getAllBlogPosts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/posts/`);
    console.log("BLOG---:", response.data)
    return response.data;
  } catch (error) {
    console.error('Error getting all blog posts:', error);
    throw error;
  }
};

export const getBlogPostById = async (postId) => {
  console.log("BLOGAPIPOSTID",postId);
  try {
    // const response = await fetch(`${BASE_URL}/posts/${postId}`);
    const response = await fetch(`${BASE_URL}/posts/${postId}`, {
      credentials: 'include', // Include cookies and other credentials
      mode: 'cors', // Enable CORS
    });

    console.log("BLOGAPIPOSTIDRESPONSE",response);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error fetching blog post by ID:', error);
    throw error;
  }
};

export const updateBlogPost = async (postId, blogData, token) => {
  try {
    const formData = new FormData();

    // Append all fields to FormData
    Object.keys(blogData).forEach((key) => {
      formData.append(key, blogData[key]);
    });
    console.log("FORMDTA--", formData);
    const response = await axios.patch(`${BASE_URL}/posts/${postId}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("DATA CHECKKK---",response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating blog post:', error);
    throw error;
  }
};
export const deleteBlogPost = async (postId, token) => {
  try {
    console.log("TRYING TO DELETE",postId,token);
    const response = await axios.delete(`${BASE_URL}/posts/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error deleting blog post:', error);
    throw error;
  }
};


// // Add more blog-related API calls as needed
