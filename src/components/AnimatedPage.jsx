import { motion } from "framer-motion";

const pageVariants = {
  initial: { opacity: 0, scale: 0.9 },
  enter: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 }
};

const AnimatedPage = ({ children, className }) => (
  <motion.div
    className={className}
    initial="initial"
    animate="enter"
    exit="exit"
    variants={pageVariants}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
);

export default AnimatedPage;