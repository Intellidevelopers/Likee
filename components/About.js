import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const MoreAboutYouScreen = () => {
  const data = [
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
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer}>
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons
          name={item.icon}
          size={24}
          color="black"
        />
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
      {/* Header */}
      {/* Bio Section */}
      <View style={styles.bioContainer}>
        <Text style={styles.bioTitle}>Bio</Text>
        <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
            <Text style={styles.bioText}>
            I'm looking for a serious relationship that will lead to marriage... I
            hope to find my match.
            </Text>
            <Ionicons name="chevron-forward" size={20} color="black" />
        </View>
      </View>

      {/* More About You Section */}
      <Text style={styles.sectionTitle}>More about you</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.label}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default MoreAboutYouScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,

  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  headerText: {
    fontSize: 16,
    fontWeight: '600',
  },
  bioContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20
  },
  bioTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  bioText: {
    fontSize: 15,
    color: '#666',
    width: '90%',
    marginRight: 15
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
});
