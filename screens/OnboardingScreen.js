import React, { useState, useRef, useEffect } from 'react';
import {
	StyleSheet,
	Text,
	View,
	Image,
	Dimensions,
	FlatList,
	TouchableOpacity,
} from 'react-native';
import colors from '../components/colors';
import * as SecureStore from 'expo-secure-store';
const { width: screenWidth } = Dimensions.get('window');

const OnboardingScreen = ({ navigation }) => {
	const flatListRef = useRef(null);
	const [activeIndex, setActiveIndex] = useState(0);
	useEffect(() => {
		const isFirstTime = SecureStore.getItem('isFirstTime');
		console.log('isFirstTime', isFirstTime);
		if (isFirstTime) {
			navigation.push('Login');
		}
	}, []);

	const data = [
		{
			title: 'Algorithm',
			description:
				'Users going through a vetting process to ensure you never match with bots.',
			image: require('../assets/images/photo.png'), // replace with your image path
		},
		{
			title: 'Privacy',
			description:
				'Your data is safe with us, ensuring secure and private interactions.',
			image: require('../assets/images/photo2.png'), // replace with your image path
		},
		{
			title: 'Connections',
			description:
				'Meaningful connections that are tailored to your interests and preferences.',
			image: require('../assets/images/photo3.png'), // replace with your image path
		},
	];

	const handelPress = async () => {
		await SecureStore.setItemAsync('isFirstTime', 'isFirstTime');
		navigation.navigate('GetStarted');
	};

	const renderItem = ({ item }) => (
		<View style={styles.slide}>
			<Image source={item.image} style={styles.image} />
			<Text style={styles.title}>{item.title}</Text>
			<Text style={styles.description}>{item.description}</Text>
		</View>
	);

	const onViewableItemsChanged = useRef(({ viewableItems }) => {
		if (viewableItems.length > 0) {
			setActiveIndex(viewableItems[0].index);
		}
	}).current;

	const viewabilityConfig = {
		itemVisiblePercentThreshold: 50,
	};

	return (
		<View style={styles.container}>
			<FlatList
				data={data}
				renderItem={renderItem}
				horizontal
				pagingEnabled
				showsHorizontalScrollIndicator={false}
				keyExtractor={(_, index) => index.toString()}
				onViewableItemsChanged={onViewableItemsChanged}
				viewabilityConfig={viewabilityConfig}
				ref={flatListRef}
			/>

			<View style={styles.dotContainer}>
				{data.map((_, index) => (
					<View
						key={index}
						style={[styles.dot, { opacity: activeIndex === index ? 1 : 0.3 }]}
					/>
				))}
			</View>

			<TouchableOpacity style={styles.button} onPress={handelPress}>
				<Text style={styles.buttonText}>Get Started</Text>
			</TouchableOpacity>
		</View>
	);
};

export default OnboardingScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	slide: {
		width: screenWidth,
		alignItems: 'center',
		padding: 20,
		marginTop: 80,
	},
	image: {
		width: screenWidth * 1,
		height: screenWidth * 1,
		borderRadius: 20,
		marginBottom: 20,
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		color: colors.primary,
		textAlign: 'center',
		marginBottom: 10,
	},
	description: {
		fontSize: 16,
		color: '#707070',
		textAlign: 'center',
		paddingHorizontal: 20,
		marginBottom: 30,
	},
	dotContainer: {
		flexDirection: 'row',
		marginBottom: 30,
	},
	dot: {
		width: 10,
		height: 10,
		borderRadius: 5,
		backgroundColor: colors.primary,
		marginHorizontal: 5,
	},
	button: {
		backgroundColor: colors.primary,
		paddingVertical: 15,
		paddingHorizontal: 40,
		borderRadius: 30,
		marginBottom: 20,
		width: '95%',
		alignSelf: 'center',
		justifyContent: 'center',
	},
	buttonText: {
		color: '#fff',
		fontSize: 16,
		textAlign: 'center',
	},
});
