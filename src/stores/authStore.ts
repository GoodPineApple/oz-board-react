import { create } from 'zustand';
import type { AuthState, User, LoginData, RegisterData } from '../types/index.js';
import { authAPI } from '../services/api.js';

interface AuthStore extends AuthState {
  login: (data: LoginData) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => Promise<void>;
  setUser: (user: User) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,

  login: async (data: LoginData) => {
    set({ isLoading: true });
    
    try {
      const response = await authAPI.login(data);
      
      set({ 
        user: response.user, 
        isAuthenticated: true, 
        isLoading: false 
      });
      
      // Store in localStorage for persistence
      localStorage.setItem('user', JSON.stringify(response.user));
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('token', response.token);
      
      return true;
    } catch (error) {
      console.error('Login error:', error);
      set({ isLoading: false });
      return false;
    }
  },

  register: async (data: RegisterData) => {
    set({ isLoading: true });
    
    try {
      const response = await authAPI.register(data);
      
      set({ 
        user: response.user, 
        isAuthenticated: true, 
        isLoading: false 
      });
      
      localStorage.setItem('user', JSON.stringify(response.user));
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('token', response.token);
      
      return true;
    } catch (error) {
      console.error('Register error:', error);
      set({ isLoading: false });
      return false;
    }
  },

  logout: async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      set({ user: null, isAuthenticated: false });
      localStorage.removeItem('user');
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('token');
    }
  },

  setUser: (user: User) => {
    set({ user, isAuthenticated: true });
  }
}));
