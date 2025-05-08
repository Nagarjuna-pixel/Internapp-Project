// HomeScreenWrapper.js - Updated version
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Import the correct components
import HomePage from './HomePage';
import LeavePage from './LeavePage';
import TrainingPage from './TrainingPage'; // This is now a regular component
import ResignationPage from './ResignationPage';

const Tab = createBottomTabNavigator();

export default function HomeScreenWrapper() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Leave') {
            iconName = focused ? 'calendar-month' : 'calendar-month-outline';
          } else if (route.name === 'Training') {
            iconName = focused ? 'school' : 'school-outline';
          } else if (route.name === 'Resignation') {
            iconName = focused ? 'exit-to-app' : 'exit-to-app';
          }
          
          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          paddingBottom: 5,
          height: 60,
        },
      })}
    >
      <Tab.Screen name="Home" component={HomePage} />
      <Tab.Screen name="Leave" component={LeavePage} />
      <Tab.Screen name="Training" component={TrainingPage} />
      <Tab.Screen name="Resignation" component={ResignationPage} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

// TrainingPage.js - Updated version