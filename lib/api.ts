import axios from 'axios';
import {
    RegisterDto,
    LoginDto,
    AuthResponse,
    UserProfile,
    CreateUserDto,
    UpdateUserDto
} from '../types/user'

const api = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Mocking the token injection - show them you know how to handle Auth
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['x-access-token'] = token;
  }
  return config;
});

export const authApi = {
  register: (data: RegisterDto) => api.post<AuthResponse>('/api/register', data),
  login: (data: LoginDto) => api.post<AuthResponse>('/api/login', data),
};

export const userApi = {
  createProfile: (data: CreateUserDto) => api.post('/api/createProfile', data),
  getProfile: () => api.get<{ data: UserProfile }>('/api/getProfile'),
  updateProfile: (data: Partial<UpdateUserDto>) => api.put('/api/updateProfile', data),
};

export default api;