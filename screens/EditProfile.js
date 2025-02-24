import React, { useState, useRef, useEffect } from 'react';
import {
	StyleSheet,
	Text,
	View,
	Image,
	TouchableOpacity,
	ScrollView,
	Animated,
	TextInput,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { BottomSheet } from '@rneui/themed';
import colors from '../components/colors';
import MoreAboutYouScreen from '../components/About';
import InterestTags from '../components/InterestTags';
import SocialSection from '../components/SocialSection';
import VerificationSection from '../components/VerificationSection';
import NumberSection from '../components/NumberSection';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import useStore from '../stores/useStore';
import { getErrorMessage } from '../utils/getErrorMessage';
import axios from 'axios';
import useTokenStore from '../stores/useTokenStore';
import LoaderModal from '../components/Loader';
import Toast from 'react-native-toast-message';

const EditProfile = ({ navigation }) => {
	const progressAnim = useRef(new Animated.Value(0)).current;
	const { userData, setUserData } = useStore(); // Access user profile from Zustand store
	const [profileImage, setProfileImage] = useState(userData?.profileImage);
	const [gallery, setGallery] = useState([...userData?.gallery]);
	const { accessToken } = useTokenStore();
	const [isLoading, setIsLoading] = useState(false);
	const apiUrl = process.env.EXPO_PUBLIC_API_URI;
	// States for bottom sheet
	const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
	const [selectedInfo, setSelectedInfo] = useState(null);
	const [tempValue, setTempValue] = useState('');
	useEffect(() => {
		if (userData) {
			setProfileImage(userData?.profileImage);
			if (userData.gallery.length > 0) {
				setGallery([...userData?.gallery] || [null, null, null]);
			} else {
				setGallery([null, null, null]);
			}
		}
	}, [userData]);

	useEffect(() => {
		Animated.timing(progressAnim, {
			toValue: 100,
			duration: 2000,
			useNativeDriver: false,
		}).start();
	}, []);

	const progressWidth = progressAnim.interpolate({
		inputRange: [0, 100],
		outputRange: ['0%', '100%'],
	});

	// Info data
	const [infoData, setInfoData] = useState([
		{
			label: `${userData?.name}, ${userData?.dateOfBirth}`,
			detail: `${userData?.gender}, ${userData?.state}`,
			editable: false,
		},
		{
			label: 'Work',
			detail: userData.work || 'STE CYBERTECH LTD, Software Developer',
			editable: true,
		},
		{
			label: 'Education',
			detail: userData.education || 'Federal university of technology Akure',
			editable: true,
		},
		{
			label: "Why you're here",
			detail: 'Ready for a relationship',
			editable: true,
		},
	]);

	// Function to open the bottom sheet
	const openBottomSheet = (item) => {
		setSelectedInfo(item);
		setTempValue(item.detail);
		setIsBottomSheetVisible(true);
	};

	// Function to save changes from the bottom sheet
	const saveValue = () => {
		if (selectedInfo.label === 'Work') {
			handleUpdateUser({ work: tempValue });
		} else if (selectedInfo.label === 'Education') {
			handleUpdateUser({ education: tempValue });
		} else if (selectedInfo.label === "why you're here") {
			handleUpdateUser({ why: tempValue });
		}

		setInfoData((prevData) =>
			prevData.map((el) =>
				el.label === selectedInfo.label ? { ...el, detail: tempValue } : el
			)
		);
		setIsBottomSheetVisible(false);
		handleUpdateUser();
	};

	// Function to pick a single image for the main placeholder

	const pickprofileImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ['images'],
			allowsEditing: true,
			aspect: [1, 1], // Square aspect ratio
			quality: 1,
		});

		if (!result.canceled) {
			setProfileImage(result.assets[0].uri);
		}
	};

	// Function to pick a specific additional image
	const pickAdditionalImage = async (index) => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ['images'],
			allowsEditing: true,
			quality: 1,
		});

		if (!result.canceled) {
			const newImages = [...gallery];
			newImages[index] = result.assets[0].uri;
			setGallery(newImages);
		}
	};

	const handleUploadPhotos = async () => {
		try {
			setIsLoading(true);
			const formData = new FormData();

			// Check if the main image has been changed
			if (profileImage !== userData.profileImage) {
				formData.append('profileImage', {
					uri: profileImage,
					name: profileImage.fileName || 'profileImage.jpg',
					type: profileImage.type || 'image/jpeg',
				});
			}

			console.log('profileImage', profileImage);

			// Handle additional images
			const existingImageURIs = userData.gallery.map((img) => img.uri);
			const newImages = gallery.filter(
				(img) => img && !existingImageURIs.includes(img.uri)
			);
			const removedImages = existingImageURIs.filter(
				(uri) => !gallery.some((img) => img && img.uri === uri)
			);

			// Add new images to FormData
			newImages.forEach((img, index) => {
				formData.append('gallery', {
					uri: img,
					name: img.fileName || `additionalImage_${index}.jpg`,
					type: img.type || 'image/jpeg',
				});
			});

			// Add removed image URIs to FormData for deletion
			formData.append('removedImages', JSON.stringify(removedImages));
			// Make the API request
			const { data } = await axios.patch(
				`${apiUrl}/users/profile-pictures`,
				formData,
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
						'Content-Type': 'multipart/form-data',
					},
				}
			);
			// console.log('data', data);
			// console.log('apiUrl', apiUrl);
			if (data) {
				setUserData(data.user);

				Toast.show({
					type: 'success',
					text1: 'Profile updated successfully',
				});
			}
		} catch (error) {
			console.log('Error Updating user profile', error);
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

	const handleUpdateUser = async (payload) => {
		try {
			// setIsLoading(true);
			const { data } = await axios.patch(`${apiUrl}/users`, payload, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});
			if (data) {
				console.log('data', data);

				setUserData(data);
				Toast.show({
					type: 'success',
					text1: 'Profile updated successfully',
				});
				// setUserData(data);
				// navigation.navigate('EditProfile');
			}
		} catch (error) {
			console.log(error);
			const message = getErrorMessage(error);
			console.error('Error updating profile:', message);
			Toast.show({
				type: 'error',
				text1: 'Update failed',
				text2: message,
			});
			// navigation.navigate('EditProfile');
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<GestureHandlerRootView style={styles.container}>
			{/* Header */}
			<View style={styles.header}>
				<TouchableOpacity onPress={() => navigation.goBack()}>
					<Ionicons name="arrow-back" size={24} color="black" />
				</TouchableOpacity>
				<View style={styles.textWithProgress}>
					<Text style={styles.headerText}>100% complete</Text>
					<View style={styles.progressBarBackground}>
						<Animated.View
							style={[styles.progressBar, { width: progressWidth }]}
						/>
					</View>
				</View>
				<TouchableOpacity onPress={() => navigation.goBack()}>
					<Text style={{ fontSize: 16, fontWeight: '500' }}>Save</Text>
				</TouchableOpacity>
			</View>

			{/* Photos Section */}
			<ScrollView showsVerticalScrollIndicator={false}>
				<View style={styles.photosSection}>
					<View style={styles.photosContainer}>
						{/* Main Image */}
						<TouchableOpacity
							onPress={pickprofileImage}
							style={styles.mainPhoto}
						>
							{profileImage ? (
								<Image
									source={{ uri: profileImage }}
									style={styles.photoMain}
								/>
							) : (
								<MaterialIcons name="add" size={50} color="gray" />
							)}
						</TouchableOpacity>

						{/* Additional Images */}
						<View style={styles.smallPhotos}>
							{gallery.map((image, index) => (
								<TouchableOpacity
									key={index}
									style={styles.photoContainer}
									onPress={() => pickAdditionalImage(index)}
								>
									{image ? (
										<Image source={{ uri: image }} style={styles.photo} />
									) : (
										<MaterialIcons name="add" size={34} color="gray" />
									)}
								</TouchableOpacity>
							))}
						</View>
					</View>

					<TouchableOpacity
						onPress={handleUploadPhotos}
						style={styles.addButton}
						disabled={isLoading}
					>
						<Text style={styles.addButtonText}>Add Photos Or Videos</Text>
					</TouchableOpacity>
				</View>

				{/* Profile Information Section */}
				<View style={styles.infoSection}>
					{infoData?.map((item, index) => (
						<TouchableOpacity
							key={index}
							style={styles.infoItem}
							onPress={() => item.editable && openBottomSheet(item)} // Check if editable
						>
							<View>
								<Text style={styles.infoLabel}>{item.label}</Text>
								<Text style={styles.infoDetail}>{item.detail}</Text>
							</View>
							{item.editable && (
								<Ionicons name="chevron-forward" size={20} color="black" />
							)}
						</TouchableOpacity>
					))}
				</View>

				<MoreAboutYouScreen handleUpdateUser={handleUpdateUser} />
				<InterestTags />
				<VerificationSection />
				<NumberSection />
			</ScrollView>

			{isLoading && <LoaderModal loading={isLoading} text="Loading ..." />}
			{/* Bottom Sheet for Editing */}
			<BottomSheet
				isVisible={isBottomSheetVisible}
				onBackdropPress={() => setIsBottomSheetVisible(false)}
			>
				<View style={styles.bottomSheetContent}>
					<Text style={styles.modalTitle}>Edit {selectedInfo?.label}</Text>
					<TextInput
						style={styles.input}
						value={tempValue}
						onChangeText={setTempValue}
						placeholder={`Enter ${selectedInfo?.label}`}
					/>
					<TouchableOpacity style={styles.saveButton} onPress={saveValue}>
						<Text style={styles.saveButtonText}>Save</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => setIsBottomSheetVisible(false)}
						style={styles.cancelButton}
					>
						<Text style={styles.cancelText}>Cancel</Text>
					</TouchableOpacity>
				</View>
			</BottomSheet>
		</GestureHandlerRootView>
	);
};

