import { useState } from "react";
import "./ResearchAssistant.css";
import AppHeader from "../components/AppHeader";

const API_BASE = process.env.REACT_APP_API_BASE;

export default function ResearchAssistant() {
  /* ---------------- STATE ---------------- */
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [sources, setSources] = useState([]);
  const [loading, setLoading] = useState(false);

  /* ---------------- UPLOAD ---------------- */
  const handleUpload = async () => {
    if (!file) return;

    setUploadStatus("Uploading…");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(`${API_BASE}/ingest`, {
        method: "POST",
        body: formData
      });

      const data = await res.json();

      setUploadStatus(
        `Document ingested successfully. ${data.chunks} indexed.`
      );
    } catch {
      setUploadStatus("Upload failed.");
    }
  };

  /* ---------------- ASK ---------------- */
  const handleAsk = async () => {
    if (!question.trim()) return;

    setLoading(true);
    setAnswer("");
    setSources([]);

    try {
      const res = await fetch(`${API_BASE}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question,
          top_k: 5
        })
      });

      const data = await res.json();

      setAnswer(data.answer || "No answer generated.");
      setSources(data.sources || []);
    } catch {
      setAnswer("Error fetching answer.");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- RENDER ---------------- */
  return (
    <>
      <AppHeader />

      <main className="research-page">
        <h1 className="title">Research Assistant</h1>
        <p className="subtitle">
          Upload financial documents and ask questions grounded in the data.
          <h5>*Only PDFs upto 10MB accepted</h5>
        </p>

        {/* -------- Upload -------- */}
        <div className="card">
          <div className="upload-row">
            <input
              type="file"
              accept=".pdf,.txt"
              onChange={e => setFile(e.target.files[0])}
            />
            <button onClick={handleUpload}>
              Upload Document
            </button>
          </div>

          {uploadStatus && (
            <p className="status success">{uploadStatus}</p>
          )}
        </div>

        {/* -------- Question -------- */}
        <div className="card">
          <textarea
            className="question-box"
            placeholder="Ask a question about the uploaded document…"
            value={question}
            onChange={e => setQuestion(e.target.value)}
          />

          <button
            className="ask-btn"
            onClick={handleAsk}
            disabled={loading}
          >
            {loading ? "Thinking…" : "Ask"}
          </button>

          {/* -------- Answer -------- */}
          <div className="answer-card">
            <h3>Answer</h3>

            {loading && (
              <p className="muted">Thinking…</p>
            )}

            {!loading && answer && (
              <p className="answer-text">{answer}</p>
            )}

            {!loading && !answer && (
              <p className="muted">No answer generated.</p>
            )}

            {sources.length > 0 && (
              <div className="sources">
                <strong>Sources</strong>
                <ul>
                  {sources.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
