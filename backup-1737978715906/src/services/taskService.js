import { formatDate } from '../utils/dateUtils';

export const taskService = {
  createTask: (taskData) => {
    return {
      ...taskData,
      id: Date.now().toString(),
      creationDate: formatDate(new Date()),
      status: 'Devam Ediyor'
    };
  },

  updateTask: (taskId, updates) => {
    // localStorage işlemleri buraya taşınabilir
    return { taskId, ...updates };
  },

  deleteTask: (taskId) => {
    // localStorage işlemleri buraya taşınabilir
    return taskId;
  },

  getTasksByEmployee: (tasks, employeeId) => {
    return tasks.filter(task => task.employee === employeeId);
  },

  getTasksByDateRange: (tasks, startDate, endDate) => {
    return tasks.filter(task => {
      const taskStart = new Date(task.creationDate);
      const taskEnd = new Date(task.deadline);
      return taskStart >= startDate && taskEnd <= endDate;
    });
  }
}; 