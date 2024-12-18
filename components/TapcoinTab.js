import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from 'react-native'
import TapCoin from "../screens/TapCoin";
import Mining from "../screens/Mining";
import Friends from "../screens/Friends";
import Earn from "../screens/Earn";
import Airdrop from "../screens/Airdrop";
import { color } from "@rneui/base";


const Tab = createBottomTabNavigator();

const TapcoinTab = () => {
  return (
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            position: "absolute",
            bottom: 20,
            left: 20,
            right: 20,
            borderRadius: 15,
            backgroundColor: "#32363C",
            paddingBottom: 10,
            height: 70,
          },
          tabBarLabelStyle: { fontSize: 12 },
          tabBarIconStyle: { marginTop: 5 },
          headerShown: false,
        }}
      >
        <Tab.Screen
          name="Mine"
          component={TapCoin}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={require("../assets/banks/palmpay.png")} // Replace with your actual icon path
                style={{
                  width: 24,
                  height: 24,
                  tintColor: focused ? "#fff" : "#808080",
                }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Exchange"
          component={Mining}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={require("../assets/icons/mine.png")}
                style={{
                  width: 22,
                  height: 22,
                  tintColor: focused ? "#fff" : "#808080",
                  resizeMode: 'contain',
                }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Friends"
          component={Friends}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={require("../assets/icons/friends.png")}
                style={{
                  width: 30,
                  height: 30,
                  resizeMode: 'contain',
                  tintColor: focused ? "#fff" : "#808080",
                }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Earn"
          component={Earn}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={require("../assets/icons/earn.png")}
                style={{
                  width: 24,
                  height: 24,
                  tintColor: focused ? "#fff" : "#808080",
                  resizeMode: 'contain',
                }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Airdrop"
          component={Airdrop}
          options={{
            
            tabBarIcon: ({ focused }) => (
              <Image
                source={require("../assets/icons/airdrop.png")}
                style={{
                  width: 24,
                  height: 24,
                }}
              />
            ),
          }}
        />
      </Tab.Navigator>
  );
};

export default TapcoinTab;
