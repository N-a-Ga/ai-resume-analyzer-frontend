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
    },
    card: {
      background: "#f5f5f5",
      padding: "30px",
      borderRadius: "10px",
      width: "400px",
      textAlign: "center",
      boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
    },
    textarea: {
      width: "100%",
      height: "100px",
      margin: "10px 0",
      padding: "10px",
    },
    button: {
      padding: "10px",
      width: "100%",
      background: "#3b5998",
      color: "white",
      border: "none",
      cursor: "pointer",
    },
  };

  const handleAnalyze = () => {
    if (!resume || !jobDesc) {
      alert("Please fill both fields");
      return;
    }

    // Dummy result (you can connect backend later)
    setResult("Analysis complete! Score: 75%");
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Resume Analyzer</h2>

        <textarea
          placeholder="Paste your Resume"
          style={styles.textarea}
          onChange={(e) => setResume(e.target.value)}
        />

        <textarea
          placeholder="Paste Job Description"
          style={styles.textarea}
          onChange={(e) => setJobDesc(e.target.value)}
        />

        <button style={styles.button} onClick={handleAnalyze}>
          Analyze
        </button>

        {result && <p>{result}</p>}
      </div>
    </div>
  );
}