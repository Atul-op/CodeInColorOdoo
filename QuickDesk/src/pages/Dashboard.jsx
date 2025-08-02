import { useEffect, useState } from "react";
import axios from "../api/axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

function Dashboard() {
  const [tickets, setTickets] = useState([]);

  const fetchAll = async () => {
    try {
      const res = await axios.get("/api/tickets/all"); // backend mein route hona chahiye
      setTickets(res.data.tickets);
    } catch (err) {
      toast.error("Failed to load tickets");
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`/api/tickets/status/${id}`, { status });
      toast.success("Status updated");
      fetchAll();
    } catch {
      toast.error("Failed to update status");
    }
  };

  const assignSelf = async (id) => {
    try {
      await axios.put(`/api/tickets/assign/${id}`);
      toast.success("Assigned to you");
      fetchAll();
    } catch {
      toast.error("Failed to assign");
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <div className="p-6 bg-blue-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tickets.map((ticket) => (
          <motion.div
            key={ticket._id}
            className="bg-white p-4 rounded shadow space-y-2"
            whileHover={{ scale: 1.02 }}
          >
            <h2 className="font-bold text-blue-600">{ticket.subject}</h2>
            <p>{ticket.description}</p>
            <p>Status: {ticket.status}</p>
            <div className="flex gap-2 mt-2">
              <select
                defaultValue={ticket.status}
                onChange={(e) => updateStatus(ticket._id, e.target.value)}
                className="border px-2 py-1 rounded"
              >
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
                <option value="Closed">Closed</option>
              </select>
              {!ticket.agent && (
                <button
                  onClick={() => assignSelf(ticket._id)}
                  className="bg-blue-600 text-white px-2 py-1 rounded"
                >
                  Assign to Me
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;