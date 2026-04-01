import { useState } from "react";
import { BASE_URL } from "./api";

export default function Analyzer() {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState("");

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("jobDescription", jobDescription);

    try {
      const res = await fetch(`${BASE_URL}/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await res.text();
      setResult(data);
    } catch {
      alert("Upload failed");
    }
  };

  return (
    <div>
      <input type="file" onChange={(e)=>setFile(e.target.files[0])}/>
      <textarea onChange={(e)=>setJobDescription(e.target.value)} />
      <button onClick={handleUpload}>Analyze</button>
      <pre>{result}</pre>
    </div>
  );
}