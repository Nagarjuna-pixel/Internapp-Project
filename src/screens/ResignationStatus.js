// HomeContent.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TrainingAttendance = () => {
  return (
    <View style={styles.container}>
      <Text>This is my custom Resignation content component!</Text>
      {/* Add more content here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5'
  }
});

export default TrainingAttendance;