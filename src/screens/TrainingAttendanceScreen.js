// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// const TrainingAttendanceScreen = () => {
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
// export default TrainingAttendanceScreen;

// import React, { Component } from 'react';
// import {StyleSheet,Text,TouchableOpacity,View,Linking} from 'react-native';

// import QRCodeScanner from 'react-native-qrcode-scanner';
// import { RNCamera } from 'react-native-camera';

// class TrainingAttendanceScreen extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       isScannerVisible: false
//     };
//   }

//   onSuccess = e => {
//     Linking.openURL(e.data).catch(err =>
//       console.error('An error occurred', err)
//     );
//     // Hide scanner after successful scan
//     this.setState({ isScannerVisible: false });
//   };

//   toggleScanner = () => {
//     this.setState(prevState => ({ isScannerVisible: !prevState.isScannerVisible }));
//   };

//   render() {
//     return (
//       <View style={styles.container}>
//         {!this.state.isScannerVisible ? (
//           <View style={styles.startContainer}>
//             <TouchableOpacity 
//               style={styles.scanButton} 
//               onPress={this.toggleScanner}
//             >
//               <Text style={styles.scanButtonText}>Scan QR Code</Text>
//             </TouchableOpacity>
//           </View>
//         ) : (
//           <QRCodeScanner
//             onRead={this.onSuccess}
//             flashMode={RNCamera.Constants.FlashMode.auto}
//             topContent={
//               <Text style={styles.centerText}>
//                 Please scan the QR code to record your attendance
//               </Text>
//             }
//             bottomContent={
//               <TouchableOpacity 
//                 style={styles.buttonTouchable}
//                 onPress={this.toggleScanner}
//               >
//                 <Text style={styles.buttonText}>Cancel</Text>
//               </TouchableOpacity>
//             }
//           />
//         )}
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff'
//   },
//   startContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20
//   },
//   headerText: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 30,
//     color: '#000'
//   },
//   centerText: {
//     flex: 1,
//     fontSize: 18,
//     padding: 32,
//     color: '#777'
//   },
//   textBold: {
//     fontWeight: '500',
//     color: '#000'
//   },
//   buttonText: {
//     fontSize: 21,
//     color: 'rgb(0,122,255)'
//   },
//   buttonTouchable: {
//     padding: 16
//   },
//   scanButton: {
//     backgroundColor: 'rgb(0,122,255)',
//     padding: 13,
//     borderRadius: 8,
//     marginTop: -550,
//     marginLeft: 240, // Added 300px margin to the left to move button to the right
//     alignSelf: 'flex-start', // This helps ensure the margin works correctly
//   },
//   scanButtonText: {
//     fontSize: 18,
//     color: '#fff',
//     fontWeight: '500',
//   }
// });

// export default TrainingAttendanceScreen;

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Dimensions
} from 'react-native';

// Import only QRCodeScanner and avoid direct RNCamera import
import QRCodeScanner from 'react-native-qrcode-scanner';

class TrainingAttendanceScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isScannerVisible: false,
      sessionData: null
    };
  }

  onSuccess = e => {
    try {
      // Parse the QR code data as JSON
      const sessionData = JSON.parse(e.data);
      
      // Update state with the session data
      this.setState({ 
        sessionData,
        isScannerVisible: false 
      });
      
      // Show confirmation alert
      Alert.alert(
        "Attendance Recorded",
        `Successfully recorded attendance for session ${sessionData.sessionNo}: ${sessionData.topic}`,
        [{ text: "OK" }]
      );
      
    } catch (err) {
      console.error('Error processing QR code data:', err);
      Alert.alert(
        "Error",
        "Invalid QR code format. Please try again.",
        [{ text: "OK" }]
      );
      // Hide scanner after error
      this.setState({ isScannerVisible: false });
    }
  };

  toggleScanner = () => {
    this.setState(prevState => ({ isScannerVisible: !prevState.isScannerVisible }));
  };

  renderSessionDetails() {
    const { sessionData } = this.state;
    
    if (!sessionData) return null;
    
    return (
      <View style={styles.sessionContainer}>
        <Text style={styles.sessionTitle}>Training Session Details</Text>
        <Text style={styles.sessionItem}>Session: {sessionData.sessionNo}</Text>
        <Text style={styles.sessionItem}>Topic: {sessionData.topic}</Text>
        <Text style={styles.sessionItem}>Trainer: {sessionData.trainer}</Text>
        <Text style={styles.sessionItem}>Date: {sessionData.date}</Text>
        <Text style={styles.sessionItem}>Time: {sessionData.time}</Text>
        <Text style={styles.sessionItem}>Venue: {sessionData.venue}</Text>
        <Text style={styles.confirmationText}>Attendance Recorded ✓</Text>
      </View>
    );
  }

  render() {
    const { width } = Dimensions.get('window');
    
    return (
      <View style={styles.container}>
        {!this.state.isScannerVisible ? (
          <View style={styles.startContainer}>
            {this.renderSessionDetails()}
            <TouchableOpacity 
              style={styles.scanButton} 
              onPress={this.toggleScanner}
            >
              <Text style={styles.scanButtonText}>Scan QR Code</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <QRCodeScanner
            onRead={this.onSuccess}
            // Use constants directly instead of RNCamera.Constants
            flashMode={4} // Auto flash mode
            cameraStyle={{height: width * 1.5}}
            topContent={
              <Text style={styles.centerText}>
                Please scan the QR code to record your attendance
              </Text>
            }
            bottomContent={
              <TouchableOpacity 
                style={styles.buttonTouchable}
                onPress={this.toggleScanner}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            }
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  startContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#000'
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777'
  },
  textBold: {
    fontWeight: '500',
    color: '#000'
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)'
  },
  buttonTouchable: {
    padding: 16
  },
  scanButton: {
    backgroundColor: 'rgb(0,122,255)',
    padding: 13,
    borderRadius: 8,
    marginTop: 20,
    alignSelf: 'center',
  },
  scanButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '500',
  },
  sessionContainer: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 20,
    alignSelf: 'stretch'
  },
  sessionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#333'
  },
  sessionItem: {
    fontSize: 16,
    marginBottom: 8,
    color: '#444'
  },
  confirmationText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
    marginTop: 15,
    textAlign: 'center'
  }
});

export default TrainingAttendanceScreen;