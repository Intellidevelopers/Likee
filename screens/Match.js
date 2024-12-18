import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Pressable } from 'react-native';
import colors from '../components/colors';
import { AntDesign, Feather } from '@expo/vector-icons';


const Match = ({ navigation }) => {
  const userDetails = {
    name: 'John Doe', // Replace with dynamic user details
    image: require('../assets/sec.jpg'),
    matchTime: '24 hours remaining',
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.HeaderText}>Sodate.me</Text>
      <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.navigate('Main')}>
        <Feather name='x' size={26}/>
      </TouchableOpacity>

      {/* Images */}
      <View style={styles.imagesContainer}>
        <Image
          source={require('../assets/vic.jpg')} // Replace with your left image path
          style={[styles.image, styles.imageLeft]}
        />
        <Image
          source={require('../assets/sec.jpg')} // Replace with your right image path
          style={[styles.image, styles.imageRight]}
        />
      </View>

      {/* Match Text */}
      <Text style={styles.matchText}>
        You're Match<Text style={styles.starText}>✦</Text>
      </Text>
      <Text style={styles.subText}>
        You have 24 hours to take a first step with your new partner
      </Text>

      {/* Chat Now Button */}
      <View style={styles.buttonConatiner}>
        <TouchableOpacity
          style={styles.chatButton}
          onPress={() => navigation.navigate('ChatScreen', { userDetails })}
        >
          <Text style={styles.chatButtonText}>Chat now</Text>
        </TouchableOpacity>

        {/* Keep Swiping */}
        <Pressable onPress={() => navigation.navigate('Main')}>
          <Text style={styles.keepSwipingText}>Keep swiping</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Match;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
  },
  imagesContainer: {
    flexDirection: 'row',
    marginTop: 'auto',
    top: -80,
  },
  image: {
    width: 160,
    height: 200,
    borderRadius: 15,
    resizeMode: 'contain',
  },
  imageLeft: {
    transform: [{ rotate: '-10deg' }],
    marginRight: -20,
    resizeMode: 'contain',
  },
  imageRight: {
    transform: [{ rotate: '10deg' }],
    marginLeft: -20,
    resizeMode: 'contain',
  },
  matchText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#F38020',
    marginTop: -50,
  },
  starText: {
    color: '#F38020',
    fontSize: 28,
    marginLeft: 5,
  },
  subText: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginVertical: 10,
    marginHorizontal: 40,
  },
  chatButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 100,
    borderRadius: 30,
  },
  chatButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '500',
  },
  keepSwipingText: {
    color: '#555',
    textDecorationLine: 'underline',
    marginTop: 15,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonConatiner: {
    marginTop: 'auto',
    marginBottom: 20,
  },
  HeaderText: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.primary,
    marginTop: 50,
    textAlign: 'center',
  },
  cancelButton:{
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 30,
    position: 'absolute',
    top: 48,
    left: 15,
  }
});
