import { useState } from "react";

export default function Analyzer() {
  const [resume, setResume] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [result, setResult] = useState("");

  const styles = {
    container: {
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#3b5998",
    },
    card: {
      background: "white",
      padding: "30px",
      borderRadius: "10px",
      width: "420px",
      textAlign: "center",
      boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
    },
    textarea: {
      width: "100%",
      height: "100px",
      margin: "10px 0",
      padding: "10px",
      borderRadius: "5px",
      border: "1px solid #ccc",
    },
    button: {
      width: "100%",
      padding: "10px",
      background: "#3b5998",
      color: "white",
      border: "none",
      marginTop: "10px",
      cursor: "pointer",
    },
    upload: {
      margin: "10px 0",
    },
  };

  // ✅ Upload button (simple)
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setResume(event.target.result);
    };

    reader.readAsText(file); // simple text read
  };

  // ✅ Analyze (keep your logic)
  const handleAnalyze = () => {
    if (!resume || !jobDesc) {
      alert("Please upload resume and enter job description");
      return;
    }

    // 👉 keep your backend logic here later
    setResult("Analysis complete (connect backend here)");
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Resume Analysis</h2>

        {/* ✅ Upload Button */}
        <input
          type="file"
          style={styles.upload}
          onChange={handleFileUpload}
        />

        {/* Resume Preview */}
        <textarea
          placeholder="Resume content"
          style={styles.textarea}
          value={resume}
          onChange={(e) => setResume(e.target.value)}
        />

        {/* Job Description */}
        <textarea
          placeholder="Paste Job Description"
          style={styles.textarea}
          onChange={(e) => setJobDesc(e.target.value)}
        />

        {/* Analyze Button */}
        <button style={styles.button} onClick={handleAnalyze}>
          Analyze Resume
        </button>

        {/* Result */}
        {result && <p style={{ marginTop: "15px" }}>{result}</p>}
      </div>
    </div>
  );
}