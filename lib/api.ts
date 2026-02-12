import axios from 'axios';
import {
    RegisterDto,
    LoginDto,
    AuthResponse,
    UserProfile,
    CreateUserDto,
    UpdateUserDto
} from '../types/user';
import { ChatMessage } from '../types/chat';

const api = axios.create({
  baseURL: process.env.API_URL || 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
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

export const chatApi = {
  getHistory: async (): Promise<ChatMessage[]> => {
    const response = await api.get('/chat/history');
      
    return response.data.map((msg: any) => ({
      id: msg._id,               
      sender: msg.sender?.username || "Unknown",
      content: msg.content,
      timestamp: msg.createdAt, 
    }));
  },
};

export default api;