// import React, { useState, useContext } from 'react';
// import { api } from '../api';
// import { AuthContext } from '../context/AuthContext';
// import { useNavigate } from 'react-router-dom';

// export default function Register() {
//   const { login } = useContext(AuthContext);
//   const nav = useNavigate();
//   const [form, setForm] = useState({ name: '', email: '', password: '' });
//   const [err, setErr] = useState('');

//   const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     setErr('');
//     try {
//       const { data } = await api.post('/auth/register', { ...form, role: 'farmer' });
//       login({ token: data.token, role: data.role, name: data.name });
//       nav('/request');
//     } catch (error) {
//       setErr(error.response?.data?.msg || 'Register failed');
//     }
//   };

//   return (
//     <div className="container-max mt-10">
//       <div className="card max-w-md mx-auto">
//         <h2 className="text-2xl font-semibold">Register as Farmer</h2>
//         <form onSubmit={handleRegister} className="mt-4 space-y-3">
//           <div>
//             <label className="text-sm text-gray-600">Name</label>
//             <input name="name" value={form.name} onChange={handleChange} className="mt-1 w-full border rounded-md px-3 py-2" required />
//           </div>

//           <div>
//             <label className="text-sm text-gray-600">Email</label>
//             <input name="email" type="email" value={form.email} onChange={handleChange} className="mt-1 w-full border rounded-md px-3 py-2" required />
//           </div>

//           <div>
//             <label className="text-sm text-gray-600">Password</label>
//             <input name="password" type="password" value={form.password} onChange={handleChange} className="mt-1 w-full border rounded-md px-3 py-2" required />
//           </div>

//           {err && <div className="text-sm text-red-600">{err}</div>}

//           <div>
//             <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">Create Account</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }



// import React, { useContext, useState } from "react";
// import { api } from "../api";
// import { AuthContext } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";

// export default function Register() {
//   const { login } = useContext(AuthContext);
//   const nav = useNavigate();
//   const [form, setForm] = useState({ name: "", email: "", password: "" });
//   const [err, setErr] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     setErr("");
//     setLoading(true);
//     try {
//       const { data } = await api.post("/auth/register", { ...form, role: "farmer" });
//       login({ token: data.token, role: data.role, name: data.name });
//       nav("/request");
//     } catch (e) {
//       setErr(e?.response?.data?.msg || "Register failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-[70vh] flex items-center justify-center px-4">
//       <div className="w-full max-w-md bg-white rounded-lg shadow p-6">
//         <h2 className="text-2xl font-semibold text-gray-800">Create an account</h2>
//         <p className="text-sm text-gray-500 mt-1">Register as a farmer</p>

//         <form onSubmit={handleRegister} className="mt-6 space-y-4">
//           <div>
//             <label className="text-sm text-gray-700">Name</label>
//             <input name="name" value={form.name} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" />
//           </div>

//           <div>
//             <label className="text-sm text-gray-700">Email</label>
//             <input name="email" value={form.email} onChange={handleChange} required type="email" className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" />
//           </div>

//           <div>
//             <label className="text-sm text-gray-700">Password</label>
//             <input name="password" value={form.password} onChange={handleChange} required type="password" className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" />
//           </div>

//           {err && <div className="text-sm text-red-600">{err}</div>}

//           <div className="flex items-center justify-between">
//             <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded-md">
//               {loading ? "Creating..." : "Create account"}
//             </button>
//             <button type="button" onClick={() => nav("/login")} className="text-sm text-gray-600 hover:underline">
//               Already have an account?
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }






import React, { useContext, useState } from "react";
import { api } from "../api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const { login } = useContext(AuthContext);
  const nav = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleRegister = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      const { data } = await api.post("/auth/register", { ...form, role: "farmer" });
      login({ token: data.token, role: data.role, name: data.name });
      nav("/request");
    } catch (e) {
      setErr(e?.response?.data?.msg || "Register failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-green-200 to-green-300 px-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-green-300">

        {/* Logo */}
        <div className="w-16 h-16 mx-auto bg-green-600 rounded-full flex items-center justify-center shadow-md mb-4">
          <span className="text-white text-3xl font-bold">🌱</span>
        </div>

        <h2 className="text-3xl font-bold text-center text-green-700">
          Create Farmer Account
        </h2>
        <p className="text-center text-gray-600 mt-1 text-sm">
          Join the Agriculture Power Request System
        </p>

        <form onSubmit={handleRegister} className="mt-8 space-y-5">
          
          {/* Name */}
          <div>
            <label className="text-sm font-medium text-gray-700">Full Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 rounded-lg border border-gray-300 
              focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 
              transition"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-700">Email Address</label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              type="email"
              className="mt-1 block w-full px-4 py-2 rounded-lg border border-gray-300 
              focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 
              transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium text-gray-700">Password</label>
            <input
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              type="password"
              className="mt-1 block w-full px-4 py-2 rounded-lg border border-gray-300 
              focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 
              transition"
            />
          </div>

          {/* Error */}
          {err && (
            <div className="text-sm text-red-600 bg-red-100 px-3 py-2 rounded">
              {err}
            </div>
          )}

          {/* Buttons */}
          <div className="flex items-center justify-between mt-4">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg 
              shadow-md transition disabled:bg-green-400"
            >
              {loading ? "Creating..." : "Create account"}
            </button>

            <button
              type="button"
              onClick={() => nav("/login")}
              className="text-sm text-green-700 hover:underline"
            >
              Already have an account?
            </button>
          </div>
        </form>

        <p className="text-center text-xs text-gray-500 mt-6">
          Power Distribution Agriculture • Secure Account Creation
        </p>
      </div>
    </div>
  );
}
