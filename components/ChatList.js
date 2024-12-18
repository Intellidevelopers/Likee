import React from 'react';
import { ScrollView, Animated, StyleSheet, View, Text } from 'react-native';
import { Image } from 'expo-image'; // Import from expo-image

const ChatList = ({
  messages,
  onGestureEvent,
  onHandlerStateChange,
  renderMessage,
}) => {
  const hasMessages = messages && messages.length > 0;

  return (
    <ScrollView style={styles.chatList} showsVerticalScrollIndicator={false}>
      {hasMessages ? (
        messages.map((msg) => (
          <View
            key={msg.id}
            onGestureEvent={onGestureEvent(msg.id)}
            onHandlerStateChange={(e) => onHandlerStateChange(e, msg)}
          >
            <Animated.View>
              {renderMessage(msg)}
            </Animated.View>
          </View>
        ))
      ) : (
        <View style={styles.noMessagesContainer}>
          <Image
            source={require('../assets/images/gif.gif')} // Replace with your GIF file path
            style={styles.noMessagesImage}
            contentFit="contain" // Similar to resizeMode
          />
          <Text style={styles.noMessagesText}>No messages yet, start the chat!</Text>
        </View>
      )}
    </ScrollView>
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
    borderRadius: 20
  },
  noMessagesText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});
