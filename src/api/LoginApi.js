// LoginApi.js
import axios from 'axios';

const BASE_URL = 'http://192.168.90.221:5000/login';

const LoginApi = {
  async login(userId, password) {
    try {
   
      const response = await axios.post(
        `${BASE_URL}/Login`,
        {
          userId: userId,
          password: password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default LoginApi;
