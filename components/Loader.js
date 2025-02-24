import colors from '../components/colors';
import React from 'react';
import {
	View,
	Text,
	Modal,
	StyleSheet,
	ActivityIndicator,
	Image,
} from 'react-native';

const LoaderModal = ({ loading = true, text = 'Loading' }) => {
	return (
		<Modal animationType="slide" transparent={true} visible={loading}>
			<View style={styles.modalContainer}>
				<View style={styles.modalContent}>
					<Image
						source={require('../assets/logo/logo.png')}
						style={styles.logo}
					/>
					<ActivityIndicator
						animating={loading}
						size={'large'}
						color={colors.primary}
					/>
					<Text style={styles.modalText}>{text}</Text>
				</View>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	modalContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		// backgroundColor: 'rgba(73, 72, 72, 0.5)',
		backgroundColor: 'white',
	},
	modalContent: {
		// backgroundColor: colors.white,
		padding: 22,
		borderRadius: 4,
		width: '80%',
		alignItems: 'center',
	},
	modalText: {
		fontSize: 18,
		color: colors.primary,
		marginBottom: 10,
	},
	logo: {
		width: 220,
		height: 220,
		resizeMode: 'contain',
		marginBottom: 20,
	},
});

export default LoaderModal;
