import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null); // 👈 Role bhi track karega

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    // 👇 Decode JWT manually (simple way) — or use backend decoding in real apps
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setRole(payload.role);
    } else {
      setRole(null);
    }
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const navItems = [];

  // 🧑‍💼 User: home, my tickets, create
  if (role === "user") {
    navItems.push(
      { name: "Home", to: "/home" },
      { name: "My Tickets", to: "/my-tickets" },
      { name: "Create Ticket", to: "/create" }
    );
  }

  // 🛠️ Agent: home, dashboard
  if (role === "agent") {
    navItems.push(
      { name: "Home", to: "/home" },
      { name: "Dashboard", to: "/dashboard" }
    );
  }

  // 👑 Admin: home, dashboard (and optionally my tickets/create)
  if (role === "admin") {
    navItems.push(
      { name: "Home", to: "/home" },
      { name: "Dashboard", to: "/dashboard" }
    );
    // Agar admin ko ticket banane dena hai:
    // navItems.push({ name: "Create Ticket", to: "/create" });
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-blue-600 text-white shadow-md sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <motion.h1
          whileHover={{ scale: 1.05 }}
          className="text-2xl font-bold cursor-pointer"
          onClick={() => navigate("/home")}
        >
          SupportDesk
        </motion.h1>

        {isLoggedIn && (
          <div className="space-x-3 flex items-center">
            {navItems.map((item) => (
              <motion.button
                key={item.name}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(item.to)}
                className={`px-3 py-1 rounded font-medium transition ${
                  location.pathname === item.to
                    ? "bg-white text-blue-600"
                    : "bg-blue-500 text-white hover:bg-blue-400"
                }`}
              >
                {item.name}
              </motion.button>
            ))}

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
            >
              Logout
            </motion.button>
          </div>
        )}
      </div>
    </motion.nav>
  );
}

export default Navbar;
