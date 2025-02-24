import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';

const useTokenStore = create((set) => ({
	accessToken: null,
	refreshToken: null,
	isLoading: true,

	// Load tokens from SecureStore on initialization
	initializeTokens: async () => {
		try {
			const accessToken = await SecureStore.getItemAsync('accessToken');
			const refreshToken = await SecureStore.getItemAsync('refreshToken');
			set({
				accessToken: accessToken || null,
				refreshToken: refreshToken || null,
				isLoading: false,
			});
		} catch (error) {
			console.error('Error initializing tokens:', error);
			set({ isLoading: false });
		}
	},

	setAccessToken: async (token) => {
		try {
			await SecureStore.setItemAsync('accessToken', token);
			set({ accessToken: token });
		} catch (error) {
			console.error('Failed to set accessToken:', error);
		}
	},

	setRefreshToken: async (token) => {
		try {
			await SecureStore.setItemAsync('refreshToken', token);
			set({ refreshToken: token });
		} catch (error) {
			console.error('Failed to set refreshToken:', error);
		}
	},

	clearTokens: async () => {
		try {
			await SecureStore.deleteItemAsync('accessToken');
			await SecureStore.deleteItemAsync('refreshToken');
			set({ accessToken: null, refreshToken: null });
		} catch (error) {
			console.error('Failed to clear tokens:', error);
		}
	},
}));

export default useTokenStore;
