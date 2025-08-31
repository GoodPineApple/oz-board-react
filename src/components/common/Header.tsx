import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import './Header.css';

const Header: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          📝 Memo App
        </Link>
        
        <nav className="nav">
          {isAuthenticated ? (
            <>
              <Link to="/create" className="nav-link">
                ✏️ 새 메모
              </Link>
              <div className="user-info">
                <span className="username">안녕하세요, {user?.username}님!</span>
                <button onClick={handleLogout} className="logout-btn">
                  로그아웃
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">
                로그인
              </Link>
              <Link to="/register" className="nav-link">
                회원가입
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
