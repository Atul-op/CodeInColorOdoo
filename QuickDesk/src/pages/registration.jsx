import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append("username", formData.username);
      data.append("email", formData.email);
      data.append("password", formData.password);
      data.append("role", formData.role);
      // data.append("avatar", file); // if you later add file input

      await axios.post("/api/auth/register", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Registered successfully");
      navigate("/");
    } catch (err) {
      console.log("❌ Register Error:", err.response?.data || err);
      toast.error(err.response?.data?.msg || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-white">
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full md:w-1/2 flex justify-center items-center p-6"
      >
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white rounded shadow p-8 space-y-4"
        >
          <h2 className="text-3xl font-bold text-blue-600 text-center">
            Register
          </h2>

          <input
            type="text"
            name="username"
            placeholder="Username"
            className="w-full border px-4 py-2 rounded outline-blue-500"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full border px-4 py-2 rounded outline-blue-500"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full border px-4 py-2 rounded outline-blue-500"
            onChange={handleChange}
            required
          />

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded outline-blue-500"
          >
            <option value="user">User</option>
            <option value="agent">Agent</option>
            <option value="admin">Admin</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            {loading ? "Registering..." : "Register"}
          </button>

          <p className="text-center text-sm">
            Already have an account?{" "}
            <Link to="/" className="text-blue-500 underline">
              Login
            </Link>
          </p>
        </form>
      </motion.div>

      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full md:w-1/2 h-[300px] md:h-screen bg-gradient-to-t from-blue-500 to-blue-300 relative overflow-hidden"
      >
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ repeat: Infinity, duration: 5 }}
          className="absolute bottom-0 w-96 h-96 bg-white rounded-full opacity-10 blur-3xl left-1/4"
        ></motion.div>
        <motion.div
          animate={{ y: [20, 0, 20] }}
          transition={{ repeat: Infinity, duration: 7 }}
          className="absolute top-0 w-80 h-80 bg-white rounded-full opacity-5 blur-3xl right-1/4"
        ></motion.div>
      </motion.div>
    </div>
  );
}

export default Register;
