import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import ApplyLeave from './ApplyLeave';
import ApplyExtrawork from './ApplyExtrawork';
import Applyovertime from './Applyovertime';

function ApplyleaveScreen() {
   const navigation = useNavigation();
   return (
<ApplyLeave/>
   );
}

function ApplyExtraworkScreen() {
  const navigation = useNavigation();
  return (
<ApplyExtrawork/>
  );
}

function ApplyovertimeScreen() {
  const navigation = useNavigation();
  return (
<Applyovertime/>
  );
}

function FeedbackScreen() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button 
        title="Go back home" 
        onPress={() => navigation.goBack()} 
      />
    </View>
  );
}

const Drawer = createDrawerNavigator();

export default function LeavePage() {
  return (
    <Drawer.Navigator>
      {/* <Drawer.Screen name="TrainingSchedule" component={HomeScreen} /> */}
      <Drawer.Screen name="Apply Leave" component={ApplyleaveScreen} />
      <Drawer.Screen name="Apply Extra Work" component={ApplyExtraworkScreen} />
      <Drawer.Screen name="Apply Overtime" component={ApplyovertimeScreen} />
      <Drawer.Screen name="Leave Status" component={FeedbackScreen} />
      <Drawer.Screen name="Extra Work Status" component={FeedbackScreen} />
      <Drawer.Screen name="Overtime Status" component={FeedbackScreen} />
      <Drawer.Screen name="Leave History" component={FeedbackScreen} />
    </Drawer.Navigator>  
  );
}