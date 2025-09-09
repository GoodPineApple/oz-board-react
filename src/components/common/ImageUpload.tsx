import React, { useState, useRef } from 'react';
import './ImageUpload.css';

interface ImageUploadProps {
  onImageSelect: (file: File | null) => void;
  currentImage?: File | null;
  disabled?: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onImageSelect,
  currentImage,
  disabled = false
}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 이미지 파일 유효성 검사
  const validateFile = (file: File): boolean => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!validTypes.includes(file.type)) {
      alert('지원되는 이미지 형식: JPG, PNG, GIF, WebP');
      return false;
    }

    if (file.size > maxSize) {
      alert('이미지 크기는 5MB 이하여야 합니다.');
      return false;
    }

    return true;
  };

  // 파일 선택 처리
  const handleFileSelect = (file: File | null) => {
    if (!file) {
      setPreview(null);
      onImageSelect(null);
      return;
    }

    if (!validateFile(file)) {
      return;
    }

    // 미리보기 생성
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    onImageSelect(file);
  };

  // 파일 입력 변경 핸들러
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    handleFileSelect(file);
  };

  // 드래그 앤 드롭 핸들러
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) {
      setDragOver(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);

    if (disabled) return;

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  // 파일 선택 버튼 클릭
  const handleButtonClick = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // 이미지 제거
  const handleRemoveImage = () => {
    setPreview(null);
    onImageSelect(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="image-upload">
      <label className="image-upload-label">이미지 첨부 (선택사항)</label>
      
      <div
        className={`image-upload-area ${dragOver ? 'drag-over' : ''} ${disabled ? 'disabled' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleButtonClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleInputChange}
          disabled={disabled}
          style={{ display: 'none' }}
        />

        {preview ? (
          <div className="image-preview-container">
            <img src={preview} alt="Preview" className="image-preview" />
            <div className="image-overlay">
              <button
                type="button"
                className="remove-image-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveImage();
                }}
                disabled={disabled}
              >
                ✕
              </button>
            </div>
          </div>
        ) : (
          <div className="image-upload-placeholder">
            <div className="upload-icon">📷</div>
            <div className="upload-text">
              <p>이미지를 드래그하거나 클릭하여 선택하세요</p>
              <p className="upload-hint">JPG, PNG, GIF, WebP (최대 5MB)</p>
            </div>
          </div>
        )}
      </div>

      {currentImage && !preview && (
        <div className="current-image-info">
          <span className="file-name">선택된 파일: {currentImage.name}</span>
          <button
            type="button"
            className="remove-file-btn"
            onClick={handleRemoveImage}
            disabled={disabled}
          >
            제거
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
