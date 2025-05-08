
// /**
//  * @format
//  */

// import * as React from 'react';
// import { View } from 'react-native';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import { useNavigation } from '@react-navigation/native';
// import TrainingScheduleScreen from './TrainingScheduleScreen';
// import TrainingAttendanceScreen from './TrainingAttendanceScreen';
// import TrainingFeedbackScreen from './TrainingFeedbackScreen';

// function HomeScreen() {
//   return <TrainingScheduleScreen />;
// }

// function AttendanceScreen() {
//   return <TrainingAttendanceScreen />;
// }

// function FeedbackScreen() {
//   return <TrainingFeedbackScreen />;
// }

// const Drawer = createDrawerNavigator();

// export default function TrainingPage() {
//   // This is now a valid React component that renders a drawer navigator
//   return (
//     <Drawer.Navigator initialRouteName="TrainingSchedule">
//       <Drawer.Screen style={{color:"#003092"}} name="TrainingSchedule" component={HomeScreen} />
//       <Drawer.Screen name="TrainingAttendance" component={AttendanceScreen} />
//       <Drawer.Screen name="TrainingFeedback" component={FeedbackScreen} />
//     </Drawer.Navigator>
//   );
// }

import * as React from 'react';
import { View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import TrainingScheduleScreen from './TrainingScheduleScreen';
import TrainingAttendanceScreen from './TrainingAttendanceScreen';
import TrainingFeedbackScreen from './TrainingFeedbackScreen';

function HomeScreen() {
  return <TrainingScheduleScreen />;
}

function AttendanceScreen() {
  return <TrainingAttendanceScreen />;
}

function FeedbackScreen() {
  return <TrainingFeedbackScreen />;
}

const Drawer = createDrawerNavigator();

export default function TrainingPage() {
  return (
    <Drawer.Navigator 
      initialRouteName="TrainingSchedule"
      screenOptions={{
        drawerActiveTintColor: '#007bff', // Active item text color
        drawerInactiveTintColor: '#007bff', // Inactive item text color
        drawerLabelStyle: {
          fontSize: 16,
          fontWeight: 'bold',
        },
        drawerStyle: {
          backgroundColor: '#fff', // Background color of the drawer
          width: 240, // Width of the drawer
        },
        headerTintColor: '#007bff', // Color of the header back button and title
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Drawer.Screen 
        name="TrainingSchedule" 
        component={HomeScreen} 
      />
      <Drawer.Screen 
        name="TrainingAttendance" 
        component={AttendanceScreen} 
        
      />
      <Drawer.Screen 
        name="TrainingFeedback" 
        component={FeedbackScreen} 
    
      />
    </Drawer.Navigator>
  );
}