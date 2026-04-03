import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api';

// Create Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const authAPI = {
  signup: (data) => api.post('/auth/signup', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
};

// User APIs
export const userAPI = {
  getProfile: (userId) => api.get(`/users/profile/${userId}`),
  updateProfile: (data) => api.put('/users/profile', data),
  getStats: () => api.get('/users/stats'),
};

// Video APIs
export const videoAPI = {
  uploadVideo: (data) => api.post('/videos/upload', data),
  getAllVideos: () => api.get('/videos/all'),
  getVideo: (videoId) => api.get(`/videos/${videoId}`),
  getCreatorVideos: (creatorId) => api.get(`/videos/creator/${creatorId}`),
};

// Token APIs
export const tokenAPI = {
  getBalance: () => api.get('/tokens/balance'),
  sendGift: (data) => api.post('/tokens/gift', data),
  getHistory: () => api.get('/tokens/history'),
};

// Time Tracking APIs
export const timeAPI = {
  logSession: (data) => api.post('/time-tracking/log-session', data),
  getDailyActivity: (date) => api.get(`/time-tracking/daily/${date}`),
};

export default api;
