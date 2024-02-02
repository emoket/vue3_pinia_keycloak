import axios from 'axios';

// Creating an axios instance for axios to be used by the token interceptor service
const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BE_API_URL}/api/v1`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
