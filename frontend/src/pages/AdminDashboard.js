// import React, { useEffect, useState } from "react";
// import API from "../api/api";
// import { useNavigate } from "react-router-dom";


// function AdminDashboard() {
//   const navigate = useNavigate();
//   const [jobs, setJobs] = useState([]);
//   const [applications, setApplications] = useState([]);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try{

//     const jobsRes = await API.get("/jobs");
//     const appsRes = await API.get("/apply");
    
//     console.log("JOBS:", jobsRes.data);
//     console.log("APPLICATIONS:", appsRes.data);

//     setJobs(jobsRes.data);
//     setApplications(appsRes.data);
//   }catch (err) {
//     console.log(err);
//   }
// };
// const deleteJob = async (id) => {

//   try {

//     await API.delete(`/jobs/${id}`);

//     fetchData();

//   } catch (err) {
//     console.log(err);
//   }
// };

// //   return (
// //     <div style={{ padding: "20px" }}>

// //          <h2>Admin Dashboard</h2>

// //       <h3>All Jobs</h3>

// //       {jobs.map((job) => (
// //         <div key={job._id}>{job.title}</div>
// //       ))}

// //       <h3>Applications</h3>

// //       {applications.map((app) => (

// //         <div key={app._id}>
// //           {app.user?.name} applied for {app.job?.title}
// //         </div>

// //       ))}

// //     </div>
// //   );
// // }

// return (
//   <div className="min-h-screen bg-secondary p-10">

//     <h1 className="text-4xl font-bold text-primary mb-10">
//       Admin Dashboard 🛠️
//     </h1>
//     <button
//   onClick={() => navigate("/add-job")}
//   className="bg-primary text-white px-5 py-3 rounded-xl mb-8 hover:scale-105 transition-all"
// >
//     + Add Job
//   </button>
//     {/* Jobs Section */}
//     <div className="bg-white p-6 rounded-2xl shadow-xl mb-10">

//       <h2 className="text-2xl font-bold text-primary mb-5">
//         All Jobs
//       </h2>

//      {jobs.length === 0 ? (
//   <p>No Jobs Found 😢</p>
// ) : (
//   jobs.map((job) => (
//     <div
//       key={job._id}
//       className="border p-5 rounded-xl mb-4"
//     >
//       <h3 className="text-xl font-bold text-primary">
//         {job.title}
//       </h3>

//       <p>{job.description}</p>

//       <p className="mt-2">
//         <b>Company:</b> {job.company}
//       </p>

//       <p>
//         <b>Location:</b> {job.location}
//       </p>

//       <p>
//         <b>Salary:</b> {job.salary}
//       </p>

// <button
//   onClick={() => deleteJob(job._id)}
//   className="mt-3 bg-red-500 text-white px-4 py-2 rounded-lg"
// >
//   Delete Job
// </button>
      
//     </div>
//   ))
// )}
//     </div>

//     {/* Applications */}
//     <div className="bg-white p-6 rounded-2xl shadow-xl">

//       <h2 className="text-2xl font-bold text-primary mb-5">
//         Applications
//       </h2>

//       {applications.length === 0 ? (
//         <p>No Applications Yet 😭</p>
//       ) : (
//         applications.map((app) => (
//           <div
//             key={app._id}
//             className="border p-5 rounded-xl mb-4"
//           >
//             <p>
//               <b>User:</b> {app.user?.name}
//             </p>

//             <p>
//               <b>Job:</b> {app.job?.title}
//             </p>
//             <p>
//   <b>Resume:</b>

//   <a
//     href={app.resumeUrl}
//     target="_blank"
//     rel="noreferrer"
//     className="text-blue-500 underline ml-2"
//   >
//     View Resume
//   </a>
// </p>
//           </div>
//         ))
//       )}
//     </div>
//   </div>
// );
// }

// export default AdminDashboard;



import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import Navbar from "../components/Navbar";

function AdminDashboard() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [activeTab, setActiveTab] = useState("jobs");
  const [loading, setLoading] = useState(true);
 const [username, setUsername] = useState(localStorage.getItem("username") || "");

