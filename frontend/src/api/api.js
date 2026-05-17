// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:5000/api",
// });

// API.interceptors.request.use((req) => {

//   const token = localStorage.getItem("token");

//   if (token) {
//     req.headers.Authorization = `Bearer ${token}`;
//   }

//   return req;
// });

// export default API;




// import axios from "axios";

// // const API = axios.create({
// //   baseURL: "http://localhost:5000/api",
// // });
// const API = axios.create({
//   baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
// });


// API.interceptors.request.use((req) => {
//   const token = localStorage.getItem("token");
//   if (token) req.headers.Authorization = `Bearer ${token}`;
//   return req;
// });



import axios from "axios";

const API = axios.create({
  baseURL: "https://jobhive-backend-3loy.onrender.com/api",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;
// export default API;
