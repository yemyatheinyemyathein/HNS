import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";

interface LeftSideBarProps {
    menuOpen: boolean;
    setMenuOpen: (open: boolean) => void;
  }

const navItems = ["Home", "About", "Products", "Contact", "FAQ"];
const LeftSideBar: React.FC<LeftSideBarProps> = ({ menuOpen, setMenuOpen }) => {
    const [activeLink, setActiveLink] = useState("Home");

  return (
    <div>
      {/* Mobile Sidebar Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.4 }}
            className="fixed top-0 left-0 w-[250px] h-full bg-[#191919] shadow-lg z-50 flex flex-col p-6"
          >
            {/* Close Button */}
            <button
              className="self-end mb-4 text-white hover:text-gray-300 transition"
              onClick={() => setMenuOpen(false)}
            >
              <X size={24} />
            </button>

            {/* Menu Items */}
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <motion.button
                  key={item}
                  className={`text-lg transition ${
                    activeLink === item
                      ? "text-[#F93827] font-bold"
                      : "text-white"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => {
                    setActiveLink(item);
                    setMenuOpen(false);
                  }}
                >
                  {item}
                </motion.button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LeftSideBar;
