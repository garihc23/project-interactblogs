// client/src/api/blogApi.js
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';
const UPLOAD_URL = process.env.REACT_APP_UPLOAD_URL || `http://localhost:5000/uploads`;

export const getAllBlogPosts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/posts/`);
    // console.log("API BLOG---:", response.data)
    return response.data;
  } catch (error) {
    console.error('Error getting all blog posts:', error);
    throw error;
  }
};

export const getBlogPostById = async (postId) => {
  // console.log("BLOGAPIPOSTID", postId);
  try {
    const response = await fetch(`${BASE_URL}/posts/${postId}`);
    // console.log("BLOGAPIPOSTIDRESPONSE", response);
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

// export const  getPostsByAuthorId= async (authorId) => {
//   try {
//     const response = await fetch(`${BASE_URL}/posts/${authorId}`);
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     const result = await response.json();
//     return result;
//   } catch (error) {
//     console.error('Error fetching blog post by ID:', error);
//     throw error;
//   }
// };

export const getTrendingPosts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/trendingPosts`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error fetching Trending Blog Posts', error);
    throw error;
  }
};

export const getLatestPosts = async () => {
  try {
    console.log("LATEST_POSTS")
    const response = await fetch(`${BASE_URL}/latestPosts`);
    console.log("Latest BLOG---:", response)
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const result = await response.json();
    // result.reverse();
    return result;
  } catch (error) {
    console.error('Error fetching Latest Blog Posts', error);
    throw error;
  }
};
