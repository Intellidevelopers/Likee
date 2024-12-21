import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import colors from '../components/colors';

const GetStarted = ({ navigation }) => {

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image
        source={require('../assets/icons/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Title */}
      <Text style={styles.title}>Signup to Continue</Text>
      <Text style={styles.subtitle}>Please login to continue</Text>

      {/* Continue with Email */}
      <TouchableOpacity style={styles.emailButton} onPress={() => navigation.navigate('SelectInterest')}>
        <Text style={styles.emailButtonText}>Continue with Email</Text>
      </TouchableOpacity>

      {/* Continue with Phone */}
      <TouchableOpacity style={styles.phoneButton} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.phoneButtonText}>Login to your account instead</Text>
      </TouchableOpacity>

      {/* Divider with Social Signup */}
        <Text style={styles.dividerText}>Or Signup with</Text>

      {/* Social Signup Buttons */}
      <View style={styles.socialContainer}>
        <TouchableOpacity style={styles.socialButton}>
          <Image
            source={require('../assets/icons/google.png')}
            style={styles.socialIcon}
            resizeMode="contain"
          />
          <Text style={styles.socialButtonText}>Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialButton}>
          <Image
            source={require('../assets/icons/facebook.png')}
            style={styles.socialIcon}
            resizeMode="contain"
          />
          <Text style={styles.socialButtonText}>Facebook</Text>
        </TouchableOpacity>
      </View>

      {/* Terms and Conditions */}
      <Text style={styles.termsText}>
        I accept all the{' '}
        <Text style={styles.linkText}>Terms & Conditions</Text> &{' '}
        <Text style={styles.linkText}>Privacy Policy</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 20,
    marginTop: 100
  },
  title: {
    fontSize: 26,
    fontWeight: '900',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 17,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  emailButton: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    paddingHorizontal: 90,
    borderRadius: 10,
    marginBottom: 15,
  },
  emailButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  phoneButton: {
    borderColor: colors.border,
    borderWidth: 2,
    paddingVertical: 15,
    paddingHorizontal: 55,
    borderRadius: 10,
    marginBottom: 30,
  },
  phoneButtonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '500',
  },
  dividerText: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
    marginBottom: 30,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#EAEAEA',
    borderWidth: 1,
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  socialIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  socialButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
  },
  termsText: {
    fontSize: 14,
    color: '#000',
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 'auto',
  },
  linkText: {
    color: colors.primary,
    textDecorationLine: 'underline',
  },
});

export default GetStarted;
