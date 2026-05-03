import React, { useState } from 'react';
import { useAuth } from '../auth/AuthContext';

function LoginModal() {
  const { isLoggedIn, login, logout } = useAuth();
  const [show, setShow] = useState(!isLoggedIn);
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('adminpass');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    // Bypass dummy authentication since backend doesn't enforce it yet
    login(username, password);
    setShow(false);
    setError('');
  };

  if (isLoggedIn && !show) return null;
  return (
    <div className={`fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 ${show ? '' : 'hidden'}`}>
      <form className="bg-white dark:bg-gray-800 dark:text-gray-100 rounded shadow p-8 w-80 flex flex-col" onSubmit={handleLogin}>
        <h2 className="text-xl font-bold mb-4">Login to PulseSync</h2>
        <input className="border dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded px-2 py-1 mb-2" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
        <input className="border dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded px-2 py-1 mb-2" placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <button className="bg-blue-600 text-white rounded px-4 py-2" type="submit">Login</button>
        <button className="mt-2 text-gray-500 dark:text-gray-400 underline" type="button" onClick={() => { setShow(false); logout(); }}>Logout</button>
      </form>
    </div>
  );
}

export default LoginModal;