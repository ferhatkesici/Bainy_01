import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
const AppContext = createContext();

// initialEmployees'i buraya taşıyalım
const initialEmployees = [
  { id: 1, username: 'gamze', password: '1111', role: 'supervisor', name: 'Gamze (Sekreter)', department: 'SEKRETER', active: true },
  { id: 2, username: 'mesut', password: '2222', role: 'supervisor', name: 'Mesut Kesici (Patron)', department: 'COLOR', active: true },
  { id: 3, username: 'onur', password: '3333', role: 'supervisor', name: 'Onur Güngör (Patron)', department: 'ONLINE', active: true },
  { id: 4, username: 'elcin', password: '4444', role: 'supervisor', name: 'Elçin Çetin (Genel Müdür)', department: 'GENEL MUDUR', active: true },
  { id: 5, username: 'unsal', password: '5555', role: 'supervisor', name: 'Ünsal Aykanat (Koordinasyon Supervizör)', department: 'KOORDİNASYON', active: true },
  { id: 6, username: 'ferhat', password: '6666', role: 'hybrid_supervisor', name: 'Ferhat Kesici (Motion Graphic Supervizör)', department: 'MOTION', active: true },
  { id: 7, username: 'resul', password: '7777', role: 'hybrid_supervisor', name: 'Resul Keleş (Sound Süpervizör)', department: 'SOUND', active: true },
  { id: 8, username: 'koor1', password: '8888', role: 'supervisor', name: 'Koordinatör-1 (Koordinasyon)', department: 'KOORDİNASYON', active: true },
  { id: 9, username: 'koor2', password: '9999', role: 'supervisor', name: 'Koordinatör-2 (Koordinasyon)', department: 'KOORDİNASYON', active: true },
  { id: 10, username: 'koor3', password: '1234', role: 'supervisor', name: 'Koordinatör-3 (Koordinasyon)', department: 'KOORDİNASYON', active: true },
  { id: 11, username: 'ali', password: '4521', role: 'employee', name: 'Ali Yaman', department: 'FLAME', active: true },
  { id: 12, username: 'atalay', password: '7832', role: 'employee', name: 'Atalay Aydın', department: 'FLAME', active: true },
  { id: 13, username: 'aysu', password: '9374', role: 'employee', name: 'Aysu Şinik', department: 'OFFLINE', active: true },
  { id: 14, username: 'berk', password: '6234', role: 'employee', name: 'Berk Şen', department: 'FLAME', active: true },
  { id: 15, username: 'kemal', password: '1598', role: 'employee', name: 'Kemal Telci', department: 'FLAME', active: true },
  { id: 16, username: 'beyza', password: '3647', role: 'employee', name: 'Beyza Atabek', department: 'COLOR', active: true },
  { id: 17, username: 'batuhan', password: '8521', role: 'employee', name: 'Batuhan Kaya', department: 'MOTION', active: true },
  { id: 18, username: 'ozan', password: '4569', role: 'employee', name: 'Ozan Barış Dinçel', department: '3D&MOTION', active: true },
  { id: 19, username: 'eray', password: '7412', role: 'employee', name: 'Eray Şener', department: '3D', active: true },
  { id: 20, username: 'ergin', password: '9632', role: 'employee', name: 'Ergin Öz', department: 'MOTION', active: true },
  { id: 21, username: 'gokce', password: '1478', role: 'employee', name: 'Gökçe Su', department: 'SOUND', active: true },
  { id: 22, username: 'gorkem', password: '2589', role: 'employee', name: 'Görkem Küçük', department: 'FLAME', active: true },
  { id: 23, username: 'ilayda', password: '3698', role: 'employee', name: 'İlayda Coşkun', department: 'OFFLINE', active: true },
  { id: 24, username: 'mert', password: '7896', role: 'employee', name: 'Mert Karakaya', department: 'FLAME', active: true },
  { id: 25, username: 'rustu', password: '4563', role: 'employee', name: 'Rüştü Tuncalı', department: 'FLAME', active: true },
  { id: 26, username: 'metin', password: '1597', role: 'employee', name: 'Metin Sezdin', department: '3D', active: true },
  { id: 27, username: 'naci', password: '7531', role: 'employee', name: 'Naci Akpınar', department: '3D', active: true },
  { id: 28, username: 'osman', password: '9517', role: 'employee', name: 'Osman Demir', department: 'MOTION', active: true },
  { id: 29, username: 'yusuf', password: '3574', role: 'employee', name: 'Yusuf Ay', department: 'FLAME', active: true }
];

