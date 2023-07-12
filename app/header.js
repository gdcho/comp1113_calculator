// header.js
"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";

const Header = ({ setView }) => {
  const [baseDropdownOpen, setBaseDropdownOpen] = useState(false);
  const [floatDropdownOpen, setFloatDropdownOpen] = useState(false);
  const [otherDropdownOpen, setOtherDropdownOpen] = useState(false);

  const baseRef = useRef();
  const floatRef = useRef();
  const otherRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (baseRef.current && !baseRef.current.contains(e.target)) {
        setBaseDropdownOpen(false);
      }
      if (floatRef.current && !floatRef.current.contains(e.target)) {
        setFloatDropdownOpen(false);
      }
      if (otherRef.current && !otherRef.current.contains(e.target)) {
        setOtherDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-stone-100 py-1 px-2">
      <nav className="container flex flex-col md:flex-row items-center justify-between text-sm font-mono tracking-wider uppercase text-stone-500 cursor-pointer">
        <div
          className="flex items-center mr-2 mb-4 md:mb-0"
          onClick={() => setView("image")}
        >
          <Image src="/img/bcit.png" alt="BCIT" width={87} height={73} />
        </div>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-5">
          <div className="relative" ref={baseRef}>
            <div
              className="px-4 py-2 rounded bg-white shadow cursor-pointer"
              onClick={() => setBaseDropdownOpen(!baseDropdownOpen)}
            >
              Base
            </div>
            {baseDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                <div
                  className="py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    role="menuitem"
                    onClick={() => {
                      setView("baseConverter");
                      setBaseDropdownOpen(false);
                    }}
                  >
                    Base Converter
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    role="menuitem"
                    onClick={() => {
                      setView("baseCalculator");
                      setBaseDropdownOpen(false);
                    }}
                  >
                    Base Calculator
                  </a>
                </div>
              </div>
            )}
          </div>
          <div className="relative" ref={floatRef}>
            <div
              className="px-4 py-2 rounded bg-white shadow cursor-pointer"
              onClick={() => setFloatDropdownOpen(!floatDropdownOpen)}
            >
              Floating Point
            </div>
            {floatDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                <div
                  className="py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    role="menuitem"
                    onClick={() => {
                      setView("miniFloatConverter");
                      setFloatDropdownOpen(false);
                    }}
                  >
                    Floating Point Converter
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    role="menuitem"
                    onClick={() => {
                      setView("floatCalculator");
                      setFloatDropdownOpen(false);
                    }}
                  >
                    Floating Point Calculator
                  </a>
                </div>
              </div>
            )}
          </div>
          <div className="relative" ref={otherRef}>
            <div
              className="px-4 py-2 rounded bg-white shadow cursor-pointer"
              onClick={() => setOtherDropdownOpen(!otherDropdownOpen)}
            >
              Other Operations
            </div>
            {otherDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                <div
                  className="py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    role="menuitem"
                    onClick={() => {
                      setView("numberConverter");
                      setOtherDropdownOpen(false);
                    }}
                  >
                    Signed Number 
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    role="menuitem"
                    onClick={() => {
                      setView("booleanCalculator");
                      setOtherDropdownOpen(false);
                    }}
                  >
                    Boolean Calculator
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    role="menuitem"
                    onClick={() => {
                      setView("exponentialOrLogarithm");
                      setOtherDropdownOpen(false);
                    }}
                  >
                    Log/Exp Calculator
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    role="menuitem"
                    onClick={() => {
                      setView("matrixCalculator");
                      setOtherDropdownOpen(false);
                    }}
                  >
                    Matrix Calculator
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
