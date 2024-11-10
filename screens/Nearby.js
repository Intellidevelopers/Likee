// Nearby.js
import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import colors from '../components/colors';
import userProfileStore from '../stores/userProfileStore';
import { nearbyUsers } from '../components/NearbyData'; // Import NearbyData

const Nearby = () => {
  const navigation = useNavigation();
  const setUserProfile = userProfileStore((state) => state.setUserProfile);

  const handleClick = (item) => {
    setUserProfile(item); // This will include name, age, bio, imgPath, etc.
    navigation.navigate("UserProfile"); // Navigate to UserProfile screen
  };

  const renderProfile = ({ item }) => (
    <TouchableOpacity style={styles.profileCard} onPress={() => handleClick(item)}>
      <Image source={item.imgPath} style={styles.profileImage} />
      <View style={styles.profileContainer}>
        <Text style={styles.profileName}>{item.name}, {item.age}</Text>
        {item.isOnline && <View style={styles.onlineIndicator} />}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Nearby</Text>
        <TouchableOpacity style={styles.boostButton}>
          <Ionicons name="flash" size={20} color="white" />
          <Text style={styles.boostButtonText}>Boost Me</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingsButton}>
          <Ionicons name="filter" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={nearbyUsers} // Use nearbyUsers from NearbyData
        renderItem={renderProfile}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.profileList}
        style={styles.flatList}
      />
    </SafeAreaView>
  );
};

export default Nearby;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.greyBackground,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 10,
    marginTop: 60,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  boostButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  boostButtonText: {
    color: 'white',
    fontWeight: '600',
    marginLeft: 5,
  },
  settingsButton: {
    padding: 5,
  },
  profileList: {
    paddingHorizontal: 8,
    paddingBottom: 80, // Add padding at the bottom to prevent overlap with bottom tabs
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  profileCard: {
    width: '30%',
    alignItems: 'center',
    marginVertical: 10,
    position: 'relative',
  },
  profileImage: {
    width: 100,
    height: 140,
    borderRadius: 10,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  profileName: {
    fontSize: 14,
    fontWeight: '500',
    color: 'black',
  },
  onlineIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.success,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  flatList: {
    flex: 1,
    marginBottom: 30
  },
});
