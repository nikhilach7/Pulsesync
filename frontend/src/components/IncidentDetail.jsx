import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { getApi } from '../auth/api';

function IncidentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [incident, setIncident] = useState(null);
  const [rca, setRca] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  const auth = useAuth();
  const api = getApi(auth);
  useEffect(() => {
    api.get(`/incidents/${id}`).then(res => {
      setIncident(res.data);
      setStatus(res.data.status);
      setRca(res.data.rca || '');
    });
    // eslint-disable-next-line
  }, [id]);

  const updateStatus = async (newStatus) => {
    if (newStatus === 'CLOSED' && !rca) {
      setError('RCA is required to close incident');
      return;
    }
    await api.patch(`/incidents/${id}/status?status=${newStatus}`);
    setStatus(newStatus);
    setError('');
  };

  const submitRca = async () => {
    await api.post(`/incidents/${id}/rca`, { rca });
    setError('');
  };

  if (!incident) return <div className="p-8">Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto py-10">
      <h2 className="text-2xl font-bold mb-4">Incident #{incident.id}</h2>
      <div className="bg-white rounded shadow p-6 mb-6">
        <div className="mb-2"><b>Title:</b> {incident.title}</div>
        <div className="mb-2"><b>Source:</b> {incident.source}</div>
        <div className="mb-2"><b>Priority:</b> {incident.priority}</div>
        <div className="mb-2"><b>Status:</b> {status}</div>
        <div className="mb-2"><b>Created:</b> {new Date(incident.created_at).toLocaleString()}</div>
        <div className="mb-2"><b>Updated:</b> {new Date(incident.updated_at).toLocaleString()}</div>
      </div>
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Signals</h3>
        <ul className="bg-gray-50 rounded p-4">
          {incident.signals && incident.signals.map(sig => (
            <li key={sig.id} className="mb-2 border-b pb-2">
              <b>{sig.type}</b> [{sig.timestamp}]: {sig.message}
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-6">
        <h3 className="font-semibold mb-2">RCA</h3>
        <textarea
          className="w-full border rounded p-2"
          rows={3}
          value={rca}
          onChange={e => setRca(e.target.value)}
        />
        <button className="mt-2 px-4 py-1 bg-blue-500 text-white rounded" onClick={submitRca}>Save RCA</button>
      </div>
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Update Status</h3>
        {["OPEN", "IN_PROGRESS", "RESOLVED", "CLOSED"].map(s => (
          <button
            key={s}
            className={`mr-2 px-3 py-1 rounded ${status === s ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            onClick={() => updateStatus(s)}
          >
            {s}
          </button>
        ))}
      </div>
      {error && <div className="text-red-500 font-semibold">{error}</div>}
      <button className="mt-6 text-blue-500 underline" onClick={() => navigate(-1)}>Back</button>
    </div>
  );
}

export default IncidentDetail;
