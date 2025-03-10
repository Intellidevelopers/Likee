import React, { useEffect, useState } from 'react';
import {
	View,
	Text,
	ScrollView,
	TouchableOpacity,
	StyleSheet,
	Image,
	Pressable,
} from 'react-native';
import {
	Ionicons,
	MaterialIcons,
	FontAwesome,
	SimpleLineIcons,
	Octicons,
} from '@expo/vector-icons';
import useChatStore from '../stores/useChatStore';
import { sendPushNotification } from '../utils/notifications'; // Assuming this is the function to send notifications
import { useQuery } from '@tanstack/react-query';
import { fetchChats } from '../api';
import LoaderModal from '../components/Loader';
import useTokenStore from '../stores/useTokenStore';
import Toast from 'react-native-toast-message';

const Chats = ({ navigation }) => {
	const { setSelectedChat } = useChatStore();
	const [likedData, setLikedData] = useState([1, 2, 3, 4]);
	const [chatsData, setChatsData] = useState([]);
	// Access user profile from Zustand store
	const { accessToken } = useTokenStore();
	const { data, isLoading } = useQuery({
		queryKey: ['chats'],
		queryFn: async () => fetchChats(accessToken),
	});
	useEffect(() => {
		if (data) {
			// console.log('data chats', data);
			if (data?.likes?.length > 0) {
				setLikedData(data?.likes);
			}
			if (data?.chats?.length > 0) {
				setChatsData(data?.chats);
			}
		}
	}, [data]);

	const handleMessagePress = (message) => {
		// setSelectedMessage(message); // Set the selected message
		console.log('selected message', message);
		setSelectedChat(message); // Set the selected user
		navigation.navigate('ChatScreen'); // Navigate to the ChatScreen
		// Trigger push notification when user opens the chat
		sendPushNotification(message); // Call function to send notification
	};

	return (
		<View style={styles.container}>
			<View style={styles.HeaderRow}>
				<Text style={styles.header}>Chats</Text>
				<View style={styles.miniContainer}>
					<TouchableOpacity onPress={() => navigation.navigate('Activities')}>
						<SimpleLineIcons name="speedometer" size={24} color="black" />
					</TouchableOpacity>
					<TouchableOpacity onPress={() => navigation.navigate('Notification')}>
						<Octicons name="bell-fill" size={24} color="black" />
					</TouchableOpacity>
				</View>
			</View>

			{/* Likes and Matches Row */}
			<View style={styles.likesContainer}>
				<Text style={styles.subHeader}>Likes and matches</Text>
				<ScrollView
					horizontal
					showsHorizontalScrollIndicator={false}
					style={styles.likesScroll}
				>
					{likedData &&
						likedData.length > 0 &&
						likedData?.map((item, index) => (
							<View key={index} style={styles.likeProfile}>
								<Image
									source={require('../assets/images/user3.jpg')} // Replace with real image URLs
									style={styles.likeImage}
									blurRadius={30}
								/>
								{index === 0 && (
									<View style={styles.badge}>
										<FontAwesome name="heart" size={12} color="white" />
										<Text style={styles.badgeText}>3</Text>
									</View>
								)}
								<Text style={styles.likeLabel}>Likes</Text>
							</View>
						))}
				</ScrollView>
			</View>

			{/* Messages Header */}
			<View style={styles.messagesHeader}>
				<Text style={styles.messagesTitle}>Messages</Text>
				<TouchableOpacity style={styles.sortButton}>
					<MaterialIcons name="sort" size={24} color="black" />
					<Text style={styles.sortText}>Sort by</Text>
				</TouchableOpacity>
			</View>

			{/* Message List */}
			<ScrollView contentContainerStyle={styles.content}>
				{chatsData?.map((message) => {
					// console.log('message', message.participants);
					return (
						<Pressable
							style={styles.messageItem}
							key={message._id}
							onPress={() => handleMessagePress(message)}
						>
							<Image
								source={
									message?.participants[0].profileImage
										? { uri: message?.participants[0].profileImage }
										: require('../assets/dates/1.jpg')
								}
								style={styles.contactImage}
							/>
							<View style={styles.messageTextContainer}>
								<Text style={styles.contactName}>
									{message?.participants[0].name}
								</Text>
								<Text style={styles.contactMessage}>
									{message?.lastMessage?.message}
								</Text>
							</View>
							<Ionicons name="chatbubbles-outline" size={20} color="gray" />
						</Pressable>
					);
				})}
			</ScrollView>

			{isLoading && <LoaderModal loading={isLoading} text="Loading ..." />}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		padding: 10,
	},
	header: {
		fontSize: 28,
		fontWeight: 'bold',
	},
	subHeader: {
		fontSize: 16,
		fontWeight: '600',
		marginBottom: 5,
	},
	likesContainer: {
		marginBottom: 15,
	},
	likesScroll: {
		flexDirection: 'row',
	},
	likeProfile: {
		alignItems: 'center',
		marginRight: 15,
	},
	likeImage: {
		width: 60,
		height: 60,
		borderRadius: 30,
		marginBottom: 5,
	},
	likeLabel: {
		fontSize: 12,
		color: '#444',
	},
	badge: {
		position: 'absolute',
		top: 40,
		right: 5,
		backgroundColor: 'red',
		borderRadius: 10,
		padding: 3,
		flexDirection: 'row',
		alignItems: 'center',
	},
	badgeText: {
		color: 'white',
		marginLeft: 3,
		fontSize: 10,
	},
	messagesHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 10,
	},
	messagesTitle: {
		fontSize: 18,
		fontWeight: 'bold',
	},
	sortButton: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	sortText: {
		fontSize: 16,
		marginLeft: 5,
		fontWeight: 'bold',
	},
	messageItem: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 15,
		justifyContent: 'center',
	},
	contactImage: {
		width: 60,
		height: 60,
		borderRadius: 30,
		marginRight: 10,
	},
	messageTextContainer: {
		flex: 1,
	},
	contactName: {
		fontSize: 16,
		fontWeight: 'bold',
	},
	contactMessage: {
		fontSize: 14,
		color: '#666',
		width: '95%',
	},
	bottomNav: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		paddingVertical: 10,
		borderTopWidth: 1,
		borderTopColor: '#ddd',
	},
	navText: {
		fontSize: 12,
	},
	HeaderRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginTop: 40,
		marginBottom: 10,
	},
	miniContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		gap: 30,
	},

	// Added padding to ensure no content gets hidden by the bottom tabs
	content: {
		paddingBottom: 60, // Adjust padding to prevent the content from being hidden under the bottom tabs
	},
});

export default Chats;
