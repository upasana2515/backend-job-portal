// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import API from "../api/api";

// function Register() {
//   const navigate = useNavigate();

//   // const [form, setForm] = useState({
//   //   username: "",
//   //   email: "",
//   //   password: "",
//   // });
//   const [form, setForm] = useState({
//   username: "",
//   email: "",
//   password: "",
//   role: "user",
// });

//   const handleChange = (e) => {
//     setForm({
//       ...form,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleRegister = async () => {
//     try {
//       await API.post("/auth/register", form);

//       alert("Registration Successful ✅");

//       navigate("/login");
//     } catch (err) {
//       alert("Registration Failed ❌");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-secondary flex items-center justify-center">

//       <div className="bg-white w-[400px] p-10 rounded-3xl shadow-2xl">

//         <h1 className="text-4xl font-bold text-primary text-center mb-8">
//           Create Account 🌿
//         </h1>

//         <div className="flex flex-col gap-5">

//           <input
//             type="text"
//             name="username"
//             placeholder="Enter Username"
//             onChange={handleChange}
//             className="border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
//           />

//           <input
//             type="email"
//             name="email"
//             placeholder="Enter Email"
//             onChange={handleChange}
//             className="border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
//           />

//           <input
//             type="password"
//             name="password"
//             placeholder="Enter Password"
//             onChange={handleChange}
//             className="border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
//           />
//           <select
//           name="role"
//           onChange={handleChange}
//           className="border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
//           >
//             <option value="user">User</option>
//             <option value="admin">Admin</option>
//           </select>

//           <button
//             onClick={handleRegister}
//             className="bg-primary text-white p-3 rounded-xl hover:scale-105 transition-all duration-300"
//           >
//             Register
//           </button>

//           <p className="text-center text-gray-600">
//             Already have an account?{" "}
//             <Link
//               to="/login"
//               className="text-primary font-semibold"
//             >
//               Login
//             </Link>
//           </p>

//         </div>
//       </div>
//     </div>
//   );
// }

// export default Register;




import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/api";
import Navbar from "../components/Navbar";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "", role: "user" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await API.post("/auth/register", form);
      // Auto-login: save token and redirect
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("username", res.data.username);

      if (res.data.role === "admin") navigate("/admin");
      else navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-secondary">
      <Navbar />
      <div className="flex items-center justify-center py-16 px-4">
        <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md">
          <div className="text-center mb-8">
            <div className="text-5xl mb-3">🌿</div>
            <h1 className="text-3xl font-extrabold text-gray-800">Create Account</h1>
            <p className="text-gray-500 mt-1">Join thousands finding their dream job</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-5 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="flex flex-col gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Username</label>
              <input
                type="text" name="username" placeholder="johndoe"
                className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-primary transition"
                onChange={handleChange} required
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Email</label>
              <input
                type="email" name="email" placeholder="you@example.com"
                className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-primary transition"
                onChange={handleChange} required
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Password</label>
              <input
                type="password" name="password" placeholder="Min 6 characters"
                className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-primary transition"
                onChange={handleChange} required minLength={6}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">I am a...</label>
              <select
                name="role" onChange={handleChange}
                className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-primary transition bg-white"
              >
                <option value="user">Job Seeker</option>
                <option value="admin">Employer / Admin</option>
              </select>
            </div>
            <button
              type="submit" disabled={loading}
              className="bg-primary text-white py-3 rounded-xl font-bold hover:scale-[1.02] transition-all mt-2 disabled:opacity-60"
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <p className="text-center text-gray-600 mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-semibold hover:underline">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
