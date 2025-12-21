import React, { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: localStorage.getItem('token') || null,
    role: localStorage.getItem('role') || null,
    name: localStorage.getItem('name') || null
  });

  useEffect(() => {
    if (auth.token) localStorage.setItem('token', auth.token); else localStorage.removeItem('token');
    if (auth.role) localStorage.setItem('role', auth.role); else localStorage.removeItem('role');
    if (auth.name) localStorage.setItem('name', auth.name); else localStorage.removeItem('name');
  }, [auth]);

  const login = ({ token, role, name }) => setAuth({ token, role, name });
  const logout = () => setAuth({ token: null, role: null, name: null });

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
