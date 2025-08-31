import React from 'react';
import { Link } from 'react-router-dom';
import type { Memo, DesignTemplate } from '../../types/index.js';
import './MemoCard.css';

interface MemoCardProps {
  memo: Memo;
  template: DesignTemplate;
}

const MemoCard: React.FC<MemoCardProps> = ({ memo, template }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const truncateContent = (content: string, maxLength: number = 100) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  return (
    <Link to={`/memo/${memo.id}`} className="memo-card-link">
      <div 
        className="memo-card"
        style={{
          backgroundColor: template.backgroundColor,
          color: template.textColor,
          border: template.borderStyle,
          boxShadow: template.shadowStyle
        }}
      >
        <div className="memo-header">
          <h3 className="memo-title">{memo.title}</h3>
          <span className="memo-date">{formatDate(memo.createdAt)}</span>
        </div>
        
        <div className="memo-content">
          <p>{truncateContent(memo.content)}</p>
        </div>
        
        <div className="memo-footer">
          <span className="template-name">{template.name}</span>
          <div className="template-preview">{template.preview}</div>
        </div>
      </div>
    </Link>
  );
};

export default MemoCard;
