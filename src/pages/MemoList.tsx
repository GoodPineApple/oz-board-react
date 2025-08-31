import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { useMemoStore } from '../stores/memoStore';
import MemoCard from '../components/memo/MemoCard';
import type { Memo, DesignTemplate } from '../types/index.js';
import './MemoList.css';

const MemoList: React.FC = () => {
  const { isAuthenticated } = useAuthStore();
  const { memos, templates, fetchMemos, fetchTemplates, isLoading } = useMemoStore();
  const navigate = useNavigate();
  const [groupedMemos, setGroupedMemos] = useState<{ [key: string]: Memo[] }>({});

  useEffect(() => {
    fetchMemos();
    fetchTemplates();
  }, [fetchMemos, fetchTemplates]);

  useEffect(() => {
    if (memos.length > 0 && templates.length > 0) {
      const grouped = memos.reduce((acc, memo) => {
        const date = new Date(memo.createdAt).toLocaleDateString('ko-KR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
        
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(memo);
        return acc;
      }, {} as { [key: string]: Memo[] });

      // 날짜별로 정렬 (최신순)
      const sortedDates = Object.keys(grouped).sort((a, b) => 
        new Date(b).getTime() - new Date(a).getTime()
      );

      const sortedGrouped: { [key: string]: Memo[] } = {};
      sortedDates.forEach(date => {
        sortedGrouped[date] = grouped[date];
      });

      setGroupedMemos(sortedGrouped);
    }
  }, [memos, templates]);

  const handleCreateMemo = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    navigate('/create');
  };

  const getTemplateById = (templateId: string): DesignTemplate => {
    return templates.find(t => t.id === templateId) || templates[0];
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>메모를 불러오는 중...</p>
      </div>
    );
  }

  return (
    <div className="memo-list-page">
      <div className="page-header">
        <h1>📝 내 메모장</h1>
        <p>아름다운 디자인으로 메모를 작성해보세요</p>
        
        <button 
          onClick={handleCreateMemo}
          className="create-memo-btn"
        >
          {isAuthenticated ? '✏️ 새 메모 작성' : '🔒 로그인하여 메모 작성'}
        </button>
      </div>

      {memos.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📝</div>
          <h2>아직 메모가 없습니다</h2>
          <p>첫 번째 메모를 작성해보세요!</p>
          {!isAuthenticated && (
            <button 
              onClick={() => navigate('/login')}
              className="login-btn"
            >
              로그인하기
            </button>
          )}
        </div>
      ) : (
        <div className="memo-groups">
          {Object.entries(groupedMemos).map(([date, dateMemos]) => (
            <div key={date} className="memo-group">
              <h2 className="date-header">{date}</h2>
              <div className="memo-grid">
                {dateMemos.map(memo => (
                  <MemoCard
                    key={memo.id}
                    memo={memo}
                    template={getTemplateById(memo.templateId)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MemoList;
