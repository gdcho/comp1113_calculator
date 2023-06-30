// layout.js

import './globals.css'
import { Inter } from 'next/font/google'
import Header from "./header";
import Head from "./head";

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ view, setView, children }) {
  return (
    <html lang="en" className="bg-white text-gray-600 antialiased">
      <Head />
      <body className="min-h-screen flex flex-col"> 
        <div className="flex flex-col ">
          <Header setView={setView} view={view} /> {/* pass setView and view to Header */}
          <main className="flex-grow mt-4 mx-2 md:mx-4 lg:mx-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}