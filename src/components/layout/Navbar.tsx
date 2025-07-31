"use client";

import Link from 'next/link';
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-brand-blue flex items-center space-x-2">
          <span>✈️</span>
          <span>JetPass</span>
        </Link>
        <div className="hidden md:flex items-center">
          <Link href="/" className="text-brand-text hover:text-brand-blue px-3 py-2">
            Check-In
          </Link>
          <Link href="/status" className="text-brand-text hover:text-brand-blue px-3 py-2">
            Check Status
          </Link>
          <Link href="/admin" className="text-brand-text hover:text-brand-blue px-3 py-2">
            Admin
          </Link>
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-brand-text hover:text-foreground focus:outline-none focus:text-gray-600">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              )}
            </svg>
          </button>
        </div>
      </nav>
      {isMenuOpen && (
        <div className="md:hidden">
          <Link href="/" className="block text-brand-text hover:text-brand-blue px-4 py-2" onClick={() => setIsMenuOpen(false)}>
            Check-In
          </Link>
          <Link href="/status" className="block text-brand-text hover:text-brand-blue px-4 py-2" onClick={() => setIsMenuOpen(false)}>
            Check Status
          </Link>
          <Link href="/admin" className="block text-brand-text hover:text-brand-blue px-4 py-2" onClick={() => setIsMenuOpen(false)}>
            Admin
          </Link>
        </div>
      )}
    </header>
  );
}
