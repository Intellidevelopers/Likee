import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

const InputBar = ({
  message,
  onChangeMessage,
  onSendMessage,
}) => (
  <View style={styles.inputContainer}>
    <TextInput
      style={styles.textInput}
      placeholder="Type a message"
      value={message}
      onChangeText={onChangeMessage}
      onSubmitEditing={onSendMessage}
    />
    {message ? (
      <TouchableOpacity style={styles.sendButton} onPress={onSendMessage}>
        <MaterialIcons name="send" size={24} color="white" />
      </TouchableOpacity>
    ) : (
      <TouchableOpacity>
        <Animated.View
          style={[
            styles.micButton,
            
          ]}
        >
          
        </Animated.View>
      </TouchableOpacity>
    )}
  </View>
);

export default React.memo(InputBar);

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  textInput: {
    flex: 1,
    padding: 12,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 10,
  },
  sendButton: {
    padding: 10,
    backgroundColor: '#585292',
    borderRadius: 50,
  },
  micButton: {
    padding: 10,
    backgroundColor: '#585292',
    borderRadius: 50,
  },
});
