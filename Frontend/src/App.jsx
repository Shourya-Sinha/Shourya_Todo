import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Nav from "./Navbar/Nav";
import Home from "./AllPages/Home";
import AddTask from "./AllPages/AddTask";
import Complete from "./AllPages/Complete";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import ForgotPassword from "./Auth/ForgotPassword";
import ResetPassword from "./Auth/ResetPassword";
import Profile from "./AllPages/Profile";
import { useSelector } from "react-redux";
import ProtectedRoute from "./Auth/ProtectedRoute ";


function App() {



  return (
    <>
      {/* <BrowserRouter>
        <Routes>


           <Route path="/" element={<Nav />}>
            <Route path="/" element={<Home />} />
            <Route path="/add-task" element={<AddTask />} />
            <Route path="/*" element={<h1>404 Page Not Found</h1>} />
            <Route path="/complete" element={<Complete />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-pass" element={<ForgotPassword />} />
            <Route path="/reset-pass" element={<ResetPassword />} />
            <Route path="/profile" element={<Profile />} />
          </Route> *
        </Routes>
      </BrowserRouter> */}
       <BrowserRouter>
      <Routes>
        <Route path="/" element={<Nav />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-pass" element={<ForgotPassword />} />
          <Route path="/reset-pass" element={<ResetPassword />} />
          
          <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="/add-task" element={
            <ProtectedRoute>
              <AddTask />
            </ProtectedRoute>
          } />
          <Route path="/complete" element={
            <ProtectedRoute>
              <Complete />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path="/*" element={<h1>404 Page Not Found</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

// const RequireAuth = ({ children }) => {
//   const token = useSelector((state) => state.auth.token);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!token) {
//       navigate('/login');
//     }
//   }, [token, navigate]);

//   return children;
// };


export default App;
