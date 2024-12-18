import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, Entypo } from '@expo/vector-icons';

const ChatHeader = ({ navigation, selectedUser }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>
      <Image source={require('../assets/dates/8.jpg')} style={styles.headerProfileImage} />
      <View style={styles.headerDetails}>
        <Text style={styles.headerName}>Adenike Taiwo</Text>
        <Text style={styles.headerStatus}>Online</Text>
      </View>
      <TouchableOpacity style={styles.headerIcon}>
        <Entypo name="dots-three-horizontal" size={24} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

export default ChatHeader;

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#DDD',
        marginTop: 35
      },
      headerProfileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginLeft: 10,
      },
      headerDetails: {
        flex: 1,
        marginLeft: 10,
      },
      headerName: {
        fontSize: 18,
        fontWeight: 'bold',
      },
      headerStatus: {
        fontSize: 14,
        color: '#888',
      },
      headerIcon: {
        marginLeft: 10,
      },
  
});