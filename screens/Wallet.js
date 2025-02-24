import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';

const Wallet = () => {
  return (
		<View style={styles.container}>
			<View style={styles.header}>
				<View>
					<Text style={styles.headerText}>My Wallet</Text>
					<Text style={styles.connectText}>Your reward earnings</Text>
				</View>
				<TouchableOpacity>
					<Text style={styles.connectText}>Fund wallet</Text>
				</TouchableOpacity>
			</View>

			<View style={styles.balanceCard}>
				<Text style={styles.balanceTitle}>Current Balance</Text>
				<Text style={styles.balanceAmount}>NGN 12,500.00</Text>
				<Text style={styles.subText}>Available for transactions</Text>
			</View>

			{/* Action Buttons */}
			<View style={styles.buttonsContainer}>
				<TouchableOpacity style={styles.button}>
					<Text style={styles.buttonText}>Withdraw</Text>
				</TouchableOpacity>
				<TouchableOpacity style={[styles.button, styles.payButton]}>
					<Text style={styles.buttonText}>Send</Text>
				</TouchableOpacity>
			</View>

			<View style={styles.transactionSection}>
				<Text style={styles.sectionTitle}>Transaction History</Text>
				<ScrollView showsVerticalScrollIndicator={false}>
					<View style={styles.transactionItem}>
						<View>
							<Text style={styles.transactionDesc}>Withdrawal</Text>
							<Text style={styles.from}>success</Text>
						</View>
						<View>
							<Text style={styles.transactionAmount}>-$500.00</Text>
							<Text style={styles.transactionDate}>2024-06-16</Text>
						</View>
					</View>

					<View style={styles.transactionItem}>
						<View>
							<Text style={styles.transactionDesc}>Transfer</Text>
							<Text style={styles.from}>success</Text>
						</View>
						<View>
							<Text style={styles.receivedAmount}>-$300.00</Text>
							<Text style={styles.transactionDate}>2024-06-14</Text>
						</View>
					</View>
					<View style={styles.transactionItem}>
						<View>
							<Text style={styles.transactionDesc}>Transfer</Text>
							<Text style={styles.from}>success</Text>
						</View>
						<View>
							<Text style={styles.receivedAmount}>-$300.00</Text>
							<Text style={styles.transactionDate}>2024-06-14</Text>
						</View>
					</View>
					<View style={styles.transactionItem}>
						<View>
							<Text style={styles.transactionDesc}>Transfer</Text>
							<Text style={styles.from}>success</Text>
						</View>
						<View>
							<Text style={styles.receivedAmount}>-$300.00</Text>
							<Text style={styles.transactionDate}>2024-06-14</Text>
						</View>
					</View>
					<View style={styles.transactionItem}>
						<View>
							<Text style={styles.transactionDesc}>Transfer</Text>
							<Text style={styles.from}>success</Text>
						</View>
						<View>
							<Text style={styles.receivedAmount}>-$300.00</Text>
							<Text style={styles.transactionDate}>2024-06-14</Text>
						</View>
					</View>
					<View style={styles.transactionItem}>
						<View>
							<Text style={styles.transactionDesc}>Transfer</Text>
							<Text style={styles.from}>success</Text>
						</View>
						<View>
							<Text style={styles.receivedAmount}>-$300.00</Text>
							<Text style={styles.transactionDate}>2024-06-14</Text>
						</View>
					</View>
					<View style={styles.transactionItem}>
						<View>
							<Text style={styles.transactionDesc}>Transfer</Text>
							<Text style={styles.from}>success</Text>
						</View>
						<View>
							<Text style={styles.receivedAmount}>-$300.00</Text>
							<Text style={styles.transactionDate}>2024-06-14</Text>
						</View>
					</View>
					<View style={styles.transactionItem}>
						<View>
							<Text style={styles.transactionDesc}>Transfer</Text>
							<Text style={styles.from}>success</Text>
						</View>
						<View>
							<Text style={styles.receivedAmount}>-$300.00</Text>
							<Text style={styles.transactionDate}>2024-06-14</Text>
						</View>
					</View>
					<View style={styles.inssuredprivacy}>
						<Text style={styles.inssuredprivacyText}>Transaction Privacy</Text>
						<Text style={styles.inssuredprivacySubText}>
							Your wallet is protected by Inssured Privacy, which means all your
							transactions are encrypted and secure.
						</Text>
					</View>
				</ScrollView>
			</View>
			<Toast />
			<StatusBar style="light" backgroundColor="#001734" />
		</View>
	);
};

export default Wallet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingHorizontal: 16,
    backgroundColor: '#001734',
    marginTop: 35,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    justifyContent:'space-between',
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
  balanceCard: {
    backgroundColor: '#001734',
    margin: 16,
    padding: 20,
    borderRadius: 10,
    width: '97%',
    alignSelf: 'center'
  },
  balanceTitle: {
    color: '#D0E7FF',
    fontSize: 16,
  },
  balanceAmount: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFF',
    marginTop: 5,
  },
  subText: {
    color: '#D0E7FF',
    fontSize: 12,
    marginTop: 8,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  button: {
    backgroundColor: '#28A745',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    elevation: 2,
    width: '45%',
    alignItems: 'center',
  },
  payButton: {
    backgroundColor: '#001734',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center'
  },
  transactionSection: {
    marginHorizontal: 16,
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  transactionItem: {
    backgroundColor: '#f6f6f6',
    padding: 16,
    borderRadius: 10,
    marginVertical: 6,
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'center',
    paddingHorizontal: 10
  },
  transactionDesc: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500'
  },
  transactionAmount: {
    fontSize: 14,
    color: '#FF3B30',
    marginTop: 5,
  },
  receivedAmount: {
    color: '#28A745',
  },
  transactionDate: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
  },
  inssuredprivacy:{
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto'
  },
  inssuredprivacyText:{
    fontSize: 14,
    color: '#000',
    fontWeight: '600',
    marginBottom: 5,
  },
  inssuredprivacySubText:{
    fontSize: 12,
    color: '#001734',
    fontWeight: '400',
    textAlign: 'center',
  },
  from:{
    fontSize: 12,
    color: '#000',
    fontWeight: '400',
  },
  connectText:{
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  }
});
