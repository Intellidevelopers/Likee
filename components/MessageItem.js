// MessageItem.js
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const MessageItem = ({ message, onPress }) => (
  <TouchableOpacity style={styles.messageItem} onPress={() => onPress(message.id)}>
    <Image source={{ uri: message.imageUrl }} style={styles.contactImage} />
    <View style={styles.messageTextContainer}>
      <Text style={styles.contactName}>{message.name}</Text>
      <Text style={styles.contactMessage}>{message.message}</Text>
    </View>
    <Ionicons name="star-outline" size={20} color="gray" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  messageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  contactImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  messageTextContainer: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  contactMessage: {
    fontSize: 14,
    color: '#666',
  },
});

export default MessageItem;
