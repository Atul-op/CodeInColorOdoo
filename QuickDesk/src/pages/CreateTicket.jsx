import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

function CreateTicket() {
  const [form, setForm] = useState({
    subject: "",
    description: "",
    category: "",
  });

  const [file, setFile] = useState(null); // 🔹 New state for file
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append("subject", form.subject);
      data.append("description", form.description);
      data.append("category", form.category);
      if (file) {
        data.append("file", file); // 🔹 Attach file
      }

      await axios.post("/api/tickets/create", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Ticket created successfully");
      navigate("/home");
    } catch (err) {
      toast.error(err.response?.data?.msg || "Failed to create ticket");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-100 to-blue-100 p-4">
      <motion.form
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-2xl space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-indigo-600">
          Raise a Ticket
        </h2>

        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={form.subject}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg outline-indigo-500"
          required
        />

        <textarea
          name="description"
          placeholder="Describe your issue..."
          value={form.description}
          onChange={handleChange}
          rows={4}
          className="w-full border p-3 rounded-lg outline-indigo-500"
          required
        ></textarea>

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg outline-indigo-500"
          required
        >
          <option value="">Select Category</option>
          <option value="Hardware">Hardware</option>
          <option value="Software">Software</option>
          <option value="Network">Network</option>
          <option value="Other">Other</option>
        </select>

        {/* 🔹 File Upload Input */}
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full border p-3 rounded-lg"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
        >
          {loading ? "Submitting..." : "Submit Ticket"}
        </button>
      </motion.form>
    </div>
  );
}

export default CreateTicket;
