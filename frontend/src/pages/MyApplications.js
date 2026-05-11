// import React, { useEffect, useState } from "react";
// import API from "../api/api";

// function MyApplications() {

//   const [apps, setApps] = useState([]);

//   useEffect(() => {
//     fetchApps();
//   }, []);

//   const fetchApps = async () => {

//     try {

//       const res = await API.get("/apply/my");
//       setApps(res.data);

//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <div style={{ padding: "20px" }}>

//       <h2>My Applications</h2>

//       {apps.length === 0 ? (
//   <p>No Applications Yet 😢</p>
// ) : (
//   apps.map((app) => (

//         <div
//           key={app._id}
//           style={{
//             border: "1px solid black",
//             margin: "10px",
//             padding: "10px",
//           }}
//         >

//           <h3>{app.job?.title}</h3>

//           <p>{app.job?.company}</p>

//           <a
//             href={app.resumeUrl}
//             target="_blank"
//             rel="noreferrer"
//             >
//                 View Resume
//             </a>

//         </div>
//       ))
//     )}

//     </div>
//   );
// }

// export default MyApplications;






import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import Navbar from "../components/Navbar";

function MyApplications() {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/apply/my")
      .then(res => setApps(res.data))
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-secondary">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-800">My Applications</h1>
            <p className="text-gray-500 mt-1">Track all your job applications</p>
          </div>
          <div className="bg-white shadow rounded-2xl px-6 py-4 text-center">
            <p className="text-gray-400 text-sm">Total Applied</p>
            <p className="text-3xl font-extrabold text-primary">{apps.length}</p>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-400">Loading...</div>
        ) : apps.length === 0 ? (
          <div className="bg-white rounded-3xl shadow p-16 text-center">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">No applications yet</h3>
            <p className="text-gray-500 mb-6">Start applying to jobs and track them here</p>
            <button onClick={() => navigate("/dashboard")} className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:scale-105 transition">
              Browse Jobs →
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            {apps.map(app => (
              <div key={app._id} className="bg-white rounded-3xl shadow p-7 hover:shadow-lg transition">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{app.job?.title || "Job Deleted"}</h3>
                    <p className="text-primary font-semibold">{app.job?.company}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      app.status === "reviewed" ? "bg-blue-100 text-blue-600" :
                      app.status === "rejected" ? "bg-red-100 text-red-600" :
                      "bg-yellow-100 text-yellow-700"
                    }`}>
                      {app.status === "pending" ? "⏳ Pending" : app.status === "reviewed" ? "👀 Reviewed" : "❌ Rejected"}
                    </span>
                    {app.job?.isOpen === false && (
                      <span className="bg-red-50 text-red-500 text-xs px-2 py-1 rounded-full">Closed</span>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                  {app.job?.location && <span>📍 {app.job.location}</span>}
                  {app.job?.salary && <span>💰 {app.job.salary}</span>}
                  <span>📅 {new Date(app.appliedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                </div>

                <a href={app.resumeUrl} target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-gray-50 border border-gray-200 text-gray-700 px-4 py-2 rounded-xl text-sm font-medium hover:bg-primary hover:text-white hover:border-primary transition"
                >
                  📄 View Resume
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyApplications;
