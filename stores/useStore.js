// useStore.js
import { create } from 'zustand';

const useStore = create((set) => ({
  userProfile: null,
  setUserProfile: (profile) => set({ userProfile: profile }),
}));

export default useStore; // This should correctly export useStore
