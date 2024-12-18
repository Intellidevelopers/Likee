import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export const CustomDrawer = (props) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Add custom header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Custom Drawer</Text>
      </View>

      {/* Add custom items */}
      <TouchableOpacity 
        style={styles.item} 
        onPress={() => navigation.navigate('Home')}
      >
        <Ionicons name="home" size={24} color="black" />
        <Text style={styles.itemText}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.item} 
        onPress={() => navigation.navigate('UserProfile')}
      >
        <Ionicons name="person" size={24} color="black" />
        <Text style={styles.itemText}>User Profile</Text>
      </TouchableOpacity>

      {/* Add more items as needed */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingLeft: 20,
  },
  header: {
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  itemText: {
    fontSize: 18,
    marginLeft: 10,
  },
});

export default CustomDrawer;
