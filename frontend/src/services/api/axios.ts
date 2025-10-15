import axios from 'axios';

export const axiosInstance = axios.create({
    // baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    baseURL: 'http://150.230.186.30:8080',
    timeout: 30000,
    headers: {
      'Content-Type': 'application/json',   
    },
  });