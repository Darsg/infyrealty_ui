import axios, { InternalAxiosRequestConfig } from 'axios';
import { toast } from 'react-toastify'; // Ensure react-toastify is installed
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles

// Below URL use for local
// const API_URL = 'http://127.0.0.1:8181/';

// Below URL use for stage
const API_URL = 'https://api-dev.infyrealty.com/';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
    Accept: 'application/json',
  },
});

// Add an interceptor to include Authorization token and check internet connectivity
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Check internet connectivity
    if (!navigator.onLine) {
      toast.error('No internet connection. Please check your network.');
      return Promise.reject(new Error('No internet connection'));
    }

    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `${token}`; // Ensure correct Bearer token format
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle Errors Globally
apiClient.interceptors.response.use(
  (response) => {
    
    const { status_code } = response.data;

    if (status_code === 401) {
      localStorage.removeItem('token');
      window.location.href = '/signin';
    } else if (status_code === 400) {
      localStorage.removeItem('token');
      window.location.href = '/signin';
    }

    return response;
  },
  (error) => {
    if (error.response) {
      const { status } = error.response;

      console.log("Error Response:", error.response); 

      if (status === 40) {
        localStorage.removeItem('token');
        window.location.href = '/signin';
      } else if (status === 400) {
        localStorage.removeItem('token');
        window.location.href = '/signin';
      } else if (status === 500) {
        console.log('Server error. Please try again later.');
      } else {
        console.log('An error occurred');
      }
    } else if (error.request) {
      toast.error('Network error. Please check your connection.');
    }

    return Promise.reject(error);
  }
);


export default apiClient;
