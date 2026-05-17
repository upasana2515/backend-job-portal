// // import React, { useEffect, useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import API from "../api/api";

// // function Dashboard() {
// //   const navigate = useNavigate();
// //   const [jobs, setJobs] = useState([]);

// //   useEffect(() => {
// //     fetchJobs();
// //   }, []);

// //   const fetchJobs = async () => {
// //     try {
// //       const res = await API.get("/jobs");
// //       setJobs(res.data);
// //     } catch (err) {
// //       console.log(err);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-secondary p-10">
// //       {/* Header */}
// //       <div className="flex items-center justify-between mb-10">
// //         <div>
// //           <h1 className="text-5xl font-extrabold text-primary mb-2">
// //             User Dashboard 🚀
// //           </h1>

// //           <p className="text-gray-600 text-lg">
// //             Find your dream job and apply instantly.
// //           </p>
// //         </div>

// //         <div className="bg-white shadow-lg px-6 py-4 rounded-2xl">
// //           <p className="text-gray-500">Available Jobs</p>
// //           <h2 className="text-3xl font-bold text-primary">
// //             {jobs.length}
// //           </h2>
// //         </div>
// //       </div>

// //       {/* Job Section */}
// //       <div className="bg-white p-8 rounded-3xl shadow-xl">
// //         <h2 className="text-3xl font-bold text-primary mb-8">
// //           Latest Opportunities 💼
// //         </h2>
// //         {jobs.length === 0 ? (
// //           <div className="text-center py-10">
// //             <p className="text-xl text-gray-500">
// //               No jobs available right now 😢
// //             </p>
// //           </div>
// //         ) : (
// //           <div className="grid md:grid-cols-2 gap-6">
// //             {jobs.map((job) => (
// //               <div
// //                 key={job._id}
// //                 className="border border-gray-200 rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
// //               >
// //                 <div className="flex items-start justify-between mb-4">
// //                   <h3 className="text-2xl font-bold text-primary">
// //                     {job.title}
// //                   </h3>

// //                   <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
// //                     Hiring
// //                   </span>
// //                 </div>
// //   <p className="text-gray-700 mb-5 leading-relaxed">
// //                   {job.description}
// //                 </p>

// //                 <div className="space-y-2 mb-6 text-gray-700">
// //                   <p>
// //                     <b>Company:</b> {job.company}
// //                   </p>

// //                   <p>
// //                     <b>Location:</b> {job.location}
// //                   </p>

// //                   <p>
// //                     <b>Salary:</b> {job.salary}
// //                   </p>
// //                 </div>

// //                 <button
// //   onClick={() => navigate(`/apply/${job._id}`)}
// //   className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:scale-105 transition-all duration-300 shadow-md"
// // >
// //   Apply Now 🚀
// // </button>
// //               </div>
// //             ))}
// //           </div>
// //             )}
// //       </div>
// //     </div>
// //   );
// // }

// // export default Dashboard;

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../api/api";
// import Navbar from "../components/Navbar";
// const [aiOpen, setAiOpen] = useState(false);
// const [aiMessages, setAiMessages] = useState([
//   { role: "assistant", text: "Hi! I'm JobHive AI 🤖\n\nI can help you with:\n• 📝 Building your resume\n• 🎯 Finding the right job for you\n• 💼 Interview preparation\n• 🚀 Career guidance\n\nWhat would you like help with?" }
// ]);
// const [aiInput, setAiInput] = useState("");
// const [aiLoading, setAiLoading] = useState(false);


// function Dashboard() {
//   const navigate = useNavigate();
//   const [jobs, setJobs] = useState([]);
//   const [appliedCount, setAppliedCount] = useState(0);
//   const [appliedJobIds, setAppliedJobIds] = useState(new Set());
//   const [search, setSearch] = useState("");
//   const [locationFilter, setLocationFilter] = useState("");
//   const [typeFilter, setTypeFilter] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [username, setUsername] = useState(localStorage.getItem("username") || "");

// useEffect(() => {
//   API.get("/auth/me").then(res => {
//     setUsername(res.data.username);
//     localStorage.setItem("username", res.data.username);
//   }).catch(() => {});
// }, []);

//   useEffect(() => {
//     fetchAll();
//   }, []);

