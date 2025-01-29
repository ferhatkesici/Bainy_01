import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from "framer-motion";
import { Toaster } from 'react-hot-toast';
import { useApp } from './contexts/AppContext';
import { AppProvider } from './contexts/AppContext';
import Lottie from "lottie-react";
import logoAnimation from "./assets/data.json";
import TaskScheduler from './components/TaskScheduler'

// Components
import Sidebar from './components/layout/Sidebar';

// Pages
import Login from './pages/Login';
import NewTask from './pages/NewTask';
import EmployeeManagement from './pages/EmployeeManagement';
import TaskList from './pages/TaskList';

function AppContent() {
  const { user, loading, error } = useApp();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <Lottie animationData={logoAnimation} className="w-32 h-32 mx-auto" />
          <p className="mt-4">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center text-red-600">
          <p>{error}</p>
        </div>
      </div>
    );
  }

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
      title: 'Çalışanlar' 
    },
    {
      name: 'Takvim',
      href: '/scheduler',
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h8m-8 7h8m-8-7h8m-8-7h8" />
            </svg>,
    },
  ];

  return (
    <BrowserRouter>
      <div className="flex h-screen bg-gradient-to-b from-[#EF4746]/40 via-white/80 to-[#B688FF]/70">
        <Toaster position="top-right" />
        <Sidebar />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <main className="flex-1 overflow-y-auto">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Navigate to="/task-list" replace />} />
                <Route path="/new-task" element={<NewTask />} />
                <Route path="/employee-management" element={<EmployeeManagement />} />
                <Route path="/task-list" element={<TaskList />} />
                <Route path="/scheduler" element={<TaskScheduler />} />
                <Route path="*" element={<Navigate to="/task-list" replace />} />
              </Routes>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;