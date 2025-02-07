// Nearby.js
import React, {useState} from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import colors from '../components/colors';
import userProfileStore from '../stores/userProfileStore';
import { nearbyUsers } from '../components/NearbyData'; // Import NearbyData
import { BottomSheet } from '@rneui/themed';
import useChatStore from '../stores/useChatStore'; // Assuming you're using Zustand



const Nearby = () => {
  const navigation = useNavigation();
  const setUserProfile = userProfileStore((state) => state.setUserProfile);
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const { setSelectedUser } = useChatStore();


  const handleClick = (item) => {
    setUserProfile(item);
    navigation.navigate("UserProfile");
  };
  
  const renderProfile = ({ item }) => (
    <TouchableOpacity style={styles.profileCard} onPress={() => handleClick(item)}>
      <Image source={item.imageUrl} style={styles.profileImage} />
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
        <TouchableOpacity style={styles.boostButton} onPress={() => setIsBottomSheetVisible(true)}>
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

      <BottomSheet
        isVisible={isBottomSheetVisible}
        onBackdropPress={() => setIsBottomSheetVisible(false)}
      >
        <View style={styles.bottomSheetContent}>
          <Ionicons name="flash" size={40} color="black" />
          <Text style={styles.bottomSheetHeader}>Get Extra Shows</Text>
          <Text style={styles.bottomSheetText}>
            Be seen by people and increase your chances of finding a match
          </Text>
          <TouchableOpacity style={styles.getMoreLikesButton} onPress={() => navigation.navigate('Credit')}>
            <Text style={styles.getMoreLikesText}>Boost Your Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsBottomSheetVisible(false)}>
            <Text style={styles.maybeLaterText}>Maybe Later</Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </SafeAreaView>
  );
};

export default Nearby;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
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
    width: 115,
    height: 170,
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
  bottomSheetContent: {
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
  },
  bottomSheetHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  bottomSheetText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  getMoreLikesButton: {
    backgroundColor: '#000',
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center'
  },
  getMoreLikesText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  maybeLaterText: {
    color: '#000',
    marginTop: 10,
  },
});