//   const fetchAll = async () => {
//     setLoading(true);
//     try {
//       const [jobsRes, myAppsRes] = await Promise.all([
//         API.get("/jobs"),
//         API.get("/apply/my"),
//       ]);
//       setJobs(jobsRes.data);
//       const ids = new Set(myAppsRes.data.map((a) => a.job?._id));
//       setAppliedJobIds(ids);
//       setAppliedCount(myAppsRes.data.length);
//     } catch (err) {
//       console.log(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filtered = jobs.filter((job) => {
//     const q = search.toLowerCase();
//     const matchSearch = !search || job.title?.toLowerCase().includes(q) || job.company?.toLowerCase().includes(q) || job.description?.toLowerCase().includes(q);
//     const matchLoc = !locationFilter || job.location?.toLowerCase().includes(locationFilter.toLowerCase());
//     const matchType = !typeFilter || job.type === typeFilter;
//     return matchSearch && matchLoc && matchType;
//   });

//   const sendAiMessage = async () => {
//   if (!aiInput.trim() || aiLoading) return;
//   const userMsg = aiInput.trim();
//   setAiInput("");

//   const newMessages = [...aiMessages, { role: "user", text: userMsg }];
//   setAiMessages(newMessages);
//   setAiLoading(true);

//   try {
//     const history = newMessages.slice(1).map(m => ({
//       role: m.role === "user" ? "user" : "assistant",
//       text: m.text
//     }));

//     const res = await API.post("/ai/ask", { message: userMsg, history });
//     setAiMessages(prev => [...prev, { role: "assistant", text: res.data.reply }]);
//   } catch {
//     setAiMessages(prev => [...prev, { role: "assistant", text: "Sorry, something went wrong. Try again!" }]);
//   } finally {
//     setAiLoading(false);
//   }
// };

//   return (
//     <div className="min-h-screen bg-secondary">
//       <Navbar />
//       <div className="max-w-6xl mx-auto px-6 py-10">

//         {/* Header */}
//         <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
//           <div>
//             <h1 className="text-4xl font-extrabold text-gray-800">
//               Hello, <span className="text-primary">{username || "there"}</span> 👋
//             </h1>
//             <p className="text-gray-500 mt-1">Find your next opportunity below</p>
//           </div>
//           <div className="flex gap-4">
//             <div className="bg-white shadow rounded-2xl px-6 py-4 text-center">
//               <p className="text-gray-400 text-sm">Available Jobs</p>
//               <p className="text-3xl font-extrabold text-primary">{jobs.length}</p>
//             </div>
//             <div className="bg-white shadow rounded-2xl px-6 py-4 text-center cursor-pointer hover:shadow-md transition" onClick={() => navigate("/my-applications")}>
//               <p className="text-gray-400 text-sm">Applied</p>
//               <p className="text-3xl font-extrabold text-green-600">{appliedCount}</p>
//             </div>
//           </div>
//         </div>

//         {/* Search & Filters */}
//         <div className="bg-white rounded-2xl shadow p-5 mb-8 flex flex-col md:flex-row gap-3">
//           <input
//             type="text" placeholder="🔍 Search by title, company, or keyword..."
//             className="flex-1 border border-gray-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-primary transition"
//             value={search} onChange={(e) => setSearch(e.target.value)}
//           />
//           <input
//             type="text" placeholder="📍 Location"
//             className="w-full md:w-48 border border-gray-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-primary transition"
//             value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)}
//           />
//           <select
//             className="w-full md:w-44 border border-gray-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-primary transition bg-white"
//             value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}
//           >
//             <option value="">All Types</option>
//             <option value="Full-time">Full-time</option>
//             <option value="Part-time">Part-time</option>
//             <option value="Remote">Remote</option>
//             <option value="Internship">Internship</option>
//             <option value="Contract">Contract</option>
//           </select>
//           {(search || locationFilter || typeFilter) && (
//             <button onClick={() => { setSearch(""); setLocationFilter(""); setTypeFilter(""); }}
//               className="text-red-500 font-medium px-3 whitespace-nowrap hover:underline">
//               Clear ✕
//             </button>
//           )}
//         </div>

