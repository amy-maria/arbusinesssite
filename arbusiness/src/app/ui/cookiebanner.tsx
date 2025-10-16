"use client";

import { useState, useEffect, useRef } from "react";

let showBannerFunc: (() => void) | null = null;

// Function you can call from FooterNav
export function showCookieBanner() {
  if (showBannerFunc) showBannerFunc();
  else console.warn("CookieBanner not mounted yet.");
}

export default function CookieBanner() {
  const [visible, setVisible] = useState<boolean>(true);
  //track consent
  const [ consent, setConsent] = useState<boolean | null>(null);
  //const [ready, setReady] = useState(false);//defer
  const [showDeclineMessage, setShowDeclineMessage]= useState(false);

  const declineTimeoutRef= useRef<NodeJS.Timeout | null>(null); 
  
  //handle multiple clicks
  // Register the setter for external access
  useEffect(() => {
    showBannerFunc = () => setVisible(true);

  //defer banner until full window loads
  const handleWindowLoad = () => {
    console.log('handleWindowLoad called');
    try {
      const prefs = JSON.parse(localStorage.getItem("cookiePreferences") || "{}");
      if (prefs.analytics === undefined) {
        // no preferences saved, show banner
        setVisible(true);
      } else {
        //preferences exiist hide banner
        setConsent(prefs.analytics);
        setVisible(false);
      }
  } catch (err) {
      console.error("Error parsing cookie preferences:", err);
      setVisible(true); //show banner if error parsing storage
      
    }
  };
  //if (document.readyState === "complete") {
    //handleWindowLoad();
  //} else {
    //window.addEventListener('load', handleWindowLoad);
 // }

  return () => {
      showBannerFunc = null;
      window.removeEventListener("load", handleWindowLoad);
      if (declineTimeoutRef.current) clearTimeout(declineTimeoutRef.current);
    };
  }, []);

 //if consent is already given, don't show banner
  if (consent !== null && !visible && !showDeclineMessage) return null;

  //Handler for Accept/Decline
  const acceptAnalytics = () => {
    localStorage.setItem("cookiePreferences", JSON.stringify({analytics: true}));
    window.dispatchEvent(new Event("cookiePreferencesUpdated"));
    setConsent(true);
    setVisible(false);
  };

const declineAnalytics = () => {
  //clear site cookies
  document.cookie.split(';').forEach(cookie => {
    const name = cookie.split('=')[0].trim();
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  });
  //updates preferences
  localStorage.setItem("cookiePreferences", JSON.stringify({ analytics: false }));
  window.dispatchEvent(new Event("cookiePreferencesUpdated"));
  setConsent(false);
  setVisible(false);
  
  //show confirm message if declined
  setShowDeclineMessage(true);

  //hide after 5 sec
  clearTimeout(declineTimeoutRef.current!);
  declineTimeoutRef.current = setTimeout(() => setShowDeclineMessage(false), 3000);
};


  return (
    <>
    {visible && (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 z-[9999] flex justify-between items-center">
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
  )}

  {showDeclineMessage && (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 bg-gray-700 text-white px-4 py-2 rounded shadow z-50">
    No cookies will be stored. Your privacy preferences are saved.
    </div>
  )}
  </>
  );
}
