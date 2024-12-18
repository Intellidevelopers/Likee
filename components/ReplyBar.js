import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ReplyBar = ({ selectedMessage, onCancelReply }) => {
  if (!selectedMessage) return null;

  return (
    <View style={styles.replyContainer}>
      <Text style={styles.replyText}>
        Replying to: <Text style={styles.replyMessage}>{selectedMessage.message}</Text>
      </Text>
      <Text style={styles.cancelReply} onPress={onCancelReply}>Cancel</Text>
    </View>
  );
};

export default React.memo(ReplyBar);

const styles = StyleSheet.create({
  replyContainer: {
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderLeftWidth: 3,
    borderLeftColor: '#1E90FF',
    marginBottom: 5,
  },
  replyText: {
    fontSize: 14,
    color: '#333',
  },
  replyMessage: {
    fontWeight: 'bold',
    color: '#555',
  },
  cancelReply: {
    color: '#1E90FF',
    marginTop: 5,
    fontSize: 12,
  },
});