//         {/* Jobs Grid */}
//         {loading ? (
//           <div className="text-center py-20 text-gray-400 text-xl">Loading jobs...</div>
//         ) : filtered.length === 0 ? (
//           <div className="text-center py-20 bg-white rounded-3xl shadow">
//             <div className="text-6xl mb-4">😢</div>
//             <p className="text-xl text-gray-500">No jobs found</p>
//           </div>
//         ) : (
//           <div className="grid md:grid-cols-2 gap-6">
//             {filtered.map((job) => {
//               const alreadyApplied = appliedJobIds.has(job._id);
//               return (
//                 <div key={job._id} className={`bg-white rounded-3xl p-7 shadow hover:shadow-xl hover:-translate-y-1 transition-all ${!job.isOpen ? "opacity-60" : ""}`}>
//                   <div className="flex items-start justify-between mb-3">
//                     <div>
//                       <h3 className="text-xl font-bold text-gray-800">{job.title}</h3>
//                       <p className="text-primary font-semibold">{job.company}</p>
//                     </div>
//                     <div className="flex flex-col items-end gap-1">
//                       <span className={`px-3 py-1 rounded-full text-xs font-bold ${job.isOpen ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
//                         {job.isOpen ? "Hiring" : "Closed"}
//                       </span>
//                       {job.type && <span className="bg-blue-50 text-blue-600 px-2 py-1 rounded-full text-xs">{job.type}</span>}
//                     </div>
//                   </div>

//                   <p className="text-gray-500 text-sm mb-4 line-clamp-2">{job.description}</p>

//                   <div className="flex flex-wrap gap-3 text-sm text-gray-600 mb-5">
//                     <span>📍 {job.location}</span>
//                     {job.salary && <span>💰 {job.salary}</span>}
//                   </div>

//                   {alreadyApplied ? (
//                     <div className="w-full bg-gray-100 text-gray-500 py-3 rounded-xl text-center font-semibold">
//                       ✅ Already Applied
//                     </div>
//                   ) : (
//                     <button
//                       disabled={!job.isOpen}
//                       onClick={() => navigate(`/apply/${job._id}`)}
//                       className="w-full bg-primary text-white py-3 rounded-xl font-bold hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       {job.isOpen ? "Apply Now 🚀" : "Applications Closed"}
//                     </button>
//                   )}
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div>
//       {/* AI Floating Button */}
// <button
//   onClick={() => setAiOpen(!aiOpen)}
//   className="fixed bottom-6 right-6 w-16 h-16 bg-primary text-white rounded-full shadow-2xl text-2xl hover:scale-110 transition-all z-50 flex items-center justify-center"
//   title="JobHive AI Assistant"
// >
//   {aiOpen ? "✕" : "🤖"}
// </button>

// {/* AI Chat Window */}
// {aiOpen && (
//   <div className="fixed bottom-24 right-6 w-96 bg-white rounded-3xl shadow-2xl z-50 flex flex-col overflow-hidden border border-gray-100" style={{height: "520px"}}>

//     {/* Header */}
//     <div className="bg-primary text-white px-5 py-4 flex items-center gap-3">
//       <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-xl">🤖</div>
//       <div>
//         <h3 className="font-bold text-lg leading-none">JobHive AI</h3>
//         <p className="text-xs opacity-75 mt-1">Resume builder & career guide</p>
//       </div>
//     </div>

//     {/* Messages */}
//     <div className="flex flex-col gap-3 p-4 overflow-y-auto flex-1">
//       {aiMessages.map((msg, i) => (
//         <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
//           <div className={`px-4 py-3 rounded-2xl text-sm max-w-[85%] whitespace-pre-wrap ${
//             msg.role === "user"
//               ? "bg-primary text-white rounded-br-sm"
//               : "bg-gray-100 text-gray-800 rounded-bl-sm"
//           }`}>
//             {msg.text}
//           </div>
//         </div>
//       ))}
//       {aiLoading && (
//         <div className="flex justify-start">
//           <div className="bg-gray-100 text-gray-500 px-4 py-3 rounded-2xl text-sm rounded-bl-sm">
//             <span className="animate-pulse">Thinking...</span>
//           </div>
//         </div>
//       )}
//     </div>

//     {/* Quick Prompts */}
//     {aiMessages.length === 1 && (
//       <div className="px-4 pb-2 flex flex-wrap gap-2">
//         {["Help me build my resume", "Which job suits me?", "Interview tips", "Improve my skills"].map(prompt => (
//           <button key={prompt}
//             onClick={() => setAiInput(prompt)}
//             className="bg-green-50 text-primary border border-green-200 px-3 py-1 rounded-full text-xs font-medium hover:bg-green-100 transition">
//             {prompt}
//           </button>
//         ))}
//       </div>
//     )}

