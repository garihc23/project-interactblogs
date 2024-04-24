// src/store.js
import create from 'zustand';

const blogStore = create((set) => ({
  // Define your state here
  blogs: [],
  searchTerm: '',

  // Define your actions (update state) here
  setBlogs: (newBlogs) => set({ blogs: newBlogs }),
  setSearchTerm: (newTerm) => set({ searchTerm: newTerm }),

  // Add more actions as needed
}));

export default blogStore;
