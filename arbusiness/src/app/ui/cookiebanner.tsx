"use client";

import { useState, useEffect } from "react";

let showBannerFunc: (() => void) | null = null;

// Function you can call from FooterNav
export function showCookieBanner() {
  if (showBannerFunc) showBannerFunc();
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  // Register the setter for external access
  useEffect(() => {
    showBannerFunc = () => setVisible(true);
    return () => {
      showBannerFunc = null;
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 z-50 flex justify-between items-center">
      <span>This website uses cookies to improve your experience.</span>
      <button
        onClick={() => setVisible(false)}
        className="ml-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white"
      >
        Close
      </button>
    </div>
  );
}
