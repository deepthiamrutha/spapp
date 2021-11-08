import React, { Component } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import StackNavigator from "./StackNavigator";
import Profile from "../screens/Profile";
import Logout from "../screens/Logout";
import firebase from "firebase";
import PicTab from "./PicTabNavigator";
import Iss from "../screens/IssLocation";
import Meteor from "../screens/Meteor";
import NewsTab from "./NewsTabNavigator";
import MarsInsite from "../screens/People";

import CustomSidebarMenu from "../components/CustomSlideBar";

const Drawer = createDrawerNavigator();

export default class DrawerNavigator extends Component {
   render() {
    let props = this.props;
    return (
      <Drawer.Navigator
        drawerContentOptions={{
          activeTintColor: "#e91e63",
          inactiveTintColor:  "white",
          itemStyle: { marginVertical: 5 }
        }}
        drawerContent={props => <CustomSidebarMenu {...props} />}
      >
        <Drawer.Screen
          name="Image Gallery"
          component={PicTab}
        
        />
       < Drawer.Screen
          name="Iss Tracker "
          component={Iss}
        
        />
          < Drawer.Screen
          name="Meteors"
          component={Meteor}
        
        />
          < Drawer.Screen
          name="News Feed"
          component={NewsTab}
        
        />
        < Drawer.Screen
          name="No:of people "
          component={MarsInsite}
        
        />
        
        <Drawer.Screen
          name="Profile"
          component={Profile}
          options={{ unmountOnBlur: true }}
        />
        <Drawer.Screen
          name="Logout"
          component={Logout}
          options={{ unmountOnBlur: true }}
        />
      </Drawer.Navigator>
    );
  }
}
