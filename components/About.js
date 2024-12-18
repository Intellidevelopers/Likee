import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  TextInput,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { BottomSheet } from '@rneui/themed';

const MoreAboutYouScreen = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [tempValue, setTempValue] = useState('');
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

  const [bioText, setBioText] = useState(
    "I'm looking for a serious relationship that will lead to marriage... I hope to find my match."
  );

  const [data, setData] = useState([
    { label: 'Height', value: '210 cm', icon: 'ruler' },
    { label: 'Kids', value: 'Want soon', icon: 'baby-face-outline' },
    { label: 'Drinking', value: 'Never', icon: 'glass-cocktail' },
    { label: 'You speak', value: 'English', icon: 'translate' },
    { label: 'Relationship', value: 'Single', icon: 'heart-outline' },
    { label: 'Sexuality', value: 'Straight', icon: 'gender-male-female' },
    { label: 'Smoking', value: 'Non-smoker', icon: 'smoking-off' },
    { label: 'Star sign', value: 'Leo', icon: 'zodiac-leo' },
    { label: 'Pets', value: 'No pets', icon: 'dog' },
    { label: 'Religion', value: 'Christian', icon: 'hands-pray' },
    {
      label: 'Personality',
      value: 'Somewhere in between',
      icon: 'emoticon-neutral-outline',
    },
  ]);

  // Handle BottomSheet
  const openBottomSheet = (item) => {
    if (item?.label === 'Bio') {
      setTempValue(bioText); // If editing the Bio, load the bio text into the field
    } else {
      setTempValue(item?.value);
    }
    setSelectedItem(item);
    setIsBottomSheetVisible(true);
  };

  const saveValue = () => {
    if (selectedItem?.label === 'Bio') {
      setBioText(tempValue); // Update the bio state
    } else {
      setData((prevData) =>
        prevData.map((el) =>
          el.label === selectedItem?.label ? { ...el, value: tempValue } : el
        )
      );
    }
    setIsBottomSheetVisible(false);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => openBottomSheet(item)}
    >
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons name={item.icon} size={24} color="black" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.itemLabel}>{item.label}</Text>
        <Text style={styles.itemValue}>{item.value}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="black" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Editable Bio Section */}
      <View style={styles.bioContainer}>
        <Text style={styles.bioTitle}>Bio</Text>
        <TouchableOpacity
          style={styles.bioTouchable}
          onPress={() =>
            openBottomSheet({
              label: 'Bio',
            })
          }
        >
          <Text style={styles.bioText}>{bioText}</Text>
          <Ionicons name="chevron-forward" size={20} color="black" />
        </TouchableOpacity>
      </View>

      {/* More About You Section */}
      <Text style={styles.sectionTitle}>More about you</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.label}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />

      {/* Bottom Sheet for Editing */}
      <BottomSheet
        isVisible={isBottomSheetVisible}
        onBackdropPress={() => setIsBottomSheetVisible(false)}
      >
        <View style={styles.bottomSheetContent}>
          <Text style={styles.modalTitle}>
            Edit {selectedItem?.label === 'Bio' ? 'your Bio' : selectedItem?.label}
          </Text>
          <TextInput
            style={styles.input}
            value={tempValue}
            onChangeText={setTempValue}
            placeholder={`Enter ${selectedItem?.label}`}
          />
          <TouchableOpacity style={styles.saveButton} onPress={saveValue}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setIsBottomSheetVisible(false)}
            style={styles.cancelButton}
          >
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </View>
  );
};

export default MoreAboutYouScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  bioContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  bioTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  bioText: {
    fontSize: 15,
    color: '#666',
    width: '90%',
    marginRight: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  iconContainer: {
    width: 40,
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  itemLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  itemValue: {
    fontSize: 13,
    color: '#666',
  },
  bottomSheetContent: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  cancelText: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
    marginBottom: 10,
  },
  bioTouchable:{
    flexDirection: 'row'
  }
});
