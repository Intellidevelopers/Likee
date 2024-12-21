import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import { AntDesign, Feather, FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import Toast from 'react-native-toast-message';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import colors from '../components/colors';
import { StatusBar } from 'expo-status-bar';

const AddProfile = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [dob, setDob] = useState('');
  const [address, setAddress] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showToast = (type, message) => {
    Toast.show({
      type: type,
      text1: message,
      position: 'top',
      visibilityTime: 3000,
    });
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      showToast('error', 'Permission to access gallery denied.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleContinue = () => {
    if (!name || !email || !mobile || !dob || !address) {
      showToast('error', 'Please fill out all fields.');
      return;
    }
    showToast('success', 'Profile details submitted successfully!');
    navigation.navigate('SelectGender');
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    const formattedDate = date.toISOString().split('T')[0];
    setDob(formattedDate);
    hideDatePicker();
  };

  return (
    <View style={styles.container}>
     <TouchableOpacity style={styles.header} onPress={() => navigation.goBack()}>
          <AntDesign name='leftcircleo' size={35} color={colors.primary}/>
      </TouchableOpacity>

      <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Add Profile Details</Text>
      <Text style={styles.subtitle}>Please add your profile details here</Text>

      <View style={styles.profileContainer}>
        <TouchableOpacity onPress={pickImage} style={styles.profileImageButton}>
          {image ? (
            <Image source={{ uri: image }} style={styles.profileImage} />
          ) : (
            <Image source={require('../assets/images/user3.png')} style={styles.profileImage} />
          )}
          <View style={styles.editIconContainer}>
            <Feather name="edit" size={20} color="#fff" />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email Address"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Mobile Number"
          value={mobile}
          onChangeText={setMobile}
          keyboardType="phone-pad"
        />
      </View>

      <TouchableOpacity style={styles.inputContainer} onPress={showDatePicker}>
        <TextInput
          style={styles.input}
          placeholder="Date of Birth"
          value={dob}
          onChangeText={setDob}
          editable={false}
        />
        <View >
          <FontAwesome name="calendar" size={20} color="#999" style={styles.calendarIcon} />
        </View>
      </TouchableOpacity>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter Address"
          value={address}
          onChangeText={setAddress}
        />
      </View>

      <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
      </ScrollView>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />

      <Toast />
      <StatusBar backgroundColor={colors.greyBackground}/>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: colors.greyBackground,
    padding: 10,
  },
  header: {
    marginTop: 40,
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
  },
  profileContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  profileImageButton: {
    position: 'relative',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#aaa',
  },
  editIconContainer: {
    position: 'absolute',
    bottom: 5,
    right: 10,
    backgroundColor: colors.primary,
    borderRadius: 20,
    padding: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: colors.input
  },
  input: {
    flex: 1,
    paddingVertical: 15,
    fontSize: 16,
  },
  calendarIcon: {
    marginLeft: 10,
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
  },
  contentContainer:{
    backgroundColor: '#fff',
    padding: 10,
    marginTop: 40,
    borderRadius: 10
  },
});

export default AddProfile;
