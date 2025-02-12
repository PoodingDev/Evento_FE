import Calendar from "/src/pages/Calendar";
import EventCreate from "components/CreateEventModal";
import EventInfo from "components/EventInfoModal";
import EventInfoModal from "/src/components/EventInfoModal";
import Header from "components/Header";
import LogIn from "/src/pages/LogIn";
import LoginPostCode from "/src/pages/LoginPostCode";
import OnBoarding from "/src/pages/OnBoarding";
import Profile from "/src/pages/Profile";
import ProfileEdit from "/src/pages/ProfileEdit";
import React from "react";
import SideBarLeft from "/src/components/SideBarLeft";
import Subscription from "/src/pages/Subscription";
import { AuthProvider } from "/src/context/AuthContext";
import { CalendarProvider } from "/src/context/CalendarContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function Layout({ children }) {
  return (
    <div>
      <Routes>
        <Route path="/login" element={null} />
        <Route path="/" element={null} />
        <Route
          path="*"
          element={
            <>
              <SideBarLeft />
              <Header />
            </>
          }
        />
      </Routes>
      {children}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CalendarProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/login" element={<LogIn />} />
              <Route path="/auth/:platform" element={<LoginPostCode />} />
              <Route path="/" element={<OnBoarding />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/profile/edit" element={<ProfileEdit />} />
              <Route path="/subscription" element={<Subscription />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </CalendarProvider>
    </AuthProvider>
  );
}
