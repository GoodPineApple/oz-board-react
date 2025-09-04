import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMemoStore } from '../stores/memoStore';
import type { Memo, DesignTemplate } from '../types/index.js';
import './MemoDetail.css';

const MemoDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getMemoById, templates, fetchTemplates } = useMemoStore();
  
  const [memo, setMemo] = useState<Memo | null>(null);
  const [template, setTemplate] = useState<DesignTemplate | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const foundMemo = getMemoById(id);
      if (foundMemo) {
        setMemo(foundMemo);
      } else {
        // 메모가 없으면 목록으로 이동
        // navigate('/');
        return;
      }
    }
  }, [id, getMemoById, navigate]);

  useEffect(() => {
    if (memo && templates.length > 0) {
      const foundTemplate = templates.find(t => t.id === memo.templateId);
      setTemplate(foundTemplate || null);
      setIsLoading(false);
    }
  }, [memo, templates]);

  useEffect(() => {
    if (templates.length === 0) {
      fetchTemplates();
    }
  }, [fetchTemplates, templates.length]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>메모를 불러오는 중...</p>
      </div>
    );
  }

  if (!memo || !template) {
    return (
      <div className="error-container">
        <h2>메모를 찾을 수 없습니다</h2>
        <button onClick={() => navigate('/')} className="back-btn">
          목록으로 돌아가기
        </button>
      </div>
    );
  }

  return (
    <div className="memo-detail-page">
      <div className="page-header">
        <button onClick={() => navigate('/')} className="back-btn">
          ← 목록으로
        </button>
        <h1>메모 상세보기</h1>
      </div>

      <div className="memo-detail-container">
        <div
          className="memo-display"
          style={{
            backgroundColor: template.backgroundColor,
            color: template.textColor,
            border: template.borderStyle,
            boxShadow: template.shadowStyle
          }}
        >
          <div className="memo-header">
            <h2 className="memo-title">{memo.title}</h2>
            <div className="memo-meta">
              <span className="memo-date">
                작성일: {formatDate(memo.createdAt)}
              </span>
              {memo.updatedAt !== memo.createdAt && (
                <span className="memo-updated">
                  수정일: {formatDate(memo.updatedAt)}
                </span>
              )}
            </div>
          </div>

          <div className="memo-content">
            <div className="content-text">
              {memo.content.split('\n').map((line, index) => (
                <p key={index}>{line || '\u00A0'}</p>
              ))}
            </div>
          </div>

          <div className="memo-footer">
            <div className="template-info">
              <span className="template-label">템플릿:</span>
              <span className="template-name">{template.name}</span>
              <span className="template-preview">{template.preview}</span>
            </div>
          </div>
        </div>

        <div className="memo-actions">
          <button
            onClick={() => navigate('/create')}
            className="create-new-btn"
          >
            ✏️ 새 메모 작성
          </button>
          
          <div className="template-preview-section">
            <h3>사용된 템플릿</h3>
            <div className="template-details">
              <div className="template-property">
                <span className="property-label">배경색:</span>
                <div 
                  className="color-preview"
                  style={{ backgroundColor: template.backgroundColor }}
                ></div>
                <span className="color-value">{template.backgroundColor}</span>
              </div>
              
              <div className="template-property">
                <span className="property-label">텍스트색:</span>
                <div 
                  className="color-preview"
                  style={{ backgroundColor: template.textColor }}
                ></div>
                <span className="color-value">{template.textColor}</span>
              </div>
              
              <div className="template-property">
                <span className="property-label">테두리:</span>
                <span className="property-value">{template.borderStyle}</span>
              </div>
              
              <div className="template-property">
                <span className="property-label">그림자:</span>
                <span className="property-value">{template.shadowStyle}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemoDetail;
