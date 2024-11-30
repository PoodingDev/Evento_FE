import React, { createContext, useContext, useState } from "react";

// AuthContext 생성
const AuthContext = createContext();

// Context Provider Component 생성
export function AuthProvider({ children }) {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setLoggedIn, userInfo, setUserInfo }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Context 커스텀 훅 생성
export function useAuth() {
  return useContext(AuthContext);
}
