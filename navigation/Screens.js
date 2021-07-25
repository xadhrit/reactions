import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Onboarding from "../screens/Onboarding";
import Firstcapture from "../screens/Firstcapture";
import ReactScreen, {navigationOptions as reactNavigationOptions} from "../screens/ReactScreen";
import FirstPreview from "../screens/FirstPreview";

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
         <Stack.Screen
           name="FirstPreview"
           component={FirstPreview}
           options={{headerShown: false}}
         />
         <Stack.Screen
           name="React"
           component={ReactScreen}
           options={{headerShown: false}}
         />

       </Stack.Navigator>
    )
}

export default Screens;
