import React from 'react';
import {
	View,
	Text,
	Image,
	TouchableOpacity,
	StyleSheet,
	Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
// import useChatStore from '../stores/useChatStore'; // Assuming you're using Zustand

const ChatHeader = ({ navigation, selectedUser }) => {
	// const { setSelectedUser } = useChatStore();

	console.log('selectedUser', selectedUser);
	const handleClick = (item) => {
		console.log(item);
		// setSelectedUser(item); // Ensure the selected user is updated in the store
		// navigation.navigate('UserProfile', {
		// 	userId: item.id,
		// 	userName: item.name,
		// }); // Pass the user details here
	};

	return (
		<View style={styles.header}>
			<TouchableOpacity onPress={() => navigation.goBack()}>
				<Ionicons name="arrow-back" size={24} color="#000" />
			</TouchableOpacity>
			<Image
				source={
					selectedUser.profileImage
						? { uri: selectedUser?.profileImage }
						: require('../assets/dates/8.jpg')
				}
				style={styles.headerProfileImage}
			/>
			<Pressable
				style={styles.headerDetails}
				onPress={() => handleClick(selectedUser)}
			>
				<Text style={styles.headerName}>{selectedUser?.name}</Text>
				<Text style={styles.headerStatus}>
					{selectedUser?.status || 'Online'}
				</Text>
			</Pressable>
			<TouchableOpacity style={styles.headerIcon}>
				<Ionicons name="flag-outline" size={24} color="#000" />
			</TouchableOpacity>
		</View>
	);
};

export default ChatHeader;

const styles = StyleSheet.create({
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 10,
		backgroundColor: '#FFFFFF',
		borderBottomWidth: 1,
		borderBottomColor: '#DDD',
		marginTop: 35,
	},
	headerProfileImage: {
		width: 40,
		height: 40,
		borderRadius: 20,
		marginLeft: 10,
	},
	headerDetails: {
		flex: 1,
		marginLeft: 10,
	},
	headerName: {
		fontSize: 18,
		fontWeight: 'bold',
	},
	headerStatus: {
		fontSize: 14,
		color: '#888',
	},
	headerIcon: {
		marginLeft: 10,
	},
});
