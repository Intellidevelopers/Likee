import React, { useState } from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Image,
	ActivityIndicator,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import colors from '../components/colors';
import { getErrorMessage } from '../utils/getErrorMessage';
import axios from 'axios';
import useTokenStore from '../stores/useTokenStore';
const IdealMatch = ({ navigation, route }) => {
	const [selectedOption, setSelectedOption] = useState(null); // State to track selected option
	const [isLoading, setIsLoading] = useState(false); // Loader state
	const payloads = route.params;

	const { accessToken } = useTokenStore();

	console.log(accessToken);
	const handleOptionSelect = (option) => {
		setSelectedOption(option);
	};

	const handleConfirmRegistration = async () => {
		setIsLoading(true); // Show loader
		try {
			const formData = new FormData();
			const payload = { ...payloads, selectedOption };
			console.log('payload in ideal match', payload);
			Object.keys(payload).forEach((key) => {
				formData.append(key, payload[key]);
			});
			console.log(accessToken);
			const { data } = await axios.post(
				`${process.env.EXPO_PUBLIC_API_URI}/auth/complete-registration`,
				formData,
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
						'Content-Type': 'multipart/form-data',
					},
				}
			);
			navigation.navigate('Match'); // Redirect to the Match screen
			setIsLoading(false);
			if (data) {
				console.log('user data ....', data);
			}
		} catch (error) {
			setIsLoading(false);
			const message = getErrorMessage(error);
			console.log('Error complete-registration', message);
			Toast.show({
				type: 'error',
				text1: message,
			});
		}
	};

	const isContinueDisabled = selectedOption === null;

	return (
		<View style={styles.container}>
			{/* Header */}
			<TouchableOpacity
				style={styles.header}
				onPress={() => navigation.goBack()}
			>
				<AntDesign name="leftcircleo" size={32} color={colors.primary} />
			</TouchableOpacity>

			{/* Content */}
			<Text style={styles.title}>Ideal Match</Text>
			<Text style={styles.subtitle}>
				What are you hoping to find here on match arenal?
			</Text>

			{/* Options */}
			<View>
				<TouchableOpacity
					style={[
						styles.optionContainer,
						selectedOption === 'Love' && styles.activeOption,
					]}
					onPress={() => handleOptionSelect('Love')}
				>
					<Image source={require('../assets/2.png')} style={styles.icon} />
					<View>
						<Text
							style={[
								styles.optionText,
								selectedOption === 'Love' && styles.activeText,
							]}
						>
							Love & Dating
						</Text>
						<Text style={styles.optionSubtitle}>
							You're not on here to play around
						</Text>
					</View>
				</TouchableOpacity>

				<TouchableOpacity
					style={[
						styles.optionContainer,
						selectedOption === 'Friends' && styles.activeOption,
					]}
					onPress={() => handleOptionSelect('Friends')}
				>
					<Image source={require('../assets/26.png')} style={styles.icon} />
					<View>
						<Text
							style={[
								styles.optionText,
								selectedOption === 'Friends' && styles.activeText,
							]}
						>
							Friends with Benefits
						</Text>
						<Text style={styles.optionSubtitle}>I want to meet new people</Text>
					</View>
				</TouchableOpacity>

				<TouchableOpacity
					style={[
						styles.optionContainer,
						selectedOption === 'Business' && styles.activeOption,
					]}
					onPress={() => handleOptionSelect('Business')}
				>
					<Image source={require('../assets/5.png')} style={styles.icon} />
					<View>
						<Text
							style={[
								styles.optionText,
								selectedOption === 'Business' && styles.activeText,
							]}
						>
							Sugar Mummy & Daddy
						</Text>
						<Text style={styles.optionSubtitle}>
							Meet Sugar mummies and daddies nearby
						</Text>
					</View>
				</TouchableOpacity>

				<TouchableOpacity
					style={[
						styles.optionContainer,
						selectedOption === 'Hookup' && styles.activeOption,
					]}
					onPress={() => handleOptionSelect('Hookup')}
				>
					<Image source={require('../assets/22.png')} style={styles.icon} />
					<View>
						<Text
							style={[
								styles.optionText,
								selectedOption === 'Hookup' && styles.activeText,
							]}
						>
							Hookup
						</Text>
						<Text style={styles.optionSubtitle}>
							Meet Olosho girls in your area
						</Text>
					</View>
				</TouchableOpacity>
			</View>

			{/* Confirm Button */}
			<TouchableOpacity
				style={[
					styles.continueButton,
					isContinueDisabled && styles.disabledButton,
				]}
				disabled={isContinueDisabled}
				onPress={handleConfirmRegistration}
			>
				<Text style={styles.continueButtonText}>Confirm Registration</Text>
			</TouchableOpacity>

			{/* Loader Overlay */}
			{isLoading && (
				<View style={styles.loaderOverlay}>
					<ActivityIndicator size="large" color={colors.primary} />
					<Text style={styles.loaderText}>Loading...</Text>
				</View>
			)}
			<Toast />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 20,
		backgroundColor: colors.background,
		padding: 10,
	},
	header: {
		marginTop: 40,
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
		marginBottom: 20,
	},
	optionContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 15,
		marginVertical: 10,
		backgroundColor: colors.greyBackground,
		borderRadius: 10,
	},
	activeOption: {
		backgroundColor: '#E3F0FF',
		borderColor: colors.border,
		borderWidth: 1,
	},
	optionText: {
		fontSize: 16,
		fontWeight: '700',
		color: '#000',
	},
	optionSubtitle: {
		fontSize: 12,
		color: '#666',
	},
	activeText: {
		color: colors.primary,
		fontWeight: '700',
	},
	icon: {
		width: 40,
		height: 40,
		marginRight: 15,
		resizeMode: 'contain',
	},
	continueButton: {
		backgroundColor: colors.primary,
		paddingVertical: 15,
		borderRadius: 10,
		alignItems: 'center',
		marginTop: 'auto',
		marginBottom: 10,
	},
	disabledButton: {
		backgroundColor: '#ccc',
	},
	continueButtonText: {
		color: '#FFF',
		fontSize: 16,
	},
	loaderOverlay: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: 'rgba(0, 0, 0, 0.7)',
		justifyContent: 'center',
		alignItems: 'center',
	},
	loaderText: {
		color: '#FFF',
		fontSize: 16,
		marginTop: 15,
		textAlign: 'center',
	},
});

export default IdealMatch;
