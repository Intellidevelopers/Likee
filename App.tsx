// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './screens/WelcomeScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import Login from './screens/Login';
import SelectInterest from './screens/SelectInterest';
import EmailRegistration from './screens/EmailRegistration';
import EmailVerification from './screens/EmailVerification';
import AddProfile from './screens/AddProfile';
import SelectGender from './screens/SelectGender';
import IdealMatch from './screens/IdealMatch';
import BottomTabs from './components/BottomTabs';
import Nearby from './screens/Nearby';
import HomeScreen from './screens/HomeScreen';
import UserProfile from './screens/UserProfile';
import Chats from './screens/Chats';
import ChatScreen from './screens/ChatScreen';
import { StatusBar } from 'expo-status-bar';
import Pricing from './screens/Pricing';
import Credits from './screens/Credits';
import Notification from './screens/Notification';
import EditProfile from './screens/EditProfile';
import UploadPhotos from './screens/UploadPhotos';
import ActivitiesScreen from './screens/ActivitiesScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Main" component={BottomTabs} options={{ headerShown: false }}/>
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
        <Stack.Screen name="SelectInterest" component={SelectInterest} options={{ headerShown: false }}/>
        <Stack.Screen name="EmailRegistration" component={EmailRegistration} options={{ headerShown: false }}/>
        <Stack.Screen name="EmailVerification" component={EmailVerification} options={{ headerShown: false }}/>
        <Stack.Screen name="AddProfile" component={AddProfile} options={{ headerShown: false }}/>
        <Stack.Screen name="SelectGender" component={SelectGender} options={{ headerShown: false }}/>
        <Stack.Screen name="IdealMatch" component={IdealMatch} options={{ headerShown: false }}/>
        <Stack.Screen name="Nearby" component={Nearby} options={{ headerShown: false }}/>
        <Stack.Screen name="Chats" component={Chats} options={{ headerShown: false }}/>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="UserProfile" component={UserProfile} options={{ headerShown: false }}/>
        <Stack.Screen name="ChatScreen" component={ChatScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Pricing" component={Pricing} options={{ headerShown: false }}/>
        <Stack.Screen name="Credit" component={Credits} options={{ headerShown: false }}/>
        <Stack.Screen name="Notification" component={Notification} options={{ headerShown: false }}/>
        <Stack.Screen name="EditProfile" component={EditProfile} options={{ headerShown: false }}/>
        <Stack.Screen name="Upload" component={UploadPhotos} options={{ headerShown: false }}/>
        <Stack.Screen name="Activities" component={ActivitiesScreen} options={{ headerShown: false }}/>
      </Stack.Navigator>
      <StatusBar backgroundColor='#fff'/>
    </NavigationContainer>
  );
}

export default App;