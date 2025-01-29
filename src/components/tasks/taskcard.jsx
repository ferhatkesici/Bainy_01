import React, { memo, useCallback } from 'react';
import { motion } from 'framer-motion';

const TaskCard = memo(({ task, onStatusChange, onHoursChange }) => {
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
      {/* Mevcut TaskCard içeriği */}
    </motion.div>
  );
});

export default TaskCard; 