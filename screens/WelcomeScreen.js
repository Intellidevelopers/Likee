import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, View, ActivityIndicator } from 'react-native';
import colors from '../components/colors';
import * as SecureStore from 'expo-secure-store';
import useStore from '../stores/useStore';
import useTokenStore from '../stores/useTokenStore';
import axios from 'axios';
import { getErrorMessage } from '../utils/getErrorMessage';

const WelcomeScreen = ({ navigation }) => {
	const { setUserData } = useStore();
	const { setAccessToken, setRefreshToken } = useTokenStore();
	const [status, setStatus] = useState({
		isLoading: true,
		isFirstTime: false,
		isLoggedIn: false,
	});

	useEffect(() => {
		const initializeApp = async () => {
			try {
				const isFirstTime = await SecureStore.getItemAsync('isFirstTime');
				const accessToken = await SecureStore.getItemAsync('accessToken');
				const refreshToken = await SecureStore.getItemAsync('refreshToken');

				if (accessToken) {
					const userFetched = await handleUserSession(
						accessToken,
						refreshToken
					);

					console.log('access Token', accessToken);
					if (!userFetched) await setUserData({});
				} else {
					await setUserData({});
				}

				setStatus({
					isLoading: false,
					isFirstTime: !isFirstTime, // true if `isFirstTime` is null
					isLoggedIn: !!accessToken,
				});
			} catch (error) {
				console.error('Error initializing app:', error);
				setStatus({ isLoading: false, isFirstTime: false, isLoggedIn: false });
			}
		};

		initializeApp();
	}, []);

	const handleUserSession = async (accessToken, refreshToken) => {
		let success = await fetchUserProfile(accessToken);
		if (!success && refreshToken) {
			const newAccessToken = await refreshAccessToken(refreshToken);
			if (newAccessToken) {
				success = await fetchUserProfile(newAccessToken);
			}
		}
		return success;
	};

	const fetchUserProfile = async (accessToken) => {
		try {
			const { data } = await axios.get(
				`${process.env.EXPO_PUBLIC_API_URI}/users`,
				{
					headers: { Authorization: `Bearer ${accessToken}` },
				}
			);

			console.log('fetch user:', data);
			setUserData(data);
			await setAccessToken(accessToken);
			return true;
		} catch (error) {
			console.warn('Failed to fetch user profile:', getErrorMessage(error));
			return false;
		}
	};

	const refreshAccessToken = async (refreshToken) => {
		try {
			const { data } = await axios.post(
				`${process.env.EXPO_PUBLIC_API_URI}/auth/refresh`,
				{
					refreshToken,
				}
			);

			console.log('fetch refreshtoken:', data);
			const newAccessToken = data?.accessToken;
			const newRefreshToken = data?.refreshToken;
			if (newAccessToken) {
				await SecureStore.setItemAsync('accessToken', newAccessToken);
				await setAccessToken(newAccessToken);
				await setRefreshToken(newRefreshToken);
				return newAccessToken;
			}
			return null;
		} catch (error) {
			console.warn('Failed to refresh access token:', getErrorMessage(error));
			return null;
		}
	};

	useEffect(() => {
		if (!status.isLoading) {
			if (status.isLoggedIn) {
				navigation.replace('Main');
			} else if (status.isFirstTime) {
				navigation.replace('Onboarding');
			} else {
				navigation.replace('Login');
			}
		}
	}, [status, navigation]);

	if (status.isLoading) {
		return (
			<View style={styles.container}>
				<Image
					source={require('../assets/logo/logo.png')}
					style={styles.logo}
				/>
				<ActivityIndicator size="large" color={colors.primary} />
			</View>
		);
	}

	return null; // Ensures no unnecessary render.
};

export default WelcomeScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.background,
		alignItems: 'center',
		justifyContent: 'center',
	},
	logo: {
		width: 220,
		height: 220,
		resizeMode: 'contain',
		marginBottom: 20,
	},
});
