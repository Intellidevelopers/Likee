import { create } from 'zustand';

const useNotificationStore = create((set) => ({
  pushToken: null,
  notification: null,
  loading: false,   // Loading state to track async operations
  error: null,      // Error state to track any issues

  // Set the push token and handle loading/error states
  setPushToken: (token) => set({ pushToken: token, error: null }),

  // Set the notification object
  setNotification: (notification) => set({ notification }),

  // Clear the notification state
  clearNotification: () => set({ notification: null }),

  // Handle loading state for async operations
  setLoading: (loading) => set({ loading }),

  // Set an error if something goes wrong
  setError: (error) => set({ error }),
}));

export default useNotificationStore;
