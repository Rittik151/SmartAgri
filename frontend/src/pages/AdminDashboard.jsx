// import React, { useEffect, useState } from 'react';
// import { api } from '../api';

// export default function AdminDashboard() {
//   const [requests, setRequests] = useState([]);
//   const [err, setErr] = useState('');

//   const load = async () => {
//     try {
//       const { data } = await api.get('/requests');
//       setRequests(data);
//     } catch (e) {
//       setErr(e.response?.data?.msg || 'Failed to load requests');
//     }
//   };

//   useEffect(() => { load(); }, []);

//   const handleApprove = async (id) => {
//     try {
//       await api.put(`/requests/${id}/approve`);
//       load();
//     } catch (e) { setErr('Action failed'); }
//   };

//   const handleReject = async (id) => {
//     try {
//       await api.put(`/requests/${id}/reject`);
//       load();
//     } catch (e) { setErr('Action failed'); }
//   };

//   const handleDelete = async (id) => {
//     if (!confirm('Delete this request?')) return;
//     try {
//       await api.delete(`/requests/${id}`);
//       load();
//     } catch (e) { setErr('Delete failed'); }
//   };

//   return (
//     <div className="container-max mt-8">
//       <div className="card">
//         <div className="flex items-start justify-between">
//           <div>
//             <h2 className="text-xl font-semibold">Admin Dashboard</h2>
//             <p className="text-sm text-gray-500 mt-1">Manage farmer requests</p>
//           </div>
//         </div>

//         {err && <div className="mt-3 text-sm text-red-600">{err}</div>}

//         <div className="mt-4 overflow-x-auto">
//           <table className="w-full table-auto">
//             <thead className="text-left text-sm text-gray-600">
//               <tr>
//                 <th className="pb-2">Date</th>
//                 <th className="pb-2">Farmer</th>
//                 <th className="pb-2">Area</th>
//                 <th className="pb-2">Power</th>
//                 <th className="pb-2">Purpose</th>
//                 <th className="pb-2">Status</th>
//                 <th className="pb-2">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {requests.map(r => (
//                 <tr key={r._id} className="border-t">
//                   <td className="py-2 text-sm">{new Date(r.requestDate).toLocaleString()}</td>
//                   <td className="py-2 text-sm">{r.farmerName}</td>
//                   <td className="py-2 text-sm">{r.area}</td>
//                   <td className="py-2 text-sm">{r.powerRequired}</td>
//                   <td className="py-2 text-sm">{r.purpose || '-'}</td>
//                   <td className="py-2 text-sm">
//                     <span className={
//                       r.status === 'Pending' ? 'px-2 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs' :
//                       r.status === 'Approved' ? 'px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs' :
//                       'px-2 py-1 rounded-full bg-red-100 text-red-700 text-xs'
//                     }>{r.status}</span>
//                   </td>
//                   <td className="py-2 text-sm">
//                     <div className="flex gap-2">
//                       <button onClick={() => handleApprove(r._id)} className="px-3 py-1 rounded-md bg-green-600 text-white text-sm">Approve</button>
//                       <button onClick={() => handleReject(r._id)} className="px-3 py-1 rounded-md bg-red-600 text-white text-sm">Reject</button>
//                       <button onClick={() => handleDelete(r._id)} className="px-3 py-1 rounded-md border text-sm">Delete</button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           {requests.length === 0 && <div className="mt-4 text-sm text-gray-500">No requests found.</div>}
//         </div>
//       </div>
//     </div>
//   );
// }


// import React, { useEffect, useState } from "react";
// import { api } from "../api";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
//   Legend
// } from "recharts";

// export default function AdminDashboard() {
//   const [requests, setRequests] = useState([]);
//   const [lineData, setLineData] = useState([]);
//   const [pieData, setPieData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [err, setErr] = useState("");

//   useEffect(() => {
//     const load = async () => {
//       setLoading(true);
//       setErr("");
//       try {
//         const res = await api.get("/requests"); // admin endpoint
//         const data = res.data || [];
//         setRequests(data);

//         // Build line chart data: number of requests per date (last ~30 days visible if exist)
//         const counts = {};
//         data.forEach((r) => {
//           const date = new Date(r.createdAt || r.requestDate).toLocaleDateString();
//           counts[date] = (counts[date] || 0) + 1;
//         });
//         // Sort dates ascending
//         const line = Object.entries(counts)
//           .map(([date, count]) => ({ date, count }))
//           .sort((a, b) => new Date(a.date) - new Date(b.date));
//         setLineData(line);

//         // Build pie data by status
//         const statusCounts = { Pending: 0, Approved: 0, Rejected: 0 };
//         data.forEach((r) => {
//           const s = r.status || "Pending";
//           // Normalize capitalization just in case
//           const key =
//             s.toLowerCase() === "approved"
//               ? "Approved"
//               : s.toLowerCase() === "rejected"
//               ? "Rejected"
//               : "Pending";
//           statusCounts[key] += 1;
//         });
//         const pie = [
//           { name: "Pending", value: statusCounts.Pending },
//           { name: "Approved", value: statusCounts.Approved },
//           { name: "Rejected", value: statusCounts.Rejected }
//         ];
//         setPieData(pie);
//       } catch (e) {
//         console.error(e);
//         setErr(e?.response?.data?.msg || "Failed to load dashboard data");
//       } finally {
//         setLoading(false);
//       }
//     };
//     load();
//   }, []);

