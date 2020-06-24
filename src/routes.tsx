import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "./pages/Home";
import Add from "./pages/Add";
import Find from "./pages/Find";
import Toilet from "./pages/Toilet";

const Stack = createStackNavigator();

const Routes: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none" initialRouteName={"Add"}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Find" component={Find} />
        <Stack.Screen name="Add" component={Add} />
        <Stack.Screen name="Toilet" component={Toilet} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
