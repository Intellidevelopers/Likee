import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons, FontAwesome, AntDesign } from '@expo/vector-icons';
import colors from '../components/colors';

const Likes = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your likes list</Text>
      <Text style={styles.subHeader}>
        The faster you like them back, the higher your chance of chatting and dating!
      </Text>
      
      <View style={styles.tabContainer}>
        <Text style={[styles.tab, styles.activeTab]}>All likes <Ionicons name='lock-closed' size={16}/></Text>
        <Text style={styles.tab}>New likes <Ionicons name='lock-closed' size={16}/></Text>
        <Text style={styles.tab}>Online <Ionicons name='lock-closed' size={16}/></Text>
      </View>

      <ScrollView contentContainerStyle={styles.gridContainer}>
        {/* Mock profiles */}
        {[1, 2, 3].map((item, index) => (
          <View key={index} style={styles.profileContainer}>
            <Image
              source={require('../assets/images/user1.jpg')} // Use your blurred image URI
              style={styles.profileImage}
              blurRadius={30}
            />
            <View style={styles.iconContainer}>
              <TouchableOpacity>
                <Ionicons name="close" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity>
                <FontAwesome name="heart" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {/* Special Offer Card */}
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
          <TouchableOpacity style={styles.revealButton}>
            <Text style={styles.revealButtonText}>Activate</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.ReviewButton}>
          <Text style={styles.reviewBtnText}>Reveal My Likes</Text>
        </TouchableOpacity>
      </ScrollView>

        
     
    </View>
  );
};

export default Likes;

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
    marginTop: 40
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
    flex: 1
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
    borderBottomRightRadius: 10, //
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
    marginTop: 30
  },
  revealButton: {
    backgroundColor: '#000',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 45,
    marginTop: 'auto'
  },
  revealButtonText: {
    color: '#fff',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  navText: {
    fontSize: 12,
  },
  offerIcon:{
    borderRadius: 20,
    backgroundColor: colors.input,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#ddd',
    padding: 5
  },
  offerCoin:{
    borderRadius: 15,
    alignItems: 'center',
    borderColor: '#000',
    padding: 5,
    flexDirection: 'row',
    gap: 10,
    borderWidth: 1,
    paddingHorizontal: 10,
    alignSelf: 'flex-end',
    marginBottom: 10
  },
  offerCoinText:{
    fontSize: 12,
    color: '#000',
    fontWeight: 'bold',
  },
  ReviewButton:{
    backgroundColor: '#000',
    borderRadius: 30,
    paddingVertical: 15,
    width: '100%',
    marginTop: 30,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden'
  },
  reviewBtnText:{
    fontSize: 16,
    color: colors.white
  }
});
