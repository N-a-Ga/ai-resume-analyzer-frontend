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
      background: "#3b5998", // SAME BG
      fontFamily: "Segoe UI, sans-serif",
    },
    card: {
      background: "#ffffff",
      padding: "30px",
      borderRadius: "12px",
      width: "450px",
      boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
    },
    title: {
      textAlign: "center",
      marginBottom: "15px",
      color: "#333",
    },
    input: {
      width: "100%",
      margin: "10px 0",
    },
    textarea: {
      width: "100%",
      height: "110px",
      padding: "10px",
      borderRadius: "6px",
      border: "1px solid #ccc",
      outline: "none",
    },
    button: {
      width: "100%",
      padding: "12px",
      background: "#3b5998",
      color: "#fff",
      border: "none",
      borderRadius: "6px",
      marginTop: "10px",
      cursor: "pointer",
      fontWeight: "bold",
    },
    resultBox: {
      marginTop: "20px",
      padding: "15px",
      borderRadius: "8px",
      background: "#f9f9f9",
      border: "1px solid #ddd",
    },
    sectionTitle: {
      marginTop: "10px",
      marginBottom: "5px",
      color: "#444",
    },
    list: {
      paddingLeft: "18px",
      margin: "5px 0",
    },
  };

  // ✅ BETTER PARSER (more stable)
  const parse = (text) => {
    return {
      score: text.match(/Match Score:\s*(\d+)/)?.[1] || "0",
      skills: text.match(/Skills Present:\s*([\s\S]*?)Missing Skills:/)?.[1] || "",
      missing: text.match(/Missing Skills:\s*([\s\S]*?)Suggestions:/)?.[1] || "",
      suggestions: text.match(/Suggestions:\s*([\s\S]*)/)?.[1] || "",
    };
  };

  const getColor = (score) => {
    const n = parseInt(score);
    if (n < 50) return "#e74c3c"; // red
    if (n < 75) return "#f39c12"; // orange
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
    } catch (e) {
      alert("Backend error");
    }
  };

  const renderList = (text) => {
    return text
      .split("\n")
      .map((item) => item.replace("-", "").trim())
      .filter((item) => item)
      .map((item, i) => <li key={i}>{item}</li>);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>AI Resume Analyzer</h2>

        {/* FILE */}
        <input
          type="file"
          accept=".pdf"
          style={styles.input}
          onChange={(e) => setFile(e.target.files[0])}
        />

        {/* JD */}
        <textarea
          placeholder="Paste Job Description..."
          style={styles.textarea}
          onChange={(e) => setJobDesc(e.target.value)}
        />

        <button style={styles.button} onClick={handleAnalyze}>
          Analyze Resume
        </button>

        {/* RESULT */}
        {result && (() => {
          const data = parse(result);
          const color = getColor(data.score);

          return (
            <div style={styles.resultBox}>
              <h3 style={{ color, textAlign: "center" }}>
                Match Score: {data.score}%
              </h3>

              <div>
                <h4 style={styles.sectionTitle}>✅ Skills Present</h4>
                <ul style={styles.list}>{renderList(data.skills)}</ul>
              </div>

              <div>
                <h4 style={styles.sectionTitle}>❌ Missing Skills</h4>
                <ul style={styles.list}>{renderList(data.missing)}</ul>
              </div>

              <div>
                <h4 style={styles.sectionTitle}>💡 Suggestions</h4>
                <ul style={styles.list}>{renderList(data.suggestions)}</ul>
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
}