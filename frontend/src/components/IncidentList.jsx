import React, { useEffect, useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { getApi } from '../auth/api';
import { Link } from 'react-router-dom';

function IncidentList() {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('');

  const auth = useAuth();
  const api = getApi(auth);
  useEffect(() => {
    setLoading(true);
    api.get('/incidents/')
      .then(res => {
        setIncidents(res.data);
      })
      .catch(e => {
        console.error('Failed to fetch incidents:', e);
      })
      .finally(() => {
        setLoading(false);
      });
    // eslint-disable-next-line
  }, []);

  const filtered = incidents.filter(inc =>
    !filter || inc.status === filter
  );

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Incidents</h1>
        <p className="text-gray-600">View and manage all system incidents</p>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Filter by status:</label>
            <select 
              value={filter} 
              onChange={e => setFilter(e.target.value)} 
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Status</option>
              <option value="OPEN">Open</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="RESOLVED">Resolved</option>
              <option value="CLOSED">Closed</option>
            </select>
          </div>
          
          <div className="text-sm text-gray-600">
            Showing <strong>{filtered.length}</strong> of <strong>{incidents.length}</strong> incidents
          </div>
        </div>
        
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
              <span className="text-gray-500 mt-2">Loading incidents...</span>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">ID</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">Title</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">Source</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">Priority</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">Created</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700 text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((inc, index) => (
                  <tr 
                    key={inc.id} 
                    className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}
                  >
                    <td className="py-3 px-4">
                      <span className="font-mono text-sm text-gray-600">#{inc.id}</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-medium text-gray-900">{inc.title}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {inc.source}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        inc.priority === 'HIGH' ? 'bg-red-100 text-red-800' :
                        inc.priority === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {inc.priority}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        inc.status === 'OPEN' ? 'bg-red-100 text-red-800' :
                        inc.status === 'IN_PROGRESS' ? 'bg-yellow-100 text-yellow-800' :
                        inc.status === 'RESOLVED' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {inc.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-sm text-gray-600">
                        {new Date(inc.created_at).toLocaleDateString()}
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(inc.created_at).toLocaleTimeString()}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Link 
                        to={`/incidents/${inc.id}`} 
                        className="inline-flex items-center space-x-1 text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
                      >
                        <span>View</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {filtered.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 text-lg">No incidents found</div>
                <div className="text-gray-500 text-sm mt-2">
                  {filter ? 'Try adjusting the filter' : 'No incidents have been created yet'}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default IncidentList;
