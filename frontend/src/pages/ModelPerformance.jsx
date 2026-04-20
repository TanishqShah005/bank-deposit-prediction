import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const ModelPerformance = () => {
  const accuracyData = [
    { name: 'Naive Bayes', accuracy: 72.37, fill: '#f43f5e' },
    { name: 'KNN', accuracy: 76.67, fill: '#f59e0b' },
    { name: 'Decision Tree', accuracy: 79.09, fill: '#3b82f6' },
    { name: 'SVM (Selected)', accuracy: 83.65, fill: '#10b981' },
  ];

  const metricsData = [
    { metric: 'Precision', SVM: 82, DT: 78, KNN: 75, NB: 71 },
    { metric: 'Recall', SVM: 85, DT: 80, KNN: 78, NB: 74 },
    { metric: 'F1-Score', SVM: 83, DT: 79, KNN: 76, NB: 72 },
    { metric: 'Accuracy', SVM: 84, DT: 79, KNN: 77, NB: 72 },
    { metric: 'AUC', SVM: 90, DT: 79, KNN: 82, NB: 78 },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-slate-800 p-4 border border-slate-200 dark:border-slate-700 shadow-xl rounded-xl">
          <p className="font-bold mb-2">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.fill || entry.color }}>
              {entry.name}: {typeof entry.value === 'number' ? entry.value.toFixed(2) + '%' : entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="animate-fade-in pb-10">
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2">Model Performance & Evaluation</h1>
        <p className="text-slate-600 dark:text-slate-400">
          Comparison of the 4 classification models trained on the bank dataset. Support Vector Machine (SVM) was selected as the final model due to its superior accuracy and AUC score.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        
        {/* Accuracy Comparison */}
        <div className="glass-panel p-6">
          <h2 className="text-xl font-bold mb-6">Model Accuracy Comparison</h2>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={accuracyData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis domain={[60, 100]} stroke="#94a3b8" />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="accuracy" radius={[6, 6, 0, 0]}>
                  {accuracyData.map((entry, index) => (
                    <cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Multi-metric Radar Chart */}
        <div className="glass-panel p-6">
          <h2 className="text-xl font-bold mb-6">Detailed Metrics (Radar)</h2>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={metricsData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="metric" stroke="#94a3b8" />
                <PolarRadiusAxis angle={30} domain={[60, 100]} stroke="#94a3b8" />
                <Radar name="SVM" dataKey="SVM" stroke="#10b981" fill="#10b981" fillOpacity={0.4} />
                <Radar name="Decision Tree" dataKey="DT" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} />
                <Radar name="KNN" dataKey="KNN" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.2} />
                <Tooltip content={<CustomTooltip />} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="glass-panel p-8">
        <h2 className="text-xl font-bold mb-6">Why SVM?</h2>
        <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-400">
          <p>
            After rigorous testing, the Support Vector Machine with an RBF kernel outperformed other algorithms. It achieved an overall accuracy of <strong>83.65%</strong> on the unseen test set.
          </p>
          <p className="mt-4">
            Financial data often contains complex, non-linear boundaries between customer segments. SVM's ability to map features into a higher-dimensional space (kernel trick) allowed it to effectively separate the 'subscribers' from 'non-subscribers' better than simple distance-based (KNN) or rule-based (Decision Trees) algorithms.
          </p>
        </div>
      </div>

    </div>
  );
};

export default ModelPerformance;
