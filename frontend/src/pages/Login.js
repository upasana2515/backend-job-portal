// // import React, { useState } from "react";
// // import API from "../api/api";
// // import { useNavigate } from "react-router-dom";
// // import { Link } from "react-router-dom";

// // function Login() {

// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");

// //   const navigate = useNavigate();

// //   const handleLogin = async (e) => {
// //     e.preventDefault();

// //     try {

// //       const res = await API.post("/auth/login", {
// //         email,
// //         password,
// //       });

// //        localStorage.setItem("token", res.data.token);
// //       alert("Login Successful ✅");

// //       navigate("/jobs");

// //     } catch (err) {
// //       alert(err.response?.data?.message || "Login Failed ❌");
// //     }
// //   };

// //   return (
// //     <div style={{ textAlign: "center", marginTop: "100px" }}>

// //       <h2>Login</h2>

// //       <form onSubmit={handleLogin}>

// //         <input
// //           type="email"
// //           placeholder="Email"
// //           value={email}
// //           onChange={(e) => setEmail(e.target.value)}
// //         />

// //                 <br /><br />

// //         <input
// //           type="password"
// //           placeholder="Password"
// //           value={password}
// //           onChange={(e) => setPassword(e.target.value)}
// //         />

// //         <br /><br />

// //         <button type="submit">Login</button>

// //       </form>
// //       <Link to="/register">New user? Register</Link>
// //     </div>
// //   );
// // }

// // export default Login;


// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import API from "../api/api";

// function Login() {
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     email: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     setForm({
//       ...form,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleLogin = async () => {
//     try {
//       const res = await API.post("/auth/login", form);

//       localStorage.setItem("token", res.data.token);
//       localStorage.setItem("role", res.data.role); // added new line to store role in localStorage

//       alert("Login Successful ✅");

//       // navigate("/jobs");
//       if (res.data.role === "admin") {
//   navigate("/admin");
// } else {
//   navigate("/jobs");
// }
//     } catch (err) {
//       alert("Login Failed ❌");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-secondary flex items-center justify-center">

//       <div className="bg-white p-10 rounded-3xl shadow-2xl w-[400px]">

//         <h1 className="text-4xl font-bold text-primary text-center mb-8">
//           Welcome Back 👋
//         </h1>

//         <div className="flex flex-col gap-5">

//           <input
//             type="email"
//             name="email"
//             placeholder="Enter Email"
//             className="border p-3 rounded-xl outline-none focus:border-primary"
//             onChange={handleChange}
//           />

//           <input
//             type="password"
//             name="password"
//             placeholder="Enter Password"
//             className="border p-3 rounded-xl outline-none focus:border-primary"
//             onChange={handleChange}
//           />

//           <button
//             onClick={handleLogin}
//             className="bg-primary text-white p-3 rounded-xl hover:scale-105 transition-all"
//           >
//             Login
//           </button>

//           <p className="text-center">
//             New User?{" "}
//             <Link
//               to="/register"
//               className="text-primary font-semibold"
//             >
//               Register
//             </Link>
//           </p>

//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;


import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/api";
import Navbar from "../components/Navbar";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("username", res.data.username);

      if (res.data.role === "admin") navigate("/admin");
      else navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed ❌");
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
            <div className="text-5xl mb-3">👋</div>
            <h1 className="text-3xl font-extrabold text-gray-800">Welcome Back</h1>
            <p className="text-gray-500 mt-1">Sign in to your JobHive account</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-5 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Email</label>
              <input
                type="email" name="email" placeholder="you@example.com"
                className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                onChange={handleChange} required
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Password</label>
              <input
                type="password" name="password" placeholder="••••••••"
                className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                onChange={handleChange} required
              />
            </div>
            <button
              type="submit" disabled={loading}
              className="bg-primary text-white py-3 rounded-xl font-bold hover:scale-[1.02] transition-all mt-2 disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="text-center text-gray-600 mt-6">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary font-semibold hover:underline">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
