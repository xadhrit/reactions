import React from 'react';
import { Platform, StatusBar, Image, StyleSheet } from 'react-native';
import { NavigationContainer } from "@react-navigation/native"
import { Block, GalioProvider } from 'galio-framework';
import Screens from './navigation/Screens';
import { Images,materialTheme } from './constants/';

import { enableScreens } from "react-native-screens";
enableScreens();


export default function App() {
  return (
    <NavigationContainer>
      <GalioProvider theme={materialTheme}>
           <Screens />
          </GalioProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
