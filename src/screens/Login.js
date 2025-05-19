import React, { useState, useEffect } from 'react';
import {ImageBackground,View,Text,TextInput,TouchableOpacity,Image,StyleSheet,Dimensions,ActivityIndicator,} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

// API URL configuration
const API_URL = 'http://192.168.90.221:5000';

// Create axios instance with default configuration
const apiClient = axios.create({
  baseURL: API_URL,
  // timeout: 30000, // 30 seconds to account for slow networks
  headers: {
    'Content-Type': 'application/json',
    'x-authorization': 'psg#2024@Smart@win',
  },
  // withCredentials: true,
});

// Retry logic for transient network errors
const retryRequest = async (fn, retries = 3, delay = 1000) => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      console.log(`Retry attempt ${attempt} failed: ${error.message}`);
      if (attempt === retries || !error.request) throw error;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
};

const LoginScreen = ({ navigation }) => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [networkStatus, setNetworkStatus] = useState(true);

  // Monitor network connectivity
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setNetworkStatus(state.isConnected);
      if (!state.isConnected) {
        Toast.show({
          type: 'error',
          text1: 'No Connection',
          text2: 'Please check your internet connection.',
        });
      }
    });

    // Check server connection on mount
    checkServerConnection();

    return () => unsubscribe();
  }, []);

  // Check if server is reachable
  const checkServerConnection = async () => {
    try {
      await apiClient.get('/ping');
      console.log('Server is reachable at', API_URL);
    } catch (error) {
      console.error('Server connection check failed:', {
        message: error.message,
        code: error.code,
        request: error.request,
        response: error.response,
        config: error.config,
      });
      Toast.show({
        type: 'error',
        text1: 'Server Error',
        text2: `Cannot connect to server at ${API_URL}. Please check server status.`,
      });
    }
  };

  const handleLogin = async () => {
    setLoading(true);

    // Form validation
    if (!userId.trim() || !password.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Input Error',
        text2: 'User ID and Password are required.',
      });
      setLoading(false);
      return;
    }

    // Check network status
    if (!networkStatus) {
      Toast.show({
        type: 'error',
        text1: 'No Connection',
        text2: 'Please check your internet connection.',
      });
      setLoading(false);
      return;
    }

    try {
      const response = await retryRequest(() =>
        apiClient.post('/login', { userId, password })
      );

      console.log('Login response:', response.data);

      if (response.status === 200 && response.data.message === 'Login successful') {
        // Store session data
        await AsyncStorage.setItem('userId', response.data.userId);
        await AsyncStorage.setItem('userName', response.data.userName);

        // Clear inputs
        setUserId('');
        setPassword('');

        // Navigate to Home
        navigation.navigate('MainPage');
      } else {
        Toast.show({
          type: 'error',
          text1: 'Login Failed',
          text2: 'Unexpected server response.',
        });
      }
    } catch (error) {
      console.error('Login error:', {
        message: error.message,
        code: error.code,
        request: error.request,
        response: error.response,
        config: error.config,
      });

      if (error.response) {
        if (error.response.status === 401) {
          Toast.show({
            type: 'error',
            text1: 'Login Failed',
            text2: 'Invalid user credentials.',
          });
        } else if (error.response.status === 400) {
          Toast.show({
            type: 'error',
            text1: 'Input Error',
            text2: 'User ID and Password are required.',
          });
        } else {
          Toast.show({
            type: 'error',
            text1: 'Server Error',
            text2: `Server error (${error.response.status}). Try again later.`,
          });
        }
      } else if (error.request) {
        const message = error.message.includes('timeout')
          ? 'Server is slow or unreachable.'
          : `Cannot connect to server at ${API_URL}.`;
        Toast.show({
          type: 'error',
          text1: 'Network Error',
          text2: message,
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: error.message,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require('../assets/LOGIN2.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.loginContainer}>
          {/* Header */}
          <View style={styles.header}>
            <Image
              source={require('../assets/PSGhospitallogo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.title}>Log In to HSIS Smart</Text>
          </View>

          {/* User ID Input */}
          <Text style={styles.label}>User ID</Text>
          <TextInput
            style={styles.input}
            value={userId}
            onChangeText={setUserId}
            placeholder="Enter User ID"
            placeholderTextColor="#999"
            keyboardType="numeric"
          />

          {/* Password Input */}
          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              value={password}
              onChangeText={setPassword}
              placeholder="Enter Password"
              placeholderTextColor="#999"
              secureTextEntry={!isPasswordVisible}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <TouchableOpacity
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              style={styles.eyeIcon}
            >
              <Icon
                name={isPasswordVisible ? 'visibility' : 'visibility-off'}
                size={24}
                color="#999"
              />
            </TouchableOpacity>
          </View>

          {/* Login Button */}
          <TouchableOpacity
            style={[styles.button, loading && styles.disabledButton]}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Text style={styles.buttonText}>Log In</Text>
            )}
          </TouchableOpacity>

          {/* Footer */}
          <Text style={styles.footerText}>Powered by PSG Hospitals | IT Team</Text>
        </View>
      </View>
      <Toast />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: width,
    height: height,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginContainer: {
    width: '80%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 150,
    height: 150,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  label: {
    alignSelf: 'flex-start',
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 12,
    marginBottom: 15,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#fff',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 12,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  eyeIcon: {
    paddingHorizontal: 5,
  },
  button: {
    width: '100%',
    backgroundColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  disabledButton: {
    backgroundColor: '#cccccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerText: {
    fontSize: 12,
    color: '#666',
    marginTop: 10,
  },
});

export default LoginScreen;