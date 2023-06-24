// header.js
"use client";

import Image from "next/image";

const Header = () => {
  return (
    <header className="bg-stone-100 py-1 px-2">
      <nav className="container flex items-center justify-between text-sm font-mono tracking-wider uppercase text-stone-500">
        <div className="flex items-center mr-4">
            <Image src="/img/bcit.png" alt="BCIT" width={97} height={83} />
        </div>
        <div className="flex space-x-4">
          <ul className="list-none">
            <li className="px-4 py-2 rounded bg-white shadow">Base Converter</li>
          </ul>
          <ul className="list-none">
            <li className="px-4 py-2 rounded bg-white shadow">Base Calculator</li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
