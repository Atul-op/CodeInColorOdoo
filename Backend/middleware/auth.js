const jwt = require("jsonwebtoken");

// Token verification middleware
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, role }
    next();
  } catch (err) {
    res.status(401).json({ msg: "Invalid or expired token." });
  }
};

// Role check middleware factory
const allowRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ msg: "Access denied. Insufficient role." });
    }
    next();
  };
};

// Predefined roles (optional shortcuts)
const isAgent = allowRoles("agent");
const isAdmin = allowRoles("admin");

module.exports = { verifyToken, allowRoles, isAgent, isAdmin };
