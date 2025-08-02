import { useEffect, useState } from "react";
import axios from "../api/axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const TicketCard = ({ ticket, onUpvote, onDownvote }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="border shadow-md rounded-lg p-4 bg-white space-y-2"
    >
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-blue-600">
          {ticket.subject}
        </h3>
        <span className={`text-sm px-2 py-1 rounded-full ${
          ticket.status === "Open"
            ? "bg-green-100 text-green-600"
            : ticket.status === "In Progress"
            ? "bg-yellow-100 text-yellow-600"
            : "bg-gray-100 text-gray-600"
        }`}>
          {ticket.status}
        </span>
      </div>
      <p className="text-gray-600">{ticket.description}</p>
      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>Category: {ticket.category}</span>
        <span>Updated: {new Date(ticket.updatedAt).toLocaleString()}</span>
      </div>
      <div className="flex gap-4 mt-2">
        <button
          onClick={() => onUpvote(ticket._id)}
          className="text-sm bg-blue-100 text-blue-600 px-2 py-1 rounded"
        >
          ⬆️ {ticket.upvotes.length}
        </button>
        <button
          onClick={() => onDownvote(ticket._id)}
          className="text-sm bg-red-100 text-red-600 px-2 py-1 rounded"
        >
          ⬇️ {ticket.downvotes.length}
        </button>
      </div>
    </motion.div>
  );
};

const MyTickets = () => {
  const [tickets, setTickets] = useState([]);

  const fetchTickets = async () => {
    try {
      const res = await axios.get("/api/tickets/my");
      setTickets(res.data.tickets);
    } catch (err) {
      toast.error("Failed to fetch your tickets");
    }
  };

  const handleUpvote = async (ticketId) => {
    try {
      await axios.put(`/api/tickets/upvote/${ticketId}`);
      fetchTickets();
    } catch (err) {
      toast.error("Failed to upvote");
    }
  };

  const handleDownvote = async (ticketId) => {
    try {
      await axios.put(`/api/tickets/downvote/${ticketId}`);
      fetchTickets();
    } catch (err) {
      toast.error("Failed to downvote");
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <h2 className="text-3xl font-bold text-blue-600 mb-6">My Tickets</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tickets.map((ticket) => (
          <TicketCard
            key={ticket._id}
            ticket={ticket}
            onUpvote={handleUpvote}
            onDownvote={handleDownvote}
          />
        ))}
      </div>
    </div>
  );
};

export default MyTickets;
