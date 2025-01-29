import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Lottie from "lottie-react";
import logoAnimation from "../../assets/data.json";
import { useApp } from '../../contexts/AppContext';

const Sidebar = () => {
  const { pathname } = useLocation();
  const { user, handleLogout } = useApp();
  const [isLogoHovered, setIsLogoHovered] = useState(false);

  const navItems = [
    { 
      path: '/task-list', 
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>,
      title: 'İş Listesi' 
    },
    { 
      path: '/new-task', 
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>,
      title: 'Yeni İş' 
    },
    { 
      path: '/employee-management', 
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>,
      title: 'Çalışan Yönetimi' 
    },
    { 
      path: '/scheduler', 
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>,
      title: 'Takvim' 
    }
  ];

  return (
    <motion.aside
      className="w-20 md:w-64 bg-white/40 backdrop-blur-sm border-r border-gray-200 flex flex-col"
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Logo Section */}
      <div className="pt-6 pb-4 flex flex-col items-center w-full">
        <motion.div
          className="w-full flex justify-center"
          onHoverStart={() => setIsLogoHovered(true)}
          onHoverEnd={() => setIsLogoHovered(false)}
        >
          <div className="w-24 h-24 md:w-32 md:h-32">
            <Lottie
              animationData={logoAnimation}
              loop={isLogoHovered}
              autoplay={isLogoHovered}
              className="w-full h-full"
            />
          </div>
        </motion.div>
        <div className="text-center w-full mt-2">
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#EF4746] to-[#B688FF] bg-clip-text text-transparent">
            Roots
          </h1>
          <p className="text-sm md:text-base text-gray-500">Post Production</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 mt-6 flex flex-col gap-2 px-4">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center px-4 py-2 mb-2 rounded-lg transition-colors ${
              pathname === item.path
                ? 'bg-[#B688FF] text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {item.icon}
            <span className="ml-3">{item.title}</span>
          </Link>
        ))}
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-[#EF4746] flex items-center justify-center text-white">
            {user?.name?.charAt(0)}
          </div>
          <div className="hidden md:block flex-1">
            <p className="text-sm font-medium text-gray-900">{user?.name}</p>
            <p className="text-xs text-gray-500">{user?.department}</p>
          </div>
          <motion.button
            onClick={handleLogout}
            className="p-2 hover:bg-white/60 rounded-xl text-gray-600 hover:text-[#EF4746]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </motion.button>
        </div>
      </div>
    </motion.aside>
  );
};

export default Sidebar; 