// import React, { useContext, useState } from 'react';
// import { api } from '../api';
// import { AuthContext } from '../context/AuthContext';

// export default function RequestForm() {
//   const { auth } = useContext(AuthContext);
//   const [form, setForm] = useState({ area: '', powerRequired: '', purpose: '' });
//   const [msg, setMsg] = useState('');

//   const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMsg('');
//     try {
//       await api.post('/requests', {
//         area: form.area,
//         powerRequired: Number(form.powerRequired),
//         purpose: form.purpose
//       });
//       setMsg('Request submitted successfully.');
//       setForm({ area: '', powerRequired: '', purpose: '' });
//     } catch (err) {
//       setMsg(err.response?.data?.msg || 'Submission failed');
//     }
//   };

//   return (
//     <div className="container-max mt-8">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div className="card">
//           <h3 className="text-xl font-semibold">Submit Power Request</h3>
//           <p className="text-sm text-gray-500 mt-1">Farmer: <span className="font-medium">{auth.name}</span></p>

//           <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
//             <div>
//               <label className="text-sm text-gray-600">Area</label>
//               <input name="area" value={form.area} onChange={handleChange} className="mt-1 w-full border rounded-md px-3 py-2" required />
//             </div>

//             <div>
//               <label className="text-sm text-gray-600">Power Required (kW)</label>
//               <input name="powerRequired" value={form.powerRequired} onChange={handleChange} className="mt-1 w-full border rounded-md px-3 py-2" required />
//             </div>

//             <div>
//               <label className="text-sm text-gray-600">Purpose (optional)</label>
//               <input name="purpose" value={form.purpose} onChange={handleChange} className="mt-1 w-full border rounded-md px-3 py-2" />
//             </div>

//             <div>
//               <button className="px-4 py-2 bg-blue-600 text-white rounded-md">Submit Request</button>
//             </div>
//           </form>

//           {msg && <div className="mt-3 text-sm text-green-600">{msg}</div>}
//         </div>

//         <div className="card">
//           <h3 className="text-xl font-semibold">Tips</h3>
//           <ul className="mt-3 text-sm text-gray-600 space-y-2">
//             <li>Provide accurate area information for faster processing.</li>
//             <li>Mention purpose (e.g., irrigation, cold storage) to help priority handling.</li>
//             <li>You can check request status in "My Requests".</li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }



// import React, { useContext, useState } from "react";
// import { api } from "../api";
// import { AuthContext } from "../context/AuthContext";

// export default function RequestForm() {
//   const { auth } = useContext(AuthContext);
//   const [form, setForm] = useState({ area: "", powerRequired: "", purpose: "" });
//   const [loading, setLoading] = useState(false);
//   const [msg, setMsg] = useState("");
//   const [err, setErr] = useState("");

//   const handleChange = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMsg("");
//     setErr("");
//     setLoading(true);
//     try {
//       await api.post("/requests", {
//         area: form.area,
//         powerRequired: Number(form.powerRequired),
//         purpose: form.purpose
//       });
//       setMsg("Request submitted successfully.");
//       setForm({ area: "", powerRequired: "", purpose: "" });
//     } catch (e) {
//       setErr(e?.response?.data?.msg || "Failed to submit request");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
//       <div className="bg-white shadow rounded-lg p-6">
//         <div className="flex items-center justify-between">
//           <div>
//             <h1 className="text-xl font-semibold text-gray-800">Request Power Supply</h1>
//             <p className="text-sm text-gray-500 mt-1">Farmer: <span className="font-medium">{auth.name}</span></p>
//           </div>
//         </div>

//         <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Area</label>
//             <input
//               name="area"
//               value={form.area}
//               onChange={handleChange}
//               required
//               className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400"
//               placeholder="Village / Locality"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">Power Required (kW)</label>
//             <input
//               name="powerRequired"
//               value={form.powerRequired}
//               onChange={handleChange}
//               required
//               type="number"
//               min="1"
//               className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400"
//               placeholder="e.g. 15"
//             />
//           </div>

//           <div className="md:col-span-2">
//             <label className="block text-sm font-medium text-gray-700">Purpose</label>
//             <textarea
//               name="purpose"
//               value={form.purpose}
//               onChange={handleChange}
//               rows="4"
//               className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400"
//               placeholder="e.g. irrigation, cold storage (optional)"
//             />
//           </div>