export default EditProfile;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.greyBackground,
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginVertical: 10,
		paddingHorizontal: 16,
		paddingTop: 30,
	},
	headerText: {
		fontSize: 16,
		fontWeight: '600',
	},
	photosSection: {
		alignItems: 'center',
		marginVertical: 20,
		paddingHorizontal: 16,
	},
	photosContainer: {},
	mainPhoto: {
		width: 325,
		height: 350,
		borderRadius: 10,
		backgroundColor: '#f0f0f0',
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 10,
		alignSelf: 'center',
	},
	photoMain: {
		width: '100%',
		height: '100%',
		borderRadius: 10,
		resizeMode: 'cover',
	},
	photo: {
		width: 100,
		height: 100,
		borderRadius: 10,
	},
	smallPhotos: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginVertical: 10,
	},
	photoContainer: {
		width: 100,
		height: 100,
		borderRadius: 10,
		backgroundColor: '#f0f0f0',
		justifyContent: 'center',
		alignItems: 'center',
		marginHorizontal: 5,
	},
	addButton: {
		backgroundColor: '#000',
		borderRadius: 30,
		paddingHorizontal: 20,
		marginTop: 10,
		width: '100%',
		padding: 15,
		alignItems: 'center',
	},
	addButtonText: {
		color: '#fff',
		fontSize: 16,
		fontWeight: '600',
	},
	infoSection: {
		marginTop: 20,
		paddingHorizontal: 16,
	},
	infoItem: {
		marginBottom: 15,
		borderBottomWidth: 1,
		borderBottomColor: '#e0e0e0',
		paddingBottom: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 5,
	},
	infoLabel: {
		fontSize: 16,
		fontWeight: '600',
	},
	infoDetail: {
		fontSize: 14,
		color: '#666',
		marginTop: 5,
	},
	textWithProgress: {
		flex: 1,
		alignItems: 'center',
	},
	progressBarBackground: {
		width: '50%',
		height: 4,
		backgroundColor: '#e0e0e0',
		borderRadius: 2,
		marginTop: 4,
		overflow: 'hidden',
	},
	progressBar: {
		height: '100%',
		backgroundColor: '#4caf50',
		borderRadius: 2,
	},
	bottomSheetContent: {
		padding: 20,
		backgroundColor: '#fff',
		borderTopEndRadius: 20,
		borderTopStartRadius: 20,
	},
	modalTitle: {
		fontSize: 18,
		fontWeight: '700',
		marginBottom: 10,
	},
	input: {
		borderWidth: 1,
		borderColor: '#ddd',
		borderRadius: 10,
		padding: 10,
		fontSize: 16,
		marginBottom: 20,
	},
	saveButton: {
		backgroundColor: '#000',
		padding: 15,
		borderRadius: 30,
		alignItems: 'center',
		marginBottom: 10,
	},
	saveButtonText: {
		color: '#fff',
		fontSize: 16,
		fontWeight: '700',
	},
	cancelText: {
		fontSize: 16,
		color: '#000',
		textAlign: 'center',
		marginBottom: 10,
	},
	bioTouchable: {
		flexDirection: 'row',
	},
});
