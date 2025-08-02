import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

function Home() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyTickets = async () => {
    try {
      const res = await axios.get("/api/tickets/my");
      setTickets(res.data.tickets);
    } catch (err) {
      toast.error("Failed to load tickets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyTickets();
  }, []);

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-4xl font-bold text-blue-700 mb-6 text-center">
        My Tickets
      </h1>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : tickets.length === 0 ? (
        <p className="text-center text-gray-500">No tickets found</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tickets.map((ticket) => (
            <motion.div
              key={ticket._id}
              className="bg-white shadow-md rounded-lg p-4 border hover:shadow-lg transition-all"
              whileHover={{ scale: 1.02 }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-xl font-semibold text-blue-600">
                {ticket.subject}
              </h2>
              <p className="text-sm text-gray-600">{ticket.description}</p>
              <p className="mt-2 text-sm">
                <strong>Status:</strong> {ticket.status}
              </p>
              <p className="text-sm">
                <strong>Category:</strong> {ticket.category}
              </p>
              <p className="text-sm">
                <strong>Updated:</strong> {new Date(ticket.updatedAt).toLocaleString()}
              </p>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default Home;
