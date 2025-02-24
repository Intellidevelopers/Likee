// userProfileStore.js
import { create } from 'zustand';

const userProfileStore = create((set) => ({
	userData: {},
	setUserData: (profile) => set({ userData: profile }),
}));

export default userProfileStore;
