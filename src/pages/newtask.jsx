import React, { useState, useRef, useMemo } from 'react';
import { motion } from "framer-motion";
import { useApp } from '../contexts/AppContext';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-hot-toast";

function NewTask() {
  const navigate = useNavigate();
  const { employees, addTask } = useApp();
  
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

  const handleSubmitForm = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.employee) {
      toast.error("Lütfen zorunlu alanları doldurun!");
      return;
    }
    
    const newTask = {
      id: Date.now(),
      ...formData,
      createdAt: today,
    };

    addTask(newTask);
    toast.success("Yeni iş başarıyla oluşturuldu!");
    navigate("/task-list");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Yeni İş Oluştur</h2>
        </div>

        <form onSubmit={handleSubmitForm} className="p-6">
          <div className="space-y-4">
            <div className="bg-white/60 rounded-lg p-4 relative" ref={inputRef}>
              <label className="block text-sm font-medium text-gray-700 mb-2">İş Başlığı</label>
              <input
                type="text"
                value={formData.name}
                onChange={handleNameChange}
                onKeyDown={handleKeyDown}
                className="w-full bg-white/40 backdrop-blur-sm rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#B688FF] transition-all duration-300 appearance-none"
                style={{ WebkitAppearance: 'none' }}
                placeholder="İş başlığını yazın"
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Açıklama</label>
              <textarea
                value={formData.project}
                onChange={handleChange}
                name="project"
                rows="3"
                className="w-full bg-white/40 backdrop-blur-sm rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#B688FF] transition-all duration-300"
              />
            </div>

            <div className="bg-white/60 rounded-lg p-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Atanan Kişi</label>
              <select
                value={formData.employee}
                onChange={handleChange}
                name="employee"
                className="w-full bg-white/40 backdrop-blur-sm rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#B688FF] transition-all duration-300"
                required
              >
                <option value="">Seçiniz</option>
                {employees?.map(emp => (
                  <option key={emp.id} value={emp.id}>{emp.name}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/60 rounded-lg p-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Başlangıç Tarihi</label>
                <input
                  type="date"
                  value={formData.deadline}
                  onChange={handleChange}
                  name="deadline"
                  className="w-full bg-white/40 backdrop-blur-sm rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#B688FF] transition-all duration-300"
                  required
                />
              </div>
              
              <div className="bg-white/60 rounded-lg p-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Bitiş Tarihi</label>
                <input
                  type="date"
                  value={formData.deadline}
                  onChange={handleChange}
                  name="deadline"
                  className="w-full bg-white/40 backdrop-blur-sm rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#B688FF] transition-all duration-300"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/60 rounded-lg p-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Durum</label>
                <select
                  value={formData.status}
                  onChange={handleChange}
                  name="status"
                  className="w-full bg-white/40 backdrop-blur-sm rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#B688FF] transition-all duration-300"
                >
                  <option>Devam Ediyor</option>
                  <option>Tamamlandı</option>
                </select>
              </div>
              
              <div className="bg-white/60 rounded-lg p-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Öncelik</label>
                <select
                  value={formData.hours}
                  onChange={handleChange}
                  name="hours"
                  className="w-full bg-white/40 backdrop-blur-sm rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#B688FF] transition-all duration-300"
                >
                  <option>Düşük</option>
                  <option>Orta</option>
                  <option>Yüksek</option>
                </select>
              </div>
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
}

export default NewTask;
