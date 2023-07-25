import "./globals.css";
import { Inter } from "next/font/google";
import Head from "./head";
import Header from "./header";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ view, setView, children }) {
  return (
    <html lang="en" className="bg-white text-gray-600 antialiased">
      <Head />
      <body className="flex flex-col overflow-y-auto">
        <div className="flex flex-col full-width">
          <Header setView={setView} view={view} />
          <main className="flex-grow mt-4 px-2 md:px-4 lg:px-8 xl:px-16 overflow-y-auto">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}

