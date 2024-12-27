import React, { useEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import colors from '../components/colors';

const WelcomeScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Onboarding');
    }, 3000);

    // Clear the timeout if the component unmounts
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo/logo.png')} style={styles.logo} />
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 220,
    height: 220,
    resizeMode: 'contain',
    marginBottom: 20,
  },
});
