import React, {useState} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, Pressable } from 'react-native';
import { Ionicons, FontAwesome, MaterialCommunityIcons, AntDesign, FontAwesome5 } from '@expo/vector-icons';
import colors from '../components/colors';
import { ScrollView } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

const { width } = Dimensions.get('window');

const PROFILE_SIZE = 120; // Diameter of the profile picture
const STROKE_WIDTH = 10; // Width of the progress bar stroke
const RADIUS = (PROFILE_SIZE - STROKE_WIDTH) / 2; // Radius for the circle
const CIRCUMFERENCE = 2 * Math.PI * RADIUS; // Circumference of the progress bar

const Profile = ({ navigation, progress = 100 }) => {
  const strokeDashoffset = CIRCUMFERENCE - (CIRCUMFERENCE * progress) / 100;
  const [activeTab, setActiveTab] = useState('Plans'); // Track active tab
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity>
            <Ionicons name="settings" size={24} color="black" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
            <FontAwesome5 name="user-edit" size={24} color="black" style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Profile Section */}
      <View style={styles.profileSection}>
      {/* Circular Progress Container */}
      <View style={styles.progressContainer}>
        <Svg height={PROFILE_SIZE} width={PROFILE_SIZE}>
          {/* Background Circle */}
          <Circle
            cx={PROFILE_SIZE / 2}
            cy={PROFILE_SIZE / 2}
            r={RADIUS}
            stroke="#e6e6e6"
            strokeWidth={STROKE_WIDTH}
            fill="transparent"
          />
          {/* Progress Circle */}
          <Circle
            cx={PROFILE_SIZE / 2}
            cy={PROFILE_SIZE / 2}
            r={RADIUS}
            stroke={colors.primary}
            strokeWidth={STROKE_WIDTH}
            fill="transparent"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </Svg>
        {/* Profile Image */}
        <Image
          source={require('../assets/images/user2.png')} // Replace with actual image URL
          style={styles.profileImage}
        />
        {/* Progress Percentage */}
        <View style={styles.tag}>
          <Text style={styles.progressText}>{progress}%</Text>
        </View>
      </View>

      {/* User Info */}
      <View style={styles.userInfo}>
        <Text style={styles.userName}>Adeagbo ..., 29</Text>
        <View style={styles.statusContainer}>
          <Text style={styles.statusText}>
            <AntDesign name="heart" color={colors.black} /> Ready for a relationship
          </Text>
        </View>
      </View>
    </View>
      <ScrollView
        showsVerticalScrollIndicator={false} // Hides the scroll bar for a cleaner UI
      >
      {/* Boost Section */}
      <View style={styles.boostSectionContainer}>
      <TouchableOpacity style={styles.boostSection} onPress={() => navigation.navigate('Upload')}>
        <View style={styles.cameraContainer}>
          <Ionicons name="camera" size={20} color="#000" />
        </View>
        <Text style={styles.boostText}>Boost your dating odds with an extra profile photo</Text>
        <Ionicons name="chevron-forward-outline" size={20} color="gray" />
      </TouchableOpacity>

      {/* Tabs Section */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity onPress={() => setActiveTab('Plans')}>
          <Text style={[styles.tabText, activeTab === 'Plans' && styles.activeTab]}>Plans</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('Safety')}>
          <Text style={[styles.tabText, activeTab === 'Safety' && styles.activeTab]}>Safety</Text>
        </TouchableOpacity>
      </View>
      </View>

      {activeTab === 'Plans' ? (
      
      <View style={styles.activityLayersContainer}>
        <View style={styles.infoContainer}>
          <TouchableOpacity style={styles.infoBox} onPress={() => navigation.navigate('Activities')}>
            <MaterialCommunityIcons name="speedometer" size={24} color="#FF4D4D" />
            <View>
              <Text style={styles.infoText}>Your activity</Text>
              <Text style={styles.infoDetail}>Very low</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.infoBox} onPress={() => navigation.navigate('Credit')}>
            <Ionicons name="wallet-outline" size={24} color="#9146FF" />
            <View>
              <Text style={styles.infoText}>Credits</Text>
              <Text style={styles.infoDetail}>Add</Text>
            </View>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal style={styles.content} showsHorizontalScrollIndicator={false}>
        <View style={styles.subscriptionContainer}>
          <Text style={styles.subscriptionTitle}>MATCHARENAL EXTRA</Text>
          <TouchableOpacity style={styles.extraButton}>
            <Text style={styles.extraText}>Get Extra (from ₦900)</Text>
          </TouchableOpacity>

          <View style={styles.planTag1}>
            <Text style={styles.label}>My plan</Text>
          </View>

          <View style={styles.subscriptionItems}>
          <View style={styles.planRow}>
            <Text style={styles.planText}>Never run out of swipes</Text>
            <View style={styles.head}>
              <Text style={styles.headText}>Free</Text>
              <Ionicons name="close-outline" size={20} color="#fff" />
            </View>

            <View style={styles.head}>
              <Text style={styles.headText}>Free</Text>
              <Ionicons name="checkmark-outline" size={20} color="#fff" />
            </View>
          </View>
          <View style={styles.planRow}>
            <Text style={styles.planText}>Bonus credits on credit purchases</Text>
            <View style={styles.heads}>
              <Ionicons name="close-outline" size={20} color="#fff" />
            </View>

            <View style={styles.heads}>
              <Ionicons name="checkmark-outline" size={20} color="#fff" />
            </View>
          </View>
          <View style={styles.planRow}>
            <Text style={styles.planText}>Remove ads</Text>
            <View style={styles.heads}>
              <Ionicons name="close-outline" size={20} color="#fff" />
            </View>

            <View style={styles.heads}>
              <Ionicons name="checkmark-outline" size={20} color="#fff" />
            </View>
          </View>

          <TouchableOpacity style={styles.touchableOpacity}>
            <Text style={styles.btnText}>All Features</Text>
          </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.subscriptionContainer2}>
          <Text style={styles.subscriptionTitle}>MATCHARENAL PREMIUM</Text>
          <TouchableOpacity style={styles.extraButton}>
            <Text style={styles.extraText}>Get Extra (from ₦1,500)</Text>
          </TouchableOpacity>
          <View style={styles.planTag}>
            <Text style={styles.label}>My plan</Text>
          </View>
          <View style={styles.subscriptionItems}>
          <View style={styles.planRow}>
            <Text style={styles.planText}>See who liked you</Text>
            <View style={styles.head}>
              <Text style={styles.headText}>Free</Text>
              <Ionicons name="close-outline" size={20} color="#fff" />
            </View>

            <View style={styles.head}>
              <Text style={styles.headText}>Premium</Text>
              <Ionicons name="checkmark-outline" size={20} color="#fff" />
            </View>
          </View>
          <View style={styles.planRow}>
            <Text style={styles.planText}>Bonus credits on credit purchases</Text>
            <View style={styles.premium}>
              <Ionicons name="close-outline" size={20} color="#fff" />
            </View>

            <View style={styles.premium}>
              <Ionicons name="checkmark-outline" size={20} color="#fff" />
            </View>
          </View>
          <View style={styles.planRow}>
            <Text style={styles.planText}>Get unlimited filters</Text>
            <View style={styles.premium}>
              <Ionicons name="close-outline" size={20} color="#fff" />
            </View>

            <View style={styles.premium}>
              <Ionicons name="checkmark-outline" size={20} color="#fff" />
            </View>
          </View>

          <TouchableOpacity style={styles.touchableOpacity}>
            <Text style={styles.btnText}>All Features</Text>
          </TouchableOpacity>
          </View>
        </View>
        </ScrollView>
      </View>
      ) : (
        <View style={styles.safetyLayersContainer}>
          <View style={styles.safetyContainer}>
            <Pressable
                style={({ pressed }) => [
                  styles.safetyBox,
                  { backgroundColor: pressed ? '#e0e0e0' : '#fff' }
                ]}
                onPress={() => console.log('Pressed!')}
              >
                <View style={styles.cameraContainer}>
                  <MaterialCommunityIcons name="shield-check" size={18} color="#000" />
                </View>
                <View>
                  <Text style={styles.infoDetail}>Get help from Matcharenal</Text>
                </View>
            </Pressable>

            
            <Pressable
                style={({ pressed }) => [
                  styles.safetyBox,
                  { backgroundColor: pressed ? '#e0e0e0' : '#fff' }
                ]}
                onPress={() => console.log('Pressed!')}
              >
              <MaterialCommunityIcons name="incognito-circle" size={33} color="#000" />
              <View>
                <Text style={styles.infoDetail}>Turn on invisible mode</Text>
                <Text style={styles.subText}>Go invisible to browse privately</Text>
              </View>
              <AntDesign name='right' size={20} style={{left: 40}} />
            </Pressable>

            <Pressable
                style={({ pressed }) => [
                  styles.safetyBox,
                  { backgroundColor: pressed ? '#e0e0e0' : '#fff' }
                ]}
                onPress={() => console.log('Pressed!')}
              >
              <View style={styles.cameraContainer}>
                <MaterialCommunityIcons name="shield-check" size={18} color="#000" />
              </View>
              <View>
                <Text style={styles.infoDetail}>Manage your privacy</Text>
                <Text style={styles.subText}>Choose what information you share</Text>
              </View>
              <AntDesign name='right' size={20} style={{left: 15}} />
            </Pressable>
          </View>
        </View>
      )}
      </ScrollView>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingTop: 40,
    padding: 16
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 15,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  progressContainer: {
    position: 'relative',
    width: PROFILE_SIZE,
    height: PROFILE_SIZE,
  },
  profileImage: {
    width: PROFILE_SIZE - STROKE_WIDTH,
    height: PROFILE_SIZE - STROKE_WIDTH,
    borderRadius: (PROFILE_SIZE - STROKE_WIDTH) / 2,
    position: 'absolute',
    top: STROKE_WIDTH / 2,
    left: STROKE_WIDTH / 2,
  },
  progressTextContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.white,
    textAlign: 'center',
  },
  userInfo: {
    alignItems: 'center',
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20
  },
  statusContainer: {
    backgroundColor: '#e0e0e0',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 5,
  },
  statusText: {
    fontSize: 14,
    color: '#333',
  },
  statusContainer: {
    backgroundColor: '#e0e0e0',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 5,
  },
  statusText: {
    fontSize: 14,
    color: '#333',
    alignItems: 'center',
  },
  boostSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  boostText: {
    flex: 1,
    marginLeft: 10,
    color: colors.black,
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: -15,
  },
  tabText: {
    fontSize: 16,
    paddingBottom: 5,
    color: 'gray',
    width: 165,
    textAlign: 'center',
  },
  activeTab: {
    color: '#9146FF',
    borderBottomWidth: 2,
    borderBottomColor: '#9146FF',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingTop: 10
  },
  safetyContainer:{
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingTop: 10
  },
  infoBox: {
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    flexDirection: 'row',
    width: 160,
    gap: 20,
  },
  safetyBox:{
    alignItems: 'center',
    padding: 25,
    backgroundColor: '#fff',
    borderRadius: 20,
    flexDirection: 'row',
    width: '100%',
    gap: 20,
    marginBottom: 15
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  infoDetail: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
  cameraContainer:{
    backgroundColor: colors.periwinkle,
    padding: 8,
    borderRadius: 30
  },
  activityLayersContainer:{
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  safetyLayersContainer:{
    flex: 1,
    backgroundColor: colors.greyBackground,
    padding: 10,
    paddingBottom: 40
  },
  boostSectionContainer:{
    padding: 16,
  },
  scrollViewContainer: {
    paddingHorizontal: 10, // Add padding to the ScrollView for proper spacing
    flexDirection: 'row', // Ensure cards align horizontally
    alignItems: 'center', // Vertically align the cards
    gap: 16, // Add consistent spacing between the cards1A0610
  },
  subscriptionContainer: {
    backgroundColor: '#600230',
    borderRadius: 20,
    padding: 15,
    width: 315, // Ensure all cards have consistent width
    marginRight: 10, // Add spacing between cards
    alignSelf: 'center', // Align card within the ScrollView
  },
  subscriptionContainer2: {
    backgroundColor: '#1A0610',
    borderRadius: 20,
    padding: 15,
    width: 312, // Ensure all cards have consistent width
    marginRight: 10, // Add spacing between cards
    alignSelf: 'center', // Align card within the ScrollView
  },
  subscriptionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  planRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  planText: {
    color: '#fff',
    flex: 1,
    fontSize: 13
  },
  content:{
    paddingBottom: 60
  },
  extraButton:{
    backgroundColor: colors.white,
    padding: 15,
    borderRadius: 30,
    marginBottom: 30,
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  subscriptionItems:{
    paddingVertical: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.3)', // Add some transparency for a nice effect
    borderRadius: 20,
    marginBottom: 10,
    width: 270,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16
  },
  head:{
    alignItems: 'center',
    justifyContent: 'center',
  },
  headText:{
    fontSize: 10,
    fontWeight: '400',
    marginBottom: 10,
    color: colors.white,
    textAlign: 'center',
    margin: 5
  },
  heads:{
    marginRight: 7
  },
  touchableOpacity:{
    padding: 12,
    borderRadius: 30,
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.white,
    marginTop: 10
  },
  btnText:{
    color: colors.white,
    fontSize: 16,
    fontWeight: '500'
  },
  extraText:{
    color: colors.black,
    fontSize: 14,
    fontWeight: '700',
  },
  premium:{
    marginRight: 17
  },
  label:{
    color: colors.white,
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
  planTag:{
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    width: '25%',
    borderRadius: 15,
    padding: 5,
    left: 155,
    marginVertical: 2
  },
  planTag1:{
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    width: '25%',
    borderRadius: 15,
    padding: 5,
    left: 175,
    marginVertical: 2
  },
  tag:{
    backgroundColor: colors.black,
    width: '35%',
    borderRadius: 30,
    alignSelf: 'center',
    top: -10
  },
  subText:{
    color: "#777",
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 5
  }
});
