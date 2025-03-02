import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DropDown, DropLeft } from "../../svg/svg";

type DropdownItem = {
  label: string | JSX.Element;
  onclick?: () => void;
  subItems?: DropdownItem[] | React.ReactNode;
  icon?: React.ReactNode;
};

type DropdownProps = {
  buttonLabel: React.ReactNode;
  items: DropdownItem[];
};

const Dropdown: React.FC<DropdownProps> = ({ buttonLabel, items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItemIndex, setActiveItemIndex] = useState<number | null>(null);
  const [selectedSubItem, setSelectedSubItem] = useState<string | null>(null);
  const [position, setPosition] = useState<"bottom" | "top">("bottom");

  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const savedSubItem = localStorage.getItem("activeSubItem");
    if (savedSubItem) {
      setSelectedSubItem(savedSubItem);

      const foundIndex = items.findIndex((item) =>
        item.subItems && Array.isArray(item.subItems)
          ? item.subItems.some(
              (subItem) =>
                typeof subItem === "object" &&
                extractTextFromJSX(subItem.label) === savedSubItem
            )
          : false
      );
      if (foundIndex !== -1) {
        setActiveItemIndex(foundIndex);
      }
    }
  }, [items]);

  useEffect(() => {
    if (selectedSubItem) {
      localStorage.setItem("activeSubItem", selectedSubItem);
    }
  }, [selectedSubItem]);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
    adjustDropdownPosition();
  };

  const handleItemClick = (index: number, item: DropdownItem) => {
    if (!item.subItems) {
      setActiveItemIndex(index === activeItemIndex ? null : index);
      localStorage.removeItem("activeSubItem");
      if (index === activeItemIndex) {
        setSelectedSubItem(null);
      }
    } else {
      setActiveItemIndex(index === activeItemIndex ? null : index);
    }
    item.onclick?.();
    setIsOpen(true);
  };

  const handleSubItemClick = (subItem: DropdownItem) => {
    const label =
      typeof subItem.label === "string"
        ? subItem.label
        : extractTextFromJSX(subItem.label);

    setSelectedSubItem(label);
    localStorage.setItem("activeSubItem", label);
    subItem.onclick?.();
    setIsOpen(true);
  };

  const extractTextFromJSX = (element: React.ReactNode): string => {
    if (typeof element === "string") {
      return element;
    }

    if (React.isValidElement(element)) {
      const elementProps = element.props as { children?: React.ReactNode };
      return extractTextFromChildren(elementProps.children);
    }

    return "";
  };

  const extractTextFromChildren = (children: React.ReactNode): string => {
    let text = "";
    React.Children.forEach(children, (child) => {
      if (typeof child === "string") {
        text += child;
      } else if (React.isValidElement(child)) {
        const elementProps = child.props as { children?: React.ReactNode };
        text += extractTextFromChildren(elementProps.children);
      }
    });
    return text;
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
      setActiveItemIndex(null);
      setSelectedSubItem(null);
    }
  };

  const adjustDropdownPosition = () => {
    if (buttonRef.current && dropdownRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const dropdownHeight = dropdownRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;

      const canShowBelow = buttonRect.bottom + dropdownHeight <= viewportHeight;
      setPosition(canShowBelow ? "bottom" : "top");
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    if (isOpen) adjustDropdownPosition();
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        ref={buttonRef}
        onClick={toggleDropdown}
        className="px-2 py-2 flex text-white rounded-full flex items-center justify-center shadow-md focus:outline-none"
      >
        {buttonLabel}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`absolute ${position === "bottom" ? "top-full mt-2" : "bottom-full mb-2"} right-0 z-[9999] w-[250px] bg-[#333643] text-white rounded-[24px] shadow-lg z-20 custom-scrollbar`}
          >
            <ul className="py-2 z-99">
              {items.map((item, index) => {
                const isActive =
                  activeItemIndex === index ||
                  selectedSubItem === extractTextFromJSX(item.label);
                return (
                  <li key={index} className="relative">
                    <div
                      onClick={() => handleItemClick(index, item)}
                      className={`flex items-center justify-between px-4 py-2 cursor-pointer rounded-lg text-[17px] 
                        ${isActive ? "text-white font-semibold" : "font-thin"}`}
                    >
                      <span
                        className={`w-full flex items-center justify-between`}
                      >
                        {item.icon && <span className="">{item.icon}</span>}
                        <span
                          className={`${isActive ? "text-white font-semibold" : "font-thin"}`}
                        >
                          {item.label}
                        </span>
                        {item.subItems && (
                          <span className="ml-2">
                            {activeItemIndex === index ? (
                              <DropDown />
                            ) : (
                              <DropLeft />
                            )}
                          </span>
                        )}
                        {/* Show dot for non-subItems when active */}
                        {!item.subItems && isActive && (
                          <span className="ml-2 text-white">•</span>
                        )}
                      </span>
                    </div>

                    <AnimatePresence>
                      {item.subItems && activeItemIndex === index && (
                        <motion.ul
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="custom-scrollbar"
                        >
                          {Array.isArray(item.subItems) ? (
                            item.subItems.map((subItem, subIndex) => {
                              const subItemLabel = extractTextFromJSX(
                                subItem.label
                              );
                              return (
                                <li
                                  key={subIndex}
                                  onClick={() => handleSubItemClick(subItem)}
                                  className={`m-0 px-4 py-2 cursor-pointer rounded-lg text-[17px] flex items-center justify-between
                                    ${selectedSubItem === subItemLabel ? "font-semibold" : "font-thin"}`}
                                >
                                  <span className="flex items-center justify-between w-full">
                                    {subItem.icon && (
                                      <span className="mr-2">
                                        {subItem.icon}
                                      </span>
                                    )}
                                    {subItem.label}
                                    {selectedSubItem === subItemLabel && (
                                      <span className="ml-2 text-white">•</span>
                                    )}
                                  </span>
                                </li>
                              );
                            })
                          ) : typeof item.subItems === "object" &&
                            React.isValidElement(item.subItems) ? (
                            <li className="px-4 py-2">{item.subItems}</li>
                          ) : null}
                          <div className="mx-2 w-full h-[1px] bg-[#8F8F8F] opacity-[0.2] my-1" />
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dropdown;