//     {/* Input */}
//     <div className="p-3 border-t border-gray-100 flex gap-2">
//       <input
//         type="text"
//         value={aiInput}
//         onChange={e => setAiInput(e.target.value)}
//         onKeyDown={e => e.key === "Enter" && sendAiMessage()}
//         placeholder="Ask about resume, jobs, interviews..."
//         className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
//       />
//       <button
//         onClick={sendAiMessage}
//         disabled={aiLoading || !aiInput.trim()}
//         className="bg-primary text-white px-4 py-2 rounded-xl text-sm font-bold hover:opacity-90 disabled:opacity-40 transition"
//       >
//         ➤
//       </button>
//     </div>
//   </div>
// )}
//     </div>
//   );
// }

// export default Dashboard;




// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../api/api";
// import Navbar from "../components/Navbar";

// function Dashboard() {

//   const navigate = useNavigate();

//   const [jobs, setJobs] = useState([]);
//   const [appliedCount, setAppliedCount] = useState(0);
//   const [appliedJobIds, setAppliedJobIds] = useState(new Set());

//   const [search, setSearch] = useState("");
//   const [locationFilter, setLocationFilter] = useState("");
//   const [typeFilter, setTypeFilter] = useState("");

//   const [loading, setLoading] = useState(true);

//   const [username, setUsername] = useState(
//     localStorage.getItem("username") || ""
//   );

//   // AI STATES
//   const [aiOpen, setAiOpen] = useState(false);

//   const [aiMessages, setAiMessages] = useState([
//     {
//       role: "assistant",
//       text:
//         "Hi! I'm JobHive AI 🤖\n\n" +
//         "I can help you with:\n" +
//         "• Resume guidance\n" +
//         "• Career advice\n" +
//         "• Interview preparation\n" +
//         "• Job suggestions\n\n" +
//         "How can I help you today?",
//     },
//   ]);

//   const [aiInput, setAiInput] = useState("");
//   const [aiLoading, setAiLoading] = useState(false);

//   useEffect(() => {
//     fetchAll();
//   }, []);

//   useEffect(() => {
//     API.get("/auth/me")
//       .then((res) => {
//         setUsername(res.data.username);
//         localStorage.setItem("username", res.data.username);
//       })
//       .catch(() => {});
//   }, []);

//   const fetchAll = async () => {

//     setLoading(true);

//     try {

//       const [jobsRes, myAppsRes] = await Promise.all([
//         API.get("/jobs"),
//         API.get("/apply/my"),
//       ]);

//       setJobs(jobsRes.data);

//       const ids = new Set(
//         myAppsRes.data.map((a) => a.job?._id)
//       );

//       setAppliedJobIds(ids);

//       setAppliedCount(myAppsRes.data.length);

//     } catch (err) {

//       console.log(err);

//     } finally {

//       setLoading(false);

//     }
//   };

//   const filtered = jobs.filter((job) => {

//     const q = search.toLowerCase();

//     const matchSearch =
//       !search ||
//       job.title?.toLowerCase().includes(q) ||
//       job.company?.toLowerCase().includes(q) ||
//       job.description?.toLowerCase().includes(q);

//     const matchLoc =
//       !locationFilter ||
//       job.location
//         ?.toLowerCase()
//         .includes(locationFilter.toLowerCase());

//     const matchType =
//       !typeFilter || job.type === typeFilter;

//     return matchSearch && matchLoc && matchType;
//   });

//   // AI CHAT
//   const sendAiMessage = async () => {

//     if (!aiInput.trim() || aiLoading) return;

//     const userMsg = aiInput.trim();

//     setAiInput("");

//     setAiMessages((prev) => [
//       ...prev,
//       {
//         role: "user",
//         text: userMsg,
//       },
//     ]);

//     setAiLoading(true);

//     // TEMPORARY DEMO AI
//     setTimeout(() => {

//       setAiMessages((prev) => [
//         ...prev,
//         {
//           role: "assistant",
//           text:
//             "That's a great question 🚀\n\n" +
//             "This AI assistant backend can be connected later using OpenAI API.",
//         },
//       ]);

//       setAiLoading(false);

//     }, 1200);
//   };

//   return (
//     <div className="min-h-screen bg-[#f5f1e8]">

