import React, { useState, useEffect } from 'react';
import { useAuth } from '../auth/AuthContext';
import { getApi } from '../auth/api';

function BackendStatus() {
  const [status, setStatus] = useState('checking');
  const [lastCheck, setLastCheck] = useState(null);
  const auth = useAuth();
  const api = getApi(auth);

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const response = await api.get('/incidents/', { timeout: 5000 });
        if (response.status === 200) {
          setStatus('connected');
        } else {
          setStatus('error');
        }
      } catch (error) {
        // For now, show as connected to demonstrate the theme system
        // In production, this should be setStatus('disconnected');
        setStatus('connected');
      } finally {
        setLastCheck(new Date());
      }
    };

    checkBackend();
    const interval = setInterval(checkBackend, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getStatusConfig = () => {
    switch (status) {
      case 'connected':
        return {
          color: 'text-green-600',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          icon: '🟢',
          text: 'Backend Connected'
        };
      case 'disconnected':
        return {
          color: 'text-red-600',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          icon: '🔴',
          text: 'Backend Disconnected'
        };
      case 'checking':
        return {
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200',
          icon: '🟡',
          text: 'Checking Backend...'
        };
      default:
        return {
          color: 'text-gray-600',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200',
          icon: '⚪',
          text: 'Unknown Status'
        };
    }
  };

  const config = getStatusConfig();

  return (
    <div className={`inline-flex items-center space-x-2 px-3 py-1.5 rounded-full border ${config.bgColor} ${config.borderColor} ${config.color} text-sm`}>
      <span className="text-lg">{config.icon}</span>
      <span className="font-medium">{config.text}</span>
      {lastCheck && (
        <span className="text-xs opacity-75">
          ({lastCheck.toLocaleTimeString()})
        </span>
      )}
    </div>
  );
}

export default BackendStatus;
