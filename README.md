# 📝 Memo App - React 메모 서비스

아름다운 디자인 템플릿으로 메모를 작성하고 관리할 수 있는 React 기반 웹 애플리케이션입니다.

## ✨ 주요 기능

- **사용자 인증**: 회원가입/로그인 시스템
- **메모 관리**: 메모 생성, 조회, 목록 표시
- **디자인 템플릿**: 다양한 스타일의 메모 템플릿 선택
- **반응형 디자인**: 모바일과 데스크톱 모두 지원
- **실시간 미리보기**: 메모 작성 시 실시간으로 디자인 확인

## 🛠️ 기술 스택

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **State Management**: Zustand
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Styling**: CSS3 (모던 CSS 기능 활용)

## 🚀 시작하기

### 필수 요구사항

- Node.js 16.0.0 이상
- npm 8.0.0 이상

### 설치 및 실행

1. **의존성 설치**
   ```bash
   npm install
   ```

2. **개발 서버 실행**
   ```bash
   npm run dev
   ```

3. **브라우저에서 확인**
   ```
   http://localhost:5173
   ```

### 빌드

```bash
npm run build
```

### 미리보기

```bash
npm run preview
```

## 📱 앱 구조

```
src/
├── components/          # 재사용 가능한 컴포넌트
│   ├── common/         # 공통 컴포넌트 (Header 등)
│   └── memo/          # 메모 관련 컴포넌트
├── pages/              # 페이지 컴포넌트
│   ├── MemoList.tsx   # 메모 목록 페이지
│   ├── CreateMemo.tsx # 메모 생성 페이지
│   ├── MemoDetail.tsx # 메모 상세 페이지
│   ├── Login.tsx      # 로그인 페이지
│   └── Register.tsx   # 회원가입 페이지
├── stores/             # Zustand 상태 관리
│   ├── authStore.ts   # 인증 상태 관리
│   └── memoStore.ts   # 메모 상태 관리
├── services/           # API 서비스
│   └── api.ts         # HTTP 통신 및 Mock 데이터
├── types/              # TypeScript 타입 정의
│   └── index.ts       # 인터페이스 및 타입
└── App.tsx            # 메인 앱 컴포넌트
```

## 🔐 사용자 인증

### 회원가입
- 사용자명 (3자 이상)
- 이메일 주소
- 비밀번호 (6자 이상)
- 비밀번호 확인

### 로그인
- 사용자명
- 비밀번호

## 📝 메모 기능

### 메모 생성
1. 로그인 후 "새 메모 작성" 버튼 클릭
2. 제목과 내용 입력
3. 디자인 템플릿 선택
4. 실시간 미리보기로 디자인 확인
5. 메모 생성 완료

### 메모 목록
- 생성일 기준으로 날짜별 그룹화
- 최신 메모가 상단에 표시
- 각 메모의 제목, 내용 미리보기, 템플릿 정보 표시

### 메모 상세보기
- 선택한 템플릿으로 스타일링된 메모 표시
- 작성일, 수정일 정보
- 사용된 템플릿의 상세 정보

## 🎨 디자인 템플릿

현재 제공되는 템플릿:
- **Classic White**: 깔끔한 흰색 배경
- **Dark Theme**: 다크 모드 스타일
- **Warm Beige**: 따뜻한 베이지 톤
- **Ocean Blue**: 바다를 연상시키는 블루 톤

각 템플릿은 다음 속성을 가집니다:
- 배경색
- 텍스트색
- 테두리 스타일
- 그림자 효과

## 🔧 개발 환경 설정

### 환경 변수

백엔드 API가 있는 경우 `.env` 파일에 다음을 추가:

```env
VITE_API_BASE_URL=http://your-api-url.com/api
```

### Mock 데이터

백엔드가 없는 경우 자동으로 Mock 데이터를 사용하여 앱이 정상 작동합니다.

## 📱 반응형 디자인

- **데스크톱**: 1200px 이상
- **태블릿**: 768px - 1199px
- **모바일**: 767px 이하

모든 화면 크기에서 최적화된 사용자 경험을 제공합니다.

## 🎯 주요 특징

1. **모던 UI/UX**: 그라디언트, 그림자, 애니메이션 등 현대적인 디자인 요소
2. **접근성**: 키보드 네비게이션, 포커스 표시 등 접근성 고려
3. **성능 최적화**: React 18의 최신 기능 활용
4. **타입 안전성**: TypeScript로 컴파일 타임 에러 방지
5. **상태 관리**: Zustand로 간단하고 효율적인 상태 관리

## 🚧 향후 개선 계획

- [ ] 메모 수정/삭제 기능
- [ ] 메모 검색 및 필터링
- [ ] 사용자 프로필 관리
- [ ] 메모 공유 기능
- [ ] 다크/라이트 테마 전환
- [ ] PWA 지원
- [ ] 오프라인 기능

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.

## 📞 문의

프로젝트에 대한 질문이나 제안사항이 있으시면 이슈를 생성해 주세요.

---

**즐거운 메모 작성 되세요! ✨**
