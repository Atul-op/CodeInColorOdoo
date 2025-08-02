import { useEffect, useState } from "react";
import axios from "../api/axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

function TicketDetail() {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [msg, setMsg] = useState("");

  const fetchTicket = async () => {
    try {
      const res = await axios.get(`/api/tickets/${id}`);
      setTicket(res.data.ticket);
    } catch {
      toast.error("Failed to load ticket");
    }
  };

  const postMessage = async () => {
    try {
      await axios.post(`/api/tickets/comment/${id}`, { message: msg });
      setMsg("");
      fetchTicket();
    } catch {
      toast.error("Failed to send message");
    }
  };

  useEffect(() => {
    fetchTicket();
  }, []);

  if (!ticket) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-blue-600">{ticket.subject}</h1>
      <p>{ticket.description}</p>

      <div className="mt-6 space-y-2">
        <h3 className="font-semibold">Messages:</h3>
        {ticket.messages.map((m, i) => (
          <div key={i} className="border p-2 rounded">
            <p>{m.message}</p>
            <p className="text-sm text-gray-500">
              {new Date(m.createdAt).toLocaleString()}
            </p>
          </div>
        ))}

        <div className="mt-4">
          <textarea
            className="w-full border p-2 rounded"
            rows={3}
            placeholder="Type a message..."
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
          ></textarea>
          <button
            onClick={postMessage}
            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default TicketDetail;