//       <Navbar />

//       <div className="max-w-7xl mx-auto px-6 py-10">

//         {/* HEADER */}
//         <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-5">

//           <div>

//             <h1 className="text-5xl font-extrabold text-gray-800">
//               Hello,{" "}
//               <span className="text-green-700">
//                 {username || "there"}
//               </span>{" "}
//               👋
//             </h1>

//             <p className="text-gray-500 mt-3 text-lg">
//               Find your dream opportunity today 🚀
//             </p>

//           </div>

//           <div className="flex gap-4 flex-wrap">

//             <div className="bg-white shadow-lg rounded-3xl px-8 py-5 text-center">

//               <p className="text-gray-400 text-sm">
//                 Available Jobs
//               </p>

//               <p className="text-4xl font-extrabold text-green-700">
//                 {jobs.length}
//               </p>

//             </div>

//             <div
//               onClick={() => navigate("/my-applications")}
//               className="bg-white shadow-lg rounded-3xl px-8 py-5 text-center cursor-pointer hover:shadow-2xl transition-all"
//             >

//               <p className="text-gray-400 text-sm">
//                 Applied Jobs
//               </p>

//               <p className="text-4xl font-extrabold text-blue-600">
//                 {appliedCount}
//               </p>

//             </div>

//           </div>
//         </div>

//         {/* SEARCH */}
//         <div className="bg-white rounded-3xl shadow-lg p-5 mb-10 flex flex-col md:flex-row gap-4">

//           <input
//             type="text"
//             placeholder="🔍 Search jobs..."
//             className="flex-1 border border-gray-200 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-green-600"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />

//           <input
//             type="text"
//             placeholder="📍 Location"
//             className="md:w-52 border border-gray-200 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-green-600"
//             value={locationFilter}
//             onChange={(e) => setLocationFilter(e.target.value)}
//           />

//           <select
//             className="md:w-52 border border-gray-200 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-green-600 bg-white"
//             value={typeFilter}
//             onChange={(e) => setTypeFilter(e.target.value)}
//           >

//             <option value="">All Types</option>
//             <option value="Full-time">Full-time</option>
//             <option value="Part-time">Part-time</option>
//             <option value="Internship">Internship</option>
//             <option value="Remote">Remote</option>

//           </select>

//         </div>

//         {/* JOBS */}
//         {loading ? (

//           <div className="text-center py-20 text-2xl text-gray-400">
//             Loading jobs...
//           </div>

//         ) : filtered.length === 0 ? (

//           <div className="bg-white rounded-3xl shadow-xl p-16 text-center">

//             <div className="text-7xl mb-5">😢</div>

//             <h2 className="text-3xl font-bold text-gray-700">
//               No Jobs Found
//             </h2>

//           </div>

//         ) : (

//           <div className="grid md:grid-cols-2 gap-7">

//             {filtered.map((job) => {

//               const alreadyApplied =
//                 appliedJobIds.has(job._id);

//               return (

//                 <div
//                   key={job._id}
//                   className="bg-white rounded-3xl p-7 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
//                 >

//                   <div className="flex items-start justify-between mb-4">

//                     <div>

//                       <h3 className="text-2xl font-bold text-gray-800">
//                         {job.title}
//                       </h3>

//                       <p className="text-green-700 font-semibold mt-1">
//                         {job.company}
//                       </p>

//                     </div>

//                     <span
//                       className={`px-4 py-1 rounded-full text-xs font-bold ${
//                         job.isOpen
//                           ? "bg-green-100 text-green-700"
//                           : "bg-red-100 text-red-600"
//                       }`}
//                     >
//                       {job.isOpen
//                         ? "Hiring"
//                         : "Closed"}
//                     </span>

//                   </div>

//                   <p className="text-gray-500 mb-5 line-clamp-3">
//                     {job.description}
//                   </p>

//                   <div className="flex flex-wrap gap-3 text-sm text-gray-600 mb-6">

//                     <span>
//                       📍 {job.location}
//                     </span>

//                     {job.salary && (
//                       <span>
//                         💰 {job.salary}
//                       </span>
//                     )}

//                     {job.type && (
//                       <span>
//                         🧑‍💻 {job.type}
//                       </span>
//                     )}

//                   </div>

//                   {alreadyApplied ? (

