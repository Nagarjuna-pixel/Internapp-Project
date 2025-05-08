import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import { Alert } from 'react-native';

// Base API configuration
const API_URL = 'http://192.168.90.221:5000';

// Create axios instance with default configuration
export const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 15000, // 15 seconds timeout
  headers: {
    'Content-Type': 'application/json',
    'x-authorization': 'psg#2024@Smart@win',
  },
  withCredentials: true,
});

// Check network connectivity
export const checkNetworkStatus = async () => {
  const state = await NetInfo.fetch();
  return state.isConnected;
};

// Check server availability
export const checkServerConnection = async () => {
  try {
    await apiClient.get('/ping', { timeout: 5000 });
    return true;
  } catch (error) {
    console.error('Server connection check failed:', error.message);
    return false;
  }
};

// Retry logic for transient network errors
export const retryRequest = async (fn, retries = 3, delay = 1000) => {
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

// Format error message based on error type
export const formatErrorMessage = (error) => {
  if (error.response) {
    // The server responded with a status code outside the 2xx range
    switch (error.response.status) {
      case 400:
        return 'Invalid input. Please check your credentials.';
      case 401:
        return 'Invalid user credentials. Please try again.';
      case 403:
        return 'Access denied. You do not have permission.';
      case 404:
        return 'Resource not found. Please try again later.';
      case 500:
        return 'Server error. Please try again later.';
      default:
        return `Server error (${error.response.status}). Try again later.`;
    }
  } else if (error.request) {
    // The request was made but no response was received
    return error.message.includes('timeout')
      ? 'Server is slow or unreachable. Please try again later.'
      : `Cannot connect to server at ${API_URL}. Please check your connection.`;
  } else {
    // Something happened in setting up the request
    return 'An unexpected error occurred. Please try again.';
  }
};
