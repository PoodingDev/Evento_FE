import React, { createContext, useContext, useState } from "react";

// AuthContext 생성
const AuthContext = createContext();

// Context Provider Component 생성
export function AuthProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  // const [loading, setLoading] = useState(true); // 로딩 상태 추가

  return (
    <AuthContext.Provider
      value={{ loggedIn, setLoggedIn, userInfo, setUserInfo }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Context 커스텀 훅 생성
export function useAuth() {
  return useContext(AuthContext);
}
