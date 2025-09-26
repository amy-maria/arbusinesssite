"use client";
import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import CookiePreferencesModal from "./CookiePreferencesModal";

interface CookiePreferences {
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
}

export interface CookieBannerRef {
  openModal: () => void;
}

const CookieBanner = forwardRef((props, ref) => {
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useImperativeHandle(ref, () => ({
    openModal: () => setShowModal(true),
  }));
  // Expose openModal method to parent via ref
 useEffect(() => {
    try {
      const prefs = localStorage.getItem("cookiePreferences");
      if (!prefs) setShowBanner(true);
    } catch {
      // in case localStorage is unavailable
      setShowBanner(true);
    }
  }, []);

 

  const handleAcceptAll = () => {
    localStorage.setItem(
      "cookiePreferences",
      JSON.stringify({ functional: true, analytics: true, marketing: true })
    );
    setShowBanner(false);
    window.dispatchEvent(new Event("cookiePreferencesUpdated"));
  };

  const handleRejectAll = () => {
    localStorage.setItem(
      "cookiePreferences",
      JSON.stringify({ functional: true, analytics: false, marketing: false })
    );
    setShowBanner(false);
    window.dispatchEvent(new Event("cookiePreferencesUpdated"));
  };


  return (
    <>
      {/* Banner */}
      {showBanner && (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 z-50">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-sm">
              We use cookies to improve your experience.{" "}
              <a href="/cookie-policy" className="underline">
                Learn more
              </a>
            </p>
            <div className="flex gap-2">
              <button
                onClick={handleRejectAll}
                className="px-3 py-1 bg-gray-600 rounded hover:bg-gray-700 text-sm"
                aria-label="Reject all non-essential cookies"
              >
                Reject All
              </button>
              <button
                onClick={handleAcceptAll}
                className="px-3 py-1 bg-blue-600 rounded hover:bg-blue-700 text-sm"
                aria-label="Accept all cookies"
              >
                Accept All
              </button>
              <button
                onClick={() => setShowModal(true)}
                className="px-3 py-1 border rounded text-sm"
                aria-label="Manage cookie preferences"
              >
                Manage Preferences
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal */}
      <CookiePreferencesModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
});

CookieBanner.displayName = "CookieBanner";

export default CookieBanner;
