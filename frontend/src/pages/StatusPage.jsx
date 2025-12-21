// import React, { useEffect, useState } from 'react';
// import { api } from '../api';

// export default function StatusPage() {
//   const [requests, setRequests] = useState([]);
//   const [err, setErr] = useState('');

//   useEffect(() => {
//     (async () => {
//       try {
//         const { data } = await api.get('/requests/me');
//         setRequests(data);
//       } catch (e) {
//         setErr(e.response?.data?.msg || 'Could not fetch requests');
//       }
//     })();
//   }, []);

//   return (
//     <div className="container-max mt-8">
//       <div className="card">
//         <h2 className="text-xl font-semibold">My Requests</h2>

//         {err && <div className="mt-3 text-sm text-red-600">{err}</div>}

//         <div className="mt-4 overflow-x-auto">
//           <table className="w-full table-auto">
//             <thead className="text-left text-sm text-gray-600">
//               <tr>
//                 <th className="pb-2">Date</th>
//                 <th className="pb-2">Area</th>
//                 <th className="pb-2">Power (kW)</th>
//                 <th className="pb-2">Purpose</th>
//                 <th className="pb-2">Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {requests.map(r => (
//                 <tr key={r._id} className="border-t">
//                   <td className="py-3 text-sm">{new Date(r.requestDate).toLocaleString()}</td>
//                   <td className="py-3 text-sm">{r.area}</td>
//                   <td className="py-3 text-sm">{r.powerRequired}</td>
//                   <td className="py-3 text-sm">{r.purpose || '-'}</td>
//                   <td className="py-3 text-sm">
//                     <span className={
//                       r.status === 'Pending' ? 'px-2 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs' :
//                       r.status === 'Approved' ? 'px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs' :
//                       'px-2 py-1 rounded-full bg-red-100 text-red-700 text-xs'
//                     }>{r.status}</span>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           {requests.length === 0 && <div className="mt-4 text-sm text-gray-500">No requests yet.</div>}
//         </div>
//       </div>
//     </div>
//   );
// }




import React, { useEffect, useState } from "react";
import { api } from "../api";

export default function StatusPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await api.get("/requests/me");
        setRequests(res.data || []);
      } catch (e) {
        console.error(e);
        setErr(e?.response?.data?.msg || "Failed to load your requests");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">My Requests</h1>
        <p className="text-sm text-gray-500 mt-1">Track progress of your power requests</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" />
        </div>
      ) : err ? (
        <div className="p-4 bg-red-50 text-red-700 rounded">{err}</div>
      ) : requests.length === 0 ? (
        <div className="p-6 bg-white rounded shadow text-gray-600">You have no requests yet. Submit one from the Request Power page.</div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {requests.map((r) => (
            <div key={r._id} className="bg-white shadow rounded-lg p-5 border border-gray-100">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{r.area}</h3>
                  <p className="text-sm text-gray-500 mt-1">{new Date(r.createdAt || r.requestDate).toLocaleString()}</p>
                </div>
                <div>
                  <span className={
                    r.status === "Approved" ? "inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800"
                    : r.status === "Rejected" ? "inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800"
                    : "inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800"
                  }>
                    {r.status}
                  </span>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-sm text-gray-700"><span className="font-medium">Power:</span> {r.powerRequired} kW</p>
                <p className="text-sm text-gray-600 mt-2">{r.purpose || "No purpose provided"}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
