const express = require("express");
const router = express.Router();
const ticketCtrl = require("../controllers/ticketController");
const { verifyToken, allowRoles, isAgent, isAdmin } = require("../middleware/auth");

// ✅ Create ticket — only USER allowed
router.post("/create", verifyToken, allowRoles("user"), ticketCtrl.createTicket);

// ✅ User's tickets
router.get("/my", verifyToken, allowRoles("user"), ticketCtrl.getMyTickets);

// 🔍 Search tickets — everyone allowed (user/agent/admin)
router.get("/search", verifyToken, ticketCtrl.searchTickets);

// 💬 Add message — all roles
router.post("/:ticketId/message", verifyToken, ticketCtrl.addMessage);

// 👍/👎 votes — all roles
router.post("/:ticketId/upvote", verifyToken, ticketCtrl.upvoteTicket);
router.post("/:ticketId/downvote", verifyToken, ticketCtrl.downvoteTicket);

// ✅ Assign — only admin
router.put("/assign/:ticketId", verifyToken, isAdmin, ticketCtrl.assignAgent);

// ✅ Status update — only agent
router.put("/status/:ticketId", verifyToken, isAgent, ticketCtrl.updateStatus);

// ✅ Get all — only agent or admin
router.get("/all", verifyToken, allowRoles("agent", "admin"), ticketCtrl.getAllTickets);

// 🛠️ THIS LINE IS VERY IMPORTANT
module.exports = router;
