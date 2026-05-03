import React, { useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { getApi } from '../auth/api';

function SignalIngestDemo() {
  const [source, setSource] = useState('DB');
  const [type, setType] = useState('ERROR');
  const [message, setMessage] = useState('');
  const [count, setCount] = useState(1);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  
  const auth = useAuth();
  const api = getApi(auth);

  const validateForm = () => {
    if (!message.trim()) {
      setError('Message is required');
      return false;
    }
    if (count < 1 || count > 1000) {
      setError('Count must be between 1 and 1000');
      return false;
    }
    setError('');
    return true;
  };

  const sendSignals = async () => {
    if (!validateForm()) return;
    
    setLoading(true);
    setResult(null);
    setError('');
    
    const signals = Array.from({ length: count }, () => ({
      source,
      type,
      message: message.trim(),
      timestamp: new Date().toISOString()
    }));
    
try {
      const res = await api.post('/signals', signals);
      setResult({
        type: 'success',
        count: res.data.count,
        message: `Successfully sent ${res.data.count} signal${res.data.count > 1 ? 's' : ''}!`,
        timestamp: new Date().toLocaleTimeString()
      });
      // Note: Don't clear message - user may want to send similar signals
    } catch (e) {
      let errorMessage = 'Failed to send signals';
      if (e.response?.data?.detail) {
        errorMessage = Array.isArray(e.response.data.detail) 
          ? e.response.data.detail.map(d => d.msg || d).join(', ')
          : e.response.data.detail;
      } else if (e.message) {
        errorMessage = e.message;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !loading) {
      sendSignals();
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">📡 Signal Ingest</h3>
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${loading ? 'bg-yellow-500 animate-pulse' : 'bg-green-500'}`}></div>
          <span className="text-sm text-gray-600 dark:text-gray-300">{loading ? 'Processing...' : 'Ready'}</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Source</label>
          <select 
            value={source} 
            onChange={e => setSource(e.target.value)} 
            className="w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={loading}
          >
            <option value="DB">Database (DB)</option>
            <option value="API">API</option>
            <option value="CACHE">Cache</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Type</label>
          <select 
            value={type} 
            onChange={e => setType(e.target.value)} 
            className="w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={loading}
          >
            <option value="ERROR">Error</option>
            <option value="WARNING">Warning</option>
            <option value="INFO">Info</option>
          </select>
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message *</label>
          <input 
            value={message} 
            onChange={e => setMessage(e.target.value)} 
            onKeyPress={handleKeyPress}
            placeholder="Enter signal message..." 
            className="w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={loading}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Count</label>
          <input 
            type="number" 
            min={1} 
            max={1000} 
            value={count} 
            onChange={e => setCount(Number(e.target.value))} 
            className="w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={loading}
          />
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <button 
          onClick={sendSignals} 
          disabled={loading}
          className={`inline-flex items-center space-x-2 px-6 py-3 rounded-lg font-medium text-white transition-all transform ${
            loading 
              ? 'bg-blue-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700 hover:scale-105'
          }`}
        >
          {loading ? (
            <>
              <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Sending...</span>
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              <span>Send Signals</span>
            </>
          )}
        </button>
        
        {result && (
          <div className="flex-1 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-3">
            <div className="flex-shrink-0">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <span className="text-green-700 font-medium">{result.message}</span>
              <span className="text-green-600 text-sm block">{result.timestamp}</span>
            </div>
          </div>
        )}
      </div>
      
      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-3">
          <div className="flex-shrink-0 mt-0.5">
            <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="flex-1">
            <span className="text-red-700 font-medium">Error occurred</span>
            <span className="text-red-600 text-sm block">{error}</span>
            <div className="text-red-500 text-xs mt-2">
              Please ensure the backend server is running and you are properly authenticated.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SignalIngestDemo;
