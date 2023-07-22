// header.js
"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";

const Header = ({ setView }) => {
  const [baseDropdownOpen, setBaseDropdownOpen] = useState(false);
  const [floatDropdownOpen, setFloatDropdownOpen] = useState(false);
  const [booleanDropdownOpen, setBooleanDropdownOpen] = useState(false);
  const [otherDropdownOpen, setOtherDropdownOpen] = useState(false);

  const baseRef = useRef();
  const floatRef = useRef();
  const booleanRef = useRef();
  const otherRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (baseRef.current && !baseRef.current.contains(e.target)) {
        setBaseDropdownOpen(false);
      }
      if (floatRef.current && !floatRef.current.contains(e.target)) {
        setFloatDropdownOpen(false);
      }
      if (booleanRef.current && !booleanRef.current.contains(e.target)) {
        setBooleanDropdownOpen(false);
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
    <>
      <div
        className="flex items-center justify-center cursor-pointer"
        onClick={() => setView("image")}
      >
        <Image src="/img/bcit.png" alt="BCIT" width={87} height={73} />
      </div>
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-1 box-shadow">
        <div className="relative" ref={baseRef} style = {{zIndex: 1}}>
          <div
            className="rounded bg-white shadow cursor-pointer box-shadow"
            onClick={() => setBaseDropdownOpen(!baseDropdownOpen)}
          >
            Base
          </div>
          {baseDropdownOpen && (
            <div className="absolute right-0">
              <div
                className="py-1 box-shadow"
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
        <div className="relative" ref={floatRef} style = {{zIndex: 1}}>
          <div
            className="rounded bg-white shadow cursor-pointer box-shadow"
            onClick={() => setFloatDropdownOpen(!floatDropdownOpen)}
          >
            Floating Point
          </div>
          {floatDropdownOpen && (
            <div className="absolute right-0">
              <div
                className="py-1 box-shadow"
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
                    setView("miniFloatCalculator");
                    setFloatDropdownOpen(false);
                  }}
                >
                  Floating Point Calculator
                </a>
              </div>
            </div>
          )}
        </div>
        <div className="relative" ref={booleanRef} style = {{zIndex: 1}}>
          <div
            className="rounded bg-white shadow cursor-pointer box-shadow"
            onClick={() => setBooleanDropdownOpen(!booleanDropdownOpen)}
          >
            Boolean
          </div>
          {booleanDropdownOpen && (
            <div className="absolute right-0">
              <div
                className="py-1 box-shadow"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                  onClick={() => {
                    setView("booleanCalculator");
                    setBooleanDropdownOpen(false);
                  }}
                >
                  Boolean Calculator
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                  onClick={() => {
                    setView("booleanSimplifier");
                    setBooleanDropdownOpen(false);
                  }}
                >
                  Boolean Simplifier
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                  onClick={() => {
                    setView("booleanExpression");
                    setBooleanDropdownOpen(false);
                  }}
                >
                  Boolean Expression
                </a>
              </div>
            </div>
          )}
        </div>
        <div className="relative" ref={otherRef} style = {{zIndex: 1}}>
          <div
            className="rounded bg-white shadow cursor-pointer box-shadow"
            onClick={() => setOtherDropdownOpen(!otherDropdownOpen)}
          >
            Other Operations
          </div>
          {otherDropdownOpen && (
            <div className="absolute right-0">
              <div
                className="py-1 box-shadow"
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
    </>
  );
};

export default Header;