//           <div className="md:col-span-2 flex items-center gap-3">
//             <button
//               type="submit"
//               disabled={loading}
//               className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 disabled:opacity-60"
//             >
//               {loading ? "Submitting..." : "Submit Request"}
//             </button>

//             {msg && <div className="text-sm text-green-600">{msg}</div>}
//             {err && <div className="text-sm text-red-600">{err}</div>}
//           </div>
//         </form>
//       </div>

//       <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div className="bg-white shadow rounded-lg p-4">
//           <h3 className="font-semibold text-gray-800">Tips for faster approval</h3>
//           <ul className="mt-2 text-sm text-gray-600 space-y-2">
//             <li>Give precise location details and purpose.</li>
//             <li>Request realistic power values based on need.</li>
//             <li>Use the Status page to check approval updates.</li>
//           </ul>
//         </div>

//         <div className="bg-white shadow rounded-lg p-4">
//           <h3 className="font-semibold text-gray-800">Contact</h3>
//           <p className="mt-2 text-sm text-gray-600">If you face issues, contact the power authority or your local admin.</p>
//         </div>
//       </div>
//     </div>
//   );
// }








import React, { useContext, useState } from "react";
import { api } from "../api";
import { AuthContext } from "../context/AuthContext";

export default function RequestForm() {
  const { auth } = useContext(AuthContext);
  const [form, setForm] = useState({ area: "", powerRequired: "", purpose: "" });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setErr("");
    setLoading(true);

    try {
      await api.post("/requests", {
        area: form.area,
        powerRequired: Number(form.powerRequired),
        purpose: form.purpose,
      });
      setMsg("Request submitted successfully.");
      setForm({ area: "", powerRequired: "", purpose: "" });
    } catch (e) {
      setErr(e?.response?.data?.msg || "Failed to submit request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      <div className="bg-white border border-green-200 shadow-lg rounded-2xl p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-green-700">
              Power Supply Request Form
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Farmer: <span className="font-semibold">{auth.name}</span>
            </p>
          </div>

          <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center shadow">
            <span className="text-white text-2xl">⚡</span>
          </div>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Area */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Area / Locality
            </label>
            <input
              name="area"
              value={form.area}
              onChange={handleChange}
              required
              placeholder="Village / Panchayat / Locality"
              className="mt-1 block w-full px-4 py-2 rounded-lg border border-gray-300
              focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
            />
          </div>

          {/* Power Required */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Power Required (kW)
            </label>
            <input
              name="powerRequired"
              value={form.powerRequired}
              onChange={handleChange}
              required
              type="number"
              min="1"
              placeholder="e.g. 20"
              className="mt-1 block w-full px-4 py-2 rounded-lg border border-gray-300
              focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
            />
          </div>

          {/* Purpose */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Purpose of Power Usage
            </label>
            <textarea
              name="purpose"
              value={form.purpose}
              rows={4}
              onChange={handleChange}
              placeholder="e.g. irrigation, greenhouse, cold storage"
              className="mt-1 block w-full px-4 py-2 rounded-lg border border-gray-300
              focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
            />
          </div>

          {/* Submit */}
          <div className="md:col-span-2 flex items-center gap-3">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg
              shadow-md transition disabled:bg-green-400"
            >
              {loading ? "Submitting..." : "Submit Request"}
            </button>

            {msg && <div className="text-green-700 text-sm font-medium">{msg}</div>}
            {err && <div className="text-red-600 text-sm font-medium">{err}</div>}
          </div>
        </form>
      </div>

      {/* ADDITIONAL INFO CARDS */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tips */}
        <div className="bg-white rounded-2xl border border-green-200 shadow p-5">
          <h3 className="font-semibold text-green-700 text-lg">Tips for Faster Approval</h3>
          <ul className="mt-3 text-sm text-gray-700 space-y-2">
            <li>• Provide exact location and purpose details.</li>
            <li>• Request realistic power based on your agricultural needs.</li>
            <li>• Keep track of approval status regularly.</li>
          </ul>
        </div>

        {/* Contact */}
        <div className="bg-white rounded-2xl border border-green-200 shadow p-5">
          <h3 className="font-semibold text-green-700 text-lg">Need Help?</h3>
          <p className="mt-3 text-sm text-gray-700">
            If you face any issues while submitting power requests, 
            please contact your local electricity distribution officer.
          </p>
        </div>
      </div>
    </div>
  );
}
