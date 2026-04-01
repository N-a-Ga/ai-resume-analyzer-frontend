import { useState } from "react";
import { BASE_URL } from "./api";

export default function Analyzer() {
  const [file, setFile] = useState(null);   // ✅ changed
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

  // ✅ FIXED: only store file (NO FileReader)
  const handleFileUpload = (e) => {
    setFile(e.target.files[0]);
  };

  // ✅ FIXED: send file to backend
  const handleAnalyze = async () => {
    if (!file || !jobDesc) {
      alert("Please upload resume and enter job description");
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

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Resume Analysis</h2>

        {/* ✅ Upload PDF */}
        <input
          type="file"
          accept=".pdf"
          style={styles.upload}
          onChange={handleFileUpload}
        />

        {/* ❌ REMOVED resume preview textarea */}

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
        {result && (
          <div style={{ marginTop: "15px", textAlign: "left" }}>
            <h4>Analysis Result</h4>
            <pre>{result}</pre>
          </div>
        )}
      </div>
    </div>
  );
}