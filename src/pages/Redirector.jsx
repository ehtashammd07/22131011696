// // src/pages/Redirector.jsx
// import React, { useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { logEvent } from "../middleware/logger";

// const Redirector = () => {
//   const { shortcode } = useParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const urls = JSON.parse(localStorage.getItem("urls") || "[]");
//     const match = urls.find((u) => u.shortcode === shortcode);

//     if (!match) {
//       alert("Shortcode not found.");
//       navigate("/");
//       return;
//     }

//     const now = new Date();
//     const expiry = new Date(match.expiry);
//     if (now > expiry) {
//       alert("This link has expired.");
//       navigate("/");
//       return;
//     }

//     // Log click
//     const click = {
//       timestamp: new Date().toISOString(),
//       referrer: document.referrer,
//       location: "India (Mocked)", // In real apps, use geo APIs
//     };

//     match.clicks.push(click);
//     localStorage.setItem("urls", JSON.stringify(urls));
//     logEvent(`Redirecting to: ${match.originalUrl}`);

//     setTimeout(() => {
//       window.location.href = match.originalUrl;
//     }, 500);
//   }, [shortcode, navigate]);

//   return <div>Redirecting...</div>;
// };

// export default Redirector;

// src/pages/Redirector.jsx
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { logEvent } from "../middleware/logger";

const Redirector = () => {
  const { shortcode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const urls = JSON.parse(localStorage.getItem("urls") || "[]");
    const match = urls.find((u) => u.shortcode === shortcode);

    if (!match) {
      alert("Shortcode not found.");
      logEvent(`Shortcode ${shortcode} not found`);
      navigate("/");
      return;
    }

    const now = new Date();
    const expiry = new Date(match.expiry);
    if (now > expiry) {
      alert("This link has expired.");
      logEvent(`Shortcode ${shortcode} expired`);
      navigate("/");
      return;
    }

    const isValidHttpUrl = (string) => {
      try {
        const url = new URL(string);
        return url.protocol === "http:" || url.protocol === "https:";
      } catch (_) {
        return false;
      }
    };

    if (!isValidHttpUrl(match.originalUrl)) {
      alert("Invalid URL. Cannot redirect.");
      logEvent(`Invalid redirect URL: ${match.originalUrl}`);
      navigate("/");
      return;
    }

    // Log the click
    const click = {
      timestamp: new Date().toISOString(),
      referrer: document.referrer || "Direct",
      location: "India (Mocked)",
    };

    match.clicks = [...(match.clicks || []), click];
    localStorage.setItem("urls", JSON.stringify(urls));
    logEvent(`Redirecting to: ${match.originalUrl}`);

    // Perform the redirect
    setTimeout(() => {
      window.location.href = match.originalUrl;
    }, 1000);
  }, [shortcode, navigate]);

  return <div style={{ fontSize: "1.2rem", textAlign: "center", marginTop: "20px" }}>Redirecting...</div>;
};

export default Redirector;

