
/**
 * @format
 */

import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator, TouchableOpacity, Modal } from 'react-native';
import { Calendar } from 'react-native-calendars';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

const App = ({ navigation }) => {
  const [selected, setSelected] = useState('');
  const [markedDates, setMarkedDates] = useState({});
  const [trainingDetails, setTrainingDetails] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalList, setModalList] = useState([]);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);

  // Fetch user credentials from AsyncStorage on mount
  useEffect(() => {
    const loadUser = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        const userName = await AsyncStorage.getItem('userName');
        if (userId && userName) {
          setUser({ userId, username: userName });
        } else {
          Toast.show({
            type: 'error',
            text1: 'Authentication Error',
            text2: 'User not authenticated. Please log in.',
          });
          setTimeout(() => navigation.navigate('Login'), 2000);
        }
      } catch (error) {
        console.error('Error loading user from AsyncStorage:', error);
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Failed to load user data. Please log in.',
        });
        setTimeout(() => navigation.navigate('Login'), 2000);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [navigation]);

  // Fetch training schedules when user is loaded
  useEffect(() => {
    if (user) {
      fetchTrainingSchedules();
    }
  }, [user]);

  const fetchTrainingSchedules = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const response = await axios.get('http://192.168.90.221:5000/training-schedules', {
        params: {
          username: user.username,
        },
      });

      if (response.data.success && response.data.count > 0) {
        const schedules = response.data.data.filter((schedule) => {
          const trainees = schedule.TRAINEES || '';
          return trainees.includes(user.username) && trainees.includes(user.userId);
        });

        if (schedules.length === 0) {
          setMarkedDates({});
          Toast.show({
            type: 'info',
            text1: 'No Schedules',
            text2: 'No training schedules available for you.',
          });
          return;
        }

        const marked = {};
        schedules.forEach((schedule) => {
          const dateParts = schedule.FORMATTED_DATE.split('-');
          const date = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`; // Convert DD-MM-YYYY to YYYY-MM-DD
          marked[date] = {
            marked: true,
            dotColor: 'red',
            selected: selected === date,
            selectedColor: 'cyan',
          };
        });

        setMarkedDates(marked);
      } else {
        setMarkedDates({});
        Toast.show({
          type: 'info',
          text1: 'No Schedules',
          text2: 'No training schedules available for you.',
        });
      }
    } catch (error) {
      console.error('Error fetching training schedules:', error);
      Toast.show({
        type: 'error',
        text1: 'Network Error',
        text2: error.message.includes('timeout')
          ? 'Server is slow or unreachable.'
          : 'Failed to fetch training schedules.',
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle day press to show training details for the selected date
  const handleDayPress = async (day) => {
    if (!user) return;

    setSelected(day.dateString);
    setLoading(true);
    try {
      const response = await axios.get('http://192.168.90.221:5000/training-schedules', {
        params: {
          username: user.username,
        },
      });

      if (response.data.success && response.data.count > 0) {
        const selectedDateDetails = response.data.data.filter((detail) => {
          const dateParts = detail.FORMATTED_DATE.split('-');
          const formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
          const trainees = detail.TRAINEES || '';
          return formattedDate === day.dateString && trainees.includes(user.username) && trainees.includes(user.userId);
        });

        setTrainingDetails(selectedDateDetails);
        if (selectedDateDetails.length === 0) {
          Toast.show({
            type: 'info',
            text1: 'No Training',
            text2: 'No training scheduled for this date.',
          });
        }
      } else {
        setTrainingDetails([]);
        Toast.show({
          type: 'info',
          text1: 'No Training',
          text2: 'No training scheduled for this date.',
        });
      }
    } catch (error) {
      console.error('Error fetching training details:', error);
      setTrainingDetails([]);
      Toast.show({
        type: 'error',
        text1: 'Network Error',
        text2: error.message.includes('timeout')
          ? 'Server is slow or unreachable.'
          : 'Failed to fetch training details.',
      });
    } finally {
      setLoading(false);
    }

    setMarkedDates((prev) => {
      const updated = { ...prev };
      Object.keys(updated).forEach((date) => {
        updated[date] = { ...updated[date], selected: false };
      });
      updated[day.dateString] = {
        ...updated[day.dateString],
        selected: true,
        selectedColor: 'blue',
        marked: updated[day.dateString]?.marked || false,
        dotColor: 'red',
      };
      return updated;
    });
  };

  // Handle button press to show list in modal
  const handleListPress = (title, data) => {
    // Split data by commas, trim, and filter out empty strings
    const list = (data || '')
      .split(',')
      .map(item => item.trim())
      .filter(item => item.length > 0);
    
    setModalTitle(title);
    setModalList(list);
    setCurrentItemIndex(0); // Start with the first item
    setModalVisible(true);
  };

  // Handle next item in modal
  const handleNextItem = () => {
    setCurrentItemIndex((prevIndex) => (prevIndex + 1) % modalList.length);
  };

  // Get the first item before the first comma for display
  const getFirstItem = (data) => {
    if (!data) return '';
    const list = data.split(',').map(item => item.trim()).filter(item => item.length > 0);
    return list.length > 0 ? list[0] : '';
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userId');
      await AsyncStorage.removeItem('userName');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error during logout:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to log out.',
      });
    }
  };

  if (loading && !user) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity> */}
      </View>
      <Calendar
        onDayPress={handleDayPress}
        markedDates={markedDates}
        theme={{
          selectedDayBackgroundColor: 'blue',
          todayTextColor: 'green',
          dotColor: 'red',
          selectedDotColor: 'orange',
        }}
      />
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007bff" />
        </View>
      ) : (
        <ScrollView style={styles.detailsContainer}>
          {trainingDetails.length > 0 ? (
            trainingDetails.map((detail, index) => (
              <View key={index} style={styles.detailCard}>
                <Text style={styles.detailText}>Topic: {detail.TOPICNAME}</Text>
                <View style={styles.detailRow}>
                  <Text style={styles.detailText}>Category: {getFirstItem()}</Text>
                  <TouchableOpacity
                    style={styles.listButton}
                    onPress={() => handleListPress('Categories', detail.CATEGORY)}
                  >
                    <Text style={styles.listButtonText}>Category</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailText}>Department: {getFirstItem()}</Text>
                  <TouchableOpacity
                    style={styles.listButton}
                    onPress={() => handleListPress('Departments', detail.DEPARTMENT)}
                  >
                    <Text style={styles.listButtonText}>Departments</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailText}>Designation: {getFirstItem()}</Text>
                  <TouchableOpacity
                    style={styles.listButton}
                    onPress={() => handleListPress('Designations', detail.DESIGNATION)}
                  >
                    <Text style={styles.listButtonText}>Designation</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.detailText}>Trainer: {detail.TRAINERNAME}</Text>
                <Text style={styles.detailText}>Outside Trainers: {detail.OUTSIDE_TRAINERS}</Text>
                <Text style={styles.detailText}>Type: {detail.TRAININGTYPE}</Text>
                <Text style={styles.detailText}>
                  Time: {detail.FROM_TRAINING_TIME} - {detail.TO_TRAINING_TIME}
                </Text>
                <Text style={styles.detailText}>Venue: {detail.VENUE}</Text>
                <Text style={styles.detailText}>Date: {detail.FORMATTED_DATE}</Text>
                <Text style={styles.detailText}>Participants: {detail.PARTICIPANTS}</Text>
                <View style={styles.detailRow}>
                  <Text style={styles.detailText}>Trainees: {getFirstItem()}</Text>
                  <TouchableOpacity
                    style={styles.listButton}
                    onPress={() => handleListPress('Trainees', detail.TRAINEES)}
                  >
                    <Text style={styles.listButtonText}>Trainees</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          ) : (
            <Text style={styles.noDataText}>No training scheduled for this date.</Text>
          )}
        </ScrollView>
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{modalTitle}</Text>
            <View style={styles.modalItemContainer}>
              {modalList.length > 0 ? (
                <Text style={styles.modalListItem}>{modalList[currentItemIndex]}</Text>
              ) : (
                <Text style={styles.modalNoData}>No items available</Text>
              )}
            </View>
            {modalList.length > 1 && (
              <TouchableOpacity
                style={styles.nextButton}
                onPress={handleNextItem}
              >
                <Text style={styles.nextButtonText}>Next</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  logoutButton: {
    backgroundColor: '#ff4444',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsContainer: {
    flex: 1,
    padding: 15,
  },
  detailCard: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6, // Increased spacing between rows
  },
  detailText: {
    fontSize: 16,
    color: '#333',
    marginRight: 8, // Space between text and button
    marginVertical: 9, // Increased spacing for text fields
  },
  listButton: {
    backgroundColor: '#007bff',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  listButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  noDataText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    maxHeight: '50%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  modalItemContainer: {
    minHeight: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  modalListItem: {
    fontSize: 16,
    paddingVertical: 5,
    color: '#333',
    textAlign: 'center',
  },
  modalNoData: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    paddingVertical: 10,
  },
  nextButton: {
    backgroundColor: '#28a745',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  closeButton: {
    backgroundColor: '#ff4444',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default App;