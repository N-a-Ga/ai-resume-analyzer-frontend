import { useState } from "react";

const BASE_URL = "http://localhost:8080/api";

export default function Analyzer() {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return alert("Upload resume");
    if (!jobDescription) return alert("Enter job description");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("jobDescription", jobDescription);

    try {
      setLoading(true);

      const res = await fetch(`${BASE_URL}/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await res.text();
      setResult(data);

    } catch {
      alert("Error uploading");
    } finally {
      setLoading(false);
    }
  };

  // 🎯 Extract score
  const getScore = () => {
    const match = result.match(/Match Score:\s*(\d+)/i);
    return match ? parseInt(match[1]) : null;
  };

  const score = getScore();

  const getScoreColor = () => {
    if (score === null) return "#000";
    if (score < 50) return "#ef4444";   // red
    if (score < 75) return "#f59e0b";   // orange
    return "#22c55e";                   // green
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Resume Analyzer</h2>

        <input type="file" onChange={(e)=>setFile(e.target.files[0])} />

        <textarea
          placeholder="Enter job description"
          style={styles.textarea}
          onChange={(e)=>setJobDescription(e.target.value)}
        />

        <button style={styles.button} onClick={handleUpload}>
          {loading ? "Analyzing..." : "Analyze"}
        </button>

        {result && (
          <div style={styles.resultBox}>
            
            {/* 🎯 SCORE */}
            {score !== null && (
              <h3 style={{ color: getScoreColor(), marginBottom: "10px" }}>
                Match Score: {score}%
              </h3>
            )}

            {/* 🎯 FORMATTED TEXT */}
            <div style={styles.resultText}>
              {result.split("\n").map((line, i) => {
                if (line.toLowerCase().includes("skills present"))
                  return <h4 key={i} style={styles.section}>Skills Present</h4>;

                if (line.toLowerCase().includes("missing skills"))
                  return <h4 key={i} style={styles.section}>Missing Skills</h4>;

                if (line.toLowerCase().includes("suggestions"))
                  return <h4 key={i} style={styles.section}>Suggestions</h4>;

                if (line.toLowerCase().includes("match score"))
                  return null;

                return <p key={i} style={styles.line}>{line}</p>;
              })}
            </div>

          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#3b5998",
    fontFamily: "Segoe UI, sans-serif"
  },
  card: {
    background: "#ffffff",
    padding: "30px",
    borderRadius: "12px",
    width: "450px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
    textAlign: "center"
  },
  title: {
    marginBottom: "15px"
  },
  textarea: {
    width: "100%",
    height: "100px",
    marginTop: "10px",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc"
  },
  button: {
    marginTop: "10px",
    padding: "10px",
    width: "100%",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontWeight: "bold"
  },
  resultBox: {
    marginTop: "20px",
    padding: "15px",
    background: "#f8fafc",
    borderRadius: "10px",
    maxHeight: "300px",
    overflowY: "auto",
    textAlign: "left"
  },
  resultText: {
    fontSize: "14px",
    lineHeight: "1.6"
  },
  section: {
    marginTop: "10px",
    color: "#1e293b"
  },
  line: {
    margin: "4px 0"
  }
};