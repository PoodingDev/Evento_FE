import React from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Header from "components/Header";
import SideBarLeft from "components/SideBarLeft";
import LogIn from "/src/pages/LogIn";

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
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/login" element={<LogIn />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
