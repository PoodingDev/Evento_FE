import React from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Header from "components/Header";
import SideBarLeft from "components/SideBarLeft";
import LogIn from "/src/pages/LogIn";
import { GoogleOAuthProvider } from "@react-oauth/google";
import LoginPostCode from "/src/pages/LoginPostCode";

function Layout({ children }) {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <div>
      {!isLoginPage && <SideBarLeft />}
      {!isLoginPage && <Header />}
      {children}
    </div>
  );
}

export default function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/login" element={<LogIn />} />
            <Route path="*" element={<LoginPostCode />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}
