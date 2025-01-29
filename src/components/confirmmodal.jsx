import { motion, AnimatePresence } from 'framer-motion';

const ConfirmModal = ({ isOpen, onClose, onConfirm, taskTitle, employeeName }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-xl p-6 w-[400px] shadow-xl"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              İş Kopyalama
            </h3>
            <p className="text-gray-600 mb-4">
              "{taskTitle}" işini {employeeName} kişisine de atamak istediğinizden emin misiniz?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
              >
                İptal
              </button>
              <button
                onClick={onConfirm}
                className="px-4 py-2 rounded-lg bg-[#EF4746] text-white hover:bg-[#ff5a59] transition-colors"
              >
                Kopyala
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmModal; 