// client/src/stores/newsletterStore.js
import { create } from 'zustand';
import { subscribeToNewsletter } from '../api/newsletterApi';

const useNewsletterStore = create((set) => ({
  subscribed: false,
  subscribeToNewsletter: async (email) => {
    try {
      const data = await subscribeToNewsletter(email);
      set({ subscribed: true });
      return data; // Optionally, you can return additional data from the API response
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      throw error;
    }
  },
}));

export default useNewsletterStore;
