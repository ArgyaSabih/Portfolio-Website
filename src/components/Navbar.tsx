"use client";

import {useState} from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => setIsOpen(false);

  return (
    <div className="flex w-[90%] min-h-[70px] xl:max-w-[1500px] mx-auto justify-between items-center py-1 md:py-4 sticky top-0 bg-primary z-[999]">
      {/* Logo */}
      <div className="reveal-right reveal-logo text-3xl px-2 sm:px-0 font-bold text-primary-text">AS</div>

      {/* Navigation */}
      <nav
        className={`
          fixed md:relative
          w-1/2 md:w-auto
          right-0 top-0
          h-screen md:h-auto
          bg-primary
          border-l border-border-custom md:border-l-0
          z-[9]
          transition-transform duration-200 ease-in-out
          ${isOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"}
        `}
      >
        <ul className="flex flex-col md:flex-row items-center justify-center h-full md:h-auto gap-12 bg-primary">
          <li>
            <a
              href="#portfolios"
              onClick={closeMenu}
              className="reveal-right reveal-nav text-primary-text hover:text-accent transition-colors duration-300"
            >
              Portfolio
            </a>
          </li>
          <li>
            <a
              href="#skills"
              onClick={closeMenu}
              className="reveal-right reveal-nav text-primary-text hover:text-accent transition-colors duration-300"
            >
              Skills
            </a>
          </li>
          <li>
            <a
              href="#contact"
              onClick={closeMenu}
              className="reveal-right reveal-nav text-primary-text hover:text-accent transition-colors duration-300"
            >
              Contact
            </a>
          </li>
          <li>
            <a
              href="https://argyasabih.github.io/Portfolio-Website/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="reveal-right reveal-nav px-6 py-4 rounded-[10px] font-bold bg-accent text-primary-text hover:bg-accent-hover transition-all duration-300 cursor-pointer border-none">
                Resume
              </button>
            </a>
          </li>
        </ul>
      </nav>

      {/* Burger Menu */}
      <div
        className="reveal-burger block md:hidden cursor-pointer fixed top-0 right-0 z-[99] bg-primary p-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div
          className={`w-[25px] h-[2px] bg-primary-text my-[7px] transition-all duration-300 ${
            isOpen ? "-rotate-45 -translate-x-[6px] translate-y-[9px]" : ""
          }`}
        />
        <div
          className={`w-[25px] h-[2px] bg-primary-text my-[7px] transition-all duration-300 ${
            isOpen ? "opacity-0" : ""
          }`}
        />
        <div
          className={`w-[25px] h-[2px] bg-primary-text my-[7px] transition-all duration-300 ${
            isOpen ? "rotate-45 -translate-x-[6px] -translate-y-[9px]" : ""
          }`}
        />
      </div>
    </div>
  );
}
