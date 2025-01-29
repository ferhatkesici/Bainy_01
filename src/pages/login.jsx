import React, { useState } from 'react';
import { motion } from "framer-motion";
import Footer from '../components/Footer';
import { useApp } from '../contexts/AppContext';

const Login = () => {
  const { handleLogin, employees } = useApp();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = employees.find(u => u.username === username && u.password === password);
    if (user) {
      handleLogin(user);
    } else {
      alert('Kullanıcı adı veya şifre hatalı!');
    }
  };

  const cardVariants = {
    initial: { 
      opacity: 0, 
      y: 50
    },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        type: "spring",
        damping: 20,
        stiffness: 100
      }
    },
    exit: { 
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.4
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background-main relative">
      <motion.div
        variants={cardVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <div className="bg-background-dark p-8 rounded-lg shadow-xl w-96">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-text-primary">
              Roots Post Prodüksiyon
            </h1>
            <h2 className="text-lg mt-2 text-text-primary">
              İş Takip Sistemi
            </h2>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              placeholder="Kullanıcı Adı"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 bg-background-card rounded-lg focus:outline-none focus:ring-1 focus:ring-border-focus text-text-primary"
            />
            
            <input
              type="password"
              placeholder="Şifre"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-background-card rounded-lg focus:outline-none focus:ring-1 focus:ring-border-focus text-text-primary"
            />
            
            <button
              type="submit"
              className="w-full p-3 bg-action hover:bg-bainy text-text-white font-medium rounded-lg transition-colors duration-300"
            >
              Giriş Yap
            </button>
          </form>
        </div>
      </motion.div>
      <Footer />
    </div>
  );
};

export default Login;