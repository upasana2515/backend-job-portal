// // import { BrowserRouter, Routes, Route } from "react-router-dom";

// // import Login from "./pages/Login";
// // import Register from "./pages/Register";
// // import Jobs from "./pages/Jobs";
// // import MyApplications from "./pages/MyApplications";
// // import AdminDashboard from "./pages/AdminDashboard";

// // function App() {
// //   return (
    
// //     <BrowserRouter>
// //       <Routes>
// //         <Route path="/login" element={<Login />} />
// //         <Route path="/register" element={<Register />} />
// //         <Route path="/jobs" element={<Jobs />} />
// //         <Route path="/applications" element={<MyApplications />} />
// //         <Route path="/admin" element={<AdminDashboard />} />
// //       </Routes>
// //     </BrowserRouter>
// //   );
// // }

// // export default App;


// import { BrowserRouter, Routes, Route } from "react-router-dom";

// import Login from "./pages/Login";
// import { Navigate } from "react-router-dom";
// import Register from "./pages/Register";
// import Jobs from "./pages/Jobs";
// import MyApplications from "./pages/MyApplications";
// import AdminDashboard from "./pages/AdminDashboard";


// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Navigate to="/login" />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/jobs" element={<Jobs />} />
//         <Route path="/applications" element={<MyApplications />} />
//         <Route path="/admin" element={<AdminDashboard />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;



// import { BrowserRouter, Routes, Route } from "react-router-dom";

// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Jobs from "./pages/Jobs";
// import MyApplications from "./pages/MyApplications";
// import AdminDashboard from "./pages/AdminDashboard";
// import ProtectedRoute from "./components/ProtectedRoute";
// import AdminRoute from "./components/AdminRoute";
// import AddJob from "./pages/AddJob";
// import ApplyJob from "./pages/ApplyJob";
// import Dashboard from "./pages/Dashboard";
// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>

//         {/* Public Routes */}

//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/add-job" element={<AddJob />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="/apply/:jobId" element={<ApplyJob />} />
//         <Route path="/my-applications" element={<MyApplications />} />
//         {/* Protected User Route */}
//         <Route
//           path="/jobs"
//           element={
//             <ProtectedRoute>
//               <Jobs />
//             </ProtectedRoute>
//           }
//         />

//         {/* Protected Applications Route */}
//         <Route
//           path="/applications"
//           element={
//             <ProtectedRoute>
//               <MyApplications />
//             </ProtectedRoute>
//           }
//         />

//         {/* Admin Route */}
//         <Route
//           path="/admin"
//           element={
//             <AdminRoute>
//               <AdminDashboard />
//             </AdminRoute>
//           }
//         />

//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;



import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ApplyJob from "./pages/ApplyJob";
import MyApplications from "./pages/MyApplications";
import AddJob from "./pages/AddJob";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* User Protected */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/apply/:jobId" element={<ProtectedRoute><ApplyJob /></ProtectedRoute>} />
        <Route path="/my-applications" element={<ProtectedRoute><MyApplications /></ProtectedRoute>} />

        {/* Admin Protected */}
        <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path="/add-job" element={<AdminRoute><AddJob /></AdminRoute>} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
