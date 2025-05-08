// // HomeContent.js
// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// const ResignationPage = () => {
//   return (
//     <View style={styles.container}>
//       <Text>This is my custom Resignation content component!</Text>
//       {/* Add more content here */}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#f5f5f5'
//   }
// });

// export default ResignationPage;


import * as React from 'react';
import { View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { Button } from '@react-navigation/elements';
import ApplyResignation from './ApplyResignation';
import ResignationStatus from './ResignationStatus'

function HomeScreen() {
  const navigation = useNavigation();

  return (
   <ApplyResignation/>
  );
}

function NotificationsScreen() {
  const navigation = useNavigation();

  return (
    <ResignationStatus/>
  );
}

function FeedbackScreen() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.goBack()}>Go back home</Button>
    </View>
  );
}

const Drawer = createDrawerNavigator();

export default function ResignationPage() {
  return (

      <Drawer.Navigator initialRouteName="ApplyResignation">
        <Drawer.Screen name="ApplyResignation" component={HomeScreen} />
        <Drawer.Screen name="Resignation Status" component={NotificationsScreen} />
      </Drawer.Navigator>
   
  );
}

{/* <Drawer.Screen name="ApplyResignation" component={HomeScreen} />
<Drawer.Screen name="Resignation Status" component={NotificationsScreen} /> */}