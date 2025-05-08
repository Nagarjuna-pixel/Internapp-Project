
/**
 * @format
 */

import React, { useState } from 'react';
import { StyleSheet, View, Text, Dimensions, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { CalendarList } from 'react-native-calendars';

const App = () => {
  const [selected, setSelected] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Get current date (April 9, 2025)
  const currentDate = new Date().toISOString().split('T')[0]; // Format: '2025-04-09'

  // Sample events data across multiple months
  const events = {
    // OSI Layer Model Training Event
    '2025-04-02': [
      { 
        title: 'OSI Layer Model', 
        time: '2:00 PM - 3:00 PM', 
        color: '#E91E63',
        details: {
          trainingNo: 'TS0130',
          topicName: 'OSI Layer Model',
          category: 'ADMINISTRATIVE STAFF',
          department: 'INFORMATION TECHNOLOGY,HUMAN RESOURCES',
          designation: 'PROGRAM ANALYST,NETWORK ENGINEER',
          trainerName: 'Kishore T',
          trainingType: 'Customized/Softskills Training',
          fromTime: '2:00 PM',
          toTime: '3:00 PM',
          venue: 'Hall A',
          date: '02-04-2025'
        }
      },
    ],
    '2025-03-20': [
      { 
        title: 'Programming', 
        time: '3:00 PM - 4:00 PM', 
        color: '#E91E63',
        details: {
          trainingNo: 'TS0127',
          topicName: 'Programming',
          category: 'ADMINISTRATIVE STAFF',
          department: 'INFORMATION TECHNOLOGY',
          designation: 'PROGRAM ANALYST',
          trainerName: 'Mr.Soundar',
          trainingType: 'Customized/Softskills Training',
          fromTime: '3:00 PM',
          toTime: '4:00 PM',
          venue: 'Hall A',
          date: '20-03-2025'
        }
      },
    ],
    '2025-03-25': [
      { 
        title: 'Networking', 
        time: '10:30 AM - 12:00 PM', 
        color: '#E91E63',
        details: {
          trainingNo: 'TS0128',
          topicName: 'Networking',
          category: 'TECHNICIAN, ADMINISTRATIVE STAFF',
          department: 'ADMINISTRATION, INFORMATION TECHNOLOGY',
          designation: 'INTERNSHIP,PROGRAM ANALYST',
          trainerName: 'TEJO ROKE Y',
          trainingType: 'Customized/Softskills Training',
          fromTime: '10:30 AM',
          toTime: '12:00 PM',
          venue: 'Hall A',
          date: '25-03-2025'
        }
      },
    ],
    '2025-03-30': [
      { 
        title: 'Operating Systems', 
        time: '01:00 PM - 2:00 PM', 
        color: '#E91E63',
        details: {
          trainingNo: 'TS0129',
          topicName: 'Operating Systems',
          category: ' ADMINISTRATIVE STAFF',
          department: ' INFORMATION TECHNOLOGY',
          designation: 'PROGRAM ANALYST',
          trainerName: 'Kishore Kumar T',
          trainingType: 'Customized/Softskills Training',
          fromTime: '1:00 PM',
          toTime: '2:00 PM',
          venue: 'Hall A',
          date: '30-03-2025'
        }
      },
    ],
  };

  // Marked dates for visual highlighting
  const markedDates = Object.keys(events).reduce((acc, date) => {
    acc[date] = { marked: true, dotColor: '#000' };
    return acc;
  }, {});

  const handleEventPress = (event) => {
    setSelectedEvent(event);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <CalendarList
        // Set initial month to current date
        current={currentDate}
        // Allow scrolling to previous and future months
        pastScrollRange={12} // Allows scrolling back 12 months
        futureScrollRange={12} // Allows scrolling forward 12 months
        // Horizontal scrolling enabled for month navigation
        horizontal={true}
        pagingEnabled={true}
        // Set height to cover most of the screen
        calendarHeight={Dimensions.get('window').height - 50}
        // Ensure full width
        style={styles.calendar}
        // Mark dates with events
        markedDates={markedDates}
        // Handle day press (optional)
        onDayPress={(day) => setSelected(day.dateString)}
        // Custom rendering for days with events
        dayComponent={({ date, state }) => {
          try {
            const eventList = events[date.dateString] || [];
            return (
              <View style={styles.dayContainer}>
                <Text style={[styles.dayText, state === 'today' && styles.todayText]}>
                  {date.day}
                </Text>
                {eventList.map((event, index) => (
                  <TouchableOpacity 
                    key={index.toString()} 
                    style={[styles.eventItem, { backgroundColor: event.color }]}
                    onPress={() => handleEventPress(event)}
                  >
                    <Text style={styles.eventTitle}>{event.title}</Text>
                    <Text style={styles.eventTime}>{event.time}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            );
          } catch (error) {
            console.error('Error in dayComponent:', error);
            return <Text>Error</Text>; // Fallback UI
          }
        }}
        theme={{
          calendarBackground: '#fff',
          textSectionTitleColor: '#b6c1cd',
          selectedDayBackgroundColor: '#00adf5',
          selectedDayTextColor: '#ffffff',
          todayTextColor: '#00adf5',
          dayTextColor: '#2d4150',
          textDisabledColor: '#d9e1e8',
          'stylesheet.calendar.header': {
            week: {
              marginTop: 5,
              flexDirection: 'row',
              justifyContent: 'space-around',
            },
          },
        }}
      />

      {/* Event Details Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {selectedEvent?.title || 'Event Details'}
              </Text>
              <TouchableOpacity 
                style={styles.closeButton} 
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.detailsContainer}>
              {selectedEvent?.details ? (
                <>
                  <Text style={styles.detailsHeaderText}>Training Scheduling Details</Text>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Training Session No:</Text>
                    <Text style={styles.detailValue}>{selectedEvent.details.trainingNo}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Topic Name:</Text>
                    <Text style={styles.detailValue}>{selectedEvent.details.topicName}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Category:</Text>
                    <Text style={styles.detailValue}>{selectedEvent.details.category}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Department:</Text>
                    <Text style={styles.detailValue}>{selectedEvent.details.department}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Designation:</Text>
                    <Text style={styles.detailValue}>{selectedEvent.details.designation}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Trainer Name:</Text>
                    <Text style={styles.detailValue}>{selectedEvent.details.trainerName}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Training Type:</Text>
                    <Text style={styles.detailValue}>{selectedEvent.details.trainingType}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>From Time:</Text>
                    <Text style={styles.detailValue}>{selectedEvent.details.fromTime}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>To Time:</Text>
                    <Text style={styles.detailValue}>{selectedEvent.details.toTime}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Venue:</Text>
                    <Text style={styles.detailValue}>{selectedEvent.details.venue}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Date:</Text>
                    <Text style={styles.detailValue}>{selectedEvent.details.date}</Text>
                  </View>
                </>
              ) : (
                <View>
                  <Text style={styles.eventBasicInfo}>
                    Time: {selectedEvent?.time}
                  </Text>
                </View>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  calendar: {
    width: '100%', // Ensure the calendar spans the full width
  },
  dayContainer: {
    alignItems: 'center',
    padding: 5,
  },
  dayText: {
    fontSize: 16,
    color: '#2d4150',
  },
  todayText: {
    color: '#00adf5',
    fontWeight: 'bold',
  },
  eventItem: {
    padding: 5,
    borderRadius: 4,
    marginVertical: 2,
    width: '100%',
  },
  eventTitle: {
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold',
  },
  eventTime: {
    fontSize: 10,
    color: '#fff',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#E91E63',
    padding: 15,
  },
  modalTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  closeButton: {
    padding: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  detailsContainer: {
    padding: 15,
    maxHeight: '70%',
  },
  detailsHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#444',
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 5,
  },
  detailLabel: {
    flex: 1,
    fontWeight: 'bold',
    color: '#555',
  },
  detailValue: {
    flex: 2,
    color: '#333',
  },
  eventBasicInfo: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default App;