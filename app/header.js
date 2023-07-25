// header.js
"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

const DropdownItem = ({ onClick, label }) => (
  <a
    href="#"
    className="block px-4 py-2 text-xs text-gray-700 hover:bg-gray-100 hover:text-gray-900"
    role="menuitem"
    onClick={onClick}
  >
    {label}
  </a>
);

const Header = ({ setView }) => {
  const dropdownRefs = {
    base: useRef(),
    float: useRef(),
    boolean: useRef(),
    other: useRef(),
  };

  const [dropdownOpen, setDropdownOpen] = useState({
    base: false,
    float: false,
    boolean: false,
    other: false,
  });

  useEffect(() => {
    const handleClickOutside = (e) => {
      Object.keys(dropdownRefs).forEach((key) => {
        if (dropdownRefs[key].current && !dropdownRefs[key].current.contains(e.target)) {
          setDropdownOpen((prevState) => ({ ...prevState, [key]: false }));
        }
      });
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRefs]);

  const toggleDropdown = (dropdownName) => {
    setDropdownOpen((prevState) => ({ ...prevState, [dropdownName]: !prevState[dropdownName] }));
  };

  const handleDropdownItemClick = (view) => {
    setView(view);
    setDropdownOpen((prevState) => ({ ...prevState, base: false, float: false, boolean: false, other: false }));
  };

  return (
    <>
      <div
        className="flex items-center justify-center cursor-pointer"
        onClick={() => setView("image")}
      >
        <Image src="/img/bcit.png" alt="BCIT" width={55} height={55} />
      </div>
      <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-5 box-shadow">
        <div className="relative" ref={dropdownRefs.base} style={{ zIndex: dropdownOpen.base ? 1000 : 1 }}>
          <div className="rounded bg-white shadow cursor-pointer box-shadow" onClick={() => toggleDropdown('base')}>
            Base
          </div>
          {dropdownOpen.base && (
            <div className="absolute right-0">
              <div className="py-1 box-shadow" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                <DropdownItem label="Base Converter" onClick={() => handleDropdownItemClick("baseConverter")} />
                <DropdownItem label="Base Calculator" onClick={() => handleDropdownItemClick("baseCalculator")} />
              </div>
            </div>
          )}
        </div>
        <div className="relative" ref={dropdownRefs.float} style={{ zIndex: dropdownOpen.float ? 1000 : 1 }}>
          <div className="rounded bg-white shadow cursor-pointer box-shadow" onClick={() => toggleDropdown('float')}>
            Floating Point
          </div>
          {dropdownOpen.float && (
            <div className="absolute right-0">
              <div className="py-1 box-shadow" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                <DropdownItem label="Floating Point Converter" onClick={() => handleDropdownItemClick("miniFloatConverter")} />
                <DropdownItem label="Floating Point Calculator" onClick={() => handleDropdownItemClick("miniFloatCalculator")} />
              </div>
            </div>
          )}
        </div>
        <div className="relative" ref={dropdownRefs.boolean} style={{ zIndex: dropdownOpen.boolean ? 1000 : 1 }}>
          <div className="rounded bg-white shadow cursor-pointer box-shadow" onClick={() => toggleDropdown('boolean')}>
            Boolean
          </div>
          {dropdownOpen.boolean && (
            <div className="absolute right-0">
              <div className="py-1 box-shadow" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                <DropdownItem label="Boolean Calculator" onClick={() => handleDropdownItemClick("booleanCalculator")} />
                <DropdownItem label="Boolean Simplifier" onClick={() => handleDropdownItemClick("booleanSimplifier")} />
                <DropdownItem label="Boolean Expression" onClick={() => handleDropdownItemClick("booleanExpression")} />
              </div>
            </div>
          )}
        </div>
        <div className="relative" ref={dropdownRefs.other} style={{ zIndex: dropdownOpen.other ? 1000 : 1 }}>
          <div className="rounded bg-white shadow cursor-pointer box-shadow" onClick={() => toggleDropdown('other')}>
            Other Operations
          </div>
          {dropdownOpen.other && (
            <div className="absolute right-0">
              <div className="py-1 box-shadow" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                <DropdownItem label="Signed Number" onClick={() => handleDropdownItemClick("numberConverter")} />
                <DropdownItem label="Log/Exp Calculator" onClick={() => handleDropdownItemClick("exponentialOrLogarithm")} />
                <DropdownItem label="Matrix Calculator" onClick={() => handleDropdownItemClick("matrixCalculator")} />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
