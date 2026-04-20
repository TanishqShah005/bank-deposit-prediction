import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Database, BrainCircuit, Activity } from 'lucide-react';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
      
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 font-medium text-sm mb-8 animate-slide-up">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
        </span>
        Machine Learning Powered
      </div>

      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 animate-slide-up" style={{ animationDelay: '100ms' }}>
        Predict <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-purple-500">Bank Deposits</span>
        <br /> With Precision
      </h1>
      
      <p className="max-w-2xl text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10 animate-slide-up" style={{ animationDelay: '200ms' }}>
        A state-of-the-art predictive analytics platform that analyzes customer features to forecast term deposit subscriptions using an optimized Support Vector Machine (SVM) model.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: '300ms' }}>
        <Link to="/predict" className="btn-primary flex items-center justify-center gap-2 text-lg px-8 py-3.5">
          Start Predicting <ArrowRight size={20} />
        </Link>
        <Link to="/eda" className="btn-secondary flex items-center justify-center gap-2 text-lg px-8 py-3.5">
          View Analytics
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 w-full animate-slide-up" style={{ animationDelay: '400ms' }}>
        
        <div className="glass-panel p-6 text-left hover:-translate-y-1 transition-transform duration-300">
          <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4">
            <Database size={24} />
          </div>
          <h3 className="text-xl font-bold mb-2">Comprehensive EDA</h3>
          <p className="text-slate-600 dark:text-slate-400">
            Explore interactive dashboards detailing customer demographics, financial standing, and their impact on deposit rates.
          </p>
        </div>

        <div className="glass-panel p-6 text-left hover:-translate-y-1 transition-transform duration-300">
          <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 mb-4">
            <Activity size={24} />
          </div>
          <h3 className="text-xl font-bold mb-2">Model Comparison</h3>
          <p className="text-slate-600 dark:text-slate-400">
            We evaluated KNN, Decision Trees, Naive Bayes, and SVM. Dive deep into performance metrics, ROC curves, and accuracy scores.
          </p>
        </div>

        <div className="glass-panel p-6 text-left hover:-translate-y-1 transition-transform duration-300">
          <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 mb-4">
            <BrainCircuit size={24} />
          </div>
          <h3 className="text-xl font-bold mb-2">Real-time Inference</h3>
          <p className="text-slate-600 dark:text-slate-400">
            Input customer data and instantly receive highly accurate predictions via our optimized FastAPI backend.
          </p>
        </div>

      </div>
    </div>
  );
};

export default Home;
