import { useState, useRef, useEffect } from "react";
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
  const [underlineLeft, setUnderlineLeft] = useState(0);
  const [underlineWidth, setUnderlineWidth] = useState(0);
  const navRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const updateUnderlinePosition = () => {
      const activeIndex = navItems.indexOf(activeLink);
      const activeItem = itemsRef.current[activeIndex];
      const nav = navRef.current;

      if (activeItem && nav) {
        const navRect = nav.getBoundingClientRect();
        const itemRect = activeItem.getBoundingClientRect();

        const left = itemRect.left - navRect.left;
        const width = itemRect.width;

        setUnderlineLeft(left);
        setUnderlineWidth(width);
      }
    };

    updateUnderlinePosition();
    window.addEventListener("resize", updateUnderlinePosition);

    return () => window.removeEventListener("resize", updateUnderlinePosition);
  }, [activeLink]);

  return (
    <header
      className={`${isScrolled
          ? "bg-[#191919]/0 backdrop-blur-2xl shadow-lg"  // Added transparency
          : "bg-transparent"
        }  px-6 py-4 fixed w-full top-0 z-50 transition-all duration-300`}
    >
      {" "}
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Burger Menu (Mobile) */}
        <button
          className="md:hidden hover:text-gray-300 transition"
          onClick={() => setMenuOpen(true)}
        >
          <Menu size={24} />
        </button>

        {/* Logo */}
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
        <nav ref={navRef} className="hidden md:flex space-x-6 relative">
          {navItems.map((item, index) => (
            <motion.div
              key={item}
              whileHover={{ scale: 1.05 }}
              className="relative"
            >
              <button
                ref={(el) => (itemsRef.current[index] = el)}
                className={`transition ${activeLink === item ? "font-bold text-[#F93827]" : ""
                  }`}
                onClick={() => setActiveLink(item)}
              >
                {item}
              </button>
            </motion.div>
          ))}

          {/* Animated Underline */}
          <motion.div
            className="absolute bottom-0 h-[2px] bg-[#F93827]"
            animate={{
              left: underlineLeft,
              width: underlineWidth,
            }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20,
            }}
          />
        </nav>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          <button onClick={() => setSearchOpened(!searchOpened)}>
            <Search
              size={20}
              className="transition"
            />
          </button>

          <motion.div whileHover={{ scale: 1.05 }} className="relative">
            <button className="relative">
              <ShoppingCart
                size={20}
                className="transition"
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
      <LeftSideBar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
    </header>
  );
};

export default TopNav;
