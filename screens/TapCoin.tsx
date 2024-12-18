import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
  FlatList,
  Modal,
  TextInput,
} from "react-native";
import * as Progress from "react-native-progress";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';
import { StatusBar } from "expo-status-bar";

interface Bank {
  id: number;
  name: string;
  icon: any;
}


const TapCoin: React.FC = () => {
  const [coins, setCoins] = useState(0); // Coin count
  const [refillCount, setRefillCount] = useState(6500); // Tank value
  const [progress, setProgress] = useState(1); // Progress bar value
  const [isTapping, setIsTapping] = useState(false); // Tap state
  const babyCoinScale = new Animated.Value(1); // Animation for coin

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [bankName, setBankName] = useState("");
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);

  const banks = [
    { id: 1, name: "Palmpay", icon: require("../assets/banks/palmpay.png") },
    { id: 2, name: "Opay", icon: require("../assets/banks/opay.png") },
    { id: 3, name: "Kuda", icon: require("../assets/banks/kuda.png") },
  ];

  const handleSaveBank = () => {
    if (accountNumber && accountName && selectedBank) {
      setIsModalVisible(false);
    }
  };

  // Function to handle the coin tap animation
  const animateCoin = () => {
    Animated.sequence([
      Animated.timing(babyCoinScale, {
        toValue: 1.1,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(babyCoinScale, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // Handle tapping the baby coin
  const handleTap = () => {
    if (refillCount > 0) {
      setCoins((prev) => prev + 20); // Increase coins
      setRefillCount((prev) => Math.max(prev - 20, 0)); // Decrease refill count
      setProgress((prev) => Math.max(prev - 20 / 6500, 0)); // Decrease progress
      animateCoin(); // Play tap animation
    }
  };

  // Refilling logic when tapping stops
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (!isTapping) {
      interval = setInterval(() => {
        setRefillCount((prev) => {
          if (prev >= 6500) {
            clearInterval(interval);
            return 6500; // Stop refilling when full
          }
          return prev + 10; // Refill by 1 per second
        });

        setProgress((prev) => {
          if (prev >= 1) {
            clearInterval(interval);
            return 1; // Stop increasing progress bar when full
          }
          return prev + 10 / 6500; // Gradually increase progress
        });
      }, 1000);
    }

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [isTapping]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileInfoContainer}>
          <View style={styles.iconContainer}>
            <Image source={require("../assets/icons/baby.png")} style={styles.icon} />
          </View>
          <Text style={styles.userName}>Adeagbo Josiah</Text>
        </View>
        <TouchableOpacity onPress={() => setIsModalVisible(true)}>
          <View style={styles.iconContainer}>
          <Image
              source={
                selectedBank
                  ? selectedBank.icon
                  : require("../assets/icons/baby.png")
              }
              style={styles.bankicon}
            />
            <Text style={styles.btnBinance}>
              {selectedBank ? "Wallet Connected" : "Connect Wallet"}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.stats}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Earn per tap</Text>
          <View style={styles.earnedPerTap}>
          <Image source={require("../assets/icons/coins.png")} style={styles.iconSmall}/>
          <Text style={styles.statValue}>+12</Text>
          </View>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel2}>Coins to level up</Text>
          <Text style={styles.statValue}>10 M</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel3}>Profit per hour</Text>
          <View style={styles.earnedPerTap}>
          <Image source={require("../assets/icons/coins.png")} style={styles.iconSmall}/>
          <Text style={styles.statValue}>+630.37K</Text>
          </View>
        </View>
      </View>
      {/* Display Coin Count */}
      <View style={styles.coinContainer}>
        <Image source={require("../assets/icons/coins.png")} style={styles.balanceCoin}/>
        <Text style={styles.coinCount}>{coins.toLocaleString()}</Text>
      </View>

      <View style={styles.headerContainer}>
        <Text style={styles.epicText}>Epic <AntDesign name="right"/></Text>
        <Text style={styles.levelText}>Level 6/10</Text>
      </View>
      {/* Custom Progress Bar */}
      <View style={styles.progressContainer}>
        <Progress.Bar
          progress={progress}
          width={340}
          borderWidth={0}
          height={8}
          unfilledColor="#2e3138"
        />
        <LinearGradient
          colors={["#ADFAA1", "#C597CC", "#2F39A3"]}
          style={[styles.gradientOverlay, { width: progress * 340 }]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        />
      </View>

      {/* Baby Coin */}
      <TouchableOpacity
        onPressIn={() => {
          setIsTapping(true); // Start tapping
          handleTap();
        }}
        onPressOut={() => setIsTapping(false)} // Stop tapping
        activeOpacity={0.8}
      >
        <Animated.Image
          source={require("../assets/icons/coin.png")}
          style={[styles.babyCoin, { transform: [{ scale: babyCoinScale }] }]}
        />
      </TouchableOpacity>

      {/* Refill Count */}
      <View style={styles.boostContainer}>
        <View style={styles.boostCountContainer}>
          <Image source={require("../assets/icons/boost.png")} style={styles.boostIcon}/>
          <Text style={styles.refillCount}>{refillCount} / 6500</Text>
        </View>

        <TouchableOpacity>
          <Text style={styles.boostButtonText}>Boost</Text>
        </TouchableOpacity>
      </View>
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Select Bank</Text>
          <TouchableOpacity onPress={()   => setIsModalVisible(false)}>
            <Feather name="x" size={24}/>
          </TouchableOpacity>
          </View>
          <FlatList
            data={banks}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }: { item: Bank }) => (
              <TouchableOpacity
                style={[
                  styles.bankOption,
                  selectedBank?.id === item.id && styles.selectedBankOption, // Highlight selected bank
                ]}
                onPress={() => setSelectedBank(item)}
              >
                <Image source={item.icon} style={styles.bankIcon} />
                <Text style={styles.bankName}>{item.name}</Text>
                {selectedBank?.id === item.id && (
                  <AntDesign name="check" size={20} color="green" style={styles.checkMark} />
                )}
              </TouchableOpacity>
            )}
          />

          <Text style={styles.description}>
            Connect your bank account to unlock more features and earn more coins.
          </Text>

          <View style={styles.buttonContainer}>
          <TextInput
            style={styles.input}
            placeholder="Account Number"
            value={accountNumber}
            keyboardType="number-pad"
            onChangeText={setAccountNumber}
          />
          <TextInput
            style={styles.input}
            placeholder="Account Name"
            value={accountName}
            onChangeText={setAccountName}
          />
          <TouchableOpacity style={styles.saveButton} onPress={handleSaveBank}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <StatusBar style="light" backgroundColor="#1a1a2e" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a2e",
  },
  coinCount: {
    color: "#fff",
    fontSize: 40,
    textAlign: "center",
    marginVertical: 20,
    fontWeight: '700',
    marginBottom: 15
  },
  progressBar: {
    marginVertical: 20,
    alignSelf: 'center'
  },
  babyCoin: {
    width: 300,
    height: 300,
    alignSelf: "center",
    resizeMode: 'contain',
    marginTop: 30,
  },
  refillCount: {
    color: "#fff",
    textAlign: "center",
    fontSize: 15,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 45,
    paddingHorizontal: 10,
    marginBottom: 20
  },
  userName: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  btnBinance: {
    color: "#fff",
    backgroundColor: "#2e3138",
    borderRadius: 10,
    marginLeft: 10
  },
  stats: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
    paddingHorizontal: 10,
    marginBottom: -10
  },
  statItem: {
    alignItems: "center",
    backgroundColor: "#2e3138",
    padding: 10,
    paddingHorizontal: 15,
    borderRadius: 10
  },
  statValue: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "500",
  },
  statLabel: {
    color: "#F79841",
    fontSize: 12,
  },
  statLabel2: {
    color: "#6F72E2",
    fontSize: 12,
  },
  statLabel3: {
    color: "#84CB69",
    fontSize: 12,
  },
  boost: {
    color: "#f1c40f",
    textAlign: "center",
    fontWeight: "bold",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: '#32363C',
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: '95%',
    alignSelf: "center",
    borderRadius: 15,
    marginTop: 'auto',
    marginBottom: 20
  },
  navItem: {
    padding: 10,
    alignItems: "center",
  },
  icon:{
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  iconContainer:{
    backgroundColor: "#2e3138",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    flexDirection: 'row'
  },
  profileInfoContainer:{
    flexDirection: "row",
    alignItems: "center",
    gap: 5
  },
  iconSmall:{
    width: 16,
    height: 16,
    resizeMode: "contain",
  },
  earnedPerTap:{
    flexDirection:'row',
    alignItems: "center",
    gap: 3
  },
  balanceCoin:{
    width: 50,
    height: 50,
    resizeMode: "contain",
    transform: [{ rotate: "-30deg" }]
  },
  coinContainer:{
    justifyContent: "center",
    alignItems: "center",
    flexDirection: 'row',
    marginTop: 10

  },
  boostIcon:{
    width: 25,
    height: 25,
    resizeMode: "contain",
  },
  boostContainer:{
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    alignItems: "center",
    marginTop: 30
  },
  boostCountContainer:{
    flexDirection: "row",
    alignItems: "center",
    gap: 5
  },
  boostButtonText:{
    color: "#fff",
    fontWeight: "600",
    fontSize: 15
  },
  progressContainer: {
    position: "relative",
    height: 8,
    width: 340,
    marginVertical: 5,
    backgroundColor: "#2e3138",
    borderRadius: 5,
    overflow: "hidden",
    alignSelf: 'center',
  },
  gradientOverlay: {
    position: "absolute",
    height: 8,
    borderRadius: 5,
  },
  headerContainer:{
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  epicText:{
    color: "#fff",
    fontSize: 12,
  },
  levelText:{
    color: "#fff",
    fontSize: 12,
  },
  tabText:{
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
    marginTop: 5
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    padding: 10,
  },
  modalTitle: {
    color: "#000",
    fontSize: 18,
    textAlign: "center",
    fontWeight: '700'
  },
  input: {
    backgroundColor: "#ddd",
    borderRadius: 10,
    color: "#000",
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: "#4caf50",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  bankOption: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    borderColor: "#eee",
    justifyContent: "space-between",
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: '#f5f5f5'

  },
  selectedBankOption: {
    backgroundColor: "#e6f7e6", // Optional: Light green background for selected bank
    borderWidth: 1,
    borderColor: "#4caf50", // Green border for selected bank
  },
  bankIcon: {
    width: 40,
    height: 40,
    resizeMode: "contain",
    marginRight: 10,
    borderRadius: 50,
  },
  bankName: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  checkMark: {
    marginLeft: "auto", // Push to the flex end
  },
  buttonContainer:{
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 10
  },
  description:{
    color: "#000",
    marginTop: 10,
    marginBottom: 20,
    textAlign: "center",
    fontSize: 12
  },
  modalHeader:{
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    marginBottom: 40,
  },
  bankicon:{
    width: 20,
    height: 20,
    resizeMode: "contain",
    padding: 5,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default TapCoin;
