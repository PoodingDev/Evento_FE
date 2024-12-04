# Evento  

**Evento**는 아이돌 일정 관리와 공유를 위한 캘린더 플랫폼입니다. 

팬, 관리자, 일반 사용자 모두 자신의 캘린더를 생성, 구독 및 관리하며, 

개인 일정과 아티스트의 일정을 손쉽게 확인하고 상호작용할 수 있습니다.  

---

## 팀원 구성  
- **Frontend**:
<div>

| **신채영** | **윤수진** | **김호선** |
| :------: |  :------: | :------: | 
| [<img src="" height=150 width=150> <br/> @cxaos](https://github.com/cxaos) | [<img src="" height=150 width=150> <br/> @cxaos](https://github.com/cxaos) | [<img src="" height=150 width=150> <br/> @cxaos](https://github.com/cxaos) |


- **Backend**:
<div>

| **정승원** | **박진강** | **권은혜** |
| :------: |  :------: | :------: | 
| [<img src="" height=150 width=150> <br/> @cxaos](https://github.com/cxaos) | [<img src="" height=150 width=150> <br/> @cxaos](https://github.com/cxaos) | [<img src="" height=150 width=150> <br/> @cxaos](https://github.com/cxaos) |


---

## 개발 환경  

### - Frontend : HTML, JavaScript, React, TailwindCSS, FullCalendar  

### - Backend :**(추가 필요)**  

### - Database** : (추가 필요)**  

### 1. 협업 및 관리 도구  
- **버전 및 이슈 관리**: GitHub, GitHub Issues  
- **협업 툴**: Discord, Notion, Jira  
- **서비스 배포 환경**: AWS, S3, CloudFront  
- **디자인**: Figma  

### 2. 기타  
- **커밋 컨벤션** [링크 추가 예정]  
- **코드 컨벤션** [링크 추가 예정]  
- **스프라이트** [링크 추가 예정]  

---

## 채택한 개발 기술과 브랜치 전략  
**(추가 필요)**  

---

## 프로젝트 구조  
```
src
 ┣ api
 ┃ ┣ auth.js
 ┃ ┗ axios.js
 ┣ assets
 ┃ ┣ logo
 ┃ ┃ ┗ event_logo.png
 ┃ ┣ onboarding
 ┃ ┃ ┗ editCalendar.png
 ┃ ┣ google_logo.png
 ┃ ┣ kakao_logo.png
 ┃ ┗ naver_logo.png
 ┣ components
 ┃ ┣ CalendarInfoModal.jsx
 ┃ ┣ CreateCalendarModal.jsx
 ┃ ┣ CreateEventModal.jsx
 ┃ ┣ DeleteAccountModal.jsx
 ┃ ┣ DeleteCalendarModal.jsx
 ┃ ┣ EventInfoModal.jsx
 ┃ ┣ Header.jsx
 ┃ ┣ InviteCodeModal.jsx
 ┃ ┣ PlusButton.jsx
 ┃ ┗ SideBarLeft.jsx
 ┣ context
 ┃ ┗ AuthContext.jsx
 ┣ mocks
 ┃ ┣ handlers
 ┃ ┃ ┣ calendarHandlers.js
 ┃ ┃ ┣ eventHandlers.js
 ┃ ┃ ┣ loginHandlers.js
 ┃ ┃ ┗ userHandlers.js
 ┃ ┗ browser.js
 ┣ pages
 ┃ ┣ Calendar.jsx
 ┃ ┣ LogIn.jsx
 ┃ ┣ LoginPostCode.jsx
 ┃ ┣ OnBoarding.jsx
 ┃ ┣ Profile.jsx
 ┃ ┣ ProfileEdit.jsx
 ┃ ┣ SignUp.jsx
 ┃ ┗ Subscription.jsx
 ┣ styles
 ┃ ┗ calendar.css
 ┣ App.jsx
 ┣ index.css
 ┗ index.jsx
```

---

## 개발 기간 및 작업 관리  

### 1. 개발 기간  
- **Frontend**
  
전체 개발 기간 : 2024-11-14 ~ 2024-12-11

UI 구현 : 2024-11-14 ~ 2024-12-11

기능 구현 : 2024-11-14 ~ 2024-12-11

- **Backend** :
  
전체 개발 기간 : 2024-11-14 ~ 2024-12-11

UI 구현 : 2024-11-14 ~ 2024-12-11

기능 구현 : 2024-11-14 ~ 2024-12-11

### 2. 작업 관리  
- Jira를 활용하여 Sprint 기반 작업 관리  
- Notion으로 프로젝트 문서화 및 일정 관리  

---

## 주요 기능  

### 1. 캘린더 생성  
- 사용자는 여러 개의 캘린더를 생성할 수 있습니다.  
- 생성된 캘린더는 **공개** 또는 **비공개**로 설정 가능하며, 필요에 따라 전환할 수 있습니다.  
- 공개 캘린더는 **생성자의 닉네임**으로 검색할 수 있습니다. (닉네임은 중복될 수 없습니다.) 

### 2. 캘린더 구독  
- 사용자는 여러 개의 공개 캘린더를 구독할 수 있습니다.  
- 구독한 캘린더는 메인 화면 캘린더 UI에서 확인할 수 있습니다.  
- **왼쪽 사이드바**에서 구독한 캘린더 목록을 확인하고, 체크박스를 통해 원하는 캘린더를 선택하여 화면에 표시할 수 있습니다.  

### 3. 관리 권한  
- 다른 사용자가 생성한 캘린더에 관리 멤버로 초대받을 수 있습니다.  
- 초대받은 캘린더는 **읽기 및 쓰기 권한**이 부여됩니다.  
- 관리 권한이 있는 캘린더의 색상을 변경하여 메인 화면에서 캘린더를 시각적으로 구분할 수 있습니다.  

### 4. 일정 관리 및 상호작용  
- 관리 권한이 있는 캘린더의 일정마다 **코멘트**를 남길 수 있으며, 구독자들은 **코멘트**에 **좋아요**를 누를 수 있습니다.  
- **D-day 설정**: 중요한 일정은 북마크 기능으로 지정하여 사이드바에서 빠르게 확인할 수 있습니다.  
- 메인 화면의 **오른쪽 하단 버튼**들을 통해 새 일정을 생성하고, 속한 캘린더와 공개/비공개 상태를 설정할 수 있습니다.  

### 5. 검색  
- **닉네임**으로 유저를 검색할 수 있습니다.  
- 검색된 결과에서:  
  - 구독 중인 캘린더는 **구독 취소 버튼**이 표시됩니다.  
  - 미구독 캘린더는 **구독 버튼**이 표시됩니다.  
- **구독 버튼** 클릭 시:  
  - 오른쪽 섹션의 **구독한 캘린더**에 캘린더가 추가됩니다.  
  - **왼쪽 사이드바의 구독한 캘린더 목록**에서도 확인할 수 있습니다.  

### 6. 내 프로필  
- 내 프로필 페이지에서 사용자의 기본 정보를 확인할 수 있습니다: 닉네임, 이름, 아이디, 생일  
- **프로필 이미지 옆 펜슬 아이콘** 클릭 시 **프로필 수정 페이지**로 이동합니다.  
- **프로필 수정 페이지**에서는 다음 정보 수정이 가능합니다: 닉네임, 생일  

### 7. 사용자 친화적 UI  
- **사이드바 구성**:  
  - **내 캘린더**:  
    - 자신이 관리자로 있는 캘린더 목록이 표시됩니다.  
    - 각 캘린더 목록 옆 체크박스를 통해 메인 화면에 표시 여부를 설정할 수 있습니다.  
    - 오른쪽 버튼으로 초대 코드를 발송하거나, 새 캘린더를 생성할 수 있습니다.  
  - **구독한 캘린더**:  
    - 자신이 구독한 캘린더 목록이 표시됩니다.  
    - 각 캘린더 목록 옆 체크박스로 메인 화면에 표시 여부를 설정할 수 있습니다.  
    - 오른쪽 연필 아이콘 클릭 시 캘린더 검색 페이지로 이동할 수 있습니다.  
- 캘린더는 색상으로 구분되어 시각적 인식이 용이합니다.  

### 8. 회원가입 및 로그인  
- **SNS 계정**으로만 회원가입이 가능합니다.  
- 모든 서비스는 **로그인 후** 이용할 수 있습니다.  

### 9. 일반 사용자 지원  
- 아티스트 일정뿐만 아니라 일반 사용자(팬 포함)도 개인 캘린더를 생성하고 공유할 수 있습니다.  

---

필요한 추가사항이나 수정 요청이 있다면 언제든 말씀해주세요! 😊
