import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';

import DrawerNavigator from '../navigation/DrawerNavigation';
import { firebaseConfig } from '../config';
export default function DashBoard() {
  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
}
