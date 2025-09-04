export interface User {
  id: string | number;
  username: string;
  email: string;
}

export interface DesignTemplate {
  id: string | number;
  name: string;
  backgroundColor: string;
  textColor: string;
  borderStyle: string;
  shadowStyle: string;
  preview: string;
}

export interface Memo {
  id: string | number;
  title: string;
  content: string;
  templateId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface MemoState {
  memos: Memo[];
  templates: DesignTemplate[];
  isLoading: boolean;
  error: string | null;
}

export interface CreateMemoData {
  title: string;
  content: string;
  templateId: string;
}

export interface LoginData {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
}
