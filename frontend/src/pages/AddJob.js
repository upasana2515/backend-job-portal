// import { useState } from "react";
// import API from "../api/api";
// import { useNavigate } from "react-router-dom";

// function AddJob() {

//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     title: "",
//     company: "",
//     location: "",
//     salary: "",
//     description: "",
//   });

//   const handleChange = (e) => {
//     setForm({
//       ...form,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleAddJob = async () => {

//     try {

//       await API.post("/jobs", form);

//       alert("Job Added Successfully ✅");

//       navigate("/admin");

//     } catch (err) {

//       alert("Failed to Add Job ❌");

//       console.log(err);

//     }
//   };

//   return (
//     <div className="min-h-screen bg-secondary flex justify-center items-center">

//       <div className="bg-white p-10 rounded-3xl shadow-2xl w-[500px]">

//         <h1 className="text-4xl font-bold text-primary text-center mb-8">
//           Add New Job 💼
//         </h1>

//         <div className="flex flex-col gap-5">

//           <input
//             type="text"
//             name="title"
//             placeholder="Job Title"
//             onChange={handleChange}
//             className="border p-3 rounded-xl"
//           />

//           <input
//             type="text"
//             name="company"
//             placeholder="Company Name"
//             onChange={handleChange}
//             className="border p-3 rounded-xl"
//           />

//           <input
//             type="text"
//             name="location"
//             placeholder="Location"
//             onChange={handleChange}
//             className="border p-3 rounded-xl"
//           />

//           <input
//             type="text"
//             name="salary"
//             placeholder="Salary"
//             onChange={handleChange}
//             className="border p-3 rounded-xl"
//           />

//           <textarea
//             name="description"
//             placeholder="Job Description"
//             onChange={handleChange}
//             className="border p-3 rounded-xl h-32"
//           />

//           <button
//             onClick={handleAddJob}
//             className="bg-primary text-white p-3 rounded-xl hover:scale-105 transition-all"
//           >
//             Add Job
//           </button>

//         </div>
//       </div>
//     </div>
//   );
// }

// export default AddJob;



import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import Navbar from "../components/Navbar";

function AddJob() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", company: "", location: "", salary: "", description: "", type: "Full-time" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await API.post("/jobs", form);
      navigate("/admin");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to post job ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-secondary">
      <Navbar />
      <div className="max-w-2xl mx-auto px-6 py-12">
        <div className="bg-white rounded-3xl shadow-2xl p-10">
          <div className="text-center mb-8">
            <div className="text-5xl mb-3">💼</div>
            <h1 className="text-3xl font-extrabold text-gray-800">Post a New Job</h1>
            <p className="text-gray-500 mt-1">Fill in the details below</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-6 text-sm">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {[
              { name: "title", label: "Job Title", placeholder: "e.g. Frontend Developer", type: "text" },
              { name: "company", label: "Company Name", placeholder: "e.g. Acme Corp", type: "text" },
              { name: "location", label: "Location", placeholder: "e.g. Mumbai / Remote", type: "text" },
              { name: "salary", label: "Salary (optional)", placeholder: "e.g. ₹6-10 LPA", type: "text" },
            ].map(field => (
              <div key={field.name}>
                <label className="text-sm font-medium text-gray-700 mb-1 block">{field.label}</label>
                <input
                  type={field.type} name={field.name} placeholder={field.placeholder}
                  className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-primary transition"
                  onChange={handleChange} required={field.name !== "salary"}
                />
              </div>
            ))}

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Job Type</label>
              <select name="type" onChange={handleChange} className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-primary bg-white transition">
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Remote</option>
                <option>Internship</option>
                <option>Contract</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Job Description</label>
              <textarea
                name="description" placeholder="Describe the role, responsibilities, and requirements..."
                rows={5}
                className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-primary transition resize-none"
                onChange={handleChange} required
              />
            </div>

            <button type="submit" disabled={loading}
              className="bg-primary text-white py-4 rounded-xl text-lg font-bold hover:scale-[1.02] transition-all disabled:opacity-60 mt-2"
            >
              {loading ? "Posting..." : "Post Job 🚀"}
            </button>
          </form>

          <button onClick={() => navigate("/admin")} className="w-full mt-3 text-gray-500 hover:text-gray-700 py-2 text-sm">
            ← Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddJob;
