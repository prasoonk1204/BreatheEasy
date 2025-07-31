import React, { useState } from 'react';
import HealthForm from '../components/HealthForm';

const HealthAdvisor = () => {
  const [advice, setAdvice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (formData) => {
    setLoading(true);
    setAdvice(null);
    setError(null);
    try {
      const res = await fetch('http://localhost:5000/api/health-advice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.advice) {
        setAdvice(data.advice);
      } else {
        setError(data.error || 'No advice received.');
      }
    } catch (err) {
      setError('Failed to fetch advice.');
    } finally {
      setLoading(false);
    }
  };

  // Function to format the advice text by removing ** and improving structure
  const formatAdvice = (adviceText) => {
    if (!adviceText) return '';
    
    // Remove ** markers and clean up the text
    let formatted = adviceText
      .replace(/\*\*/g, '') // Remove ** markers
      .replace(/\n\n/g, '\n') // Remove double line breaks
      .trim();

    // Split into sections if they exist
    const sections = formatted.split(/(?=^\d+\.\s)/m);
    
    return sections;
  };

  return (
    <div className="min-h-screen py-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4">
        <HealthForm onSubmit={handleSubmit} loading={loading} />
        
        {advice && (
          <div className="mt-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-green-500 to-green-600 dark:from-purple-600 dark:to-purple-700 px-8 py-6">
                <h3 className="text-2xl font-bold text-white text-center">
                  Your Personalized Health Advice
                </h3>
                <p className="text-green-100 dark:text-purple-100 text-center mt-2">
                  Based on your health profile and current air quality conditions
                </p>
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="prose prose-lg max-w-none dark:prose-invert">
                  {formatAdvice(advice).map((section, index) => {
                    if (!section.trim()) return null;
                    
                    // Check if it's a numbered section
                    const isNumberedSection = /^\d+\.\s/.test(section);
                    
                    if (isNumberedSection) {
                      // Extract title and content
                      const lines = section.split('\n');
                      const title = lines[0].replace(/^\d+\.\s/, '');
                      const content = lines.slice(1).join('\n');
                      
                      return (
                        <div key={index} className="mb-8 last:mb-0">
                          <h4 className="text-xl font-semibold text-emerald-700 dark:text-purple-400 mb-4 pb-2 border-b border-emerald-200 dark:border-purple-700">
                            {title}
                          </h4>
                          <div className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            {content.split('\n').map((line, lineIndex) => {
                              if (line.trim().startsWith('-')) {
                                return (
                                  <div key={lineIndex} className="flex items-start mb-2">
                                    <span className="text-emerald-500 dark:text-purple-400 mr-2 mt-1">•</span>
                                    <span className="flex-1">{line.replace(/^-\s*/, '')}</span>
                                  </div>
                                );
                              }
                              return line.trim() && (
                                <p key={lineIndex} className="mb-3 last:mb-0">
                                  {line}
                                </p>
                              );
                            })}
                          </div>
                        </div>
                      );
                    } else {
                      // Regular paragraph
                      return (
                        <div key={index} className="mb-4">
                          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            {section}
                          </p>
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {error && (
          <div className="mt-8 max-w-2xl mx-auto">
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
                    Error
                  </h3>
                  <div className="mt-2 text-sm text-red-700 dark:text-red-300">
                    {error}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HealthAdvisor; 