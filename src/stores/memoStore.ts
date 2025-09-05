import { create } from 'zustand';
import type { MemoState, Memo, CreateMemoData } from '../types/index.js';
import { memoAPI, templateAPI } from '../services/api.js';

interface MemoStore extends MemoState {
  fetchMemos: () => Promise<void>;
  fetchTemplates: () => Promise<void>;
  createMemo: (data: CreateMemoData) => Promise<Memo | null>;
  getMemoById: (id: string) => Memo | undefined;
  getMemosByDate: () => { [key: string]: Memo[] };
}

export const useMemoStore = create<MemoStore>((set, get) => ({
  memos: [],
  templates: [],
  isLoading: false,
  error: null,

  fetchMemos: async () => {
    set({ isLoading: true, error: null });
    
    try {
      const memos = await memoAPI.getMemos();
      console.log('memos', memos);
      set({ memos, isLoading: false });
    } catch (error) {
      console.error('Failed to fetch memos:', error);
      set({ error: 'Failed to fetch memos', isLoading: false });
    }
  },

  fetchTemplates: async () => {
    set({ isLoading: true, error: null });
    
    try {
      const templates = await templateAPI.getTemplates();
      set({ templates, isLoading: false });
    } catch (error) {
      console.error('Failed to fetch templates:', error);
      set({ error: 'Failed to fetch templates', isLoading: false });
    }
  },

  createMemo: async (data: CreateMemoData) => {
    set({ isLoading: true, error: null });
    
    try {
      const newMemo = await memoAPI.createMemo(data);
      
      if (newMemo) {
        const updatedMemos = [newMemo, ...get().memos];
        set({ memos: updatedMemos, isLoading: false });
        return newMemo;
      }
      
      set({ isLoading: false });
      return null;
    } catch (error) {
      console.error('Failed to create memo:', error);
      set({ error: 'Failed to create memo', isLoading: false });
      return null;
    }
  },

  getMemoById: (id: string) => {
    console.log('get().memos', get().memos);
    return get().memos.find(memo => memo.id == id);
  },

  getMemosByDate: () => {
    const memos = get().memos;
    const grouped: { [key: string]: Memo[] } = {};
    
    memos.forEach(memo => {
      const date = new Date(memo.createdAt).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(memo);
    });
    
    return grouped;
  }
}));
