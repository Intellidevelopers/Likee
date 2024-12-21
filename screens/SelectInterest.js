import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign, Feather, FontAwesome6, Fontisto, Ionicons } from '@expo/vector-icons';
import colors from '../components/colors';

const SelectInterest = ({ navigation }) => {
  const [selectedInterests, setSelectedInterests] = useState([]);

  const interests = [
    { id: 1, name: 'Movie', icon: 'videocam-outline', library: Ionicons },
    { id: 2, name: 'Books Reading', icon: 'book', library: Ionicons },
    { id: 3, name: 'Swimming', icon: 'person-swimming', library: FontAwesome6 },
    { id: 4, name: 'Design', icon: 'antdesign', library: AntDesign },
    { id: 5, name: 'Photography', icon: 'photograph', library: Fontisto },
    { id: 6, name: 'Music', icon: 'music', library: Feather },
    { id: 7, name: 'Shopping', icon: 'cart-outline', library: Ionicons },
  ];

  const toggleInterest = (id) => {
    setSelectedInterests((prev) =>
      prev.includes(id) ? prev.filter((interest) => interest !== id) : [...prev, id]
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.header} onPress={() => navigation.goBack()}>
        <AntDesign name="leftcircleo" size={32} color={colors.primary} />
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>Select your Interest</Text>
      <Text style={styles.subtitle}>
        Select a few of your interests to match with users who have similar things in common.
      </Text>

      {/* Interest Buttons */}
      <View style={styles.interestContainer}>
        {interests.map((interest) => {
          const isSelected = selectedInterests.includes(interest.id);
          const IconLibrary = interest.library;
          return (
            <TouchableOpacity
              key={interest.id}
              style={[styles.interestButton, isSelected && styles.selected]}
              onPress={() => toggleInterest(interest.id)}
            >
              <IconLibrary
                name={interest.icon}
                color={isSelected ? '#FFF' : '#000'}
                size={20}
              />
              <Text
                style={[
                  styles.interestText,
                  isSelected && styles.selectedText,
                ]}
              >
                {interest.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Continue Button */}
      <TouchableOpacity
        style={styles.continueButton}
        onPress={() => navigation.navigate('EmailRegistration', { selectedInterests })}
      >
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
    gap: 10,
  },
  interestButton: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#EEE',
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  selected: {
    backgroundColor: colors.primary,
    borderColor: colors.border,
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
    fontWeight: 'bold',
  },
  selectedText: {
    color: '#fff',
  },
  header: {
    marginTop: 50,
  },
});

export default SelectInterest;
