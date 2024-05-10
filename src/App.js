import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import SidebarNavbar from './component/Navbar';
import Login from './Screens/Login';
import Signup from './Screens/signup';
import Home from './Screens/Home';
import Academy from './Screens/Academy';
import Admission from './Screens/Admission';
import OTP from './Screens/OTP';
import Teachers from './Information Desk/Teachers';
import Dashboard from './Dash-pages/Dashboard';
import Layout from './component/sidebar_Dash';
import DashTeachers from './Dash-pages/InformationAdd/DashTeachers';
import DashStudents from './Dash-pages/InformationAdd/DashStudents';
import Students from './Information Desk/Students';


const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

const AppContent = () => {
  const location = useLocation();
  const isDashboardRoute = location.pathname.startsWith('/Dashboard');

  return (
    <>
      {!isDashboardRoute && <SidebarNavbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Academy" element={<Academy />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/Admission" element={<Admission />} />
        <Route path="/verify" element={<OTP />} />
        <Route path="/Teachers" element={<Teachers />} />
        <Route path='/Students' element={<Students />} />
        <Route path="/Dashboard/*" element={<DashboardWithoutNavbar />} />
      </Routes>
    </>
  );
}

const DashboardWithoutNavbar = () => (
  <SidebarWrapper>
    <Routes>
      <Route element={<Dashboard />} />
      <Route path="/Dash-Teachers" element={<Teachersdash />} />
      <Route path="/Dash-Students" element={<Studentsdash />} />

    </Routes>
  </SidebarWrapper>
);

const SidebarWrapper = ({ children }) => {
  return <Layout>{children}</Layout>;
}

const Teachersdash = () => (
  <DashTeachers />
);

const Studentsdash = () => (
  <DashStudents />
)
  ;

export default App;
