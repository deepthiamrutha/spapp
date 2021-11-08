import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { RFValue } from "react-native-responsive-fontsize";
import Ionicons from "react-native-vector-icons/Ionicons";
import Apod from "../screens/apod";
import Additional from "../screens/Additional";
import firebase from "firebase";

const Tab = createMaterialBottomTabNavigator();
export default class BottomTabNavigator extends Component {
  
  render() {
    return (
      <Tab.Navigator
        labeled={false}
        barStyle={
         
         styles.bottomTabStyle
        }
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Apod") {
              iconName = focused ? "image" : "image-outline";
            } else if (route.name === "Know More") {
              iconName = focused ? "contrast" : "contrast-outline";
            }
            return (
              <Ionicons
                name={iconName}
                size={RFValue(25)}
                color={color}
                style={styles.icons}
              />
            );
          }
        })}
        activeColor={"#ee8249"}
        inactiveColor={"gray"}
      >
        <Tab.Screen
          name="Apod"
          component={Apod}
          
        />
        <Tab.Screen
          name="Know More"
          component={Additional}
          
        />
      </Tab.Navigator>
    );
  }
}

const styles = StyleSheet.create({
  bottomTabStyle: {
    backgroundColor: "#2f345d",
    height: "8%",
    borderTopLeftRadius: RFValue(30),
    borderTopRightRadius: RFValue(30),
    overflow: "hidden",
    position: "absolute"
  },
 
  icons: {
    width: RFValue(30),
    height: RFValue(30)
  }
});