//   const COLORS = ["#f59e0b", "#16a34a", "#ef4444"]; // yellow, green, red

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       <div className="mb-6">
//         <h1 className="text-2xl font-semibold text-gray-800">Admin Dashboard</h1>
//         <p className="text-sm text-gray-500 mt-1">Overview of requests & status distribution</p>
//       </div>

//       {err && (
//         <div className="mb-4 p-3 rounded-md bg-red-50 text-red-700">
//           {err}
//         </div>
//       )}

//       {loading ? (
//         <div className="flex items-center justify-center py-24">
//           <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" />
//         </div>
//       ) : (
//         <>
//           {/* Cards */}
//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
//             <div className="bg-white shadow rounded-lg p-4">
//               <div className="text-sm text-gray-500">Total Requests</div>
//               <div className="mt-2 text-2xl font-semibold text-gray-800">{requests.length}</div>
//             </div>

//             <div className="bg-white shadow rounded-lg p-4">
//               <div className="text-sm text-gray-500">Approved</div>
//               <div className="mt-2 text-2xl font-semibold text-green-600">
//                 {pieData.find(p => p.name === "Approved")?.value ?? 0}
//               </div>
//             </div>

//             <div className="bg-white shadow rounded-lg p-4">
//               <div className="text-sm text-gray-500">Pending</div>
//               <div className="mt-2 text-2xl font-semibold text-yellow-600">
//                 {pieData.find(p => p.name === "Pending")?.value ?? 0}
//               </div>
//             </div>
//           </div>

//           {/* Charts */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
//             <div className="bg-white shadow rounded-lg p-4">
//               <div className="flex items-center justify-between mb-2">
//                 <h2 className="text-lg font-medium text-gray-800">Requests Over Time</h2>
//               </div>
//               <div style={{ width: "100%", height: 300 }}>
//                 <ResponsiveContainer>
//                   <LineChart data={lineData}>
//                     <XAxis dataKey="date" tick={{ fontSize: 12 }} />
//                     <YAxis allowDecimals={false} />
//                     <Tooltip />
//                     <Line type="monotone" dataKey="count" stroke="#2563eb" strokeWidth={3} dot={{ r: 3 }} />
//                   </LineChart>
//                 </ResponsiveContainer>
//               </div>
//             </div>

//             <div className="bg-white shadow rounded-lg p-4">
//               <div className="flex items-center justify-between mb-2">
//                 <h2 className="text-lg font-medium text-gray-800">Status Distribution</h2>
//               </div>
//               <div style={{ width: "100%", height: 300 }}>
//                 <ResponsiveContainer>
//                   <PieChart>
//                     <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label>
//                       {pieData.map((entry, index) => (
//                         <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                       ))}
//                     </Pie>
//                     <Tooltip />
//                     <Legend verticalAlign="bottom" />
//                   </PieChart>
//                 </ResponsiveContainer>
//               </div>
//             </div>
//           </div>

//           {/* Table */}
//           <div className="bg-white shadow rounded-lg p-4">
//             <div className="flex items-center justify-between mb-4">
//               <h3 className="text-lg font-medium text-gray-800">Recent Requests</h3>
//               <div className="text-sm text-gray-500">Showing latest {Math.min(requests.length, 10)}</div>
//             </div>

//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Farmer</th>
//                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Area</th>
//                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Power (kW)</th>
//                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {requests.slice(0, 50).map((r) => (
//                     <tr key={r._id}>
//                       <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{r.farmerName}</td>
//                       <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{r.area}</td>
//                       <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{r.powerRequired}</td>
//                       <td className="px-4 py-3 whitespace-nowrap text-sm">
//                         <span className={
//                           r.status === "Approved" ? "inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800"
//                           : r.status === "Rejected" ? "inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800"
//                           : "inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800"
//                         }>
//                           {r.status}
//                         </span>
//                       </td>
//                       <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{new Date(r.createdAt || r.requestDate).toLocaleString()}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//               {requests.length === 0 && <div className="py-6 text-center text-gray-500">No requests found.</div>}
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }








import React, { useEffect, useState } from "react";
import { api } from "../api";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

