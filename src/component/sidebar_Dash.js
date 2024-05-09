import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Nalam from '../assets/Nalam.jpg';
import './sidebar.css'

const Sidebar = ({ isOpen }) => {
  const [showAboutDropdown, setShowAboutDropdown] = useState(false);
  const [showAcademicsDropdown, setShowAcademicsDropdown] = useState(false);

  const toggleAboutDropdown = () => {
    setShowAboutDropdown(!showAboutDropdown);
    setShowAcademicsDropdown(false); // Close academics dropdown
  };

  const toggleAcademicsDropdown = () => {
    setShowAcademicsDropdown(!showAcademicsDropdown);
    setShowAboutDropdown(false); // Close about dropdown
  };

  return (
    <nav className={`bg-gray-800 w-64 min-h-screen transition-all duration-300 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`} style={{ marginTop: '4rem', position: 'fixed', top: 0 }}>

      <ul className="p-2">
        <li className="mb-2">
          <Link to="/Dashboard" className="flex items-center justify-center text-white hover:text-gray-600 py-2">
            <span className="mr-2">
              <i className="fas fa-home"></i>
            </span>
            Dashboard
          </Link>
        </li>
        <li className="mb-2">
          <span className="flex items-center justify-between text-white hover:text-gray-600 cursor-pointer py-2" onClick={toggleAboutDropdown}>
            <span className="mr-2">
              <i className="fas fa-info-circle"></i>
            </span>
            Information
            <i className={`fas fa-chevron-down ${showAboutDropdown ? 'transform rotate-180' : ''}`}></i>
          </span>
          <ul className={`pl-4 ${showAboutDropdown ? 'block' : 'hidden'} animated-slide`} style={{ transition: 'max-height 1s ease-out' }}>
            <li>
              <Link to="/Dashboard/Dash-Teachers" className="block text-white hover:text-gray-600 py-2">Teacher</Link>
            </li>
            <li>
              <Link to="/Dashboard/Dash-Students" className="block text-white hover:text-gray-600 py-2">Student</Link>
            </li>
          </ul>
        </li>
        <li className="mb-2">
          <span className="flex items-center justify-between text-white hover:text-gray-600 cursor-pointer py-2" onClick={toggleAcademicsDropdown}>
            <span className="mr-2">
              <i className="fas fa-graduation-cap"></i>
            </span>
            Academics
            <i className={`fas fa-chevron-down ${showAcademicsDropdown ? 'transform rotate-180' : ''}`}></i>
          </span>
          <ul className={`pl-4 ${showAcademicsDropdown ? 'block' : 'hidden'} animated-slide`} style={{ transition: 'max-height 1s ease-out', marginLeft: 'auto', marginRight: 'auto' }}>
            <li>
              <Link to="/academics/courses" className="block text-white hover:text-gray-600 py-2">Courses</Link>
            </li>
            {/* Add more dropdown items here */}
            <li>
              <Link to="/academics/faculty" className="block text-white hover:text-gray-600 py-2">Faculty</Link>
            </li>
          </ul>

        </li>
        {/* Add more menu items here */}
      </ul>
    </nav>
  );
};

const Navbar = ({ toggleSidebar }) => {
  return (
    <nav className="bg-gray-800 h-16 flex items-center justify-between px-4">
      <div className="flex items-center">
        <button onClick={toggleSidebar} className="text-white text-2xl mr-4">
          <i className="fas fa-bars"></i>
        </button>
        <div className="p-6 flex items-center">
          <img src={Nalam} alt="Logo" className="w-auto h-8 ml-2" /> {/* Add your logo image */}
        </div>
        <div className="text-white text-xl">Nurul Alam School & College</div>
      </div>
      <div></div>
    </nav>
  );
};

const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex">
      <Sidebar isOpen={isOpen} />
      <div className="flex flex-col w-full">
        <Navbar toggleSidebar={toggleSidebar} />
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
