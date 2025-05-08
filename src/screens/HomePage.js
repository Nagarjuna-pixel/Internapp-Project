// import React, { useState } from 'react';
// import { StyleSheet, View, Text, Dimensions } from 'react-native';
// import { CalendarList } from 'react-native-calendars';

// const TrainingPage = () => {
//   const [selected, setSelected] = useState('');

//   // Get current date (April 9, 2025)
//   const currentDate = new Date().toISOString().split('T')[0]; // Format: '2025-04-09'

//   // Sample events data (mimicking the image's event blocks)
//   const events = {
//     '2025-04-09': [
//       { title: 'Team Meeting', time: '10:00 AM - 11:00 AM', color: '#4CAF50' },
//       { title: 'Project Review', time: '2:00 PM - 3:30 PM', color: '#2196F3' },
//     ],
//     '2025-04-10': [
//       { title: 'Client Call', time: '9:00 AM - 10:00 AM', color: '#FF9800' },
//     ],
//     '2025-04-11': [
//       { title: 'Lunch with Team', time: '12:00 PM - 1:00 PM', color: '#9C27B0' },
//     ],
//     // Add more events as needed, adjusted to current month
//   };

//   // Marked dates for visual highlighting
//   const markedDates = Object.keys(events).reduce((acc, date) => {
//     acc[date] = { marked: true, dotColor: '#000' };
//     return acc;
//   }, {});

//   const renderEvent = (event) => (
//     <View style={[styles.eventItem, { backgroundColor: event.color }]}>
//       <Text style={styles.eventTitle}>{event.title}</Text>
//       <Text style={styles.eventTime}>{event.time}</Text>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <CalendarList
//         // Set initial month to current date
//         current={currentDate}
//         // Limit to the current month
//         pastScrollRange={0}
//         futureScrollRange={0}
//         // Horizontal scrolling disabled for a static monthly view
//         horizontal={false}
//         pagingEnabled={false}
//         // Calendar height to fit events
//         calendarHeight={Dimensions.get('window').height - 100}
//         // Mark dates with events
//         markedDates={markedDates}
//         // Handle day press (optional)
//         onDayPress={(day) => setSelected(day.dateString)}
//         // Custom rendering for days with events
//         dayComponent={({ date, state }) => {
//           try {
//             console.log('Rendering day:', date.dateString);
//             const eventList = events[date.dateString] || [];
//             return (
//               <View style={styles.dayContainer}>
//                 <Text style={[styles.dayText, state === 'today' && styles.todayText]}>
//                   {date.day}
//                 </Text>
//                 {eventList.map((event, index) => (
//                   <View key={index.toString()} style={[styles.eventItem, { backgroundColor: event.color }]}>
//                     <Text style={styles.eventTitle}>{event.title}</Text>
//                     <Text style={styles.eventTime}>{event.time}</Text>
//                   </View>
//                 ))}
//               </View>
//             );
//           } catch (error) {
//             console.error('Error in dayComponent:', error);
//             return <Text>Error</Text>; // Fallback UI
//           }
//         }}
//         theme={{
//           calendarBackground: '#fff',
//           textSectionTitleColor: '#b6c1cd',
//           selectedDayBackgroundColor: '#00adf5',
//           selectedDayTextColor: '#ffffff',
//           todayTextColor: '#00adf5',
//           dayTextColor: '#2d4150',
//           textDisabledColor: '#d9e1e8',
//           'stylesheet.calendar.header': {
//             week: {
//               marginTop: 5,
//               flexDirection: 'row',
//               justifyContent: 'space-around',
//             },
//           },
//         }}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//   },
//   dayContainer: {
//     alignItems: 'center',
//     padding: 5,
//   },
//   dayText: {
//     fontSize: 16,
//     color: '#2d4150',
//   },
//   todayText: {
//     color: '#00adf5',
//     fontWeight: 'bold',
//   },
//   eventItem: {
//     padding: 5,
//     borderRadius: 4,
//     marginVertical: 2,
//   },
//   eventTitle: {
//     fontSize: 12,
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   eventTime: {
//     fontSize: 10,
//     color: '#fff',
//   },
// });

// export default TrainingPage;

import React, {useState} from 'react';
import {Calendar, LocaleConfig} from 'react-native-calendars';

const App = () => {
  const [selected, setSelected] = useState('');

  return (
    <Calendar
      onDayPress={day => {
        setSelected(day.dateString);
      }}
      markedDates={{
        [selected]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}
      }}
    />
  );
};

export default App;