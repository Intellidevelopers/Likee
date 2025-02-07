import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';

const InputBar = ({ message, onChangeMessage, onSendMessage }) => {
  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      keyboardVerticalOffset={Platform.OS === 'ios' ? 1 : 20} // Adjust offset to prevent hiding
      style={styles.container}
    >
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
          <TouchableOpacity style={styles.micButton}>
            <AntDesign name="frown" size={24} color="white" />
          </TouchableOpacity>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

export default React.memo(InputBar);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingBottom: 30
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
