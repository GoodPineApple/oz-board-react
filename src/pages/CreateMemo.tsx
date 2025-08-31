import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { useMemoStore } from '../stores/memoStore';
import type { CreateMemoData, DesignTemplate } from '../types/index.js';
import './CreateMemo.css';

const CreateMemo: React.FC = () => {
  const { isAuthenticated } = useAuthStore();
  const { templates, fetchTemplates, createMemo, isLoading } = useMemoStore();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<CreateMemoData>({
    title: '',
    content: '',
    templateId: ''
  });
  const [selectedTemplate, setSelectedTemplate] = useState<DesignTemplate | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    fetchTemplates();
  }, [isAuthenticated, navigate, fetchTemplates]);

  useEffect(() => {
    if (templates.length > 0 && !formData.templateId) {
      setFormData(prev => ({ ...prev, templateId: templates[0].id }));
      setSelectedTemplate(templates[0]);
    }
  }, [templates, formData.templateId]);

  useEffect(() => {
    if (formData.templateId) {
      const template = templates.find(t => t.id === formData.templateId);
      setSelectedTemplate(template || null);
    }
  }, [formData.templateId, templates]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.title.trim()) {
      newErrors.title = '제목을 입력해주세요';
    }
    
    if (!formData.content.trim()) {
      newErrors.content = '내용을 입력해주세요';
    }
    
    if (!formData.templateId) {
      newErrors.templateId = '템플릿을 선택해주세요';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      const newMemo = await createMemo(formData);
      if (newMemo) {
        navigate(`/memo/${newMemo.id}`);
      }
    } catch (error) {
      console.error('메모 생성 실패:', error);
    }
  };

  const handleInputChange = (field: keyof CreateMemoData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  if (isLoading && templates.length === 0) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>템플릿을 불러오는 중...</p>
      </div>
    );
  }

  return (
    <div className="create-memo-page">
      <div className="page-header">
        <h1>✏️ 새 메모 작성</h1>
        <p>디자인 템플릿을 선택하고 아름다운 메모를 만들어보세요</p>
      </div>

      <div className="create-memo-container">
        <div className="form-section">
          <form onSubmit={handleSubmit} className="memo-form">
            <div className="form-group">
              <label htmlFor="title">제목</label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="메모 제목을 입력하세요"
                className={errors.title ? 'error' : ''}
              />
              {errors.title && <span className="error-message">{errors.title}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="content">내용</label>
              <textarea
                id="content"
                value={formData.content}
                onChange={(e) => handleInputChange('content', e.target.value)}
                placeholder="메모 내용을 입력하세요"
                rows={8}
                className={errors.content ? 'error' : ''}
              />
              {errors.content && <span className="error-message">{errors.content}</span>}
            </div>

            <div className="form-group">
              <label>디자인 템플릿</label>
              <div className="template-grid">
                {templates.map(template => (
                  <div
                    key={template.id}
                    className={`template-option ${formData.templateId === template.id ? 'selected' : ''}`}
                    onClick={() => handleInputChange('templateId', template.id)}
                  >
                    <div className="template-preview">{template.preview}</div>
                    <span className="template-name">{template.name}</span>
                  </div>
                ))}
              </div>
              {errors.templateId && <span className="error-message">{errors.templateId}</span>}
            </div>

            <div className="form-actions">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="cancel-btn"
              >
                취소
              </button>
              <button
                type="submit"
                className="submit-btn"
                disabled={isLoading}
              >
                {isLoading ? '생성 중...' : '메모 생성'}
              </button>
            </div>
          </form>
        </div>

        <div className="preview-section">
          <h3>미리보기</h3>
          {selectedTemplate && (
            <div
              className="memo-preview"
              style={{
                backgroundColor: selectedTemplate.backgroundColor,
                color: selectedTemplate.textColor,
                border: selectedTemplate.borderStyle,
                boxShadow: selectedTemplate.shadowStyle
              }}
            >
              <h4 className="preview-title">
                {formData.title || '메모 제목'}
              </h4>
              <div className="preview-content">
                {formData.content || '메모 내용을 입력하면 여기에 표시됩니다.'}
              </div>
              <div className="preview-footer">
                <span className="preview-template">{selectedTemplate.name}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateMemo;
