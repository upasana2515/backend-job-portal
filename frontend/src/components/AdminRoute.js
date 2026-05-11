// import { Navigate } from "react-router-dom";

// function AdminRoute({ children }) {
//   const role = localStorage.getItem("role");

//   if (role !== "admin") {
//     return <Navigate to="/jobs" />;
//   }

//   return children;
// }

// export default AdminRoute;



import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  if (!token || role !== "admin") return <Navigate to="/login" />;
  return children;
}

export default AdminRoute;
