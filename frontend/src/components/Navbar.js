// import { Link, useNavigate } from "react-router-dom";

// function Navbar() {
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");
//   const role = localStorage.getItem("role");
//   const username = localStorage.getItem("username");

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/");
//   };

//   return (
//     <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between sticky top-0 z-50">
//       <Link to="/" className="text-2xl font-extrabold text-primary flex items-center gap-2">
//         🌿 JobHive
//       </Link>

//       <div className="flex items-center gap-4">
//         {!token ? (
//           <>
//             <Link to="/login" className="text-gray-600 hover:text-primary font-medium transition-colors">Login</Link>
//             <Link to="/register" className="bg-primary text-white px-4 py-2 rounded-xl hover:opacity-90 transition font-medium">Register</Link>
//           </>
//         ) : (
//           <>
//             {role === "admin" ? (
//               <>
//                 <Link to="/admin" className="text-gray-600 hover:text-primary font-medium">Dashboard</Link>
//                 <Link to="/add-job" className="text-gray-600 hover:text-primary font-medium">Post Job</Link>
//               </>
//             ) : (
//               <>
//                 <Link to="/dashboard" className="text-gray-600 hover:text-primary font-medium">Jobs</Link>
//                 <Link to="/my-applications" className="text-gray-600 hover:text-primary font-medium">My Applications</Link>
//               </>
//             )}
//             <span className="text-sm text-gray-500 hidden sm:block">Hi, {username?.username || "User"} 👋</span>
//             <button
//               onClick={handleLogout}
//               className="bg-red-500 text-white px-4 py-2 rounded-xl hover:opacity-90 transition font-medium"
//             >
//               Logout
//             </button>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// }

// export default Navbar;






// import { useState, useEffect } from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";

// function Navbar() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [token, setToken] = useState(localStorage.getItem("token"));
//   const [role, setRole] = useState(localStorage.getItem("role"));
//   const [username, setUsername] = useState(localStorage.getItem("username"));

//   // Re-read localStorage whenever the route changes
//   useEffect(() => {
//     setToken(localStorage.getItem("token"));
//     setRole(localStorage.getItem("role"));
//     setUsername(localStorage.getItem("username"));
//   }, [location]);

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/");
//   };

//   return (
//     <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between sticky top-0 z-50">
//       <Link to="/" className="text-2xl font-extrabold text-primary flex items-center gap-2">
//         🌿 JobHive
//       </Link>

//       <div className="flex items-center gap-4">
//         {!token ? (
//           <>
//             <Link to="/login" className="text-gray-600 hover:text-primary font-medium transition-colors">Login</Link>
//             <Link to="/register" className="bg-primary text-white px-4 py-2 rounded-xl hover:opacity-90 transition font-medium">Register</Link>
//           </>
//         ) : (
//           <>
//             {role === "admin" ? (
//               <>
//                 <Link to="/admin" className="text-gray-600 hover:text-primary font-medium">Dashboard</Link>
//                 <Link to="/add-job" className="text-gray-600 hover:text-primary font-medium">Post Job</Link>
//               </>
//             ) : (
//               <>
//                 <Link to="/dashboard" className="text-gray-600 hover:text-primary font-medium">Jobs</Link>
//                 <Link to="/my-applications" className="text-gray-600 hover:text-primary font-medium">My Applications</Link>
//               </>
//             )}
//             <span className="text-sm text-gray-500 hidden sm:block">Hi, {username || "User"} 👋</span>
//             <button
//               onClick={handleLogout}
//               className="bg-red-500 text-white px-4 py-2 rounded-xl hover:opacity-90 transition font-medium"
//             >
//               Logout
//             </button>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// }

// export default Navbar;

import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const getStorage = () => ({
    token: localStorage.getItem("token"),
    role: localStorage.getItem("role"),
    username: localStorage.getItem("username"),
  });

  const [auth, setAuth] = useState(getStorage);

  // Re-read localStorage on every route change (picks up login/logout)
  useEffect(() => {
    setAuth(getStorage());
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.clear();
    setAuth({ token: null, role: null, username: null });
    navigate("/");
  };

  const { token, role, username } = auth;

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between sticky top-0 z-50">
      <Link to="/" className="text-2xl font-extrabold text-primary flex items-center gap-2">
        🌿 JobHive
      </Link>

      <div className="flex items-center gap-4">
        {!token ? (
          <>
            <Link to="/login" className="text-gray-600 hover:text-primary font-medium transition-colors">Login</Link>
            <Link to="/register" className="bg-primary text-white px-4 py-2 rounded-xl hover:opacity-90 transition font-medium">Register</Link>
          </>
        ) : (
          <>
            {role === "admin" ? (
              <>
                <Link to="/admin" className="text-gray-600 hover:text-primary font-medium">Dashboard</Link>
                <Link to="/add-job" className="text-gray-600 hover:text-primary font-medium">Post Job</Link>
              </>
            ) : (
              <>
                <Link to="/dashboard" className="text-gray-600 hover:text-primary font-medium">Jobs</Link>
                <Link to="/my-applications" className="text-gray-600 hover:text-primary font-medium">My Applications</Link>
              </>
            )}
            <span className="text-sm text-gray-500 hidden sm:block">
              Hi, {username && username !== "undefined" ? username : "User"} 👋
            </span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-xl hover:opacity-90 transition font-medium"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;