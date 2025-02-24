import React, { useState, useRef } from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	TextInput,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import colors from '../components/colors';
import axios from 'axios';

const EmailVerification = ({ navigation }) => {
	const [otp, setOtp] = useState(['', '', '', '']);
	const otpInputs = useRef([]);
	const duration = 5; // duration in minutes
	const [timeLeft, setTimeLeft] = useState(duration * 60); // convert minutes to seconds
	const [loading, setLoading] = useState(false);
	const { email } = navigation.params;

	const formatTime = (time) => {
		const minutes = Math.floor(time / 60)
			.toString()
			.padStart(2, '0');
		const seconds = (time % 60).toString().padStart(2, '0');
		return `${minutes}:${seconds}`;
	};

	const handleCountDown = () => {
		if (!loading) {
			setLoading(true);
			let interval = setInterval(() => {
				setTimeLeft((prev) => {
					if (prev <= 1) {
						clearInterval(interval);
						setLoading(false);
						return 0;
					}
					return prev - 1;
				});
			}, 1000);
		}
	};

	const handleOtpChange = (text, index) => {
		const newOtp = [...otp];
		newOtp[index] = text;
		setOtp(newOtp);

		if (text && index < otpInputs.current.length - 1) {
			otpInputs.current[index + 1]?.focus();
		}

		if (text.length === 0 && index > 0) {
			otpInputs.current[index - 1]?.focus();
		}
	};

	const handleVerify = async () => {
		if (otp.some((input) => input === '')) {
			Toast.show({
				type: 'error',
				text1: 'Invalid OTP',
				text2: 'Please enter all 4 digits of the OTP code.',
				position: 'bottom',
			});
			return;
		}
		try {
			setLoading(true);
			// Add logic here to verify OTP with the server or backend

			const url = `${process.env.EXPO_PUBLIC_API_URI}/auth/verify-otp`;
			const res = await axios.post(url, { email, otp });
			console.log('Verification successful', res?.data);
			// handleCountDown();

			Toast.show({
				type: 'success',
				text1: 'OTP Verified',
				text2: 'You have successfully verified your OTP!',
			});

			// Proceed to next screen or logic
			navigation.navigate('AddProfile'); // Replace with the next screen's path
			setLoading(false);
			// navigation.navigate('EmailVerification', {accessToken: res.data?.accessToken});
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
			<Text style={styles.title}>Enter Verification Code</Text>
			<Text style={styles.subtitle}>
				We have sent 4 digit code to your email{' '}
				<Text style={{ fontWeight: '500', color: '#000' }}>
					adeagbojosiah1@gmail.com
				</Text>
			</Text>

			{/* OTP Input */}
			<View style={styles.inputContainer}>
				{otp.map((value, index) => (
					<TextInput
						key={index}
						ref={(ref) => (otpInputs.current[index] = ref)}
						style={styles.input}
						maxLength={1}
						keyboardType="number-pad"
						value={value}
						onChangeText={(text) => handleOtpChange(text, index)}
					/>
				))}
			</View>

			<Text style={styles.duration}>
				Resend it{' '}
				<Text style={styles.durationTime}>{formatTime(timeLeft)}</Text>
			</Text>

			{/* Verify Button */}
			<TouchableOpacity
				disabled={loading}
				style={styles.continueButton}
				onPress={handleVerify}
			>
				<Text style={styles.continueButtonText}>Verify</Text>
			</TouchableOpacity>

			{/* Toast Container */}
			<Toast />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 20,
		backgroundColor: '#FFF',
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
	inputContainer: {
		flexDirection: 'row',
		marginVertical: 20,
		gap: 20,
		alignItems: 'center',
		justifyContent: 'center',
	},
	input: {
		width: 72,
		height: 72,
		borderRadius: 10,
		textAlign: 'center',
		fontSize: 34,
		backgroundColor: colors.input,
		fontWeight: '900',
		color: colors.primary,
	},
	duration: {
		flexDirection: 'row',
	},
	durationTime: {
		color: '#E03368',
		fontWeight: '600',
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
	},
	header: {
		marginTop: 40,
	},
});

export default EmailVerification;
