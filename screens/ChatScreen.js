import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GestureHandlerRootView, PanGestureHandler, State } from 'react-native-gesture-handler';
import useChatStore from '../stores/useChatStore'; // Import the Zustand store
import colors from '../components/colors';
import ChatHeader from '../components/ChatHeader';
import ChatList from '../components/ChatList';
import ReplyBar from '../components/ReplyBar';
import InputBar from '../components/InputBar';

const ChatScreen = ({ navigation }) => {
  const [message, setMessage] = useState('');
  const [selectedMessage, setSelectedMessage] = useState(null);

  const selectedUser = useChatStore(state => state.selectedUser);
  const messages = useChatStore(state => state.messages);

  // Filter messages for the selected user including replies
  const filteredMessages = messages.filter(msg => msg.name === selectedUser?.name);

  useEffect(() => {
    if (selectedUser) {
      console.log('Selected user:', selectedUser);
    }
  }, [selectedUser]);

  const addMessage = useChatStore(state => state.addMessage);
  

  const animatedValues = useRef(filteredMessages.reduce((acc, msg) => {
    acc[msg.id] = new Animated.Value(0);
    return acc;
  }, {})).current;

  const handleReply = (message) => {
    setSelectedMessage(message);
  };

  const onGestureEvent = (id) => {
    if (!animatedValues[id]) {
      animatedValues[id] = new Animated.Value(0); // Ensure it's initialized
    }
  
    return Animated.event(
      [{ nativeEvent: { translationX: animatedValues[id] } }],
      { useNativeDriver: true }
    );
  };

  const onHandlerStateChange = (event, message) => {
    if (event.nativeEvent.state === State.END) {
      if (event.nativeEvent.translationX > 150) {
        handleReply(message);
      }
      Animated.spring(animatedValues[message.id], {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    }
  };

  const renderMessage = (item) => (
    <PanGestureHandler
      onGestureEvent={onGestureEvent(item.id)}
      onHandlerStateChange={(e) => onHandlerStateChange(e, item)}
      activeOffsetX={[-30, 30]}
      key={item.id}
    >
      <Animated.View
        style={[
          styles.messageContainer,
          item.isUser ? styles.myMessage : styles.otherMessage,
          selectedMessage && selectedMessage.id === item.id ? styles.repliedMessage : null,
          { transform: [{ translateX: animatedValues[item.id] || new Animated.Value(0) }] }
        ]}
      >
        {!item.isUser && (
          <Image source={{ uri: item.imageUrl }} style={styles.profileImage} />
        )}
        <View style={styles.messageContent}>
          {item.repliedTo && (
            <View style={styles.repliedMessageContainer}>
              <View>
                <Text style={styles.repliedMessageText}>{selectedUser?.name}</Text>
                <Text
                  style={{
                    color: "#f1f1f1",
                    fontWeight: "400",
                    marginBottom: 10,
                  }}
                >
                  {item.repliedMessage}
                </Text>
              </View>
            </View>
          )}
          {item.type === "audio" ? (
            <TouchableOpacity onPress={() => handlePlayPause(item)}>
              <View style={styles.audioMessageContainer}>
                <Ionicons
                  name={isPlaying ? "pause-circle" : "play-circle"}
                  size={30}
                  color="#1E90FF"
                />
                <Text style={styles.audioMessage}>
                  {isPlaying ? "Pause" : "Play"} Voice Message
                </Text>
              </View>
            </TouchableOpacity>
          ) : (
            <Text
              style={[
                styles.messageText,
                item.isUser
                  ? styles.myMessageText
                  : styles.otherMessageText,
              ]}
            >
              {item.message}
            </Text>
          )}
          <View style={styles.messageFooter}>
            <Text style={styles.messageTime}>{item.time}</Text>
            {item.isUser && (
              <Ionicons
                name={item.read ? "checkmark-done" : "checkmark"}
                size={16}
                color={item.read ? "#1E90FF" : "#888"}
                style={styles.checkMark}
              />
            )}
          </View>
        </View>
      </Animated.View>
    </PanGestureHandler>
  );
  
  
  
  const isInvalidMessage = (msg) => {
    const phonePattern = /(\+?\d{1,4}[-.\s]?)?(\(?\d{2,4}\)?[-.\s]?)?[\d-.\s]{5,13}\d/;
    const emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
    const contactKeywords = /\b(contact|phone|email|mobile|whatsapp)\b/i;
  
    return phonePattern.test(msg) || emailPattern.test(msg) || contactKeywords.test(msg);
  };
  
  const handleSendMessage = () => {
    if (message.trim()) {
      if (isInvalidMessage(message)) {
        alert("Message cannot contain phone numbers, emails, or contact info!");
        return;
      }
  
      const newMessage = {
        id: (messages.length + 1).toString(),
        sender: 'You',
        message: message,
        time: new Date().toLocaleTimeString(),
        isUser: true,
        read: false,
        repliedTo: selectedMessage?.id || null,
        repliedMessage: selectedMessage ? selectedMessage.message : null,
        name: selectedUser?.name,
      };
  
      addMessage(newMessage);
      setMessage('');
      setSelectedMessage(null);
    }
  };

  

  return (
<GestureHandlerRootView style={styles.container}>
  <ChatHeader navigation={navigation} selectedUser={selectedUser} />
  <ChatList
    messages={filteredMessages}
    onGestureEvent={onGestureEvent}
    onHandlerStateChange={onHandlerStateChange}
    renderMessage={renderMessage}
  />
  <ReplyBar
    selectedMessage={selectedMessage}
    onCancelReply={() => setSelectedMessage(null)}
  />
  <InputBar
    message={message}
    onChangeMessage={setMessage}
    onSendMessage={handleSendMessage}
  />
</GestureHandlerRootView>

  );
};

const styles = StyleSheet.create({
  // Your existing styles
  container: {
    flex: 1,
    backgroundColor: colors.grey,
  },
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
  chatList: {
    paddingHorizontal: 10,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginVertical: 8,
    maxWidth: '80%',
  },
  myMessage: {
    backgroundColor: "#4C637F", // Blue background for user's messages
    alignSelf: "flex-end",
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 10,
  },
  otherMessage: {
    backgroundColor: "#585292", // Gray background for other messages
    alignSelf: "flex-start",
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 10,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 20,
  },
  myMessageText: {
    color: "#FFFFFF", // White text for user's messages
    marginBottom: 5,
    fontSize: 15,

  },
  otherMessageText: {
    color: "#fff", // Black text for other messages
    fontSize: 16,
  },
  repliedMessage: {
    borderColor: '#25D366',
    borderWidth: 2,
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 8,
  },
  messageContent: {
    flex: 1,
  },
  messageText: {
    fontSize: 15,
  },
  messageFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  messageTime: {
    fontSize: 12,
    color: "#fff",
  },
  checkMark: {
    marginLeft: 5,
    color: "#00F642",
  },
  repliedMessageContainer: {
    backgroundColor: '#6B84A3',
    padding: 5,
    marginBottom: 5,
    borderRadius: 5,
    borderLeftWidth: 4,
    borderLeftColor: colors.success,
  },
  repliedMessageText: {
    color: colors.success,
    fontWeight: '400'
  },
  replyContainer: {
    backgroundColor: colors.label,
    padding: 5,
    marginBottom: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.primary
  },
  replyText: {
    color: '#333',
    fontStyle: 'italic',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#DDD',
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 25,
    backgroundColor: '#F1F1F1',
    marginRight: 8,
  },
  iconButton: {
    paddingHorizontal: 6,
  },
  sendButton: {
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 30,
  },
  audioMessageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  audioMessage: {
    marginLeft: 10,
    fontSize: 16,
    color: '#1E90FF',
  },
});

export default ChatScreen;
