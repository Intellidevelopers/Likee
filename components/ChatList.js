import React, { useState } from 'react';
import { ScrollView, Animated, StyleSheet, View, Text, TouchableOpacity, TouchableWithoutFeedback, Alert } from 'react-native';
import { Image } from 'expo-image';
import { BottomSheet } from '@rneui/themed';

const ChatList = ({ messages, setMessages, renderMessage }) => {
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

  // Open Bottom Sheet when a message is long-pressed
  const handleLongPress = (msg) => {
    setSelectedMessage(msg);
    setIsBottomSheetVisible(true);
  };

  // Delete Message
  const handleDeleteMessage = () => {
    setMessages((prev) => prev.filter((m) => m.id !== selectedMessage.id));
    setIsBottomSheetVisible(false);
  };

  // Handle Nudge
  const handleNudge = () => {
    Alert.alert('Nudge Sent!', 'You nudged the user.');
    setIsBottomSheetVisible(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.chatList} showsVerticalScrollIndicator={false}>
        {messages.length > 0 ? (
          messages.map((msg) => (
            <TouchableWithoutFeedback key={msg.id} onLongPress={() => handleLongPress(msg)}>
              <Animated.View>{renderMessage(msg)}</Animated.View>
            </TouchableWithoutFeedback>
          ))
        ) : (
          <View style={styles.noMessagesContainer}>
            <Image source={require('../assets/images/gif.gif')} style={styles.noMessagesImage} contentFit="contain" />
            <Text style={styles.noMessagesText}>No messages yet, start the chat!</Text>
          </View>
        )}
      </ScrollView>

      {/* RNEUI Bottom Sheet */}
      <BottomSheet isVisible={isBottomSheetVisible} onBackdropPress={() => setIsBottomSheetVisible(false)}>
        <View style={styles.bottomSheetContent}>
          <Text style={styles.modalTitle}>Message Actions</Text>
          <TouchableOpacity style={styles.sheetButton} onPress={handleDeleteMessage}>
            <Text style={styles.sheetButtonText}>🗑 Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sheetButton} onPress={handleNudge}>
            <Text style={styles.sheetButtonText}>💡 Nudge</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={() => setIsBottomSheetVisible(false)}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </View>
  );
};

export default React.memo(ChatList);

const styles = StyleSheet.create({
  chatList: {
    flex: 1,
    backgroundColor: '#fff',
  },
  noMessagesContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 150,
  },
  noMessagesImage: {
    width: 150,
    height: 150,
    marginBottom: 20,
    borderRadius: 20,
  },
  noMessagesText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  bottomSheetContent: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  sheetButton: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  sheetButtonText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#333',
  },
  cancelButton: {
    paddingVertical: 15,
    marginTop: 10,
  },
  cancelText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#888',
  },
});
