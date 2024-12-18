import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { BottomSheet } from '@rneui/themed';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import colors from '../components/colors';

const Likes = ({ navigation }) => {
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your likes list</Text>
      <Text style={styles.subHeader}>
        The faster you like them back, the higher your chance of chatting and dating!
      </Text>

      <View style={styles.tabContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Pricing')}>
          <Text style={[styles.tab, styles.activeTab]}>All likes <Ionicons name='lock-closed' size={16} /></Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Pricing')}>
          <Text style={styles.tab}>New likes <Ionicons name='lock-closed' size={16} /></Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Pricing')}>
          <Text style={styles.tab}>Online <Ionicons name='lock-closed' size={16} /></Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.gridContainer}>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
          <View key={index} style={styles.profileContainer}>
            <Image
              source={require('../assets/images/user1.jpg')} // Use your blurred image URI
              style={styles.profileImage}
              blurRadius={30}
            />
            <View style={styles.iconContainer}>
              <TouchableOpacity onPress={() => navigation.navigate('Pricing')}>
                <Ionicons name="close" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Pricing')}>
                <FontAwesome name="heart" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        ))}

        <View style={styles.offerCard}>
          <View style={styles.offerCardContent}>
            <View style={styles.offerCoin}>
              <FontAwesome name="heart" size={16} color="black" />
              <Text style={styles.offerCoinText}>150</Text>
            </View>
            <View style={styles.offerIcon}>
              <Ionicons name="flash" size={30} color="black" />
            </View>
            <Text style={styles.offerText}>
              Get shown to more people to get 4x more likes.
            </Text>
          </View>
          <TouchableOpacity style={styles.revealButton} onPress={() => setIsBottomSheetVisible(true)}>
            <Text style={styles.revealButtonText}>Activate</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.ReviewButton} onPress={() => navigation.navigate('Pricing')}>
          <Text style={styles.reviewBtnText}>Reveal My Likes</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Themed Bottom Sheet */}
      <BottomSheet
        isVisible={isBottomSheetVisible}
        onBackdropPress={() => setIsBottomSheetVisible(false)}
      >
        <View style={styles.bottomSheetContent}>
          <Ionicons name="flash" size={40} color="black" />
          <Text style={styles.bottomSheetHeader}>Want to see more likes?</Text>
          <Text style={styles.bottomSheetText}>
            Get shown to more people, and you could get up to 11.4x more likes.
          </Text>
          <TouchableOpacity style={styles.getMoreLikesButton} onPress={() => navigation.navigate('Credit')}>
            <Text style={styles.getMoreLikesText}>Get More Likes</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsBottomSheetVisible(false)}>
            <Text style={styles.maybeLaterText}>Maybe Later</Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 40,
  },
  subHeader: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#ddd',
  },
  tab: {
    fontSize: 16,
    paddingVertical: 5,
    color: '#555',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#000',
    color: '#000',
    fontWeight: 'bold',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    flexGrow: 1,
    paddingBottom: 40
  },
  profileContainer: {
    width: '48%',
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: 170,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    overflow: 'hidden',
    padding: 5,
  },
  offerCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  offerCardContent: {
    alignItems: 'center',
    marginBottom: 10,
  },
  offerText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#444',
    marginTop: 30,
  },
  revealButton: {
    backgroundColor: '#000',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 45,
    marginTop: 'auto',
  },
  revealButtonText: {
    color: '#fff',
  },
  ReviewButton: {
    backgroundColor: '#000',
    borderRadius: 30,
    paddingVertical: 15,
    width: '100%',
    marginTop: 30,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  reviewBtnText: {
    fontSize: 16,
    color: colors.white,
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
  offerCoin:{
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    alignSelf: 'flex-end'
  },
  offerIcon:{
    backgroundColor: colors.label,
    padding: 5,
    borderRadius: 30,
  }
});

export default Likes;
