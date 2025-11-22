import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "@/nav/components/HomePage";
import SecondScreen from "@/nav/components/SecondPage";
import ThirdScreen from "@/nav/components/ThirdPage";

const Stack = createNativeStackNavigator();

export default function ReactNavigationExample() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: { backgroundColor: "#3B3B3B" },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Second" component={SecondScreen} />
      <Stack.Screen name="Third" component={ThirdScreen} />
    </Stack.Navigator>
  );
}