//                     <div className="w-full bg-gray-100 text-gray-500 py-4 rounded-2xl text-center font-bold">
//                       ✅ Already Applied
//                     </div>

//                   ) : (

//                     <button
//                       disabled={!job.isOpen}
//                       onClick={() =>
//                         navigate(`/apply/${job._id}`)
//                       }
//                       className="w-full bg-green-700 text-white py-4 rounded-2xl font-bold hover:scale-[1.02] transition-all disabled:opacity-50"
//                     >
//                       {job.isOpen
//                         ? "Apply Now 🚀"
//                         : "Applications Closed"}
//                     </button>

//                   )}

//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div>

//       {/* AI BUTTON */}
//       <button
//         onClick={() => setAiOpen(!aiOpen)}
//         className="fixed bottom-6 right-6 w-16 h-16 bg-green-700 text-white rounded-full shadow-2xl text-2xl hover:scale-110 transition-all z-50"
//       >
//         {aiOpen ? "✕" : "🤖"}
//       </button>

//       {/* AI CHAT */}
//       {aiOpen && (

//         <div className="fixed bottom-24 right-6 w-96 bg-white rounded-3xl shadow-2xl z-50 flex flex-col overflow-hidden border border-gray-100 h-[520px]">

//           {/* HEADER */}
//           <div className="bg-green-700 text-white px-5 py-4">

//             <h3 className="font-bold text-xl">
//               JobHive AI 🤖
//             </h3>

//             <p className="text-sm opacity-80">
//               Career Assistant
//             </p>

//           </div>

//           {/* MESSAGES */}
//           <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">

//             {aiMessages.map((msg, i) => (

//               <div
//                 key={i}
//                 className={`flex ${
//                   msg.role === "user"
//                     ? "justify-end"
//                     : "justify-start"
//                 }`}
//               >

//                 <div
//                   className={`max-w-[80%] px-4 py-3 rounded-2xl whitespace-pre-wrap text-sm ${
//                     msg.role === "user"
//                       ? "bg-green-700 text-white"
//                       : "bg-gray-100 text-gray-800"
//                   }`}
//                 >
//                   {msg.text}
//                 </div>

//               </div>
//             ))}

//             {aiLoading && (

//               <div className="bg-gray-100 text-gray-500 px-4 py-3 rounded-2xl text-sm w-fit">
//                 Thinking...
//               </div>

//             )}

//           </div>

//           {/* INPUT */}
//           <div className="border-t border-gray-100 p-3 flex gap-2">

//             <input
//               type="text"
//               value={aiInput}
//               onChange={(e) =>
//                 setAiInput(e.target.value)
//               }
//               onKeyDown={(e) =>
//                 e.key === "Enter" &&
//                 sendAiMessage()
//               }
//               placeholder="Ask anything..."
//               className="flex-1 border border-gray-200 rounded-2xl px-4 py-2 outline-none focus:ring-2 focus:ring-green-600"
//             />

//             <button
//               onClick={sendAiMessage}
//               disabled={aiLoading}
//               className="bg-green-700 text-white px-5 rounded-2xl font-bold"
//             >
//               ➤
//             </button>

//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Dashboard;



import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


import API from "../api/api";
import Navbar from "../components/Navbar";

