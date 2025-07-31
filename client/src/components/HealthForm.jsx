import React, { useState } from 'react';

const initialState = {
  age: '',
  gender: '',
  weight: '',
  height: '',
  conditions: '',
  smoking: '',
  sleepHours: '',
  physicalActivity: '',
};

const HealthForm = ({ onSubmit, loading }) => {
  const [form, setForm] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 dark:from-purple-600 dark:to-purple-700 px-8 py-6">
          <h2 className="text-2xl font-bold text-white text-center">
            Personal Health Assessment
          </h2>
          <p className="text-emerald-100 dark:text-purple-100 text-center mt-2">
            Get personalized health advice based on your profile
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white border-b border-gray-200 dark:border-gray-600 pb-2">
              Basic Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Age *
                </label>
                <input 
                  type="number" 
                  name="age" 
                  value={form.age} 
                  onChange={handleChange} 
                  required 
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 dark:focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                  placeholder="Enter your age"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Gender *
                </label>
                <select 
                  name="gender" 
                  value={form.gender} 
                  onChange={handleChange} 
                  required 
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 dark:focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Weight (kg) *
                </label>
                <input 
                  type="number" 
                  name="weight" 
                  value={form.weight} 
                  onChange={handleChange} 
                  required 
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 dark:focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                  placeholder="e.g., 70"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Height (cm) *
                </label>
                <input 
                  type="number" 
                  name="height" 
                  value={form.height} 
                  onChange={handleChange} 
                  required 
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 dark:focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                  placeholder="e.g., 175"
                />
              </div>
            </div>
          </div>

          {/* Health Conditions */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white border-b border-gray-200 dark:border-gray-600 pb-2">
              Health Conditions
            </h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Known Conditions
              </label>
              <input 
                type="text" 
                name="conditions" 
                value={form.conditions} 
                onChange={handleChange} 
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 dark:focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                placeholder="e.g., diabetes, asthma, hypertension"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Separate multiple conditions with commas
              </p>
            </div>
          </div>

          {/* Lifestyle */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white border-b border-gray-200 dark:border-gray-600 pb-2">
              Lifestyle Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Smoking Status *
                </label>
                <select 
                  name="smoking" 
                  value={form.smoking} 
                  onChange={handleChange} 
                  required 
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 dark:focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                >
                  <option value="">Select status</option>
                  <option value="no">Non-smoker</option>
                  <option value="yes">Current smoker</option>
                  <option value="occasionally">Occasional smoker</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Sleep Hours per Night *
                </label>
                <input 
                  type="number" 
                  name="sleepHours" 
                  value={form.sleepHours} 
                  onChange={handleChange} 
                  required 
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 dark:focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                  placeholder="e.g., 7"
                  min="1"
                  max="24"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Physical Activity (hours/week) *
              </label>
              <input 
                type="number" 
                name="physicalActivity" 
                value={form.physicalActivity} 
                onChange={handleChange} 
                required 
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 dark:focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                placeholder="e.g., 5"
                min="0"
                max="168"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Include all physical activities like walking, exercise, sports
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 dark:from-purple-600 dark:to-purple-700 hover:from-emerald-600 hover:to-emerald-700 dark:hover:from-purple-700 dark:hover:to-purple-800 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Generating Personalized Advice...
                </div>
              ) : (
                'Get Personalized Health Advice'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HealthForm; 