// client/src/stores/blogStore.js
import { create } from 'zustand';
import {
    getAllBlogPosts,
    getTrendingPosts,
    getLatestPosts,
    getBlogPostById
} from '../api/blogApi';

const useBlogStore = create((set) => ({
    blogPosts: [],
    trendingPosts: [],
    latestPosts: [],
    blogPostById:'',
    fetchBlogPosts: async () => {
        try {
            const posts = await getAllBlogPosts();
            console.log("STORE_POSTS", posts)
            set({ blogPosts: posts });
        } catch (error) {
            console.error('Error fetching blog posts:', error);
        }
    },
    fetchTrendingPosts: async () => {
        try {
            const posts = await getTrendingPosts();
            set({ trendingPosts: posts });
        } catch (error) {
            console.error('Error fetching trending posts:', error);
        }
    },
    fetchLatestPosts: async () => {
        try {
            let posts = await getLatestPosts();
            set({ latestPosts: posts });
        } catch (error) {
            console.error('Error fetching latest posts:', error);
        }
    },
    fetchBlogPostById: async (postId) => {
        try {
            const post = await getBlogPostById(postId);
            set({blogPostById: post})
        } catch (error) {
            console.error('Error fetching blog post by ID:', error);
        }
    },
}));

export default useBlogStore;
