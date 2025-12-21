import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import RequestForm from './pages/RequestForm';
import StatusPage from './pages/StatusPage';
import AdminDashboard from './pages/AdminDashboard';
import AdminRoute from './utils/AdminRoute';
import FarmerRoute from './utils/FarmerRoute';
import Home from './pages/HomePage';

// const Home = () => (
//   <div className="container-max mt-8">
//     <div className="card">
//       <h1 className="text-2xl font-semibold">Power Distribution System</h1>
//       <p className="mt-2 text-gray-600">Farmers submit power requests. Admin approves or rejects them.</p>
//     </div>
//   </div>
// );

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/request" element={<FarmerRoute><RequestForm /></FarmerRoute>} />
        <Route path="/status" element={<FarmerRoute><StatusPage /></FarmerRoute>} />

        <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
