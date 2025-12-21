import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const AdminRoute = ({ children }) => {
  const { auth } = useContext(AuthContext);
  if (!auth.token) return <Navigate to="/login" replace />;
  if (auth.role !== 'admin') return <div className="container-max mt-8"><div className="card">Access Denied</div></div>;
  return children;
};

export default AdminRoute;
