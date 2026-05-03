import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(() => {
    try {
      const saved = localStorage.getItem('ims_auth');
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed;
      }
    } catch (e) {
      console.error('Error parsing auth from localStorage:', e);
    }
    return { username: '', password: '', isLoggedIn: false };
  });

  const login = (username, password) => {
    setAuth({ username, password, isLoggedIn: true });
    localStorage.setItem('ims_auth', JSON.stringify({ username, password, isLoggedIn: true }));
  };
  const logout = () => {
    setAuth({ username: '', password: '', isLoggedIn: false });
    localStorage.removeItem('ims_auth');
  };
  return (
    <AuthContext.Provider value={{ ...auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}