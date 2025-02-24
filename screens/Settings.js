import React from 'react';
import {
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	TouchableOpacity,
	Pressable,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as SecureStore from 'expo-secure-store';
import useStore from '../stores/useStore';
import useTokenStore from '../stores/useTokenStore';

const Settings = ({ navigation }) => {
	const { setUserData, userData } = useStore();
	const { clearTokens } = useTokenStore();
	const handleLogOut = () => {
		setUserData({});
		clearTokens();
		navigation.replace('Login');
	};
	const maskEmail = (email) => {
		const [name, domain] = email.split('@');
		const maskedName = name[0] + '*****';
		return `${maskedName}@${domain}`;
	};

	return (
		<SafeAreaView style={styles.container}>
			{/* Header */}
			<View style={styles.header}>
				<TouchableOpacity
					style={styles.backButton}
					onPress={() => navigation.goBack()}
				>
					<AntDesign name="left" size={24} />
				</TouchableOpacity>
				<Text style={styles.headerText}>Settings</Text>
				<TouchableOpacity style={styles.backButton2}></TouchableOpacity>
			</View>

			{/* Settings Options */}
			<View style={styles.section}>
				<TouchableOpacity style={styles.option}>
					<Text style={styles.optionText}>Basic info</Text>
				</TouchableOpacity>

				<TouchableOpacity style={styles.option}>
					<Text style={styles.optionText}>Account</Text>
					<Text style={styles.subText}>
						{maskEmail(userData?.email || 'abcjkklds@gmail.com')}
					</Text>
					;
				</TouchableOpacity>

				<TouchableOpacity style={styles.option}>
					<Text style={styles.optionText}>Account Preferences</Text>
				</TouchableOpacity>

				<TouchableOpacity style={styles.option}>
					<Text style={styles.optionText}>Personalize your experience</Text>
				</TouchableOpacity>

				<TouchableOpacity style={styles.option}>
					<Text style={styles.optionText}>Help Center</Text>
				</TouchableOpacity>

				<TouchableOpacity style={styles.option}>
					<Text style={styles.optionText}>About</Text>
				</TouchableOpacity>

				<TouchableOpacity style={styles.option}>
					<Text style={styles.optionText}>Blocked users</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={handleLogOut} style={styles.option}>
					<Text style={styles.optionText}>Log out</Text>
				</TouchableOpacity>
			</View>

			{/* Facebook Section */}
			<View style={styles.footer}>
				<Text style={styles.footerText}>
					Join the Sodate party on Facebook!
				</Text>
				<Pressable style={styles.facebookButton}>
					<Text style={styles.facebookText}>👍 Like</Text>
				</Pressable>
			</View>
		</SafeAreaView>
	);
};

export default Settings;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	header: {
		borderBottomWidth: 1,
		borderBottomColor: '#eee',
		flexDirection: 'row',
		alignItems: 'center',
		paddingTop: 50,
		justifyContent: 'space-between',
		paddingHorizontal: 10,
		paddingBottom: 10,
	},
	headerText: {
		fontSize: 20,
		fontWeight: '600',
	},
	section: {
		paddingTop: 10,
	},
	option: {
		paddingVertical: 20,
		paddingHorizontal: 16,
		borderBottomWidth: 1,
		borderBottomColor: '#eee',
	},
	optionText: {
		fontSize: 18,
		color: '#000',
		fontWeight: '400',
	},
	subText: {
		fontSize: 14,
		color: '#888',
		marginTop: 4,
	},
	footer: {
		marginTop: 20,
		alignItems: 'center',
	},
	footerText: {
		fontSize: 14,
		color: '#666',
	},
	facebookButton: {
		marginTop: 10,
		backgroundColor: '#1877f2',
		borderRadius: 5,
		paddingVertical: 6,
		paddingHorizontal: 12,
	},
	facebookText: {
		color: '#fff',
		fontSize: 16,
	},
	backButton2: {
		padding: 15,
	},
	backButton: {
		backgroundColor: '#eee',
		padding: 10,
		borderRadius: 30,
	},
});
