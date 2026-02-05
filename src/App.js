import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import ResearchAssistant from "./pages/ResearchAssistant";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Default route → Research Assistant */}
        <Route path="/" element={<Navigate to="/research" replace />} />

        {/* Research Assistant */}
        <Route path="/research" element={<ResearchAssistant />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/research" replace />} />
      </Routes>
    </Router>
  );
}
