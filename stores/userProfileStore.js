// userProfileStore.js
import { create } from 'zustand';

const userProfileStore = create((set) => ({
	userProfile: {},
	setUserProfile: (profile) => set({ userProfile: profile }),
}));

export default userProfileStore;
