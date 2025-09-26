"use client";
import { useState, useEffect } from "react";

interface CookiePreferences {
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
}

interface CookiePreferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CookiePreferencesModal({
  isOpen,
  onClose,
}: CookiePreferencesModalProps) {
  const [preferences, setPreferences] = useState<CookiePreferences>({
    functional: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    try {
      const stored = localStorage.getItem("cookiePreferences");
      if (stored) setPreferences(JSON.parse(stored));
    } catch (err) {
      console.error("Failed to load cookie preferences", err);
    }
  }, []);

  const handleToggle = (category: "analytics" | "marketing") => {
    setPreferences((prev) => ({ ...prev, [category]: !prev[category] }));
  };

  const handleSave = () => {
    try {
      localStorage.setItem("cookiePreferences", JSON.stringify(preferences));
      onClose();
      window.dispatchEvent(new Event("cookiePreferencesUpdated")); // SPA-friendly
    } catch (err) {
      console.error("Failed to save preferences", err);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-modal-title"
    >
      <div className="bg-white p-6 rounded-lg max-w-md w-full shadow-lg">
        <h2 id="cookie-modal-title" className="text-xl font-bold mb-4">
          Manage Cookie Preferences
        </h2>

        <div className="space-y-3">
          <label className="flex items-center justify-between">
            <span>Functional Cookies (required)</span>
            <input type="checkbox" checked disabled />
          </label>

          <label className="flex items-center justify-between">
            <span>Analytics Cookies</span>
            <input
              type="checkbox"
              checked={preferences.analytics}
              onChange={() => handleToggle("analytics")}
            />
          </label>

          <label className="flex items-center justify-between">
            <span>Marketing Cookies</span>
            <input
              type="checkbox"
              checked={preferences.marketing}
              onChange={() => handleToggle("marketing")}
            />
          </label>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
}
