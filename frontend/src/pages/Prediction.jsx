import React, { useState } from 'react';
import axios from 'axios';
import { Loader2, CheckCircle2, XCircle, Download, RefreshCcw } from 'lucide-react';
import html2canvas from 'html2canvas';

const Prediction = () => {
  const [formData, setFormData] = useState({
    age: 35,
    job: 'management',
    marital: 'married',
    education: 'tertiary',
    default: 'no',
    balance: 1500,
    housing: 'yes',
    loan: 'no',
    contact: 'cellular',
    day: 15,
    month: 'may',
    duration: 250,
    campaign: 1,
    pdays: -1,
    previous: 0,
    poutcome: 'unknown'
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await axios.post('http://localhost:8000/predict', formData);
      setTimeout(() => {
        setResult(response.data);
        setLoading(false);
      }, 800); // slight artificial delay for UX (loading spinner visibility)
    } catch (err) {
      setError(err.response?.data?.detail || 'An error occurred while making the prediction.');
      setLoading(false);
    }
  };

  const downloadResult = () => {
    const resultCard = document.getElementById('prediction-result-card');
    if (resultCard) {
      html2canvas(resultCard, { backgroundColor: null }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'deposit_prediction_result.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
      });
    }
  };

  const resetForm = () => {
    setResult(null);
    setError(null);
  };

  return (
    <div className="animate-fade-in pb-10">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold mb-2">Customer Prediction Engine</h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Input customer details below to predict if they will subscribe to a term deposit. 
          Powered by our trained SVM model.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Form Section */}
        <div className="flex-1 glass-panel p-6 lg:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Info */}
              <div className="space-y-4">
                <h3 className="font-bold text-lg border-b border-slate-200 dark:border-slate-700 pb-2 mb-4">Personal Info</h3>
                
                <div>
                  <label className="label-text">Age</label>
                  <input type="number" name="age" value={formData.age} onChange={handleChange} className="input-field" required min="18" max="100" />
                </div>
                
                <div>
                  <label className="label-text">Job</label>
                  <select name="job" value={formData.job} onChange={handleChange} className="input-field">
                    <option value="management">Management</option>
                    <option value="technician">Technician</option>
                    <option value="entrepreneur">Entrepreneur</option>
                    <option value="blue-collar">Blue-collar</option>
                    <option value="unknown">Unknown</option>
                    <option value="retired">Retired</option>
                    <option value="admin.">Admin</option>
                    <option value="services">Services</option>
                    <option value="self-employed">Self-employed</option>
                    <option value="unemployed">Unemployed</option>
                    <option value="housemaid">Housemaid</option>
                    <option value="student">Student</option>
                  </select>
                </div>
                
                <div>
                  <label className="label-text">Marital Status</label>
                  <select name="marital" value={formData.marital} onChange={handleChange} className="input-field">
                    <option value="married">Married</option>
                    <option value="single">Single</option>
                    <option value="divorced">Divorced</option>
                  </select>
                </div>

                <div>
                  <label className="label-text">Education</label>
                  <select name="education" value={formData.education} onChange={handleChange} className="input-field">
                    <option value="primary">Primary</option>
                    <option value="secondary">Secondary</option>
                    <option value="tertiary">Tertiary</option>
                    <option value="unknown">Unknown</option>
                  </select>
                </div>
              </div>

              {/* Financial & Campaign Info */}
              <div className="space-y-4">
                <h3 className="font-bold text-lg border-b border-slate-200 dark:border-slate-700 pb-2 mb-4">Financial & Campaign</h3>
                
                <div>
                  <label className="label-text">Yearly Balance (₹)</label>
                  <input type="number" name="balance" value={formData.balance} onChange={handleChange} className="input-field" required />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="label-text">Housing Loan</label>
                    <select name="housing" value={formData.housing} onChange={handleChange} className="input-field">
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                  <div>
                    <label className="label-text">Personal Loan</label>
                    <select name="loan" value={formData.loan} onChange={handleChange} className="input-field">
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="label-text">Duration of Last Call (sec)</label>
                  <input type="number" name="duration" value={formData.duration} onChange={handleChange} className="input-field" required min="0" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="label-text">Contacts in Current Campaign</label>
                    <input type="number" name="campaign" value={formData.campaign} onChange={handleChange} className="input-field" required min="1" />
                  </div>
                  <div>
                    <label className="label-text">Contacts Before Campaign</label>
                    <input type="number" name="previous" value={formData.previous} onChange={handleChange} className="input-field" required min="0" />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-end">
              <button 
                type="submit" 
                disabled={loading}
                className="btn-primary w-full md:w-auto min-w-[200px] flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Run Prediction'
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Results Section */}
        <div className="w-full lg:w-1/3 flex flex-col gap-6">
          
          {error && (
            <div className="glass-panel p-6 border-red-500/50 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 animate-slide-up">
              <div className="flex items-center gap-3 mb-2">
                <XCircle size={24} />
                <h3 className="font-bold">Prediction Failed</h3>
              </div>
              <p className="text-sm">{error}</p>
            </div>
          )}

          {!result && !loading && !error && (
            <div className="glass-panel p-8 flex flex-col items-center justify-center text-center h-full text-slate-500 dark:text-slate-400 border-dashed border-2">
              <RefreshCcw size={48} className="mb-4 opacity-50" />
              <p>Fill out the form and run a prediction to see the results here.</p>
            </div>
          )}

          {result && !loading && (
            <div id="prediction-result-card" className="glass-panel p-8 relative overflow-hidden animate-slide-up">
              {/* Status color bar */}
              <div className={`absolute top-0 left-0 w-full h-2 ${result.prediction === 'yes' ? 'bg-green-500' : 'bg-red-500'}`}></div>
              
              <div className="flex justify-between items-start mb-6 mt-2">
                <h3 className="text-xl font-bold">Prediction Result</h3>
                <div className={`p-2 rounded-full ${result.prediction === 'yes' ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'}`}>
                  {result.prediction === 'yes' ? <CheckCircle2 size={32} /> : <XCircle size={32} />}
                </div>
              </div>

              <div className="text-center mb-8">
                <div className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold mb-2">Outcome</div>
                <div className={`text-4xl font-extrabold capitalize ${result.prediction === 'yes' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {result.prediction === 'yes' ? 'Subscribes' : 'Will Not Subscribe'}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-600 dark:text-slate-400">Probability of Yes</span>
                    <span className="font-bold">{(result.probability * 100).toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5">
                    <div className="bg-primary-500 h-2.5 rounded-full" style={{ width: `${result.probability * 100}%` }}></div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700 flex flex-col gap-3">
                <button onClick={downloadResult} className="btn-primary flex items-center justify-center gap-2">
                  <Download size={18} /> Download Result Card
                </button>
                <button onClick={resetForm} className="btn-secondary flex items-center justify-center gap-2">
                  <RefreshCcw size={18} /> New Prediction
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Prediction;
