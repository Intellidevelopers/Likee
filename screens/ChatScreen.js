import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Animated, ScrollView } from 'react-native';
import { Ionicons, MaterialIcons, Entypo } from '@expo/vector-icons';
import { Audio } from 'expo-av'; // Import from Expo AV for audio recording
import { GestureHandlerRootView, PanGestureHandler, State } from 'react-native-gesture-handler';
import useChatStore from '../stores/useChatStore'; // Import the Zustand store
import colors from '../components/colors';

const ChatScreen = ({ navigation }) => {
  const [message, setMessage] = useState('');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [soundWaveAnimation] = useState(new Animated.Value(1));
  const [recordedUri, setRecordedUri] = useState(null);
  const recordingRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false); // Track the playing state of the audio
  const soundRef = useRef(new Audio.Sound()); 

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

  const handlePlayPause = async (item) => {
    if (isPlaying) {
      // Pause the audio if it's playing
      await soundRef.current.pauseAsync();
      setIsPlaying(false);
    } else {
      try {
        // Unload the previous sound if it's already loaded
        await soundRef.current.unloadAsync();
  
        // Load the new audio
        await soundRef.current.loadAsync({ uri: item.audioUri });
  
        // Set up playback status update
        soundRef.current.setOnPlaybackStatusUpdate((status) => {
          if (status.isLoaded && status.didJustFinish) {
            // If playback is finished, update the play state to false
            setIsPlaying(false);
          }
        });
  
        // Play the audio
        await soundRef.current.playAsync();
        setIsPlaying(true);
      } catch (err) {
        console.error('Error playing audio', err);
      }
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
              <Text style={styles.repliedMessageText}>
                Replying to: <Text style={{ color: '#555', marginLeft: 5, marginBottom: 5, fontWeight: '400' }}>{item.repliedMessage}</Text>
              </Text>
            </View>
          )}
          {item.type === 'audio' ? (
            <TouchableOpacity onPress={() => handlePlayPause(item)}>
              <View style={styles.audioMessageContainer}>
                <Ionicons
                  name={isPlaying ? 'pause-circle' : 'play-circle'}
                  size={30}
                  color="#1E90FF"
                />
                <Text style={styles.audioMessage}>{isPlaying ? 'Pause' : 'Play'} Voice Message</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <Text style={styles.messageText}>{item.message}</Text>
          )}
          <View style={styles.messageFooter}>
            <Text style={styles.messageTime}>{item.time}</Text>
            {item.isUser && (
              <Ionicons
                name={item.read ? 'checkmark-done' : 'checkmark'}
                size={16}
                color={item.read ? '#1E90FF' : '#888'}
                style={styles.checkMark}
              />
            )}
          </View>
        </View>
      </Animated.View>
    </PanGestureHandler>
  );
  
  

  const handleSendMessage = () => {
    if (message.trim()) {
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

  const startRecording = async () => {
    try {
      console.log('Requesting permissions...');
      const permission = await Audio.requestPermissionsAsync();
      if (permission.status !== 'granted') {
        console.log('Permission to access microphone is required.');
        return;
      }

      console.log('Starting recording...');
      setIsRecording(true);
      Animated.loop(
        Animated.sequence([
          Animated.timing(soundWaveAnimation, { toValue: 1.5, duration: 500, useNativeDriver: true }),
          Animated.timing(soundWaveAnimation, { toValue: 1, duration: 500, useNativeDriver: true }),
        ])
      ).start();

      const { recording } = await Audio.Recording.createAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      recordingRef.current = recording;
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  };

  const stopRecording = async () => {
    console.log('Stopping recording...');
    setIsRecording(false);
    Animated.timing(soundWaveAnimation).stop();
    if (recordingRef.current) {
      await recordingRef.current.stopAndUnloadAsync();
      const uri = recordingRef.current.getURI();
      console.log('Recording completed and stored at', uri);
      setRecordedUri(uri);
    }
  };

  const handleMicPress = async () => {
    if (isRecording) {
      // Stop recording and send the audio message
      try {
        setIsRecording(false);
        Animated.timing(soundWaveAnimation).stop();
        if (recordingRef.current) {
          await recordingRef.current.stopAndUnloadAsync();
          const uri = recordingRef.current.getURI();
          console.log('Recording completed and stored at', uri);
          setRecordedUri(uri);
  
          // Add the recorded audio to the chat
          if (uri) {
            const newAudioMessage = {
              id: (messages.length + 1).toString(),
              sender: 'You',
              message: null, // No text, only audio
              audioUri: uri, // Store the audio URI
              time: new Date().toLocaleTimeString(),
              isUser: true,
              read: false,
              repliedTo: selectedMessage?.id || null,
              repliedMessage: selectedMessage ? selectedMessage.message : null,
              name: selectedUser?.name,
              type: 'audio', // Indicate that this is an audio message
            };
  
            // Add the new message to the chat store
            addMessage(newAudioMessage);
            setSelectedMessage(null);
          }
        }
      } catch (err) {
        console.error('Failed to stop recording', err);
      }
    } else {
      // Start recording
      try {
        console.log('Requesting permissions...');
        const permission = await Audio.requestPermissionsAsync();
        if (permission.status !== 'granted') {
          console.log('Permission to access microphone is required.');
          return;
        }
  
        console.log('Starting recording...');
        setIsRecording(true);
        Animated.loop(
          Animated.sequence([
            Animated.timing(soundWaveAnimation, { toValue: 1.5, duration: 500, useNativeDriver: true }),
            Animated.timing(soundWaveAnimation, { toValue: 1, duration: 500, useNativeDriver: true }),
          ])
        ).start();
  
        const { recording } = await Audio.Recording.createAsync(
          Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
        );
        recordingRef.current = recording;
      } catch (err) {
        console.error('Failed to start recording', err);
      }
    }
  };
  
  

  return (
    <GestureHandlerRootView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={{ uri: selectedUser?.imageUrl }} style={styles.headerProfileImage} />
        </TouchableOpacity>
        <View style={styles.headerDetails}>
          <Text style={styles.headerName}>{selectedUser?.name}</Text>
          <Text style={styles.headerStatus}>{selectedUser?.status}</Text>
        </View>
        <TouchableOpacity style={styles.headerIcon}>
          <Entypo name="dots-three-horizontal" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerIcon}>
          <Ionicons name="flag-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Chat List with PanGestureHandler */}
      <ScrollView style={styles.chatList}>
        {filteredMessages.map(renderMessage)}
      </ScrollView>

      {/* Selected message to reply to */}
      {selectedMessage && (
        <View style={styles.replyContainer}>
          <Text style={styles.replyText}>Replying to: {selectedMessage.message}</Text>
        </View>
      )}

      {/* Input Bar */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Type a message"
          value={message}
          onChangeText={setMessage}
          onSubmitEditing={handleSendMessage}
        />
        <TouchableOpacity style={styles.iconButton} onPress={handleMicPress}>
          <Ionicons
            name={isRecording ? 'stop-circle-outline' : 'mic-outline'}
            size={24}
            color={isRecording ? 'red' : '#555'}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="image-outline" size={24} color="#555" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <MaterialIcons name="send" size={24} color="white" />
        </TouchableOpacity>
      </View>
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
    alignSelf: 'flex-end',
    backgroundColor: colors.cahtBubble,
    borderRadius: 15,
    padding: 10,
  },
  otherMessage: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 10,
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
    color: '#888',
    marginTop: 5,
  },
  checkMark: {
    marginLeft: 5,
  },
  repliedMessageContainer: {
    backgroundColor: '#f1f1f1',
    padding: 5,
    marginBottom: 5,
    borderRadius: 10,
  },
  repliedMessageText: {
    color: colors.deepDeem,
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