useEffect(() => {
  API.get("/auth/me").then(res => {
    setUsername(res.data.username);
    localStorage.setItem("username", res.data.username);
  }).catch(() => {});
}, []);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [jobsRes, appsRes] = await Promise.all([API.get("/jobs"), API.get("/apply")]);
      setJobs(jobsRes.data);
      setApplications(appsRes.data);
    } catch (err) { console.log(err); }
    finally { setLoading(false); }
  };

  const deleteJob = async (id) => {
    if (!window.confirm("Delete this job? All its applications will remain.")) return;
    try { await API.delete(`/jobs/${id}`); fetchData(); } catch (err) { console.log(err); }
  };

  const toggleJob = async (id) => {
  try {
    await API.patch(`/jobs/${id}/toggle`);
    fetchData();
  } catch (err) {
    console.error("Toggle error:", err);
    alert(err.response?.data?.message || "Failed to update job status. Please try again.");
  }
};

  return (
    <div className="min-h-screen bg-secondary">
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-800">
              Admin Panel <span className="text-primary">🛠️</span>
            </h1>
            <p className="text-gray-500 mt-1">Welcome back, {username}</p>
          </div>
          <div className="flex gap-4">
            <div className="bg-white shadow rounded-2xl px-6 py-4 text-center">
              <p className="text-gray-400 text-sm">Total Jobs</p>
              <p className="text-3xl font-extrabold text-primary">{jobs.length}</p>
            </div>
            <div className="bg-white shadow rounded-2xl px-6 py-4 text-center">
              <p className="text-gray-400 text-sm">Applications</p>
              <p className="text-3xl font-extrabold text-blue-600">{applications.length}</p>
            </div>
            <button
              onClick={() => navigate("/add-job")}
              className="bg-primary text-white px-6 py-4 rounded-2xl font-bold hover:scale-105 transition-all shadow-lg flex items-center gap-2"
            >
              + Post Job
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab("jobs")}
            className={`px-6 py-3 rounded-xl font-bold transition-all ${activeTab === "jobs" ? "bg-primary text-white shadow" : "bg-white text-gray-600 hover:bg-gray-50"}`}
          >
            💼 Jobs ({jobs.length})
          </button>
          <button
            onClick={() => setActiveTab("applications")}
            className={`px-6 py-3 rounded-xl font-bold transition-all ${activeTab === "applications" ? "bg-primary text-white shadow" : "bg-white text-gray-600 hover:bg-gray-50"}`}
          >
            📋 Applications ({applications.length})
          </button>
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-400">Loading...</div>
        ) : activeTab === "jobs" ? (
          /* Jobs Tab */
          jobs.length === 0 ? (
            <div className="bg-white rounded-3xl p-16 shadow text-center">
              <div className="text-6xl mb-4">📭</div>
              <p className="text-xl text-gray-500 mb-6">No jobs posted yet</p>
              <button onClick={() => navigate("/add-job")} className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:scale-105 transition">
                Post First Job →
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {jobs.map(job => (
                <div key={job._id} className={`bg-white rounded-3xl p-7 shadow hover:shadow-xl transition ${!job.isOpen ? "opacity-70" : ""}`}>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">{job.title}</h3>
                      <p className="text-primary font-semibold">{job.company}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${job.isOpen ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                      {job.isOpen ? "🟢 Open" : "🔴 Closed"}
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">{job.description}</p>
                  <div className="flex flex-wrap gap-3 text-sm text-gray-500 mb-5">
                    <span>📍 {job.location}</span>
                    {job.salary && <span>💰 {job.salary}</span>}
                    {job.type && <span>🕐 {job.type}</span>}
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => toggleJob(job._id)}
                      className={`flex-1 py-2 rounded-xl font-semibold text-sm transition ${job.isOpen ? "bg-orange-50 text-orange-600 hover:bg-orange-100" : "bg-green-50 text-green-600 hover:bg-green-100"}`}
                    >
                      {job.isOpen ? "Close Applications" : "Re-open"}
                    </button>
                    <button
                      onClick={() => deleteJob(job._id)}
                      className="flex-1 bg-red-50 text-red-500 py-2 rounded-xl font-semibold text-sm hover:bg-red-100 transition"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          /* Applications Tab */
          applications.length === 0 ? (
            <div className="bg-white rounded-3xl p-16 shadow text-center">
              <div className="text-6xl mb-4">📭</div>
              <p className="text-xl text-gray-500">No applications yet</p>
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              {applications.map(app => (
                <div key={app._id} className="bg-white rounded-3xl p-7 shadow hover:shadow-lg transition">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">{app.user?.username || app.user?.email}</h3>
                      <p className="text-gray-500 text-sm">{app.user?.email}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      app.status === "reviewed" ? "bg-blue-100 text-blue-600" :
                      app.status === "rejected" ? "bg-red-100 text-red-600" :
                      "bg-yellow-100 text-yellow-700"
                    }`}>
                      {app.status}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                    <span>💼 Applied for: <strong>{app.job?.title}</strong></span>
                    {app.job?.company && <span>🏢 {app.job.company}</span>}
                    <span>📅 {new Date(app.appliedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                  </div>
                  <a href={app.resumeUrl} target="_blank" rel="noreferrer"
                    className="inline-flex items-center gap-2 bg-primary text-white px-5 py-2 rounded-xl text-sm font-semibold hover:opacity-90 transition"
                  >
                    📄 View Resume
                  </a>
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
