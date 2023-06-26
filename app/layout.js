// layout.js

import './globals.css'
import { Inter } from 'next/font/google'
import Header from "./header";
import Head from "./head";

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ view, setView, children }) {
  return (
    <html lang="en">
      <Head />
      <body> 
          <div className="flex flex-col">
              <Header setView={setView} view={view} /> {/* pass setView and view to Header */}
              <main className="mt-4">
                  {children}
              </main>
          </div>
      </body>
    </html>
  );
}