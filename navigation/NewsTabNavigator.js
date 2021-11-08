import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { RFValue } from "react-native-responsive-fontsize";
import Ionicons from "react-native-vector-icons/Ionicons";
import News from "../screens/News";
import Blogs from "../screens/Blogs";
import Reports from "../screens/Reports"
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
            if (route.name === "News") {
              iconName = focused ? "newspaper" : "newspaper-outline";
            } else if (route.name === "Blogs") {
              iconName = focused ? "chatbubble" : "chatbubble-outline";
            }
            else if (route.name === "Reports") {
              iconName = focused ? "receipt" : "receipt-outline";
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
          name="News"
          component={News}
          
        />
        <Tab.Screen
          name="Blogs"
          component={Blogs}
          
        />
         <Tab.Screen
          name="Reports"
          component={Reports}
          
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