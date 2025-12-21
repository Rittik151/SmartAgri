// import React, { useContext, useState } from 'react';
// import { api } from '../api';
// import { AuthContext } from '../context/AuthContext';
// import { useNavigate } from 'react-router-dom';

// export default function Login() {
//   const { login } = useContext(AuthContext);
//   const nav = useNavigate();
//   const [form, setForm] = useState({ email: '', password: '' });
//   const [err, setErr] = useState('');

//   const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErr('');
//     try {
//       const { data } = await api.post('/auth/login', form);
//       login({ token: data.token, role: data.role, name: data.name });
//       if (data.role === 'admin') nav('/admin/dashboard'); else nav('/request');
//     } catch (error) {
//       setErr(error.response?.data?.msg || 'Login failed');
//     }
//   };

//   return (
//     <div className="container-max mt-10">
//       <div className="card max-w-md mx-auto">
//         <h2 className="text-2xl font-semibold">Login</h2>
//         <p className="text-sm text-gray-500 mt-1">Enter your credentials</p>

//         <form onSubmit={handleSubmit} className="mt-4 space-y-3">
//           <div>
//             <label className="text-sm text-gray-600">Email</label>
//             <input name="email" value={form.email} onChange={handleChange} className="mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500" required />
//           </div>

//           <div>
//             <label className="text-sm text-gray-600">Password</label>
//             <input name="password" type="password" value={form.password} onChange={handleChange} className="mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500" required />
//           </div>

//           {err && <div className="text-sm text-red-600">{err}</div>}

//           <div className="flex items-center gap-3">
//             <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">Login</button>
//             <button type="button" onClick={() => nav('/register')} className="px-4 py-2 border rounded-md text-gray-700">Register</button>
//           </div>
//         </form>

//         <div className="text-xs text-gray-500 mt-4">
//           Pro tip: create a farmer account or create admin directly in MongoDB to test admin features.
//         </div>
//       </div>
//     </div>
//   );
// }


// import React, { useContext, useState } from "react";
// import { api } from "../api";
// import { AuthContext } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";

// export default function Login() {
//   const { login } = useContext(AuthContext);
//   const nav = useNavigate();
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [err, setErr] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErr("");
//     setLoading(true);
//     try {
//       const { data } = await api.post("/auth/login", form);
//       login({ token: data.token, role: data.role, name: data.name });
//       if (data.role === "admin") nav("/admin/dashboard"); else nav("/request");
//     } catch (e) {
//       setErr(e?.response?.data?.msg || "Login failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-[70vh] flex items-center justify-center px-4">
//       <div className="w-full max-w-md bg-white rounded-lg shadow p-6">
//         <h2 className="text-2xl font-semibold text-gray-800">Sign in</h2>
//         <p className="text-sm text-gray-500 mt-1">Use your account to log in</p>

//         <form onSubmit={handleSubmit} className="mt-6 space-y-4">
//           <div>
//             <label className="text-sm text-gray-700">Email</label>
//             <input
//               name="email"
//               value={form.email}
//               onChange={handleChange}
//               className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400"
//               required
//               type="email"
//             />
//           </div>

//           <div>
//             <label className="text-sm text-gray-700">Password</label>
//             <input
//               name="password"
//               value={form.password}
//               onChange={handleChange}
//               className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400"
//               required
//               type="password"
//             />
//           </div>

//           {err && <div className="text-sm text-red-600">{err}</div>}

//           <div className="flex items-center justify-between">
//             <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded-md">
//               {loading ? "Signing in..." : "Sign in"}
//             </button>

//             <button type="button" onClick={() => nav("/register")} className="text-sm text-gray-600 hover:underline">
//               Register
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

export default function Login() {
  const { login } = useContext(AuthContext);
  const nav = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      const { data } = await api.post("/auth/login", form);
      login({ token: data.token, role: data.role, name: data.name });
      if (data.role === "admin") nav("/admin/dashboard");
      else nav("/request");
    } catch (e) {
      setErr(e?.response?.data?.msg || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-green-200 to-green-300 px-4">
      {/* Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-green-300">
        
        {/* Logo Circle */}
        <div className="w-16 h-16 mx-auto bg-green-600 rounded-full flex items-center justify-center shadow-md mb-4">
          <span className="text-white text-3xl font-bold">⚡</span>
        </div>

        <h2 className="text-3xl font-bold text-center text-green-700">
          Power Distribution Agriculture
        </h2>
        <p className="text-center text-gray-600 mt-1 text-sm">
          Login to access your dashboard
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          
          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 rounded-lg border border-gray-300 
              focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 
              transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
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
              {loading ? "Signing in..." : "Login"}
            </button>

            <button
              type="button"
              onClick={() => nav("/register")}
              className="text-sm text-green-700 hover:underline"
            >
              Register
            </button>
          </div>
        </form>

        {/* footer */}
        <p className="text-center text-xs text-gray-500 mt-6">
          Secure access • Agriculture Power Request System
        </p>
      </div>
    </div>
  );
}
