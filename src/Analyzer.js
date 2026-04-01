import { useState } from "react";
import { BASE_URL } from "./api";

export default function Analyzer() {
  const [file, setFile] = useState(null);
  const [jobDesc, setJobDesc] = useState("");
  const [result, setResult] = useState("");

  const styles = {
    container: {
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#3b5998", // same as before
    },
    card: {
      background: "#f5f5f5",
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
    resultBox: {
      textAlign: "left",
      marginTop: "15px",
      background: "#fff",
      padding: "10px",
      borderRadius: "5px",
    },
  };

  // ✅ FIXED PARSER
  const parse = (text) => {
    const clean = text.replace(/\*\*/g, "");

    return {
      score: clean.match(/Match Score:\s*(.*)/)?.[1] || "",
      skills: clean.match(/Skills Present:\s*([\s\S]*?)\n\n/)?.[1] || "",
      missing: clean.match(/Missing Skills:\s*([\s\S]*?)\n\n/)?.[1] || "",
      suggestions: clean.match(/Suggestions:\s*([\s\S]*)/)?.[1] || "",
    };
  };

  const getColor = (score) => {
    const n = parseInt(score);
    if (n < 50) return "red";
    if (n < 75) return "orange";
    return "green";
  };

  // 🚀 BACKEND CALL
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
    } catch (e) {
      alert("Error connecting backend");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Resume Analysis</h2>

        {/* FILE UPLOAD */}
        <input
          type="file"
          accept=".pdf"
          style={styles.upload}
          onChange={(e) => setFile(e.target.files[0])}
        />

        {/* JOB DESCRIPTION */}
        <textarea
          placeholder="Paste Job Description"
          style={styles.textarea}
          onChange={(e) => setJobDesc(e.target.value)}
        />

        {/* BUTTON */}
        <button style={styles.button} onClick={handleAnalyze}>
          Analyze Resume
        </button>

        {/* RESULT */}
        {result && (() => {
          const data = parse(result);
          const color = getColor(data.score);

          return (
            <div style={styles.resultBox}>
              <h4 style={{ color }}>
                Match Score: {data.score}
              </h4>

              <b>Skills Present:</b>
              <ul>
                {data.skills.split("\n").map((s, i) =>
                  s.trim() !== "" ? (
                    <li key={i}>{s.replace("-", "")}</li>
                  ) : null
                )}
              </ul>

              <b>Missing Skills:</b>
              <ul>
                {data.missing.split("\n").map((s, i) =>
                  s.trim() !== "" ? (
                    <li key={i}>{s.replace("-", "")}</li>
                  ) : null
                )}
              </ul>

              <b>Suggestions:</b>
              <ul>
                {data.suggestions.split("\n").map((s, i) =>
                  s.trim() !== "" ? (
                    <li key={i}>{s.replace("-", "")}</li>
                  ) : null
                )}
              </ul>
            </div>
          );
        })()}
      </div>
    </div>
  );
}