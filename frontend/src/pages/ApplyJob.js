// import React, { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import API from "../api/api";

// function ApplyJob() {

//   const { jobId } = useParams();
//   const navigate = useNavigate();

//   const [resume, setResume] = useState(null);

//   const handleApply = async (e) => {
//     e.preventDefault();

//     if (!resume) {
//       alert("Please upload resume");
//       return;
//     }

//     try {

//       const formData = new FormData();
//       formData.append("resume", resume);

//       await API.post(`/apply/${jobId}`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       alert("Applied Successfully 🚀");

//       navigate("/my-applications");

//     } catch (err) {
//       console.log(err);
//       alert("Application Failed ❌");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-secondary flex justify-center items-center p-6">

//       <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-xl">

//         <h1 className="text-4xl font-bold text-primary mb-8 text-center">
//           Apply For Job 🚀
//         </h1>

//         <form onSubmit={handleApply}>

//           <input
//             type="file"
//             accept=".pdf,.doc,.docx"
//             onChange={(e) => setResume(e.target.files[0])}
//             className="w-full border p-4 rounded-xl mb-6"
//           />

//           <button
//             type="submit"
//             className="w-full bg-primary text-white py-4 rounded-xl text-lg font-bold hover:scale-105 transition-all"
//           >
//             Submit Application
//           </button>

//         </form>

//       </div>

//     </div>
//   );
// }

// export default ApplyJob;

























import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/api";
import Navbar from "../components/Navbar";

function ApplyJob() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [resume, setResume] = useState(null);
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch job info to show details
    API.get("/jobs").then(res => {
      const found = res.data.find(j => j._id === jobId);
      setJob(found);
    }).catch(() => {});
  }, [jobId]);

  const handleApply = async (e) => {
    e.preventDefault();
    if (!resume) { setError("Please upload your resume"); return; }
    setLoading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("resume", resume);
      await API.post(`/apply/${jobId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/my-applications");
    } catch (err) {
      setError(err.response?.data?.message || "Application failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-secondary">
      <Navbar />
      <div className="flex justify-center items-center py-16 px-4">
        <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-lg">
          <div className="text-center mb-8">
            <div className="text-5xl mb-3">🚀</div>
            <h1 className="text-3xl font-extrabold text-gray-800">Apply for Job</h1>
            {job && (
              <div className="mt-3">
                <p className="text-xl font-bold text-primary">{job.title}</p>
                <p className="text-gray-500">{job.company} · {job.location}</p>
              </div>
            )}
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-5 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleApply}>
            <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center mb-6 hover:border-primary transition">
              <div className="text-4xl mb-3">📄</div>
              <p className="text-gray-600 mb-3">Upload your resume (PDF, DOC, DOCX)</p>
              <input
                type="file" accept=".pdf,.doc,.docx"
                onChange={(e) => setResume(e.target.files[0])}
                className="hidden" id="resume-upload"
              />
              <label htmlFor="resume-upload" className="cursor-pointer bg-primary text-white px-6 py-2 rounded-xl font-medium hover:opacity-90 transition inline-block">
                Choose File
              </label>
              {resume && <p className="mt-3 text-green-600 font-medium">✅ {resume.name}</p>}
            </div>

            <button
              type="submit" disabled={loading || !resume}
              className="w-full bg-primary text-white py-4 rounded-xl text-lg font-bold hover:scale-[1.02] transition-all disabled:opacity-60"
            >
              {loading ? "Submitting..." : "Submit Application"}
            </button>
          </form>

          <button onClick={() => navigate("/dashboard")} className="w-full mt-3 text-gray-500 hover:text-gray-700 py-2 text-sm">
            ← Back to Jobs
          </button>
        </div>
      </div>
    </div>
  );
}

export default ApplyJob;
