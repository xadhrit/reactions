import React from "react";
import { Easing, Animated, Dimensions } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import Onboarding from "../screens/Onboarding";
import Firstcapture from "../screens/Firstcapture";

const Stack = createStackNavigator();

const Screens = ({ navigation }) => {
    return(
       <Stack.Navigator mode="card"  headerMode="none" >
         <Stack.Screen
          name="Onboarding"
          component={Onboarding}
         />
         <Stack.Screen
           name="Firstcapture"
           component={Firstcapture}
           options={{ headerShown: false }}
         />
       </Stack.Navigator>
    )
}

export default Screens;
