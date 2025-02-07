import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Nearby from '../screens/Nearby';
import Likes from '../screens/Likes';
import HomeScreen from '../screens/HomeScreen';
import Chats from '../screens/Chats';
import Profile from '../screens/Profile';

// Bottom Tab Navigator instance
const Tab = createBottomTabNavigator();

// Custom Tab Bar Button
const CustomTabBarButton = ({ children, onPress }) => (
  <TouchableOpacity style={styles.customButtonContainer} onPress={onPress}>
    <View style={styles.customButton}>{children}</View>
  </TouchableOpacity>
);

const CustomBottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons
                name="cards"
                size={26}
                color={focused ? '#22426A' : '#888'}
              />
              <Text style={{ color: focused ? '#22426A' : '#888' }}>Swipe</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Nearby"
        component={Nearby}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainer}>
              <Ionicons
                name="location"
                size={26}
                color={focused ? '#22426A' : '#888'}
              />
              <Text style={{ color: focused ? '#22426A' : '#888' }}>Nearby</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Likes"
        component={Likes}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainer}>
              <Ionicons
                name="heart"
                size={26}
                color={focused ? '#22426A' : '#888'}
              />
              <Text style={{ color: focused ? '#22426A' : '#888' }}>Likes</Text>
            </View>
          ),
          tabBarBadge: 8, // Badge number for Likes
          tabBarBadgeStyle: styles.tabBadge, // Custom style for badge
        }}
      />
      <Tab.Screen
        name="Chats"
        component={Chats}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainer}>
              <Ionicons
                name="chatbubble"
                size={26}
                color={focused ? '#22426A' : '#888'}
              />
              <Text style={{ color: focused ? '#22426A' : '#888' }}>Chats</Text>
            </View>
          ),
          tabBarBadge: 3, // Badge number for Chats
          tabBarBadgeStyle: styles.tabBadge, // Custom style for badge
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainer}>
              <Ionicons
                name="person"
                size={26}
                color={focused ? '#22426A' : '#888'}
              />
              <Text style={{ color: focused ? '#22426A' : '#888' }}>Profile</Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default CustomBottomTabs;

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    backgroundColor: '#ffffff',
    height: 75,
    paddingBottom: 20,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBadge: {
    backgroundColor: 'red', // Badge background color
    color: '#fff', // Badge text color
    fontSize: 12, // Badge text size
    fontWeight: 'bold', // Badge text weight
  },
  customButtonContainer: {
    top: -30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  customButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#22426A',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#22426A',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
  },
});
