"use client";

import { useState, useEffect } from "react";

let showBannerFunc: (() => void) | null = null;

// Function you can call from FooterNav
export function showCookieBanner() {
  if (showBannerFunc) showBannerFunc();
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  //track consent
  const [ consent, setConsent] = useState(false);

  // Register the setter for external access
  useEffect(() => {
    showBannerFunc = () => setVisible(true);

    //check if consent already exists in local storage
    try {
      const prefs = JSON.parse(localStorage.getItem("cookiePreferences") || "{}");
      if (prefs.analytics === undefined) {
        // no preferences saved, show banner
        setVisible(true);
      } else {
        //preferences exiist hide banner
        setVisible(false);
        setConsent(prefs.analytics);
      }
  } catch {
      setVisible(true); //show banner if error parsing storage
    }

    return () => {
      showBannerFunc = null;
    };
  }, []);
 //if consent is already given, don't show banner
  if (!visible) return null;

  //Handler for Accept/Decline
  const acceptAnalytics = () => {
    localStorage.setItem("cookiePreferences", JSON.stringify({analytics: true}));
    window.dispatchEvent(new Event("cookiePreferencesUpdated"));
    setVisible(false);
    setConsent(true);
  }
const declineAnalytics = () => {
  localStorage.setItem("cookiePreferences", JSON.stringify({ analytics: false }));
  window.dispatchEvent(new Event("cookiePreferencesUpdated"));
  setVisible(false);
  setConsent(false);
};

  

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 z-50 flex justify-between items-center">
      <span>This website uses cookies to improve your experience.</span>
      <div className= "flex gap-2">
        {/* Accept Button */}
        <button
          onClick={acceptAnalytics} 
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white"
        >
          Accept
        </button>
        {/* decline Button */}
        <button
          onClick={declineAnalytics} // 
          className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded text-white"
        >
          Decline
        </button>
        </div> 
       
    </div>
  );
}
