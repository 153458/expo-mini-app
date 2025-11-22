import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import screens from the migrated react-navigation app
import HomeScreen from '@/nav/components/HomePage';
import SecondScreen from '@/nav/components/SecondPage';
import ThirdScreen from '@/nav/components/ThirdPage';

// Create the stack
const Stack = createNativeStackNavigator();

export default function ReactNavigationExample() {
  return (
    // `independent` prevents conflicts with the NavigationContainer used by expo-router
   <Stack.Navigator
  initialRouteName="Home"
  screenOptions={{
    headerStyle: { backgroundColor: "#3B3B3B" },
    headerTintColor: "#fff",
    headerTitleStyle: { fontWeight: "bold" },
  }}
>
  <Stack.Screen name="Home" component={HomeScreen} />
  <Stack.Screen name="Second Page" component={SecondScreen} />
  <Stack.Screen name="Third Page" component={ThirdScreen} />
</Stack.Navigator>

  );
}
