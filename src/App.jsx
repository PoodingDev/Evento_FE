import Calendar from "/src/pages/Calendar";
import EventCreate from "components/CreateEventModal";
import EventInfoModal from "/src/components/EventInfoModal";
import Header from "components/Header";
import LogIn from "/src/pages/LogIn";
import LoginPostCode from "/src/pages/LoginPostCode";
import Profile from "/src/pages/Profile";
import ProfileEdit from "/src/pages/ProfileEdit";
import React, { useState } from "react";
import SideBarLeft from "/src/components/SideBarLeft";
import Subscription from "/src/pages/Subscription";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function Layout({ children, isLoggedIn, setLoggedIn, userInfo, setUserInfo }) {
  return (
    <div>
      <Routes>
        <Route path="/login" element={null} />
        <Route
          path="*"
          element={
            <>
              <SideBarLeft />
              <Header
                isLogedIn={isLoggedIn}
                setLogedIn={setLoggedIn}
                userInfo={userInfo}
              />
            </>
          }
        />
      </Routes>
      {children}
    </div>
  );
}

export default function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  return (
    <BrowserRouter>
      <Layout
        isLoggedIn={isLoggedIn}
        setLoggedIn={setLoggedIn}
        userInfo={userInfo}
        setUserInfo={setUserInfo}
      >
        <Routes>
          <Route path="/login" element={<LogIn />} />
          <Route
            path="/auth/*"
            element={
              <LoginPostCode
                setLogedIn={setLoggedIn}
                setUserInfo={setUserInfo}
              />
            }
          />
          <Route path="/" element={<Calendar />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/edit" element={<ProfileEdit />} />
          <Route path="/event" element={<EventInfoModal />} />
          <Route path="/new-event" element={<EventCreate />} />
          <Route path="/subscription" element={<Subscription />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
