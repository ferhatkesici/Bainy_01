import React, { useMemo, memo, useCallback } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import ExportToExcel from '../components/ExportToExcel';
import { useApp } from '../contexts/AppContext';

// TaskCard'ı ayrı bir bileşen olarak tanımlayalım
const TaskCard = memo(({ task, onStatusChange, onHoursChange }) => {
  // Saat değişikliği işleyicisini optimize edelim
  const handleHoursInputChange = useCallback((e) => {
    const value = parseFloat(e.target.value) || '';
    onHoursChange(task.id, value);
  }, [task.id, onHoursChange]);

  return (
    <motion.div
      layout
      key={task.id}
      className="bg-white/40 backdrop-blur-sm rounded-2xl p-6 shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-lg font-semibold mb-1 text-gray-800">{task.name}</h3>
          <p className="text-sm text-gray-600">{task.project}</p>
        </div>
        <motion.button
          onClick={() => onStatusChange(task.id, task.status === 'Devam Ediyor' ? 'Tamamlandı' : 'Devam Ediyor')}
          className={`px-4 py-2 rounded-xl text-sm text-white shadow-md ${
            task.status === 'Devam Ediyor' ? 'bg-[#EF4746] hover:bg-[#ff5a59]' : 'bg-[#B688FF] hover:bg-[#c9a6ff]'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {task.status}
        </motion.button>
      </div>

      <div className="space-y-3 mb-6 text-gray-700">
        <div className="flex justify-between items-center bg-white/60 rounded-lg p-3">
          <span className="text-sm">Çalışan</span>
          <span className="font-medium">{task.employee}</span>
        </div>
        <div className="flex justify-between items-center bg-white/60 rounded-lg p-3">
          <span className="text-sm">Başlangıç</span>
          <span className="font-medium">{task.creationDate}</span>
        </div>
        <div className="flex justify-between items-center bg-white/60 rounded-lg p-3">
          <span className="text-sm">Bitiş</span>
          <span className="font-medium">{task.deadline}</span>
        </div>
        <div className="flex justify-between items-center bg-white/60 rounded-lg p-3">
          <span className="text-sm">Harcanan Saat</span>
          <input
            type="number"
            min="0"
            step="0.5"
            value={task.hours || ''}
            onChange={handleHoursInputChange}
            className="w-20 bg-white/40 rounded-lg px-3 py-1 text-center focus:outline-none focus:ring-2 focus:ring-[#B688FF] transition-all duration-300"
            placeholder="0"
          />
        </div>
      </div>
    </motion.div>
  );
});

const TaskList = () => {
  const { 
    tasks, 
    handleStatusChange, 
    selectedEmployeeFilter, 
    setSelectedEmployeeFilter,
    employees,
    handleHoursChange 
  } = useApp();

  // Filtreleme işlemlerini optimize edelim
  const filteredTasks = useMemo(() => 
    selectedEmployeeFilter
      ? tasks.filter(task => task.employee === selectedEmployeeFilter)
      : tasks,
    [tasks, selectedEmployeeFilter]
  );

  const { ongoingTasks, completedTasks } = useMemo(() => ({
    ongoingTasks: filteredTasks.filter(task => task.status === 'Devam Ediyor'),
    completedTasks: filteredTasks.filter(task => task.status === 'Tamamlandı')
  }), [filteredTasks]);

  // Çalışan filtresi değişikliği işleyicisini optimize edelim
  const handleEmployeeFilterChange = useCallback((e) => {
    setSelectedEmployeeFilter(e.target.value);
  }, [setSelectedEmployeeFilter]);

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div 
        className="max-w-7xl mx-auto bg-gradient-to-b from-white to-[#B688FF] rounded-2xl overflow-hidden shadow-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">İş Listesi</h2>
              <p className="mt-2 text-sm text-gray-600">Tüm işleri görüntüle ve yönet</p>
            </div>
            <div className="flex gap-4">
              <select 
                value={selectedEmployeeFilter}
                onChange={handleEmployeeFilterChange}
                className="bg-white/40 backdrop-blur-sm border-0 rounded-xl px-4 py-2 focus:ring-2 focus:ring-[#B688FF] transition-all duration-300 text-gray-700"
              >
                <option value="">Tüm Çalışanlar</option>
                {employees?.map(employee => (
                  <option key={employee.id} value={employee.name}>
                    {employee.name}
                  </option>
                ))}
              </select>
              <ExportToExcel 
                tasks={tasks}
                selectedEmployeeFilter={selectedEmployeeFilter}
                employees={employees}
              />
            </div>
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-semibold mb-6 text-gray-800">Devam Eden İşler</h3>
          <AnimatePresence>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ongoingTasks.map(task => (
                <TaskCard 
                  key={task.id} 
                  task={task}
                  onStatusChange={handleStatusChange}
                  onHoursChange={handleHoursChange}
                />
              ))}
            </div>
          </AnimatePresence>
        </div>

        <div className="p-6 border-t border-gray-200">
          <h3 className="text-xl font-semibold mb-6 text-gray-800">Tamamlanan İşler</h3>
          <AnimatePresence>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {completedTasks.map(task => (
                <TaskCard 
                  key={task.id} 
                  task={task}
                  onStatusChange={handleStatusChange}
                  onHoursChange={handleHoursChange}
                />
              ))}
            </div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default TaskList;