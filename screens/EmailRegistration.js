import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import { AntDesign, Feather, FontAwesome6, Fontisto, Ionicons } from '@expo/vector-icons';
import colors from '../components/colors';


const EmailRegistration = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.header} onPress={() => navigation.goBack()}>
          <AntDesign name='leftcircleo' size={32} color={colors.primary}/>
      </TouchableOpacity>
      {/* Title */}
      <Text style={styles.title}>Enter Email Address</Text>
      <Text style={styles.subtitle}>
        Please enter your email address to continue
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
            placeholder='Enter your email address' 
            style={styles.input}
            keyboardType='email-address'
        />
      </View>

      {/* Continue Button */}
      <TouchableOpacity style={styles.continueButton} onPress={() => navigation.navigate('EmailVerification')}>
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 50,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginVertical: 10,
    lineHeight: 20,
  },
  interestContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 30,
    gap: 10
  },
  interestButton: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#EEE',
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    gap: 5
  },
  selected: {
    backgroundColor: '#E03368',
    borderColor: '#FF6A9F',
  },
  interestText: {
    color: '#666',
  },
  continueButton: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 20,
  },
  continueButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '500',
  },
  selectedText:{
    color: "#fff"
  },
  header:{
    marginTop: 40
  },
  inputContainer:{
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    marginBottom: 20
  },
  flagDropdown:{
    flexDirection: "row",
    alignItems: "center",
    borderRightWidth: 1,
    borderRightColor: "#E03368",
    padding: 10
  },
  input:{
    padding: 12,
    flex: 1,
    fontSize: 14
  },
  icon:{
    width: 30,
    height: 30,
  }
});

export default EmailRegistration;
