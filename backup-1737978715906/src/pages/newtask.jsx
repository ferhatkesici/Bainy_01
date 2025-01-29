import React, { useState, useRef, useMemo } from 'react';
import { motion } from "framer-motion";
import { useApp } from '../contexts/AppContext';
import { useNavigate } from 'react-router-dom';

const NewTask = () => {
  const navigate = useNavigate();
  const { employees, addTask } = useApp();
  
  // today değişkenini useMemo ile optimize edelim
  const today = useMemo(() => new Date().toISOString().split('T')[0], []);

  const [formData, setFormData] = useState({
    name: '',
    project: '',
    employee: '',
    deadline: today,
    status: 'Devam Ediyor',
    hours: 0
  });

  const inputRef = useRef(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      ...formData,
      id: Date.now().toString(),
      creationDate: today,
    };
    addTask(newTask);
    navigate('/task-list');
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, name: value });
    setShowSuggestions(true);
    const suggestions = [
      "Yapı Kredi", "Migros", "Turkcell", "Vodafone", "Garanti BBVA", "Akbank", "THY", "Pegasus", "Getir", "Trendyol", "Hepsiburada", "Koton", "LC Waikiki", "DeFacto", "MediaMarkt", "Teknosa", "Bimeks", "Vestel", "Arçelik", "Beko"
    ];
    const filtered = suggestions.filter(suggestion =>
      suggestion.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredSuggestions(filtered);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (showSuggestions && filteredSuggestions.length > 0) {
        const selectedSuggestion = filteredSuggestions[0];
        setFormData({ ...formData, name: selectedSuggestion });
        setShowSuggestions(false);
      }
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setFormData({ ...formData, name: suggestion });
    setShowSuggestions(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div 
        className="max-w-3xl mx-auto bg-gradient-to-b from-white to-[#B688FF] rounded-2xl overflow-hidden shadow-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Yeni İş Ekle</h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            <div className="bg-white/60 rounded-lg p-4 relative" ref={inputRef}>
              <label className="block text-sm font-medium text-gray-700 mb-2">İş Adı</label>
              <input
                type="text"
                value={formData.name}
                onChange={handleNameChange}
                onKeyDown={handleKeyDown}
                className="w-full bg-white/40 backdrop-blur-sm rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#B688FF] transition-all duration-300 appearance-none"
                style={{ WebkitAppearance: 'none' }}
                placeholder="İş adını yazın"
                required
              />
              {showSuggestions && filteredSuggestions.length > 0 && (
                <div className="absolute left-0 right-0 mt-1 mx-4 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg z-10 border border-gray-200">
                  {filteredSuggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700 first:rounded-t-lg last:rounded-b-lg"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-white/60 rounded-lg p-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Proje</label>
              <input
                type="text"
                value={formData.project}
                onChange={(e) => setFormData({...formData, project: e.target.value})}
                className="w-full bg-white/40 backdrop-blur-sm rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#B688FF] transition-all duration-300"
                required
              />
            </div>

            <div className="bg-white/60 rounded-lg p-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Çalışan</label>
              <select
                value={formData.employee}
                onChange={(e) => setFormData({...formData, employee: e.target.value})}
                className="w-full bg-white/40 backdrop-blur-sm rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#B688FF] transition-all duration-300"
                required
              >
                <option value="">Çalışan Seçin</option>
                {employees.map(employee => (
                  <option key={employee.id} value={employee.name}>{employee.name}</option>
                ))}
              </select>
            </div>

            <div className="bg-white/60 rounded-lg p-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Bitiş Tarihi</label>
              <input
                type="date"
                value={formData.deadline}
                readOnly
                className="w-full bg-white/40 backdrop-blur-sm rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#B688FF] transition-all duration-300"
              />
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <motion.button
              type="button"
              onClick={() => navigate('/task-list')}
              className="flex-1 bg-gray-500 text-white rounded-xl px-6 py-3 hover:bg-gray-600 transition-all duration-300 shadow-md"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              İptal
            </motion.button>

            <motion.button
              type="submit"
              className="flex-1 bg-[#EF4746] text-white rounded-xl px-6 py-3 hover:bg-[#ff5a59] transition-all duration-300 shadow-md"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              İş Oluştur
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default NewTask;
