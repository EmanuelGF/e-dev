import React, { useEffect, useState } from "react";

const STORAGE_KEY = "emanuel-dev.cookie-consent";

export default function ConsentNotice() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const hasConsent = window.localStorage.getItem(STORAGE_KEY) === "accepted";
    setIsVisible(!hasConsent);
  }, []);

  function acceptCookies() {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, "accepted");
    }
    setIsVisible(false);
  }

  if (!isVisible) {
    return null;
  }

  return (
    <div className="cookie-banner">
      <p>
        This website uses a small local cookie preference to improve the browsing experience.
        By continuing to use the site you agree with the privacy policy.
      </p>
      <button type="button" onClick={acceptCookies}>
        Ok
      </button>
    </div>
  );
}
