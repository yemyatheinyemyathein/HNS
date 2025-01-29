import { useState } from "react";
import { motion } from "framer-motion";
import { Search, ShoppingCart, Menu } from "lucide-react";
import Logo from "../../assets/Logo.png";
import LeftSideBar from "./LeftSideBar";

const navItems = ["Home", "About", "Products", "Contact", "FAQ"];

const TopNav = () => {
  const [activeLink, setActiveLink] = useState("Home");
  const [searchOpened, setSearchOpened] = useState(false);
  const [cartItems] = useState(3);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-[#191919] text-white px-6 py-4 fixed w-full top-0 z-50 shadow-md">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Burger Menu (Mobile) */}
        <button
          className="md:hidden text-white hover:text-gray-300 transition"
          onClick={() => setMenuOpen(true)}
        >
          <Menu size={24} />
        </button>

        {/* Logo - Centered on mobile */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-2"
        >
          <img src={Logo} alt="Logo" className="w-[30px] h-[30px]" />
          <span className="text-[20px] font-semibold tracking-[0.1rem]">
            HNS
          </span>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 relative">
          {navItems.map((item) => (
            <motion.div
              key={item}
              whileHover={{ scale: 1.05 }}
              className="relative"
            >
              <button
                className={`transition ${
                  activeLink === item
                    ? "font-bold border-b-2 border-[#F93827] text-[#F93827]"
                    : ""
                }`}
                onClick={() => setActiveLink(item)}
              >
                {item}
              </button>
            </motion.div>
          ))}
        </nav>

        {/* Right Section: Search & Cart */}
        <div className="flex items-center space-x-4">
          {/* Search Button */}
          <button onClick={() => setSearchOpened(!searchOpened)}>
            <Search
              size={20}
              className="text-gray-300 hover:text-white transition"
            />
          </button>

          {/* Shopping Cart */}
          <motion.div whileHover={{ scale: 1.05 }} className="relative">
            <button className="relative">
              <ShoppingCart
                size={20}
                className="text-gray-300 hover:text-white transition"
              />
              {cartItems > 0 && (
                <span className="absolute -top-3 -right-3 bg-[#F93827] text-white text-xs font-bold px-2 py-1 rounded-full">
                  {cartItems}
                </span>
              )}
            </button>
          </motion.div>
        </div>
      </div>

      {/* Mobile Sidebar Menu */}
      <LeftSideBar menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
    </header>
  );
};

export default TopNav;
