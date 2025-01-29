import React, { useState, useMemo } from 'react';
import { motion } from "framer-motion";
import { useApp } from '../contexts/AppContext';

const EmployeeManagement = () => {
  const { employees, setEmployees, user } = useApp();
  const [showForm, setShowForm] = useState(false);
  
  // Initial state'i useMemo ile optimize edelim
  const initialEmployeeState = useMemo(() => ({
    name: '',
    username: '',
    password: '',
    role: 'employee',
    department: ''
  }), []);

  const [newEmployee, setNewEmployee] = useState(initialEmployeeState);

  const handleAddEmployee = (e) => {
    e.preventDefault();
    const newId = Math.max(...employees.map(emp => emp.id), 0) + 1;
    
    setEmployees(prevEmployees => [...prevEmployees, {
      ...newEmployee,
      id: newId,
      active: true
    }]);
    
    setNewEmployee(initialEmployeeState);
    setShowForm(false);
  };

  const toggleEmployeeStatus = (id) => {
    setEmployees(prevEmployees =>
      prevEmployees.map(emp =>
        emp.id === id ? { ...emp, active: !emp.active } : emp
      )
    );
  };

  const handleRemoveEmployee = (id) => {
    setEmployees(prevEmployees =>
      prevEmployees.filter(emp => emp.id !== id)
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const EmployeeCard = ({ employee }) => (
    <motion.div
      key={employee.id}
      className="bg-white/40 backdrop-blur-sm rounded-2xl p-6 shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.3 }}
    >
      {/* Employee Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-lg font-semibold mb-1 text-gray-800">
            {employee.name}
          </h3>
          <p className="text-sm text-gray-600">
            {employee.department}
          </p>
        </div>
        <motion.button
          onClick={() => toggleEmployeeStatus(employee.id)}
          className={`px-4 py-2 rounded-xl text-sm text-white shadow-md ${
            employee.active ? 'bg-[#B688FF] hover:bg-[#c9a6ff]' : 'bg-[#EF4746] hover:bg-[#ff5a59]'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {employee.active ? 'Aktif' : 'Pasif'}
        </motion.button>
      </div>

      {/* Employee Details */}
      <div className="space-y-3 mb-6 text-gray-700">
        <div className="flex justify-between items-center bg-white/60 rounded-lg p-3">
          <span className="text-sm">Kullanıcı Adı</span>
          <span className="font-medium">{employee.username}</span>
        </div>
        <div className="flex justify-between items-center bg-white/60 rounded-lg p-3">
          <span className="text-sm">Rol</span>
          <span className="font-medium">{employee.role}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end">
        <motion.button
          onClick={() => handleRemoveEmployee(employee.id)}
          className="px-4 py-2 rounded-xl text-sm text-white bg-red-500 hover:bg-red-600 shadow-md"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Sil
        </motion.button>
      </div>
    </motion.div>
  );

  if (!user || !employees) {
    return <div>Yükleniyor...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div 
        className="max-w-7xl mx-auto bg-gradient-to-b from-white to-[#B688FF] rounded-2xl overflow-hidden shadow-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Çalışan Yönetimi</h2>
              <p className="mt-2 text-sm text-gray-600">Tüm çalışanları görüntüle ve yönet</p>
            </div>
            <motion.button
              onClick={() => setShowForm(!showForm)}
              className="px-4 py-2 bg-[#EF4746] text-white rounded-xl shadow-md hover:bg-[#ff5a59] transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {showForm ? 'İptal' : 'Yeni Çalışan Ekle'}
            </motion.button>
          </div>
        </div>

        <div className="p-6">
          {/* Add Employee Form */}
          {showForm && (
            <motion.form
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              onSubmit={handleAddEmployee}
              className="bg-white/40 backdrop-blur-sm rounded-2xl p-6 shadow-xl mb-6"
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ad Soyad
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={newEmployee.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#EF4746] focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Kullanıcı Adı
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={newEmployee.username}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#EF4746] focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Şifre
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={newEmployee.password}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#EF4746] focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Departman
                  </label>
                  <input
                    type="text"
                    name="department"
                    value={newEmployee.department}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#EF4746] focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Rol
                  </label>
                  <select
                    name="role"
                    value={newEmployee.role}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#EF4746] focus:border-transparent"
                  >
                    <option value="employee">Çalışan</option>
                    <option value="supervisor">Süpervizör</option>
                    <option value="hybrid_supervisor">Hibrit Süpervizör</option>
                  </select>
                </div>
              </div>
              <motion.button
                type="submit"
                className="mt-4 w-full px-4 py-2 bg-[#EF4746] text-white rounded-xl shadow-md hover:bg-[#ff5a59] transition-colors duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Çalışan Ekle
              </motion.button>
            </motion.form>
          )}

          {/* Employee Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {employees.map((employee) => (
              <EmployeeCard key={employee.id} employee={employee} />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default EmployeeManagement;