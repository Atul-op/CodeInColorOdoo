// controllers/ticketController.js

const Ticket = require("../models/Ticket");
const User = require("../models/User");

// Create ticket
exports.createTicket = async (req, res) => {
  try {
    const { subject, description, category } = req.body;
    const userId = req.user.id;

    const ticket = await Ticket.create({
      subject,
      description,
      category,
      user: userId,
    });

    res.status(201).json({ msg: "Ticket created successfully", ticket });
  } catch (err) {
    res.status(500).json({ msg: "Failed to create ticket", error: err.message });
  }
};

// Add message (reply)
exports.addMessage = async (req, res) => {
  try {
    const { ticketId } = req.params;
    const { message } = req.body;

    const ticket = await Ticket.findById(ticketId);
    if (!ticket) return res.status(404).json({ msg: "Ticket not found" });

    ticket.messages.push({ sender: req.user.id, message });
    await ticket.save();

    res.status(200).json({ msg: "Message added successfully", ticket });
  } catch (err) {
    res.status(500).json({ msg: "Failed to add message", error: err.message });
  }
};

// Upvote ticket
exports.upvoteTicket = async (req, res) => {
  try {
    const { ticketId } = req.params;
    const userId = req.user.id;

    const ticket = await Ticket.findById(ticketId);
    if (!ticket) return res.status(404).json({ msg: "Ticket not found" });

    if (!ticket.upvotes.includes(userId)) {
      ticket.upvotes.push(userId);
      ticket.downvotes = ticket.downvotes.filter((id) => id.toString() !== userId);
    }

    await ticket.save();
    res.status(200).json({ msg: "Ticket upvoted", upvotes: ticket.upvotes.length });
  } catch (err) {
    res.status(500).json({ msg: "Failed to upvote", error: err.message });
  }
};

// Downvote ticket
exports.downvoteTicket = async (req, res) => {
  try {
    const { ticketId } = req.params;
    const userId = req.user.id;

    const ticket = await Ticket.findById(ticketId);
    if (!ticket) return res.status(404).json({ msg: "Ticket not found" });

    if (!ticket.downvotes.includes(userId)) {
      ticket.downvotes.push(userId);
      ticket.upvotes = ticket.upvotes.filter((id) => id.toString() !== userId);
    }

    await ticket.save();
    res.status(200).json({ msg: "Ticket downvoted", downvotes: ticket.downvotes.length });
  } catch (err) {
    res.status(500).json({ msg: "Failed to downvote", error: err.message });
  }
};

// Search and filter tickets with pagination & sorting
exports.searchTickets = async (req, res) => {
  try {
    const { status, category, keyword, sortBy, page = 1, limit = 10 } = req.query;
    const userId = req.user.role === "user" ? req.user.id : null;

    let filter = {};
    if (userId) filter.user = userId;
    if (status) filter.status = status;
    if (category) filter.category = category;
    if (keyword) {
      filter.$or = [
        { subject: new RegExp(keyword, "i") },
        { description: new RegExp(keyword, "i") },
      ];
    }

    let sortOptions = { updatedAt: -1 };
    if (sortBy === "most-replied") sortOptions = { "messages.length": -1 };

    const tickets = await Ticket.find(filter)
      .sort(sortOptions)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .populate("user", "username")
      .populate("agent", "username")
      .populate("messages.sender", "username");

    res.status(200).json({ tickets });
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch tickets", error: err.message });
  }
};

// Assign agent to ticket
exports.assignAgent = async (req, res) => {
  try {
    const { ticketId } = req.params;
    const { agentId } = req.body;

    const agent = await User.findById(agentId);
    if (!agent || agent.role !== "agent") {
      return res.status(400).json({ msg: "Invalid agent ID or not an agent" });
    }

    const ticket = await Ticket.findByIdAndUpdate(ticketId, { agent: agentId }, { new: true });
    if (!ticket) return res.status(404).json({ msg: "Ticket not found" });

    res.status(200).json({ msg: "Agent assigned", ticket });
  } catch (err) {
    res.status(500).json({ msg: "Failed to assign agent", error: err.message });
  }
};

// Update ticket status
exports.updateStatus = async (req, res) => {
  try {
    const { ticketId } = req.params;
    const { status } = req.body;
    const allowed = ["Open", "In Progress", "Resolved", "Closed"];

    if (!allowed.includes(status)) return res.status(400).json({ msg: "Invalid status" });

    const ticket = await Ticket.findByIdAndUpdate(ticketId, { status }, { new: true });
    if (!ticket) return res.status(404).json({ msg: "Ticket not found" });

    res.status(200).json({ msg: "Status updated", ticket });
  } catch (err) {
    res.status(500).json({ msg: "Failed to update status", error: err.message });
  }
};

// Get logged-in user's tickets
exports.getMyTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ user: req.user.id }).sort({ updatedAt: -1 });
    res.status(200).json({ tickets });
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch my tickets", error: err.message });
  }
};

// Get all tickets for agents/admins
exports.getAllTickets = async (req, res) => {
  try {
    if (req.user.role !== "admin" && req.user.role !== "agent") {
      return res.status(403).json({ msg: "Access denied" });
    }

    const tickets = await Ticket.find()
      .populate("user", "username")
      .populate("agent", "username")
      .populate("messages.sender", "username");

    res.status(200).json({ tickets });
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch tickets", error: err.message });
  }
};
