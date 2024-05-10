import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Nalam from '../assets/Nalam.jpg';
import './sidebar.css';

const Users = [
  { name: 'Teacher', href: '/Teachers' },
  { name: 'Student', href: '/Students' },
];

const Alumni = [
  { name: 'Events', href: '/Alumni/Events' },
  // Add more alumni items here
];

const Academics = [
  { name: 'Attendence', href: '/Acedemics/teachers' },
  { name: 'Class Routine', href: '/Academics/students' },
  { name: 'Exam Routine', href: '/Academics/students' },
  { name: 'Class Routine', href: '/Academics/students' },
  { name: 'Subject', href: '/Aademics/students' },
  { name: 'Class Room', href: '/Academics/students' },
];

const Sidebar = ({ isOpen }) => {
  const [showUsersDropdown, setShowUsersDropdown] = useState(false);
  const [showAlumniDropdown, setShowAlumniDropdown] = useState(false);
  const [showAcademicsDropdown, setShowAcademicsDropdown] = useState(false);

  const toggleUsersDropdown = () => {
    setShowUsersDropdown(!showUsersDropdown);
    setShowAlumniDropdown(false); // Close other dropdowns
    setShowAcademicsDropdown(false);
  };

  const toggleAlumniDropdown = () => {
    setShowAlumniDropdown(!showAlumniDropdown);
    setShowUsersDropdown(false); // Close other dropdowns
    setShowAcademicsDropdown(false);
  };

  const toggleAcademicsDropdown = () => {
    setShowAcademicsDropdown(!showAcademicsDropdown);
    setShowUsersDropdown(false); // Close other dropdowns
    setShowAlumniDropdown(false);
  };

  return (
    <nav className={`bg-white w-64 min-h-screen transition-all duration-300 transform ${isOpen ? 'translate-x-0 shadow-lg' : '-translate-x-full'}`} style={{ marginTop: '4rem', position: 'fixed', top: 0 }}>
      <ul className="p-2">
        <li className="mb-2">
          <Link to="/" className="flex items-center justify-center text-black hover:text-gray-600 py-2">
            <span className="mr-2">
              <i className="fas fa-home"></i>
            </span>
            Home
          </Link>
        </li>
        <li className="mb-2">
          <span className="flex items-center justify-between text-black hover:text-gray-600 cursor-pointer py-2" onClick={toggleUsersDropdown}>
            <span className="mr-2">
            <i class="fa fa-user" aria-hidden="true"></i>
            </span>
            Users
            <i className={`fas fa-chevron-down ${showUsersDropdown ? 'transform rotate-180' : ''}`}></i>
          </span>
          <ul className={`pl-4 ${showUsersDropdown ? 'block' : 'hidden'} animated-slide`} style={{ transition: 'max-height 1s ease-out', marginLeft: 'auto', marginRight: 'auto' }}>
            {Users.map((item) => (
              <li key={item.name}>
                <Link to={item.href} className="block text-black hover:text-gray-600 py-2">{item.name}</Link>
              </li>
            ))}
          </ul>
        </li>
        <li className="mb-2">
          <span className="flex items-center justify-between text-black hover:text-gray-600 cursor-pointer py-2" onClick={toggleAlumniDropdown}>
            <span className="mr-2">
              <i className="fas fa-graduation-cap"></i>
            </span>
            Alumni
            <i className={`fas fa-chevron-down ${showAlumniDropdown ? 'transform rotate-180' : ''}`}></i>
          </span>
          <ul className={`pl-4 ${showAlumniDropdown ? 'block' : 'hidden'} animated-slide`} style={{ transition: 'max-height 1s ease-out', marginLeft: 'auto', marginRight: 'auto' }}>
            {Alumni.map((item) => (
              <li key={item.name}>
                <Link to={item.href} className="block text-black hover:text-gray-600 py-2">{item.name}</Link>
              </li>
            ))}
          </ul>
        </li>
        <li className="mb-2">
          <span className="flex items-center justify-between text-black hover:text-gray-600 cursor-pointer py-2" onClick={toggleAcademicsDropdown}>
            <span className="mr-2">
              <i className="fas fa-graduation-cap"></i>
            </span>
            Academics
            <i className={`fas fa-chevron-down ${showAcademicsDropdown ? 'transform rotate-180' : ''}`}></i>
          </span>
          <ul className={`pl-4 ${showAcademicsDropdown ? 'block' : 'hidden'} animated-slide`} style={{ transition: 'max-height 1s ease-out', marginLeft: 'auto', marginRight: 'auto' }}>
            {Academics.map((item) => (
              <li key={item.name}>
                <Link to={item.href} className="block text-black hover:text-gray-600 py-2">{item.name}</Link>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </nav>
  );
};

const Navbar = ({ toggleSidebar }) => {
  return (
    <nav className="bg-white shadow-lg h-16 flex items-center justify-between px-4">
      <div className="flex items-center">
        <button onClick={toggleSidebar} className="text-black text-2xl mr-4">
          <i className="fas fa-bars"></i>
        </button>
        <div className="p-6 flex items-center">
          <img src={Nalam} alt="Logo" className="w-auto h-8 ml-2" />
        </div>
        <div className="text-black text-xl">Nurul Alam School & College</div>
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
