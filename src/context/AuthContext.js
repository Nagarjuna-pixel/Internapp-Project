import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define the API base URL - change this to match your server address
const API_BASE_URL = 'http://192.168.90.221:5000';

// Create context
const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: null,
    userId: null,
    userName: null,
    isLoading: true,
    isSignout: false,
  });

  // Effect to load stored auth state on app start
  useEffect(() => {
    // Load auth state from storage
    const loadStoredAuthState = async () => {
      try {
        const [token, userId, userName] = await Promise.all([
          AsyncStorage.getItem('authToken'),
          AsyncStorage.getItem('userId'),
          AsyncStorage.getItem('userName')
        ]);

        if (token && userId) {
          // Verify token validity with server
          try {
            const response = await fetch(`${API_BASE_URL}/session`, {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
            });

            const data = await response.json();
            
            if (response.ok && data.userId) {
              // Valid session
              setAuthState({
                token,
                userId,
                userName,
                isLoading: false,
                isSignout: false,
              });
            } else {
              // Invalid session - clear storage
              await signOut();
            }
          } catch (error) {
            console.error('Session verification error:', error);
            setAuthState({
              token: null,
              userId: null,
              userName: null,
              isLoading: false,
              isSignout: true,
            });
          }
        } else {
          // No stored credentials
          setAuthState({
            token: null,
            userId: null,
            userName: null,
            isLoading: false,
            isSignout: true,
          });
        }
      } catch (error) {
        console.error('Failed to load auth state:', error);
        setAuthState({
          token: null,
          userId: null,
          userName: null,
          isLoading: false,
          isSignout: true,
        });
      }
    };

    loadStoredAuthState();
  }, []);

  // Sign in function
  const signIn = async (userId, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          password,
          deviceType: 'mobile'
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Store auth data
      await AsyncStorage.setItem('authToken', data.token);
      await AsyncStorage.setItem('userId', data.userId);
      await AsyncStorage.setItem('userName', data.userName);

      // Update state
      setAuthState({
        token: data.token,
        userId: data.userId,
        userName: data.userName,
        isLoading: false,
        isSignout: false,
      });

      return data;
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  };

  // Sign out function
  const signOut = async () => {
    try {
      // Call logout endpoint if needed
      if (authState.token) {
        try {
          await fetch(`${API_BASE_URL}/logout`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${authState.token}`,
              'Content-Type': 'application/json'
            }
          });
        } catch (error) {
          // Continue with local logout even if server logout fails
          console.error('Logout API error:', error);
        }
      }

      // Clear storage
      await AsyncStorage.removeItem('authToken');
      await AsyncStorage.removeItem('userId');
      await AsyncStorage.removeItem('userName');

      // Update state
      setAuthState({
        token: null,
        userId: null,
        userName: null,
        isLoading: false,
        isSignout: true,
      });
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  };

  // Create authenticated fetch function
  const authFetch = async (endpoint, options = {}) => {
    // Default options
    const defaultOptions = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // Add auth token if available
    if (authState.token) {
      defaultOptions.headers.Authorization = `Bearer ${authState.token}`;
    }

    // Merge options
    const mergedOptions = {
      ...defaultOptions,
      ...options,
      headers: {
        ...defaultOptions.headers,
        ...options.headers,
      },
    };

    // Make the request
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, mergedOptions);
      
      // Handle 401 Unauthorized responses
      if (response.status === 401) {
        // Token might be expired, clear auth state
        await signOut();
        throw new Error('Session expired. Please log in again.');
      }
      
      return response;
    } catch (error) {
      console.error('Auth fetch failed:', error);
      throw error;
    }
  };

  // Provide the auth context value
  const authContextValue = {
    ...authState,
    signIn,
    signOut,
    authFetch,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};