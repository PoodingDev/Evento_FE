import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null); // 사용자 정보 전역 관리

  return (
    <AuthContext.Provider
      value={{
        loggedIn,
        setLoggedIn,
        userInfo,
        setUserInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
