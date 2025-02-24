import React, { useState, useRef, useEffect } from 'react';
import {
	View,
	Text,
	StyleSheet,
	Dimensions,
	Animated,
	TouchableWithoutFeedback,
	Image,
	TouchableOpacity,
	Modal,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
	AntDesign,
	Feather,
	Ionicons,
	MaterialCommunityIcons,
	MaterialIcons,
} from '@expo/vector-icons';
import userProfileStore from '../stores/userProfileStore';
import { useNavigation } from '@react-navigation/native';
import { datesData } from '../components/datesData';
import { profile } from '../assets/images';
import colors from '../components/colors';
import Toast from 'react-native-toast-message';
import useTokenStore from '../stores/useTokenStore';
import useStore from '../stores/useStore';
import { useQuery } from '@tanstack/react-query';
import { fetchUsers } from '../api';
import { convertDobToAge } from '../utils/index';
import axios from 'axios';
import { getErrorMessage } from '../utils/getErrorMessage';
import * as SecureStore from 'expo-secure-store';

const { width, height } = Dimensions.get('window');

const HomeScreen = () => {
	const { setUserProfile } = userProfileStore(); // Access selected profile from Zustand store
	const { userData, setUserData } = useStore(); // Access user profile from Zustand store
	const { accessToken, clearTokens } = useTokenStore();
	const navigation = useNavigation();
	const scrollX = useRef(new Animated.Value(0)).current;
	const scrollViewRef = useRef(null);
	const drawerAnim = useRef(new Animated.Value(-width)).current;
	const overlayAnim = useRef(new Animated.Value(0)).current;
	const [drawerOpen, setDrawerOpen] = useState(false);
	const [combinedData, setCombinedData] = useState([]); // Duplicate data for seamless scrolling
	const [showModal, setShowModal] = useState(
		userData.profileVerified === 'pending' || false ? true : false
	);
	const [likedData, setLikedData] = useState([]);
	const { data } = useQuery({
		queryKey: ['users'],
		queryFn: async () => fetchUsers(accessToken),
	});
	useEffect(() => {
		if (data) {
			// console.log('data users', data);
			if (data.length > 0) {
				setCombinedData(data);
			}
		}
	}, [data]);
	const closeModal = () => {
		setShowModal(false);
	};

	const handleContinue = () => {
		setShowModal(false);
		navigation.navigate('Verification');
	};

	const handleClick = (item) => {
		setUserProfile(item);
		navigation.navigate('UserProfile');
	};

	const handleLikeUser = async (targetId) => {
		try {
			const { data } = await axios.post(
				`${process.env.EXPO_PUBLIC_API_URI}/users/${userData._id}/like/${targetId}`,
				{},
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);
			if (data) {
				console.log('liked data ....', data);
			}
		} catch (error) {
			const message = getErrorMessage(error);
			console.log('Error liking user', message);
			Toast.show({
				type: 'error',
				text1: message,
				// position: 'bottom',
			});
		}
	};

	const handleLike = (index, item) => {
		console.log(`Liked item at index: ${index}`);

		// Immediately scroll to the next card
		if (scrollViewRef.current) {
			scrollViewRef.current.scrollTo({
				x: (index + 1) * width,
				animated: true,
			});
		}

		// Show toast message after initiating the scroll
		Toast.show({
			type: 'success',
			text1: 'Liked!',
			text2: `You liked ${item.name}'s profile.`,
		});

		const isLiked = likedData.find((user) => user === item._id);

		if (!isLiked) {
			setLikedData((prev) => [...prev, item._id]);
			return handleLikeUser(item._id);
		} else {
			setLikedData((prev) => prev.filter((userId) => userId !== item._id)); // Remove the liked user
			// return handleUnLikeUser(item._id);
			return;
		}
	};

	const handleLogOut = () => {
		setUserData({});
		clearTokens();
		navigation.navigate('Login');
	};

	const toggleDrawer = () => {
		if (drawerOpen) {
			Animated.timing(drawerAnim, {
				toValue: -width,
				duration: 300,
				useNativeDriver: true,
			}).start();
			Animated.timing(overlayAnim, {
				toValue: 0,
				duration: 300,
				useNativeDriver: true,
			}).start();
		} else {
			Animated.timing(drawerAnim, {
				toValue: 0,
				duration: 300,
				useNativeDriver: true,
			}).start();
			Animated.timing(overlayAnim, {
				toValue: 1,
				duration: 300,
				useNativeDriver: true,
			}).start();
		}
		setDrawerOpen(!drawerOpen);
	};

	const closeDrawer = () => {
		if (drawerOpen) toggleDrawer();
	};

	useEffect(() => {
		scrollX.addListener(({ value }) => {
			const maxScroll = (datesData.length - 1) * width;

			if (value >= maxScroll) {
				// Automatically reset scroll position after reaching the last card
				scrollViewRef.current.scrollTo({ x: 0, animated: true });
			}
		});

		return () => {
			scrollX.removeAllListeners();
		};
	}, [scrollX]);

	const renderCard = (item, index) => {
		const inputRange = [
			(index - 1) * width,
			index * width,
			(index + 1) * width,
		];

		const scale = scrollX.interpolate({
			inputRange,
			outputRange: [0.4, 1, 0.4],
			extrapolate: 'clamp',
		});

		const opacity = scrollX.interpolate({
			inputRange,
			outputRange: [0.8, 1, 0.8],
			extrapolate: 'clamp',
		});
		const isLiked = likedData.find((user) => user === item._id);
		return (
			<Animated.View
				key={index}
				style={[styles.cardContainer, { transform: [{ scale }], opacity }]}
			>
				<TouchableWithoutFeedback onPress={() => handleClick(item)}>
					<Image
						source={{ uri: item?.profileImage }}
						style={styles.image}
						resizeMode="cover"
					/>
				</TouchableWithoutFeedback>

				<LinearGradient
					colors={['transparent', 'rgba(0,0,0,0.8)', 'rgba(0,0,0,1)']}
					style={styles.gradientOverlay}
					start={{ x: 0.5, y: 0.2 }}
					end={{ x: 0.5, y: 1 }}
				/>

				<View style={styles.textContainer}>
					<View style={styles.nameContainer}>
						<Text style={styles.nameText}>
							{item.name}, {convertDobToAge(item?.dateOfBirth)}
						</Text>
						<MaterialIcons
							name="verified"
							size={22}
							color="#3B82F6"
							style={styles.badgeIcon}
						/>
						<TouchableOpacity
							style={{
								...styles.actionButton,
								backgroundColor: isLiked ? colors.primary : colors.white,
							}}
							onPress={() => handleLike(index, item)}
						>
							<Ionicons name="heart-outline" size={24} color="#000" />
						</TouchableOpacity>
					</View>
					<Text style={styles.locationText}>
						{item.distance || 'Garki, Abuja'}
					</Text>
				</View>
			</Animated.View>
		);
	};

	return (
		<View style={styles.container}>
			{/* Overlay Background */}
			<Animated.View
				style={[styles.overlay, { opacity: overlayAnim }]}
				onStartShouldSetResponder={closeDrawer} // Close drawer when clicked outside
			/>

			{/* Custom Drawer */}
			<Animated.View
				style={[styles.drawer, { transform: [{ translateX: drawerAnim }] }]}
			>
				<View style={styles.drawerContent}>
					<View style={styles.drawerHeaderContainer}>
						<Text style={styles.drawerHeader}>Sodate.me</Text>
						<TouchableOpacity
							onPress={toggleDrawer} // Toggle drawer visibility
							style={{ marginRight: 10 }}
						>
							<Feather name="x" size={32} color="black" />
						</TouchableOpacity>
					</View>
					<Text style={styles.subText}>
						Quick navigation to your area of interest, you are one step away...
					</Text>
					<TouchableOpacity
						style={styles.button}
						onPress={() => navigation.navigate('TapcoinTab')}
					>
						<MaterialCommunityIcons name="gesture-double-tap" size={30} />
						<Text style={styles.drawerItem}>Tap Coin</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.button}
						onPress={() => navigation.navigate('Wallet')}
					>
						<Image
							source={require('../assets/wallet.png')}
							style={styles.walletIcon}
						/>
						<Text style={styles.drawerItem}>My Wallet</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.button}
						onPress={() => navigation.navigate('UsersList')}
					>
						<Image
							source={require('../assets/love.png')}
							style={styles.walletIcon}
						/>
						<Text style={styles.drawerItem}>Rooms</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.button}
						onPress={() => navigation.navigate('ComingSoon')}
					>
						<Image
							source={require('../assets/5.png')}
							style={styles.drawerIcon}
						/>
						<Text style={styles.drawerItem}>Sugar Mummies</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.button}
						onPress={() => navigation.navigate('ComingSoon')}
					>
						<Image
							source={require('../assets/26.png')}
							style={styles.drawerIcon}
						/>
						<Text style={styles.drawerItem}>Sugar Daddies</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.button}
						onPress={() => navigation.navigate('ComingSoon')}
					>
						<Image
							source={require('../assets/2.png')}
							style={styles.drawerIcon}
						/>
						<Text style={styles.drawerItem}>Rosko & Gay</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.button} onPress={handleLogOut}>
						<MaterialCommunityIcons
							name="lock"
							color={colors.primary}
							size={30}
						/>
						<Text style={styles.signoutText}>Sign Out</Text>
					</TouchableOpacity>
				</View>
			</Animated.View>

			{/* Main Screen Content */}
			<View style={styles.headerContainer}>
				<View style={styles.context}>
					<View style={styles.profileImageContainer}>
						<Image
							source={
								userData.profileImage ? { uri: userData.profileImage } : profile
							}
							style={styles.profileImage}
						/>
					</View>
					<View style={styles.info}>
						<Text style={styles.headerTitle}>{userData?.name}</Text>
						<Text style={styles.subheaderText}>Good afternoon!</Text>
					</View>
				</View>
				<TouchableOpacity
					onPress={toggleDrawer} // Toggle drawer visibility
					style={{ marginTop: 20 }}
				>
					<Ionicons name="menu" size={32} color="black" />
				</TouchableOpacity>
			</View>

			<View style={styles.carouselContainer}>
				<Animated.ScrollView
					ref={scrollViewRef}
					horizontal
					pagingEnabled
					showsHorizontalScrollIndicator={false}
					onScroll={Animated.event(
						[{ nativeEvent: { contentOffset: { x: scrollX } } }],
						{ useNativeDriver: true }
					)}
					scrollEventThrottle={16}
					onScrollEndDrag={() => {
						// Prevent scroll to the right, if already at the last card
						const maxScroll = (datesData.length - 1) * width;
						if (scrollX._value >= maxScroll) {
							scrollViewRef.current.scrollTo({ x: 0, animated: true });
						}
					}}
				>
					{combinedData.map((item, index) => renderCard(item, index))}
				</Animated.ScrollView>
			</View>
			<Toast />
			<Modal
				animationType="fade"
				transparent={true}
				visible={showModal}
				onRequestClose={closeModal}
			>
				<View style={styles.modalOverlay}>
					<View style={styles.modalContent}>
						<TouchableOpacity
							style={{ alignSelf: 'flex-end' }}
							onPress={closeModal}
						>
							<Feather name="x" size={24} />
						</TouchableOpacity>
						<Image
							source={require('../assets/icons/warning.png')}
							style={styles.icon}
						/>
						<Text style={styles.modalTitle}>Profile Verification Warning</Text>
						<Text style={styles.modalMessage}>
							Your profile is not verified yet. Please verify your account to
							continue.
						</Text>

						<TouchableOpacity
							style={styles.modalbutton}
							onPress={handleContinue}
						>
							<Text style={styles.modalbuttonText}>Verify</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
		</View>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		paddingVertical: 20,
		backgroundColor: colors.white,
	},
	headerContainer: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 16,
		paddingVertical: 10,
		marginTop: 15,
	},
	profileImageContainer: {
		borderRadius: 50,
		overflow: 'hidden',
		width: 50,
		height: 50,
		alignItems: 'center',
		justifyContent: 'center',
	},
	profileImage: {
		width: '100%',
		height: '100%',
		resizeMode: 'cover',
	},
	headerTitle: {
		fontSize: 18,
		fontWeight: '900',
		color: '#333',
	},
	bellIconContainer: {
		padding: 10,
		borderRadius: 25,
		alignItems: 'center',
		justifyContent: 'center',
	},
	carouselContainer: {
		width: width,
		height: height * 0.9,
		marginBottom: 10,
		top: -10,
	},
	cardContainer: {
		width: width * 0.9,
		height: height * 0.75,
		borderRadius: 20,
		overflow: 'hidden',
		marginHorizontal: width * 0.05,
		marginBottom: 20,
		alignSelf: 'center',
		position: 'relative',
		top: -20,
		flex: 1,
	},
	image: {
		width: '100%',
		height: '100%',
		borderRadius: 20,
	},
	gradientOverlay: {
		position: 'absolute',
		bottom: 0,
		width: '100%',
		height: '40%',
		borderBottomLeftRadius: 20,
		borderBottomRightRadius: 20,
	},
	textContainer: {
		position: 'absolute',
		bottom: 20,
		left: 15,
		width: '72%',
	},
	nameContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		// borderColor: 'blue',
		// borderWidth: 1,
	},
	nameText: {
		fontSize: 24,
		color: '#fff',
		fontWeight: 'bold',
		marginRight: 4,
	},
	badgeIcon: {
		marginLeft: 5,
	},
	locationText: {
		fontSize: 16,
		color: '#d1d5db',
		fontWeight: '300',
		marginTop: -10,
	},
	actionButton: {
		backgroundColor: '#fff',
		padding: 15,
		borderRadius: 30,
		left: 90,
		top: 15,
	},
	context: {
		flexDirection: 'row',
		alignItems: 'flex-start',
	},
	subheaderText: {
		fontSize: 14,
		color: '#555',
	},
	info: {
		left: 10,
	},
	drawer: {
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		width: width * 0.75, // Adjust size of the drawer
		backgroundColor: 'white',
		zIndex: 1,
		elevation: 5, // Adds shadow on Android
	},
	drawerContent: {
		flex: 1,
		paddingTop: 40,
		paddingLeft: 20,
	},
	drawerHeader: {
		fontSize: 24,
		fontWeight: 'bold',
	},
	drawerItem: {
		fontSize: 16,
		color: '#333',
		fontWeight: '500',
	},

	gradientOverlay: {
		position: 'absolute',
		bottom: 0,
		width: '100%',
		height: '40%',
		borderBottomLeftRadius: 20,
		borderBottomRightRadius: 20,
	},
	overlay: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: 'rgba(0, 0, 0, 0.3)',
		zIndex: 0,
	},
	drawerHeaderContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 1,
		marginBottom: 20,
		marginTop: 20,
	},
	button: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 40,
		gap: 10,
	},
	drawerIcon: {
		width: 30,
		height: 30,
		resizeMode: 'contain',
	},
	walletIcon: {
		width: 35,
		height: 35,
		resizeMode: 'contain',
		marginRight: -5,
	},
	subText: {
		fontSize: 14,
		color: '#000',
		width: '95%',
		marginBottom: 20,
		borderBottomWidth: 1,
		borderBottomColor: '#888',
		paddingBottom: 10,
	},
	signoutText: {
		fontSize: 16,
		color: colors.primary,
		fontWeight: '500',
	},
	// modal
	verificationContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 20,
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
	},
	modalOverlay: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
	},
	modalContent: {
		backgroundColor: 'white',
		padding: 20,
		borderRadius: 10,
		alignItems: 'center',
		width: '80%',
		maxWidth: 300,
	},
	modalTitle: {
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 10,
	},
	modalMessage: {
		fontSize: 16,
		marginBottom: 20,
		textAlign: 'center',
	},
	modalbutton: {
		backgroundColor: colors.primary,
		padding: 10,
		borderRadius: 5,
		width: '100%',
		alignItems: 'center',
	},
	modalbuttonText: {
		color: '#fff',
		fontSize: 16,
	},
	icon: {
		width: 60,
		height: 60,
		resizeMode: 'contain',
		marginBottom: 10,
	},
});
