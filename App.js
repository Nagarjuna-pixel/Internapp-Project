/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

// <-- Add this at the very top of your file
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screens/Login';
import HomeScreen from './src/screens/MainPage';


const Stack = createStackNavigator();
barcodeRecognized = ({ barcodes }) => {
  barcodes.forEach(barcode => console.warn(barcode.data))
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Login"
        screenOptions={{
          gestureEnabled: true
        }}
      >
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="MainPage" 
          component={HomeScreen} 
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;