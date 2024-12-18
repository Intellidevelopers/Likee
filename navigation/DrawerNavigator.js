import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DrawerContent } from '../components/';  // Import your custom drawer component
import HomeScreen from '../screens/HomeScreen';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={(props) => <DrawerContent {...props} />} // Use your custom drawer here
      >
        <Drawer.Screen name="Home" component={HomeScreen} />
        {/* Add other screens as needed */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
