"use client";
import { useState } from "react";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi"; // react-icons for hamburger / X

export default function HeaderNav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  // CTA color classes
  const linkClasses = "hover:text-white transition-colors";
  const ctaColor = "text-white bg-blue-600 hover:bg-blue-700";

  return (
    <header className="sticky top-0 z-50 bg-gray-900 shadow-md">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo / Brand */}
          <Link href="/" className="text-2xl font-bold text-white">
            Amy Rowell
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-6">
            <Link href="/" className={linkClasses}>
              Home
            </Link>
            <Link href="/about" className={linkClasses}>
              About
            </Link>
            <Link href="/blog" className={linkClasses}>
              Blog
            </Link>
            <Link href="/contact" className={`${linkClasses} px-4 py-1 rounded ${ctaColor}`}>
              Contact
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded text-white hover:bg-gray-800 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-2 space-y-2 pb-4">
            <Link href="/" className="block px-3 py-2 rounded text-white hover:bg-blue-600" onClick={() => setIsOpen(false)}>
              Home
            </Link>
            <Link href="/about" className="block px-3 py-2 rounded text-white hover:bg-blue-600" onClick={() => setIsOpen(false)}>
              About
            </Link>
            <Link href="/blog" className="block px-3 py-2 rounded text-white hover:bg-blue-600" onClick={() => setIsOpen(false)}>
              Blog
            </Link>
            <Link href="/contact" className={`block px-3 py-2 rounded text-white bg-blue-600 hover:bg-blue-700`} onClick={() => setIsOpen(false)}>
              Contact
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
