import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './stores/authStore';
import Header from './components/common/Header';
import MemoList from './pages/MemoList';
import CreateMemo from './pages/CreateMemo';
import MemoDetail from './pages/MemoDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import './App.css';

function App() {
  const { isAuthenticated, setUser } = useAuthStore();

  useEffect(() => {
    // localStorage에서 사용자 정보 복원
    const savedUser = localStorage.getItem('user');
    const savedAuth = localStorage.getItem('isAuthenticated');
    
    if (savedUser && savedAuth === 'true') {
      try {
        const user = JSON.parse(savedUser);
        setUser(user);
      } catch (error) {
        console.error('사용자 정보 복원 실패:', error);
        localStorage.removeItem('user');
        localStorage.removeItem('isAuthenticated');
      }
    }
  }, [setUser]);

  return (
    <Router>
      <div className="App">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<MemoList />} />
            <Route 
              path="/create" 
              element={
                isAuthenticated ? <CreateMemo /> : <Navigate to="/login" replace />
              } 
            />
            <Route path="/memo/:id" element={<MemoDetail />} />
            <Route 
              path="/login" 
              element={
                isAuthenticated ? <Navigate to="/" replace /> : <Login />
              } 
            />
            <Route 
              path="/register" 
              element={
                isAuthenticated ? <Navigate to="/" replace /> : <Register />
              } 
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
