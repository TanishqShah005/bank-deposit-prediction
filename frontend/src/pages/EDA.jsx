import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const EDA = () => {
  // Static mock data representing the notebook's EDA
  const depositData = [
    { name: 'No (Did not subscribe)', value: 5873, color: '#f43f5e' },
    { name: 'Yes (Subscribed)', value: 5289, color: '#10b981' }
  ];

  const ageData = [
    { ageGroup: '18-25', yes: 350, no: 150 },
    { ageGroup: '26-35', yes: 1800, no: 1200 },
    { ageGroup: '36-45', yes: 1500, no: 2000 },
    { ageGroup: '46-55', yes: 900, no: 1500 },
    { ageGroup: '56-65', yes: 500, no: 800 },
    { ageGroup: '65+', yes: 239, no: 223 },
  ];

  const jobData = [
    { job: 'management', yes: 1301, no: 1265 },
    { job: 'blue-collar', yes: 708, no: 1236 },
    { job: 'technician', yes: 840, no: 983 },
    { job: 'admin.', yes: 631, no: 703 },
    { job: 'services', yes: 369, no: 554 },
    { job: 'retired', yes: 516, no: 262 },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-slate-800 p-4 border border-slate-200 dark:border-slate-700 shadow-xl rounded-xl">
          <p className="font-bold mb-2">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {entry.value}
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
        <h1 className="text-3xl font-bold mb-2">Exploratory Data Analysis</h1>
        <p className="text-slate-600 dark:text-slate-400">
          Visual insights into the bank marketing dataset derived from the original Jupyter Notebook.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Deposit Distribution */}
        <div className="glass-panel p-6">
          <h2 className="text-xl font-bold mb-6">Deposit Subscription Rate</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={depositData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={110}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {depositData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <p className="text-sm text-slate-500 mt-4 text-center">
            The dataset is fairly balanced with a ~47% subscription rate.
          </p>
        </div>

        {/* Age Distribution */}
        <div className="glass-panel p-6">
          <h2 className="text-xl font-bold mb-6">Age vs Subscription</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ageData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="ageGroup" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="yes" name="Subscribed" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="no" name="Did Not Subscribe" fill="#f43f5e" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-sm text-slate-500 mt-4 text-center">
            Younger (18-25) and older (60+) demographics have higher relative subscription rates.
          </p>
        </div>
      </div>

      {/* Job Distribution */}
      <div className="glass-panel p-6">
        <h2 className="text-xl font-bold mb-6">Job Type vs Subscription</h2>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={jobData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
              <XAxis type="number" stroke="#94a3b8" />
              <YAxis dataKey="job" type="category" stroke="#94a3b8" width={80} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="yes" name="Subscribed" fill="#10b981" radius={[0, 4, 4, 0]} />
              <Bar dataKey="no" name="Did Not Subscribe" fill="#f43f5e" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="text-sm text-slate-500 mt-4 text-center">
          Management and retired professionals show higher propensity to subscribe to term deposits.
        </p>
      </div>
    </div>
  );
};

export default EDA;
