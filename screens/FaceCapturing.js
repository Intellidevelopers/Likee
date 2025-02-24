import React, { useState } from 'react';
import {
	View,
	TouchableOpacity,
	Text,
	Image,
	StyleSheet,
	Alert,
	ScrollView,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import colors from '../components/colors';
import useTokenStore from '../stores/useTokenStore';
import LoaderModal from '../components/Loader';
import axios from 'axios';
import Toast from 'react-native-toast-message';

export default function FaceCapturing({ navigation }) {
	const [idPhoto, setIdPhoto] = useState(null);
	const [selfie, setSelfie] = useState(null);

	const { accessToken } = useTokenStore();
	const [isLoading, setIsLoading] = useState(false);
	const apiUrl = process.env.EXPO_PUBLIC_API_URI;
	const requestPermission = async () => {
		const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
		if (status !== 'granted') {
			Alert.alert('Permission Denied', 'You need to grant gallery access.');
		}
	};

	const pickImage = async (type) => {
		await requestPermission();
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ['images'],
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		if (!result.canceled) {
			type === 'id'
				? setIdPhoto(result.assets[0].uri)
				: setSelfie(result.assets[0].uri);
		}
	};

	const takeSelfie = async () => {
		const { status } = await ImagePicker.requestCameraPermissionsAsync();
		if (status !== 'granted') {
			Alert.alert('Permission Denied', 'You need to grant camera access.');
			return;
		}

		let result = await ImagePicker.launchCameraAsync({
			mediaTypes: ['images'],
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
			cameraType: ImagePicker.CameraType.front,
		});

		if (!result.canceled) {
			setSelfie(result.assets[0].uri);
		}
	};

	const handleUploadPhotos = async () => {
		try {
			setIsLoading(true);
			const formData = new FormData();

			formData.append('profileImage', selfie);
			formData.append('governmentImage', idPhoto);
			console.log('formData', formData);
			// Make the API request
			const { data } = await axios.patch(
				`${apiUrl}/users/verify-profile`,
				formData,
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
						'Content-Type': 'multipart/form-data',
					},
				}
			);

			console.log('response data',data);
			Toast.show({
				type: 'success',
				text1: 'Upload Successfully',
				text2: message,
			});
			if (data) {
				console.log(
					'Your profile images have been updated successfully.',
					data
				);
				navigation.navigate('VerificationSuccess');
			}
		} catch (error) {
			const message = getErrorMessage(error);
			console.error('Error uploading photos:', message);
			Toast.show({
				type: 'error',
				text1: 'Upload failed',
				text2: message,
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<ScrollView style={styles.container}>
			<View style={styles.headerContainer}>
				<TouchableOpacity onPress={() => navigation.goBack()}>
					<AntDesign name="arrowleft" size={24} color="#000" />
				</TouchableOpacity>
				<Text style={styles.headerText}>Account Verification</Text>
			</View>

			<TouchableOpacity
				style={styles.uploadSection}
				onPress={() => pickImage('id')}
			>
				<Text style={styles.label}>Upload Government ID</Text>
				{idPhoto ? (
					<Image source={{ uri: idPhoto }} style={styles.image} />
				) : (
					<View style={styles.placeholderBox}>
						<Image
							source={require('../assets/images/id.png')}
							style={styles.image}
						/>
					</View>
				)}
			</TouchableOpacity>
			<Text style={styles.description}>
				Please ensure that you are using a clear, well-lit photo of your ID and
				selfie. Your ID will be used to verify your account and selfie will be
				used to verify your identity.
			</Text>

			<TouchableOpacity style={styles.uploadSection} onPress={takeSelfie}>
				<Text style={styles.label}>Take a Selfie</Text>
				{selfie ? (
					<Image source={{ uri: selfie }} style={styles.image} />
				) : (
					<View style={styles.placeholderBox}>
						<Image
							source={require('../assets/images/1.png')}
							style={styles.image}
						/>
					</View>
				)}
			</TouchableOpacity>
			<Text style={styles.description}>
				Once you submit your verification request, we will review it and notify
				you if there are any issues. If you have any questions, please contact
				our support team at 08088886823.
			</Text>

			<TouchableOpacity
				style={[
					styles.submitButton,
					(!idPhoto || !selfie) && styles.disabledButton,
				]}
				disabled={!idPhoto || !selfie}
				onPress={handleUploadPhotos}
			>
				<Text style={styles.buttonText}>Submit for Verification</Text>
			</TouchableOpacity>

			<Toast />
			{isLoading && <LoaderModal loading={isLoading} text="Loading ..." />}
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: '#f9f9f9',
	},
	header: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
	uploadSection: {
		width: '100%',
		marginBottom: 20,
	},
	label: { fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
	placeholderBox: {
		width: '100%',
		height: 180,
		backgroundColor: '#ddd',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 10,
	},
	image: {
		width: '100%',
		height: 180,
		borderRadius: 10,
		resizeMode: 'cover',
	},
	uploadButton: {
		backgroundColor: '#007bff',
		padding: 10,
		borderRadius: 5,
		marginVertical: 10,
	},
	submitButton: {
		backgroundColor: colors.primary,
		padding: 15,
		borderRadius: 10,
		marginTop: 'auto',
		alignItems: 'center',
	},
	disabledButton: { backgroundColor: '#ccc' },
	buttonText: { color: 'white', fontWeight: 'bold' },
	headerContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginTop: 30,
		marginBottom: 20,
		paddingVertical: 10,
	},
	headerText: {
		fontSize: 18,
		fontWeight: 'bold',
		color: 'black',
	},
	description: {
		fontSize: 14,
		marginBottom: 20,
		lineHeight: 17,
	},
});
