import Calendar from "/src/pages/Calendar";
import EventCreate from "components/CreateEventModal";
import EventInfoModal from "/src/components/EventInfoModal";
import Header from "components/Header";
import InviteCode from "components/InviteCode";
import LogIn from "/src/pages/LogIn";
import LoginPostCode from "/src/pages/LoginPostCode";
import Profile from "/src/pages/Profile";
import ProfileEdit from "/src/pages/ProfileEdit";
import React from "react";
import SideBarLeft from "/src/components/SideBarLeft";
import Subscription from "/src/pages/Subscription";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

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
          <Route path="/auth/*" element={<LoginPostCode />} />
          <Route path="/" element={<Calendar />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/edit" element={<ProfileEdit />} />
          //테스트용 - 모달을 페이지로 띄우기
          <Route path="/event" element={<EventInfoModal />} />
          <Route path="/code" element={<InviteCode />} />
          <Route path="/new-event" element={<EventCreate />} />
          <Route path="/subscription" element={<Subscription />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
