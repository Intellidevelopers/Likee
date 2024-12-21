import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { AntDesign, Entypo } from '@expo/vector-icons';
import colors from '../components/colors';
import { StatusBar } from 'expo-status-bar';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });

  // Validate email format using regex
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle Continue button press
  const handleContinue = () => {
    let valid = true;
    const newErrors = { email: '', password: '' };

    // Email Validation
    if (!email) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email';
      valid = false;
    }

    // Password Validation
    if (!password) {
      newErrors.password = 'Password is required';
      valid = false;
    }

    setErrors(newErrors);

    // If valid, navigate to EmailVerification
    if (valid) {
      navigation.navigate('Main');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <TouchableOpacity style={styles.header} onPress={() => navigation.goBack()}>
        <Entypo name="chevron-with-circle-left" size={40} color={colors.primary} />
      </TouchableOpacity>

      {/* Title */}
      <View style={styles.contentContainer}>
      <Text style={styles.title}>Enter email to login</Text>
      <Text style={styles.subtitle}>
        Please enter your registered email address to login.
      </Text>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Enter your email"
          style={styles.input}
          keyboardType="email-address"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Enter your password"
          style={styles.input}
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}

      {/* Continue Button */}
      <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
        <Text style={styles.continueButtonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.footerText} onPress={() => navigation.navigate('GetStarted')}>
        <Text>Already have an account?</Text>
        <Text style={styles.signInText}>Sign Up</Text>
      </TouchableOpacity>
      </View>
      <StatusBar backgroundColor={colors.greyBackground}/>
      <View style={styles.inssuredPolicy}>
        <Text style={styles.inssuredText}>
          By logging in, you agree to Likee's Terms of Service and Privacy Policy. You will be notified when your account has been updated and will be notified when you have logged out.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: colors.greyBackground,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginVertical: 10,
    lineHeight: 20,
    marginBottom: 20
  },
  header: {
    marginTop: 50,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    marginBottom: 10,
  },
  input: {
    padding: 15,
    flex: 1,
    fontSize: 16,
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
  errorText: {
    color: 'red',
    marginBottom: 10,
    fontSize: 12,
  },
  contentContainer:{
    backgroundColor: '#fff',
    padding: 10,
    marginTop: 40,
    borderRadius: 10
  },
  inssuredPolicy:{
    marginTop: 'auto',
    alignItems: 'center',
    marginBottom: 20
  },
  inssuredText:{
    color: '#666',
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'center'  // Center text horizontally
  },
  footerText: {
    color: '#707070',
    fontSize: 14,
    marginBottom: 20,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  signInText: {
    color: colors.primary,
    fontWeight: 'bold',
    textAlign: 'center'
  },
});

export default Login;
