import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import EDA from './pages/EDA';
import ModelPerformance from './pages/ModelPerformance';
import Prediction from './pages/Prediction';

function App() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // Check for saved user preference or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === 'dark') document.documentElement.classList.add('dark');
    } else if (systemPrefersDark) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      setTheme('light');
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-50 transition-colors duration-300">
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        
        <main className="flex-grow container mx-auto px-4 py-8 max-w-7xl animate-fade-in relative z-10">
          {/* Decorative background blobs */}
          <div className="absolute top-0 -left-4 w-72 h-72 bg-primary-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10 animate-blob pointer-events-none"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10 animate-blob animation-delay-2000 pointer-events-none"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10 animate-blob animation-delay-4000 pointer-events-none"></div>

          <div className="relative z-10">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/eda" element={<EDA />} />
              <Route path="/performance" element={<ModelPerformance />} />
              <Route path="/predict" element={<Prediction />} />
            </Routes>
          </div>
        </main>
        
        <footer className="py-6 text-center text-slate-500 dark:text-slate-400 text-sm border-t border-slate-200 dark:border-slate-800">
          <p>© {new Date().getFullYear()} Bank Deposit Prediction System. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