// Mock login fonksiyonunu güncelleyelim
const mockLogin = (credentials) => {
  // Mevcut çalışanlar listesinden kullanıcıyı bulalım
  const user = initialEmployees.find(
    emp => emp.username === credentials.username && emp.password === credentials.password
  );

  if (user) {
    return {
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
        role: user.role,
        department: user.department
      },
      token: 'mock-token'
    };
  }
  throw new Error('Geçersiz kullanıcı adı veya şifre');
};

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState(initialEmployees); // initialEmployees zaten tanımlı
  const [loading, setLoading] = useState(false); // loading'i false yapıyoruz
  const [error, setError] = useState(null);
  const [selectedEmployeeFilter, setSelectedEmployeeFilter] = useState('');

  // Login işlemi - şimdilik mock data kullanıyoruz
  const handleLogin = async (credentials) => {
    try {
      const response = mockLogin(credentials);
      setUser(response.user);
      return true;
    } catch (err) {
      setError('Geçersiz kullanıcı adı veya şifre');
      console.error(err);
      return false;
    }
  };

  // Task işlemleri - şimdilik local state kullanıyoruz
  const addTask = async (newTask) => {
    try {
      // API yerine direkt state'e ekliyoruz
      const taskWithId = { ...newTask, id: Date.now() };
      setTasks(prev => [...prev, taskWithId]);
      return true;
    } catch (err) {
      setError('Görev eklenirken hata oluştu');
      console.error(err);
      return false;
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      setTasks(prev => prev.map(task =>
        task.id === taskId ? { ...task, status: newStatus } : task
      ));
    } catch (err) {
      setError('Durum güncellenirken hata oluştu');
      console.error(err);
    }
  };

  const handleHoursChange = async (taskId, newHours) => {
    try {
      setTasks(prev => prev.map(task =>
        task.id === taskId ? { ...task, hours: newHours } : task
      ));
    } catch (err) {
      setError('Saat güncellenirken hata oluştu');
      console.error(err);
    }
  };

  // Task güncelleme
  const updateTask = async (taskId, updatedData) => {
    try {
      setTasks(prev => prev.map(task =>
        task.id === taskId ? { ...task, ...updatedData } : task
      ));
      return true;
    } catch (err) {
      setError('Görev güncellenirken hata oluştu');
      console.error(err);
      return false;
    }
  };

  // Task kopyalama ve atama
  const duplicateAndAssignTask = async (taskId, newAssignee) => {
    try {
      const originalTask = tasks.find(task => task.id === taskId);
      if (!originalTask) throw new Error('Görev bulunamadı');

      const newTask = {
        ...originalTask,
        id: Date.now(),
        assignee: newAssignee,
        status: 'pending'
      };

      setTasks(prev => [...prev, newTask]);
      return true;
    } catch (err) {
      setError('Görev kopyalanırken hata oluştu');
      console.error(err);
      return false;
    }
  };

  // Atama onayı gösterme
  const showAssignmentConfirmation = async (taskId, assignee) => {
    // Bu fonksiyon UI tarafında bir modal/dialog gösterebilir
    return window.confirm(`Görevi ${assignee} kullanıcısına atamak istediğinize emin misiniz?`);
  };

  // Context value
  const value = useMemo(() => ({
    user,
    tasks,
    employees,
    loading,
    error,
    handleLogin,
    handleLogout: () => setUser(null),
    addTask,
    handleStatusChange,
    handleHoursChange,
    setEmployees,
    selectedEmployeeFilter,
    setSelectedEmployeeFilter,
    updateTask,
    duplicateAndAssignTask,
    showAssignmentConfirmation,
  }), [user, tasks, employees, loading, error, selectedEmployeeFilter]);

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
} 