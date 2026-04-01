import { useState } from "react";
import { BASE_URL } from "./api";

export default function Analyzer() {
  const [file, setFile] = useState(null);
  const [jobDesc, setJobDesc] = useState("");
  const [result, setResult] = useState("");

  // 🎯 Parse backend response
  const parseResult = (text) => {
    return {
      score: text.match(/Match Score:\s*(.*)/)?.[1] || "",
      skills: text.match(/Skills Present:\s*([\s\S]*?)\*\*/)?.[1] || "",
      missing: text.match(/Missing Skills:\s*([\s\S]*?)\*\*/)?.[1] || "",
      suggestions: text.match(/Suggestions:\s*([\s\S]*)/)?.[1] || "",
    };
  };

  // 🎯 Score color
  const getScoreColor = (score) => {
    const num = parseInt(score);
    if (num < 50) return "#e74c3c"; // red
    if (num < 75) return "#f39c12"; // orange
    return "#2ecc71"; // green
  };

  const handleAnalyze = async () => {
    if (!file || !jobDesc) {
      alert("Upload resume + enter job description");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("jobDescription", jobDesc);

    try {
      const res = await fetch(`${BASE_URL}/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await res.text();
      setResult(data);
    } catch (err) {
      console.error(err);
      alert("Analysis failed");
    }
  };

  const styles = {
    container: {
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#1e293b",
      fontFamily: "Segoe UI, sans-serif",
      padding: "20px",
    },
    card: {
      background: "#ffffff",
      padding: "30px",
      borderRadius: "12px",
      width: "500px",
      boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
    },
    title: {
      textAlign: "center",
      marginBottom: "20px",
    },
    input: {
      width: "100%",
      margin: "10px 0",
    },
    textarea: {
      width: "100%",
      height: "100px",
      padding: "10px",
      borderRadius: "8px",
      border: "1px solid #ccc",
    },
    button: {
      width: "100%",
      padding: "12px",
      background: "#2563eb",
      color: "white",
      border: "none",
      borderRadius: "8px",
      marginTop: "15px",
      cursor: "pointer",
      fontWeight: "bold",
    },
    section: {
      marginTop: "20px",
    },
    box: {
      background: "#f1f5f9",
      padding: "10px",
      borderRadius: "8px",
      marginTop: "5px",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Resume Analyzer</h2>

        {/* Upload */}
        <input
          type="file"
          accept=".pdf"
          style={styles.input}
          onChange={(e) => setFile(e.target.files[0])}
        />

        {/* Job Description */}
        <textarea
          placeholder="Paste Job Description"
          style={styles.textarea}
          onChange={(e) => setJobDesc(e.target.value)}
        />

        {/* Button */}
        <button style={styles.button} onClick={handleAnalyze}>
          Analyze Resume
        </button>

        {/* RESULT */}
        {result && (() => {
          const data = parseResult(result);
          const color = getScoreColor(data.score);

          return (
            <div style={styles.section}>
              <h3>Analysis Result</h3>

              {/* Score */}
              <div style={{ ...styles.box, background: color, color: "white", fontWeight: "bold" }}>
                Match Score: {data.score}
              </div>

              {/* Skills */}
              <div style={styles.section}>
                <h4>✅ Skills Present</h4>
                <ul style={styles.box}>
                  {data.skills.split("\n").map((s, i) =>
                    s.trim().startsWith("-") ? <li key={i}>{s.replace("-", "")}</li> : null
                  )}
                </ul>
              </div>

              {/* Missing */}
              <div style={styles.section}>
                <h4>❌ Missing Skills</h4>
                <ul style={styles.box}>
                  {data.missing.split("\n").map((s, i) =>
                    s.trim().startsWith("-") ? <li key={i}>{s.replace("-", "")}</li> : null
                  )}
                </ul>
              </div>

              {/* Suggestions */}
              <div style={styles.section}>
                <h4>💡 Suggestions</h4>
                <ul style={styles.box}>
                  {data.suggestions.split("\n").map((s, i) =>
                    s.trim().length > 0 ? <li key={i}>{s}</li> : null
                  )}
                </ul>
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
}