function Dashboard() {

  const navigate = useNavigate();

  

  // STATES
  const [jobs, setJobs] = useState([]);
  const [appliedCount, setAppliedCount] = useState(0);
  const [appliedJobIds, setAppliedJobIds] = useState(new Set());

  const [search, setSearch] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  const [loading, setLoading] = useState(true);

  const [username, setUsername] = useState(
    localStorage.getItem("username") || ""
  );

  // AI STATES
  const [aiOpen, setAiOpen] = useState(false);

  const [aiMessages, setAiMessages] = useState([
    {
      role: "assistant",
      text:
        "Hi! I'm JobHive AI 🤖\n\n" +
        "I can help you with:\n" +
        "• Resume guidance\n" +
        "• Career advice\n" +
        "• Interview preparation\n" +
        "• Job suggestions\n\n" +
        "How can I help you today?",
    },
  ]);

  const [aiInput, setAiInput] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  // FETCH DATA
  useEffect(() => {
    fetchAll();
  }, []);

  useEffect(() => {

    API.get("/auth/me")
      .then((res) => {

        setUsername(res.data.username);

        localStorage.setItem(
          "username",
          res.data.username
        );

      })
      .catch(() => {});

  }, []);

  const fetchAll = async () => {

    setLoading(true);

    try {

      const [jobsRes, myAppsRes] =
        await Promise.all([
          API.get("/jobs"),
          API.get("/apply/my"),
        ]);

      setJobs(jobsRes.data);

      const ids = new Set(
        myAppsRes.data.map((a) => a.job?._id)
      );

      setAppliedJobIds(ids);

      setAppliedCount(
        myAppsRes.data.length
      );

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }
  };

  // FILTER JOBS
  const filtered = jobs.filter((job) => {

    const q = search.toLowerCase();

    const matchSearch =
      !search ||
      job.title?.toLowerCase().includes(q) ||
      job.company?.toLowerCase().includes(q) ||
      job.description?.toLowerCase().includes(q);

    const matchLoc =
      !locationFilter ||
      job.location
        ?.toLowerCase()
        .includes(locationFilter.toLowerCase());

    const matchType =
      !typeFilter ||
      job.type === typeFilter;

    return (
      matchSearch &&
      matchLoc &&
      matchType
    );
  });

  // AI CHAT
  const sendAiMessage = async () => {
  if (!aiInput.trim() || aiLoading) return;

  const userMsg = aiInput.trim();
  setAiInput("");

  const newMessages = [...aiMessages, { role: "user", text: userMsg }];
  setAiMessages(newMessages);
  setAiLoading(true);

  try {
    const history = newMessages.slice(1).map(m => ({
      role: m.role === "user" ? "user" : "assistant",
      text: m.text
    }));

    const res = await API.post("/ai/ask", { message: userMsg, history });
    setAiMessages(prev => [...prev, { role: "assistant", text: res.data.reply }]);
  } catch (err) {
    setAiMessages(prev => [...prev, { role: "assistant", text: "AI temporarily unavailable ❌" }]);
  } finally {
    setAiLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-[#f5f1e8]">

      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-5">

          <div>

            <h1 className="text-5xl font-extrabold text-gray-800">

              Hello,{" "}

              <span className="text-green-700">
                {username || "there"}
              </span>{" "}

              👋

            </h1>

            <p className="text-gray-500 mt-3 text-lg">
              Find your dream opportunity today 🚀
            </p>

          </div>

          <div className="flex gap-4 flex-wrap">

            <div className="bg-white shadow-lg rounded-3xl px-8 py-5 text-center">

              <p className="text-gray-400 text-sm">
                Available Jobs
              </p>

              <p className="text-4xl font-extrabold text-green-700">
                {jobs.length}
              </p>

            </div>

            <div
              onClick={() =>
                navigate("/my-applications")
              }
              className="bg-white shadow-lg rounded-3xl px-8 py-5 text-center cursor-pointer hover:shadow-2xl transition-all"
            >

              <p className="text-gray-400 text-sm">
                Applied Jobs
              </p>

              <p className="text-4xl font-extrabold text-blue-600">
                {appliedCount}
              </p>

            </div>

          </div>
        </div>

        {/* SEARCH */}
        <div className="bg-white rounded-3xl shadow-lg p-5 mb-10 flex flex-col md:flex-row gap-4">

          <input
            type="text"
            placeholder="🔍 Search jobs..."
            className="flex-1 border border-gray-200 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-green-600"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          <input
            type="text"
            placeholder="📍 Location"
            className="md:w-52 border border-gray-200 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-green-600"
            value={locationFilter}
            onChange={(e) =>
              setLocationFilter(
                e.target.value
              )
            }
          />

          <select
            className="md:w-52 border border-gray-200 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-green-600 bg-white"
            value={typeFilter}
            onChange={(e) =>
              setTypeFilter(
                e.target.value
              )
            }
          >

            <option value="">
              All Types
            </option>

            <option value="Full-time">
              Full-time
            </option>

            <option value="Part-time">
              Part-time
            </option>

            <option value="Internship">
              Internship
            </option>

            <option value="Remote">
              Remote
            </option>

          </select>

        </div>

        {/* JOBS */}
        {loading ? (

          <div className="text-center py-20 text-2xl text-gray-400">
            Loading jobs...
          </div>

        ) : filtered.length === 0 ? (

          <div className="bg-white rounded-3xl shadow-xl p-16 text-center">

            <div className="text-7xl mb-5">
              😢
            </div>

            <h2 className="text-3xl font-bold text-gray-700">
              No Jobs Found
            </h2>

          </div>

        ) : (

          <div className="grid md:grid-cols-2 gap-7">

            {filtered.map((job) => {

              const alreadyApplied =
                appliedJobIds.has(
                  job._id
                );

              return (

                <div
                  key={job._id}
                  className="bg-white rounded-3xl p-7 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                >

                  <div className="flex items-start justify-between mb-4">

                    <div>

                      <h3 className="text-2xl font-bold text-gray-800">
                        {job.title}
                      </h3>

                      <p className="text-green-700 font-semibold mt-1">
                        {job.company}
                      </p>

                    </div>

                    <span
                      className={`px-4 py-1 rounded-full text-xs font-bold ${
                        job.isOpen
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-600"
                      }`}
                    >

                      {job.isOpen
                        ? "Hiring"
                        : "Closed"}

                    </span>

                  </div>

                  <p className="text-gray-500 mb-5 line-clamp-3">
                    {job.description}
                  </p>

                  <div className="flex flex-wrap gap-3 text-sm text-gray-600 mb-6">

                    <span>
                      📍 {job.location}
                    </span>

                    {job.salary && (
                      <span>
                        💰 {job.salary}
                      </span>
                    )}

                    {job.type && (
                      <span>
                        🧑‍💻 {job.type}
                      </span>
                    )}

                  </div>

                  {alreadyApplied ? (

                    <div className="w-full bg-gray-100 text-gray-500 py-4 rounded-2xl text-center font-bold">

                      ✅ Already Applied

                    </div>

                  ) : (

                    <button
                      disabled={!job.isOpen}
                      onClick={() =>
                        navigate(
                          `/apply/${job._id}`
                        )
                      }
                      className="w-full bg-green-700 text-white py-4 rounded-2xl font-bold hover:scale-[1.02] transition-all disabled:opacity-50"
                    >

                      {job.isOpen
                        ? "Apply Now 🚀"
                        : "Applications Closed"}

                    </button>

                  )}

                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* AI BUTTON */}
      <button
        onClick={() =>
          setAiOpen(!aiOpen)
        }
        className="fixed bottom-6 right-6 w-16 h-16 bg-green-700 text-white rounded-full shadow-2xl text-2xl hover:scale-110 transition-all z-50"
      >

        {aiOpen ? "✕" : "🤖"}

      </button>

      {/* AI CHAT */}
      {aiOpen && (

        <div className="fixed bottom-24 right-6 w-96 bg-white rounded-3xl shadow-2xl z-50 flex flex-col overflow-hidden border border-gray-100 h-[520px]">

          {/* HEADER */}
          <div className="bg-green-700 text-white px-5 py-4">

            <h3 className="font-bold text-xl">
              JobHive AI 🤖
            </h3>

            <p className="text-sm opacity-80">
              Career Assistant
            </p>

          </div>

          {/* MESSAGES */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">

            {aiMessages.map(
              (msg, i) => (

                <div
                  key={i}
                  className={`flex ${
                    msg.role === "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >

                  <div
                    className={`max-w-[80%] px-4 py-3 rounded-2xl whitespace-pre-wrap text-sm ${
                      msg.role === "user"
                        ? "bg-green-700 text-white"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >

                    {msg.text}

                  </div>

                </div>
              )
            )}

            {aiLoading && (

              <div className="bg-gray-100 text-gray-500 px-4 py-3 rounded-2xl text-sm w-fit">
                Thinking...
              </div>

            )}

          </div>

          {/* INPUT */}
          <div className="border-t border-gray-100 p-3 flex gap-2">

            <input
              type="text"
              value={aiInput}
              onChange={(e) =>
                setAiInput(
                  e.target.value
                )
              }
              onKeyDown={(e) =>
                e.key === "Enter" &&
                sendAiMessage()
              }
              placeholder="Ask anything..."
              className="flex-1 border border-gray-200 rounded-2xl px-4 py-2 outline-none focus:ring-2 focus:ring-green-600"
            />

            <button
              onClick={sendAiMessage}
              disabled={aiLoading}
              className="bg-green-700 text-white px-5 rounded-2xl font-bold"
            >

              ➤

            </button>

          </div>

        </div>
      )}

    </div>
  );
}

export default Dashboard;