import React, { useEffect, useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { getApi } from '../auth/api';
import { Link } from 'react-router-dom';

import SignalIngestDemo from './SignalIngestDemo';

function Dashboard() {
  const [counts, setCounts] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const auth = useAuth();
  const api = getApi(auth);
  
  const STATUS_LABELS = {
    'OPEN': { label: 'Open', color: 'text-red-600', bg: 'bg-red-50' },
    'IN_PROGRESS': { label: 'In Progress', color: 'text-yellow-600', bg: 'bg-yellow-50' },
    'RESOLVED': { label: 'Resolved', color: 'text-green-600', bg: 'bg-green-50' },
    'CLOSED': { label: 'Closed', color: 'text-gray-600', bg: 'bg-gray-50' }
  };

useEffect(() => {
    // Start with empty counts - no demo data
    setCounts({});
    setError(null);
    
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await api.get('/incidents/');
        const statusCounts = res.data.reduce((acc, inc) => {
          acc[inc.status] = (acc[inc.status] || 0) + 1;
          return acc;
        }, {});
        setCounts(statusCounts);
        setError(null);
      } catch (e) {
        console.error('Failed to fetch incidents:', e);
        setError('Unable to connect to backend. Please check if the backend service is running.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

const refreshData = () => {
    setLoading(true);
    api.get('/incidents/')
      .then(res => {
        const statusCounts = res.data.reduce((acc, inc) => {
          acc[inc.status] = (acc[inc.status] || 0) + 1;
          return acc;
        }, {});
        setCounts(statusCounts);
        setError(null);
      })
      .catch(e => {
        // Keep existing data but show error message
        setError('Unable to connect to backend. Please check if the backend service is running.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Monitor and manage incident statistics</p>
        </div>
        <button 
          onClick={refreshData}
          className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 transition-all duration-200 shadow-soft"
          disabled={loading}
        >
          <svg className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span>{loading ? 'Refreshing...' : 'Refresh'}</span>
        </button>
      </div>
      
      <SignalIngestDemo />
      
      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg animate-slide-up">
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-red-700 dark:text-red-300 font-medium">{error}</span>
          </div>
        </div>
      )}
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-soft border border-gray-200 dark:border-gray-700 p-6 mb-6 transition-all duration-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Incidents by Status</h2>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-500 dark:text-gray-400">Live statistics</span>
          </div>
        </div>
        
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
              <span className="text-gray-500 dark:text-gray-400 mt-2">Loading incidents...</span>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'].map(status => {
              const config = STATUS_LABELS[status];
              const count = counts[status] || 0;
              return (
                <div 
                  key={status} 
                  className={`p-6 rounded-xl ${config.bg} border border-gray-100 flex flex-col items-center cursor-pointer hover:shadow-lg transition-all duration-200 transform hover:scale-105`}
                >
                  <div className={`text-sm font-medium ${config.color} mb-2`}>
                    {config.label}
                  </div>
                  <div className="text-4xl font-bold text-gray-800">
                    {count}
                  </div>
                  <div className="text-xs text-gray-500 mt-2">
                    {count === 1 ? 'incident' : 'incidents'}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <Link 
            to="/incidents" 
            className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            <span>View All Incidents</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
          
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Total: <strong>{Object.values(counts).reduce((a, b) => a + b, 0)}</strong> incidents</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
