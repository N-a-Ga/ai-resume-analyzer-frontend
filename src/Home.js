import { useNavigate } from "react-router-dom";

export default function Home() {
  const nav = useNavigate();

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>AI Resume Analyzer</h2>

        <p>
          Upload your resume and match it with job descriptions.
          Get instant score and feedback.
        </p>

        <button style={styles.button} onClick={() => nav("/login")}>
          Login
        </button>

        <button style={styles.buttonAlt} onClick={() => nav("/signup")}>
          Sign Up
        </button>
      </div>
    </div>
  );
}

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
    width: "350px",
    textAlign: "center",
    boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
  },
  button: {
    width: "100%",
    padding: "10px",
    marginTop: "10px",
    background: "#3b5998",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
  buttonAlt: {
    width: "100%",
    padding: "10px",
    marginTop: "10px",
    background: "#f39c12",
    color: "white",
    border: "none",
    cursor: "pointer",
  }
};