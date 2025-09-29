"use client";

import Link from "next/link";
import { FaLinkedin, FaGithub, FaFacebook } from "react-icons/fa";
import { showCookieBanner } from "./cookiebanner";

export default function FooterNav() {
  const iconClass = "text-white hover:text-blue-400 transition-colors";

  return (
    <footer className="bg-gray-900 text-white mt-12 border-t border-gray-700">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="text-sm text-gray-400">
          © {new Date().getFullYear()} Your Company, Inc. All rights reserved.
        </div>
        <div className="flex gap-4 text-2xl">
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={iconClass} aria-label="LinkedIn">
            <FaLinkedin />
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className={iconClass} aria-label="GitHub">
            <FaGithub />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={iconClass} aria-label="Facebook">
            <FaFacebook />
          </a>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-wrap items-center gap-4 text-sm text-gray-400">
        <div className="flex flex-wrap gap-4">
          <Link href="/privacy-policy" className="hover:underline">Privacy Policy</Link>
          <Link href="/cookie" className="hover:underline">Cookie Policy</Link>
          <Link href="/accessibility" className="hover:underline">Accessibility</Link>
          <Link href="/sitemap" className="hover:underline">Sitemap</Link>
          <button
            onClick={showCookieBanner}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
          >
            Your Privacy Choices
          </button>
        </div>
      </div>
    </footer>
  );
}
