import axios, { type AxiosInstance, type InternalAxiosRequestConfig, type AxiosResponse } from 'axios';
import type { LoginData, RegisterData, CreateMemoData, Memo, DesignTemplate } from '../types/index.js';

// API base URL - 실제 백엔드가 없을 때는 mock 데이터 사용
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Mock data for development
const mockTemplates: DesignTemplate[] = [
  {
    id: '1',
    name: 'Classic White',
    backgroundColor: '#ffffff',
    textColor: '#333333',
    borderStyle: '1px solid #e0e0e0',
    shadowStyle: '0 2px 8px rgba(0,0,0,0.1)',
    preview: '🎨'
  },
  {
    id: '2',
    name: 'Dark Theme',
    backgroundColor: '#2c3e50',
    textColor: '#ecf0f1',
    borderStyle: '1px solid #34495e',
    shadowStyle: '0 4px 12px rgba(0,0,0,0.3)',
    preview: '🌙'
  },
  {
    id: '3',
    name: 'Warm Beige',
    backgroundColor: '#f5f5dc',
    textColor: '#8b4513',
    borderStyle: '2px solid #d2b48c',
    shadowStyle: '0 3px 10px rgba(139,69,19,0.2)',
    preview: '☕'
  },
  {
    id: '4',
    name: 'Ocean Blue',
    backgroundColor: '#e8f4f8',
    textColor: '#2c3e50',
    borderStyle: '1px solid #3498db',
    shadowStyle: '0 2px 8px rgba(52,152,219,0.2)',
    preview: '🌊'
  }
];

const mockMemos: Memo[] = [
  {
    id: '1',
    title: 'Welcome to Memo App',
    content: 'This is your first memo. Start creating beautiful notes with our design templates!',
    templateId: '1',
    userId: '1',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    title: 'Shopping List',
    content: '1. Groceries\n2. Home supplies\n3. Books\n4. Electronics',
    templateId: '2',
    userId: '1',
    createdAt: '2024-01-14T15:30:00Z',
    updatedAt: '2024-01-14T15:30:00Z'
  },
  {
    id: '3',
    title: 'Meeting Notes',
    content: 'Team meeting discussion points:\n- Project timeline\n- Resource allocation\n- Next steps',
    templateId: '3',
    userId: '1',
    createdAt: '2024-01-13T09:15:00Z',
    updatedAt: '2024-01-13T09:15:00Z'
  }
];

// Axios instance 생성 (API가 있을 때만)
let api: AxiosInstance | null = null;

if (API_BASE_URL) {
  api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 600000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Request interceptor - 토큰 추가
  api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = localStorage.getItem('token');
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor - 에러 처리
  api.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error) => {
      if (error.response?.status === 401) {
        // Unauthorized - 로그아웃 처리
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('isAuthenticated');
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );
}

// Auth API
export const authAPI = {
  login: async (data: LoginData): Promise<{ user: { id: string; username: string; email: string }; token: string }> => {
    if (api) {
      console.log('login', data);
      const response = await api.post('/auth/login', data);
      return response.data;
    } else {
      // Mock response for development
      await new Promise(resolve => setTimeout(resolve, 1000));
      return {
        user: {
          id: '1',
          username: data.username,
          email: `${data.username}@example.com`
        },
        token: 'mock-jwt-token'
      };
    }
  },

  register: async (data: RegisterData): Promise<{ user: { id: string; username: string; email: string }; token: string }> => {
    if (api) {
      const response = await api.post('/auth/register', data);
      return response.data;
    } else {
      // Mock response for development
      await new Promise(resolve => setTimeout(resolve, 1000));
      return {
        user: {
          id: Date.now().toString(),
          username: data.username,
          email: data.email
        },
        token: 'mock-jwt-token'
      };
    }
  },

  logout: async (): Promise<void> => {
    if (api) {
      await api.post('/auth/logout');
    } else {
      // Mock logout - always succeed
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }
};

// Memo API
export const memoAPI = {
  getMemos: async (): Promise<Memo[]> => {
    if (api) {
      const response = await api.get('/memos');
      return response.data;
    } else {
      // Return mock data
      await new Promise(resolve => setTimeout(resolve, 500));
      return [...mockMemos];
    }
  },

  createMemo: async (data: CreateMemoData): Promise<Memo> => {
    if (api) {
      const response = await api.post('/memos', {
        ...data,
        // userId: '3' // SQL 서버 테스트할 때
        userId: '68ba6585dc371dbe456ddb4d' // MongoDB 서버 테스트할 때
      });
      return response.data;
    } else {
      // Return mock created memo
      await new Promise(resolve => setTimeout(resolve, 800));
      const newMemo: Memo = {
        id: Date.now().toString(),
        title: data.title,
        content: data.content,
        templateId: data.templateId,
        userId: '1',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      // Add to mock data
      mockMemos.unshift(newMemo);
      
      return newMemo;
    }
  },

  getMemoById: async (id: string): Promise<Memo> => {
    if (api) {
      const response = await api.get(`/memos/${id}`);
      return response.data;
    } else {
      // Return mock memo
      await new Promise(resolve => setTimeout(resolve, 300));
      const memo = mockMemos.find(m => m.id === id);
      if (memo) {
        return memo;
      }
      throw new Error('Memo not found');
    }
  }
};

// Template API
export const templateAPI = {
  getTemplates: async (): Promise<DesignTemplate[]> => {
    if (api) {
      const response = await api.get('/templates');
      console.log(response);
      return response.data;
    } else {
      // Return mock templates
      await new Promise(resolve => setTimeout(resolve, 300));
      return [...mockTemplates];
    }
  }
};

export default api;
