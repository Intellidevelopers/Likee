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
  ScrollView
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

// Define the types of tab categories and their respective cards
type TabType = 'Market' | 'PRS Team' | 'Legal' | 'Specials';

const Earn = () => {
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

    const [activeTab, setActiveTab] = useState<TabType>('Market');

    const renderCards = (category: TabType) => {
      return (
        <ScrollView>
          <View style={styles.cardContainer}>
            {cardData[category].map((card) => (
              <View key={card.id} style={styles.card}>
                <Image source={card.image} style={styles.image} />
                <View style={styles.cardDetails}>
                  <Text style={styles.cardLabel}>{card.label}</Text>
                  <Text style={styles.profitText}>Profit per hour</Text>
                  <View style={styles.profitContainer}>
                    <Image source={require('../assets/icons/coins.png')} style={styles.coin} />
                    <Text style={styles.cardValue}>{card.profit}</Text>
                  </View>
                  <View style={styles.levelContainer}>
                    <Text style={styles.levelText}>{card.level}</Text>
                    <View style={styles.levelRow}>
                      <Image source={require('../assets/icons/coins.png')} style={styles.levelCoin} />
                      <Text style={styles.levelValue}>{card.coin}</Text>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>

      );
    };
    const cardData = {
      Market: [
        { id: 1, label: 'Market Card 1', profit: '400.92K', level: 'Lvl 1', coin: '900K', image: require('../assets/icons/mc.png') },
        { id: 2, label: 'Market Card 2', profit: '67K', level: 'Lvl 2', coin: '900K', image: require('../assets/icons/x10.png') },
        { id: 3, label: 'Market Card 3', profit: '67K', level: 'Lvl 2', coin: '900K', image: require('../assets/icons/x10.png') },
        { id: 4, label: 'Market Card 4', profit: '67K', level: 'Lvl 2', coin: '900K', image: require('../assets/icons/x10.png') },
        { id: 5, label: 'Market Card 5', profit: '67K', level: 'Lvl 2', coin: '900K', image: require('../assets/icons/x10.png') },
      ],
      'PRS Team': [
        { id: 3, label: 'PRS Card 1', profit: '2K', level: 'Lvl 3', coin: '900K', image: require('../assets/icons/meme.png') },
        { id: 4, label: 'PRS Card 2', profit: '92K', level: 'Lvl 4', coin: '900K', image: require('../assets/icons/x20.png') },
      ],
      Legal: [
        { id: 5, label: 'Legal Card 1', profit: '3000K', level: 'Lvl 5', coin: '900K', image: require('../assets/icons/coins.png') },
        { id: 6, label: 'Legal Card 2', profit: '1M', level: 'Lvl 6', coin: '900K', image: require('../assets/icons/x30.png') },
      ],
      Specials: [
        { id: 7, label: 'Special Card 1', profit: '100K', level: 'Lvl 7', coin: '900K', image: require('../assets/icons/x50.png') },
        { id: 8, label: 'Special Card 2', profit: '156K', level: 'Lvl 8', coin: '900K', image: require('../assets/icons/mc.png') },
      ]
    };
  
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

      {/* Characters Section */}
     <ScrollView style={styles.content}>

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

         <View style={styles.coinContainer}>
                <Image source={require("../assets/icons/coins.png")} style={styles.balanceCoin}/>
                <Text style={styles.coinCount}>{coins.toLocaleString()}</Text>
              </View>


     <View style={styles.characterContainer}>
        <View style={styles.characterBox}>
          <Image
            source={require('../assets/images/dragon.png')}
            style={styles.characterImage}
          />
          <Text style={styles.characterName}>Locus MK</Text>
        </View>
        <View style={styles.characterBox}>
          <Image
            source={require('../assets/images/cute.png')}
            style={styles.characterImage}
          />
          <Text style={styles.characterName}>Airy</Text>
        </View>
        <View style={styles.characterBox}>
          <Image
            source={require('../assets/images/bear.png')}
            style={styles.characterImage}
          />
          <Text style={styles.characterName}>Cybermech</Text>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        {['Market', 'PRS Team', 'Legal', 'Specials'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activetab]}
            onPress={() => setActiveTab(tab as TabType)}
          >
            <Text style={styles.tabText}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Card Section */}
      <View style={styles.cardContainer}>
        {renderCards(activeTab)}
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
     </ScrollView>
    </View>
  );
};

export default Earn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F2630',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 8,
  },
  binanceButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  binanceIcon: {
    width: 25,
    height: 25,
    marginRight: 6,
  },
  binanceText: {
    color: '#FFD700',
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    paddingHorizontal: 16,
  },
  statsBox: {
    alignItems: 'center',
  },
  statsLabel: {
    color: '#aaa',
    fontSize: 12,
  },
  statsValue: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  balanceSection: {
    alignItems: 'center',
    marginVertical: 20,
  },
  balanceValue: {
    color: '#FFD700',
    fontSize: 32,
    fontWeight: 'bold',
  },
  characterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  characterBox: {
    alignItems: 'center',
    borderWidth: 1,
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 15,
    borderColor: '#712405',
    backgroundColor: '#1E242B'
  },
  characterImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 8,
  },
  characterName: {
    color: '#fff',
    fontSize: 12,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    backgroundColor: '#1B2026',
    padding: 5,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 10
  },
  tab: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    padding: 10,
    paddingHorizontal: 15,
    borderRadius: 6
  },
  activetab:{
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    backgroundColor: '#2A3038',
    padding: 10,
    paddingHorizontal: 15,
    borderRadius: 6
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#2A3240',
    borderRadius: 12,
    width: '48%', // Adjusted to evenly distribute space
    marginBottom: 10, // Added spacing between rows
  },
  cardLevel: {
    color: '#FFD700',
    fontSize: 14,
    fontWeight: '700',
  },
  cardLabel: {
    color: '#fff',
    fontSize: 14,
    paddingHorizontal: 12,
    fontWeight: '500'
  },
  cardValue: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: -5,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#2A3240',
    paddingVertical: 10,
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    color: '#aaa',
    fontSize: 10,
    marginTop: 4,
  },
  activeNav: {
    borderBottomWidth: 2,
    borderBottomColor: '#FFD700',
  },
  coin:{
    width: 18,
    height: 18,
    resizeMode: 'contain',
  },
  image:{
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10
  },
  profitContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    borderBottomWidth: 1,
    paddingBottom: 10,
    paddingHorizontal: 12,
    borderBottomColor: '#555',
  },
  profitText:{
    color: '#ddd',
    fontSize: 10,
    paddingHorizontal: 12,

  },
  levelContainer:{
    flexDirection: 'row',
    justifyContent:'space-between',
    marginBottom: 8,
    paddingHorizontal: 12,
  },
  levelCoin:{
    width: 30,
    height: 30,
    resizeMode: 'contain',
    marginTop: -5
  },
  levelRow:{
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    left: -15
  },
  levelValue:{
    color: '#fff',
    fontSize: 14,
    fontWeight: '500'
  },
  levelText:{
    color: '#ddd',
    fontSize: 14,
    paddingHorizontal: 12,
    left: -10, 
    borderRightWidth: 1,
    borderRightColor: '#555'
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
  },
  cardDetails:{

  },
  content:{
    marginBottom: 80
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Allow items to wrap to the next row
    justifyContent: 'space-between',
    padding: 8,
  },
});
