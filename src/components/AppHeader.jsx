import React from "react";
import "./AppHeader.css";

const LANDING_URL =
  "https://calm-meadow-06bb15200.2.azurestaticapps.net/";

export default function AppHeader() {
  const goToLanding = () => {
    window.location.href = LANDING_URL;
  };

  return (
    <header className="app-header">
      <div className="header-left">
        <img
          src={`${process.env.PUBLIC_URL}/Predyxlab-logo.png`}
          alt="PredyxLab logo"
          className="app-header-logo"
        />
        <h1 className="app-title">PredyxLab · Research Assistant</h1>
      </div>

      <button
        className="app-close-btn"
        onClick={goToLanding}
        title="Back to Landing Page"
      >
        ✕
      </button>
    </header>
  );
}
