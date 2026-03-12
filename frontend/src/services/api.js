import axios from 'axios';

//const API_BASE_URL = 'http://localhost:5000/api';
const API_BASE_URL = 'https://job-portal-backend.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// API calls for Auth
export const authAPI = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  register: (data) => api.post('/auth/register', data),
  logout: () => api.get('/auth/logout'),
  getMe: () => api.get('/auth/me'),
};

// API calls for Jobs
export const jobAPI = {
  getAllJobs: (params) => api.get('/jobs', { params }),
  getJobById: (id) => api.get(`/jobs/${id}`),
  createJob: (data) => api.post('/jobs', data),
  updateJob: (id, data) => api.put(`/jobs/${id}`, data),
  deleteJob: (id) => api.delete(`/jobs/${id}`),
  getRecruiterJobs: () => api.get('/jobs/recruiter/my-jobs'),
  getJobStatistics: () => api.get('/jobs/statistics'),
};

// API calls for Applications
export const applicationAPI = {
  applyJob: (data) => api.post('/applications', data),
  getUserApplications: () => api.get('/applications/user'),
  getRecruiterApplications: () => api.get('/applications/recruiter'),
  getJobApplications: (jobId) => api.get(`/applications/job/${jobId}`),
  updateApplicationStatus: (id, data) => api.put(`/applications/${id}`, data),
  withdrawApplication: (id) => api.delete(`/applications/${id}`),
};

// API calls for Users
export const userAPI = {
  getUserProfile: (id) => api.get(`/users/${id}`),
  updateUserProfile: (data) => api.put('/users/profile', data),
  uploadResume: (resumeURL) => api.put('/users/resume', { resumeURL }),
  getAllUsers: () => api.get('/users'),
  deleteUser: (id) => api.delete(`/users/${id}`),
};

export default api;
