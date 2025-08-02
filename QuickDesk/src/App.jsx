import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./pages/login";
import Register from "./pages/registration";
import Home from "./pages/Home";
import CreateTicket from "./pages/CreateTicket";
import MyTickets from "./pages/MyTickets";
import TicketDetail from "./pages/TicketDetail";
import Dashboard from "./pages/Dashboard";
import Navbar from "../components/Navbar";

// 🛡️ Protected route wrapper
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/" />;
};

function App() {
  const isLoggedIn = localStorage.getItem("token");

  return (
    <>
      {/* Show Navbar if user is logged in */}
      {isLoggedIn && <Navbar />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/home"
          element={<PrivateRoute><Home /></PrivateRoute>}
        />
        <Route
          path="/create"
          element={<PrivateRoute><CreateTicket /></PrivateRoute>}
        />
        <Route
          path="/my-tickets"
          element={<PrivateRoute><MyTickets /></PrivateRoute>}
        />
        <Route
          path="/ticket/:id"
          element={<PrivateRoute><TicketDetail /></PrivateRoute>}
        />
        <Route
          path="/dashboard"
          element={<PrivateRoute><Dashboard /></PrivateRoute>}
        />
      </Routes>

      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
}

export default App;
