// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../api/api";

// function Dashboard() {
//   const navigate = useNavigate();
//   const [jobs, setJobs] = useState([]);

//   useEffect(() => {
//     fetchJobs();
//   }, []);

//   const fetchJobs = async () => {
//     try {
//       const res = await API.get("/jobs");
//       setJobs(res.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-secondary p-10">
//       {/* Header */}
//       <div className="flex items-center justify-between mb-10">
//         <div>
//           <h1 className="text-5xl font-extrabold text-primary mb-2">
//             User Dashboard 🚀
//           </h1>

//           <p className="text-gray-600 text-lg">
//             Find your dream job and apply instantly.
//           </p>
//         </div>

//         <div className="bg-white shadow-lg px-6 py-4 rounded-2xl">
//           <p className="text-gray-500">Available Jobs</p>
//           <h2 className="text-3xl font-bold text-primary">
//             {jobs.length}
//           </h2>
//         </div>
//       </div>

//       {/* Job Section */}
//       <div className="bg-white p-8 rounded-3xl shadow-xl">
//         <h2 className="text-3xl font-bold text-primary mb-8">
//           Latest Opportunities 💼
//         </h2>
//         {jobs.length === 0 ? (
//           <div className="text-center py-10">
//             <p className="text-xl text-gray-500">
//               No jobs available right now 😢
//             </p>
//           </div>
//         ) : (
//           <div className="grid md:grid-cols-2 gap-6">
//             {jobs.map((job) => (
//               <div
//                 key={job._id}
//                 className="border border-gray-200 rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
//               >
//                 <div className="flex items-start justify-between mb-4">
//                   <h3 className="text-2xl font-bold text-primary">
//                     {job.title}
//                   </h3>

//                   <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
//                     Hiring
//                   </span>
//                 </div>
//   <p className="text-gray-700 mb-5 leading-relaxed">
//                   {job.description}
//                 </p>

//                 <div className="space-y-2 mb-6 text-gray-700">
//                   <p>
//                     <b>Company:</b> {job.company}
//                   </p>

//                   <p>
//                     <b>Location:</b> {job.location}
//                   </p>

//                   <p>
//                     <b>Salary:</b> {job.salary}
//                   </p>
//                 </div>

//                 <button
//   onClick={() => navigate(`/apply/${job._id}`)}
//   className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:scale-105 transition-all duration-300 shadow-md"
// >
//   Apply Now 🚀
// </button>
//               </div>
//             ))}
//           </div>
//             )}
//       </div>
//     </div>
//   );
// }

// export default Dashboard;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import Navbar from "../components/Navbar";

function Dashboard() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [appliedCount, setAppliedCount] = useState(0);
  const [appliedJobIds, setAppliedJobIds] = useState(new Set());
  const [search, setSearch] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(localStorage.getItem("username") || "");

useEffect(() => {
  API.get("/auth/me").then(res => {
    setUsername(res.data.username);
    localStorage.setItem("username", res.data.username);
  }).catch(() => {});
}, []);

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [jobsRes, myAppsRes] = await Promise.all([
        API.get("/jobs"),
        API.get("/apply/my"),
      ]);
      setJobs(jobsRes.data);
      const ids = new Set(myAppsRes.data.map((a) => a.job?._id));
      setAppliedJobIds(ids);
      setAppliedCount(myAppsRes.data.length);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const filtered = jobs.filter((job) => {
    const q = search.toLowerCase();
    const matchSearch = !search || job.title?.toLowerCase().includes(q) || job.company?.toLowerCase().includes(q) || job.description?.toLowerCase().includes(q);
    const matchLoc = !locationFilter || job.location?.toLowerCase().includes(locationFilter.toLowerCase());
    const matchType = !typeFilter || job.type === typeFilter;
    return matchSearch && matchLoc && matchType;
  });

  return (
    <div className="min-h-screen bg-secondary">
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-800">
              Hello, <span className="text-primary">{username || "there"}</span> 👋
            </h1>
            <p className="text-gray-500 mt-1">Find your next opportunity below</p>
          </div>
          <div className="flex gap-4">
            <div className="bg-white shadow rounded-2xl px-6 py-4 text-center">
              <p className="text-gray-400 text-sm">Available Jobs</p>
              <p className="text-3xl font-extrabold text-primary">{jobs.length}</p>
            </div>
            <div className="bg-white shadow rounded-2xl px-6 py-4 text-center cursor-pointer hover:shadow-md transition" onClick={() => navigate("/my-applications")}>
              <p className="text-gray-400 text-sm">Applied</p>
              <p className="text-3xl font-extrabold text-green-600">{appliedCount}</p>
            </div>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="bg-white rounded-2xl shadow p-5 mb-8 flex flex-col md:flex-row gap-3">
          <input
            type="text" placeholder="🔍 Search by title, company, or keyword..."
            className="flex-1 border border-gray-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-primary transition"
            value={search} onChange={(e) => setSearch(e.target.value)}
          />
          <input
            type="text" placeholder="📍 Location"
            className="w-full md:w-48 border border-gray-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-primary transition"
            value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)}
          />
          <select
            className="w-full md:w-44 border border-gray-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-primary transition bg-white"
            value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="">All Types</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Remote">Remote</option>
            <option value="Internship">Internship</option>
            <option value="Contract">Contract</option>
          </select>
          {(search || locationFilter || typeFilter) && (
            <button onClick={() => { setSearch(""); setLocationFilter(""); setTypeFilter(""); }}
              className="text-red-500 font-medium px-3 whitespace-nowrap hover:underline">
              Clear ✕
            </button>
          )}
        </div>

        {/* Jobs Grid */}
        {loading ? (
          <div className="text-center py-20 text-gray-400 text-xl">Loading jobs...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow">
            <div className="text-6xl mb-4">😢</div>
            <p className="text-xl text-gray-500">No jobs found</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {filtered.map((job) => {
              const alreadyApplied = appliedJobIds.has(job._id);
              return (
                <div key={job._id} className={`bg-white rounded-3xl p-7 shadow hover:shadow-xl hover:-translate-y-1 transition-all ${!job.isOpen ? "opacity-60" : ""}`}>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">{job.title}</h3>
                      <p className="text-primary font-semibold">{job.company}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${job.isOpen ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                        {job.isOpen ? "Hiring" : "Closed"}
                      </span>
                      {job.type && <span className="bg-blue-50 text-blue-600 px-2 py-1 rounded-full text-xs">{job.type}</span>}
                    </div>
                  </div>

                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">{job.description}</p>

                  <div className="flex flex-wrap gap-3 text-sm text-gray-600 mb-5">
                    <span>📍 {job.location}</span>
                    {job.salary && <span>💰 {job.salary}</span>}
                  </div>

                  {alreadyApplied ? (
                    <div className="w-full bg-gray-100 text-gray-500 py-3 rounded-xl text-center font-semibold">
                      ✅ Already Applied
                    </div>
                  ) : (
                    <button
                      disabled={!job.isOpen}
                      onClick={() => navigate(`/apply/${job._id}`)}
                      className="w-full bg-primary text-white py-3 rounded-xl font-bold hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {job.isOpen ? "Apply Now 🚀" : "Applications Closed"}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