export default function AdminDashboard() {
  const [requests, setRequests] = useState([]);
  const [lineData, setLineData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  // ---------------------- OLD WORKING FUNCTIONS ADDED BACK ----------------------
  const load = async () => {
    try {
      const res = await api.get("/requests");
      const data = res.data || [];
      setRequests(data);

      // Build line chart data: number of requests per date
      const counts = {};
      data.forEach((r) => {
        const date = new Date(r.createdAt || r.requestDate).toLocaleDateString();
        counts[date] = (counts[date] || 0) + 1;
      });

      const line = Object.entries(counts)
        .map(([date, count]) => ({ date, count }))
        .sort((a, b) => new Date(a.date) - new Date(b.date));
      setLineData(line);

      // Pie Data
      const statusCounts = { Pending: 0, Approved: 0, Rejected: 0 };
      data.forEach((r) => {
        const s = r.status || "Pending";
        const key =
          s.toLowerCase() === "approved"
            ? "Approved"
            : s.toLowerCase() === "rejected"
            ? "Rejected"
            : "Pending";
        statusCounts[key] += 1;
      });

      setPieData([
        { name: "Pending", value: statusCounts.Pending },
        { name: "Approved", value: statusCounts.Approved },
        { name: "Rejected", value: statusCounts.Rejected }
      ]);
    } catch (e) {
      setErr(e?.response?.data?.msg || "Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  // ---------------------- ACTION BUTTON FUNCTIONS ----------------------
  const handleApprove = async (id) => {
    try {
      await api.put(`/requests/${id}/approve`);
      load();
    } catch (e) {
      setErr("Action failed");
    }
  };

  const handleReject = async (id) => {
    try {
      await api.put(`/requests/${id}/reject`);
      load();
    } catch (e) {
      setErr("Action failed");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this request?")) return;
    try {
      await api.delete(`/requests/${id}`);
      load();
    } catch (e) {
      setErr("Delete failed");
    }
  };

  // ---------------------- COLORS ----------------------
  const COLORS = ["#f59e0b", "#16a34a", "#ef4444"];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Admin Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Overview of requests & status distribution</p>
      </div>

      {err && (
        <div className="mb-4 p-3 rounded-md bg-red-50 text-red-700">
          {err}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-24">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" />
        </div>
      ) : (
        <>
          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-white shadow rounded-lg p-4">
              <div className="text-sm text-gray-500">Total Requests</div>
              <div className="mt-2 text-2xl font-semibold text-gray-800">{requests.length}</div>
            </div>

            <div className="bg-white shadow rounded-lg p-4">
              <div className="text-sm text-gray-500">Approved</div>
              <div className="mt-2 text-2xl font-semibold text-green-600">
                {pieData.find((p) => p.name === "Approved")?.value ?? 0}
              </div>
            </div>

            <div className="bg-white shadow rounded-lg p-4">
              <div className="text-sm text-gray-500">Pending</div>
              <div className="mt-2 text-2xl font-semibold text-yellow-600">
                {pieData.find((p) => p.name === "Pending")?.value ?? 0}
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white shadow rounded-lg p-4">
              <h2 className="text-lg font-medium text-gray-800 mb-2">Requests Over Time</h2>
              <div style={{ width: "100%", height: 300 }}>
                <ResponsiveContainer>
                  <LineChart data={lineData}>
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Line type="monotone" dataKey="count" stroke="#2563eb" strokeWidth={3} dot={{ r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white shadow rounded-lg p-4">
              <h2 className="text-lg font-medium text-gray-800 mb-2">Status Distribution</h2>
              <div style={{ width: "100%", height: 300 }}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label>
                      {pieData.map((_, idx) => (
                        <Cell key={idx} fill={COLORS[idx]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="bottom" />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* ---------------------- TABLE WITH BUTTONS ADDED ---------------------- */}
          <div className="bg-white shadow rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-800">Recent Requests</h3>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium">Farmer</th>
                    <th className="px-4 py-3 text-left text-xs font-medium">Area</th>
                    <th className="px-4 py-3 text-left text-xs font-medium">Power</th>
                    <th className="px-4 py-3 text-left text-xs font-medium">Purpose</th>
                    <th className="px-4 py-3 text-left text-xs font-medium">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium">Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium">Actions</th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                  {requests.map((r) => (
                    <tr key={r._id}>
                      <td className="px-4 py-3 text-sm">{r.farmerName}</td>
                      <td className="px-4 py-3 text-sm">{r.area}</td>
                      <td className="px-4 py-3 text-sm">{r.powerRequired}</td>
                      <td className="px-4 py-3 text-sm">{r.purpose || "-"}</td>

                      <td className="px-4 py-3 text-sm">
                        <span
                          className={
                            r.status === "Approved"
                              ? "px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs"
                              : r.status === "Rejected"
                              ? "px-2 py-1 rounded-full bg-red-100 text-red-700 text-xs"
                              : "px-2 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs"
                          }
                        >
                          {r.status}
                        </span>
                      </td>

                      <td className="px-4 py-3 text-sm">
                        {new Date(r.createdAt || r.requestDate).toLocaleString()}
                      </td>

                      {/* ------- BUTTONS INSERTED ------- */}
                      <td className="px-4 py-3 text-sm">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleApprove(r._id)}
                            className="px-3 py-1 rounded-md bg-green-600 text-white text-sm"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleReject(r._id)}
                            className="px-3 py-1 rounded-md bg-red-600 text-white text-sm"
                          >
                            Reject
                          </button>
                          <button
                            onClick={() => handleDelete(r._id)}
                            className="px-3 py-1 rounded-md border text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {requests.length === 0 && (
                <div className="py-6 text-center text-gray-500">No requests found.</div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
