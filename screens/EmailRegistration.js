import React, { useState } from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Image,
	TextInput,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import colors from '../components/colors';
import axios from 'axios';
import LoaderModal from '../components/Loader';
import Toast from 'react-native-toast-message';
import * as SecureStore from 'expo-secure-store';
import useStore from '../stores/useStore';
import useTokenStore from '../stores/useTokenStore';

const EmailRegistration = ({ navigation }) => {
	const [email, setEmail] = useState('');
	const [cPassword, setCPassword] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [errors, setErrors] = useState({
		email: '',
		password: '',
		cPassword: '',
	});
	const { setUserData } = useStore();
	const { setAccessToken, setRefreshToken } = useTokenStore();

	// Validate email format using regex
	const validateEmail = (email) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	};

	// Handle Continue button press
	// const handleContinue = async () => {
	// 	navigation.navigate('AddProfile', {
	// 		email: 'abc@gmail.com',
	// 		accessToken: 'res.data?.accessToken',
	// 	});
	// };
	const handleContinue = async () => {
		let valid = true;
		const newErrors = { email: '', password: '', cPassword: '' };
		console.log('emailllllll', email);
		// Email Validation
		if (!email) {
			newErrors.email = 'Email is required';
			valid = false;
		} else if (!validateEmail(email)) {
			newErrors.email = 'Please enter a valid email';
			valid = false;
		}

		// Password Validation
		if (!password) {
			newErrors.password = 'Password is required';
			valid = false;
		}
		if (password !== cPassword) {
			newErrors.cPassword = 'Passwords do not match';
			valid = false;
		}
		// Password Validation
		if (!cPassword) {
			newErrors.cPassword = 'Please confirm your password';
			valid = false;
		}

		setErrors(newErrors);

		// If valid, navigate to EmailVerification
		if (valid) {
			const data = {
				email,
				password,
			};
			try {
				setLoading(true);

				const url = `${process.env.EXPO_PUBLIC_API_URI}/auth/register`;
				const res = await axios.post(url, data);
				console.log('Registeration successful', res?.data);
				setLoading(false);
				// navigation.navigate('EmailVerification', {email, accessToken: res.data?.accessToken});
				Toast.show({
					type: 'success',
					text1: 'Registration successful',
					text2: 'Your registration is successful',
				});

				const { accessToken, refreshToken, user } = res.data;
				console.log('res.data logging in', res.data);
				// setRole(res?.data?.user?.role.toUpperCase());
				await SecureStore.setItemAsync('accessToken', accessToken);
				await SecureStore.setItemAsync('refreshToken', refreshToken);
				await SecureStore.setItemAsync('userInfo', JSON.stringify(user));
				await setUserData(user);
				await setAccessToken(accessToken);
				await setRefreshToken(refreshToken);
				navigation.navigate('AddProfile');
			} catch (error) {
				setLoading(false);
				console.log('Error creating account!', error);
				const message = getErrorMessage(error);
				Toast.show({
					type: 'error',
					text1: 'Error creating account!',
					text2: message,
				});
			}
		}
	};

	return (
		<View style={styles.container}>
			<TouchableOpacity
				style={styles.header}
				onPress={() => navigation.goBack()}
			>
				<AntDesign name="leftcircleo" size={32} color={colors.primary} />
			</TouchableOpacity>
			{/* Title */}
			<Text style={styles.title}>Enter Email Address</Text>
			<Text style={styles.subtitle}>
				Please enter your email address to continue
			</Text>
			<View style={styles.inputContainer}>
				<TextInput
					placeholder="Enter your email address"
					style={styles.input}
					keyboardType="email-address"
					value={email}
					onChangeText={(text) => setEmail(text)} // Corrected this line
				/>
			</View>

			{errors.email ? (
				<Text style={styles.errorText}>{errors.email}</Text>
			) : null}

			{/* Password Input */}
			<View style={styles.inputContainer}>
				<TextInput
					placeholder="Enter your password"
					style={styles.input}
					secureTextEntry={true}
					value={password}
					onChangeText={(text) => setPassword(text)}
				/>
			</View>
			{errors.password ? (
				<Text style={styles.errorText}>{errors.password}</Text>
			) : null}
			{/* Password Input */}
			<View style={styles.inputContainer}>
				<TextInput
					placeholder="Confirm your password"
					style={styles.input}
					secureTextEntry={true}
					value={cPassword}
					onChangeText={(text) => setCPassword(text)}
				/>
			</View>
			{errors.cPassword ? (
				<Text style={styles.errorText}>{errors.cPassword}</Text>
			) : null}

			{/* Continue Button */}
			<TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
				<Text style={styles.continueButtonText}>Continue</Text>
			</TouchableOpacity>
			{loading && <LoaderModal loading={loading} />}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 20,
		backgroundColor: colors.background,
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		marginTop: 50,
	},
	subtitle: {
		fontSize: 14,
		color: '#666',
		marginVertical: 10,
		lineHeight: 20,
	},
	interestContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		marginVertical: 30,
		gap: 10,
	},
	interestButton: {
		backgroundColor: '#FFF',
		borderRadius: 10,
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderWidth: 1,
		borderColor: '#EEE',
		marginBottom: 15,
		flexDirection: 'row',
		alignItems: 'center',
		gap: 5,
	},
	selected: {
		backgroundColor: '#E03368',
		borderColor: '#FF6A9F',
	},
	errorText: {
		color: 'red',
		marginBottom: 10,
		fontSize: 12,
	},
	interestText: {
		color: '#666',
	},
	continueButton: {
		backgroundColor: colors.primary,
		paddingVertical: 15,
		borderRadius: 10,
		alignItems: 'center',
		marginVertical: 20,
	},
	continueButtonText: {
		color: '#FFF',
		fontSize: 16,
		fontWeight: '500',
	},
	selectedText: {
		color: '#fff',
	},
	header: {
		marginTop: 60,
	},
	inputContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		borderWidth: 1,
		borderColor: colors.border,
		borderRadius: 10,
		marginBottom: 20,
	},
	flagDropdown: {
		flexDirection: 'row',
		alignItems: 'center',
		borderRightWidth: 1,
		borderRightColor: '#E03368',
		padding: 10,
	},
	input: {
		padding: 12,
		flex: 1,
		fontSize: 14,
	},
	icon: {
		width: 30,
		height: 30,
	},
});

export default EmailRegistration;
