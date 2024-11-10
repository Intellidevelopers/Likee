import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import colors from '../components/colors';

const SelectGender = ({ navigation }) => {
  const [selectedGender, setSelectedGender] = useState(null); // State to track selected gender

  const handleGenderSelect = (gender) => {
    setSelectedGender(gender);
  };

  const isContinueDisabled = selectedGender === null; // Check if no gender is selected

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.header} onPress={() => navigation.goBack()}>
          <AntDesign name='leftcircleo' size={32} color={colors.primary}/>
      </TouchableOpacity>

      <Text style={styles.title}>Select Gender</Text>
      <Text style={styles.subtitle}>Please select your gender</Text>

      <View style={styles.optionContainer}>
        {/* Male option */}
        <TouchableOpacity
          style={[
            styles.option,
            selectedGender === 'male' && styles.activeOption,
          ]}
          onPress={() => handleGenderSelect('male')}
        >
          <FontAwesome
            name="male"
            color={selectedGender === 'male' ? '#E03368' : '#000'}
            size={30}
          />
          <Text
            style={
              selectedGender === 'male' ? styles.activeText : styles.optionText
            }
          >
            Male
          </Text>
        </TouchableOpacity>

        {/* Female option */}
        <TouchableOpacity
          style={[
            styles.option,
            selectedGender === 'female' && styles.activeOption,
          ]}
          onPress={() => handleGenderSelect('female')}
        >
          <FontAwesome
            name="female"
            color={selectedGender === 'female' ? '#E03368' : '#000'}
            size={30}
          />
          <Text
            style={
              selectedGender === 'female' ? styles.activeText : styles.optionText
            }
          >
            Female
          </Text>
        </TouchableOpacity>
      </View>

      {/* Continue Button */}
      <TouchableOpacity
        style={[
          styles.continueButton,
          isContinueDisabled && styles.disabledButton, // Disable style if no option selected
        ]}
        disabled={isContinueDisabled} // Disable button functionality
        onPress={() => {
          if (selectedGender) {
            Toast.show({
              type: 'success',
              text1: 'Gender Selected!',
              text2: `You selected: ${selectedGender}`,
            });
            navigation.navigate('IdealMatch'); // Navigate to the next screen
          }
        }}
      >
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>

      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#FFF',
    padding: 10,
  },
  header: {
    marginTop: 40,
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
    marginBottom: 20,
  },
  continueButton: {
    backgroundColor: '#E03368',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 160,
  },
  disabledButton: {
    backgroundColor: '#ccc', // Change background color when disabled
  },
  continueButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '500',
  },
  optionContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  activeOption: {
    borderWidth: 2,
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
    width: 150,
    paddingVertical: 40,
    borderColor: '#E03368',
    backgroundColor: '#f5f5f5',
  },
  option: {
    borderWidth: 2,
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
    width: 150,
    paddingVertical: 40,
    borderColor: '#f2f2f2',
  },
  activeText: {
    color: '#E03368', // Active text color
    fontWeight: 'bold',
  },
  optionText: {
    color: '#000', // Default text color
  },
});

export default SelectGender;
