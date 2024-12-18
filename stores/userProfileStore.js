// userProfileStore.js
import {create} from 'zustand';

const userProfileStore = create((set) => ({
  userProfile: {
    id: null,
    name: '',
    age: null,
    bio: '',
    distance: '',
    imageUrl: null, // add imgPath for profile image
  },
  setUserProfile: (profile) => set({ userProfile: profile }),
}));

export default userProfileStore;
