import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const nav = useNavigate();

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Welcome</h2>

        <button style={styles.button} onClick={()=>nav("/analyzer")}>
          Start Resume Analysis
        </button>

        <button style={styles.button} onClick={()=>nav("/login")}>
          Switch Account
        </button>

        <button style={{...styles.button, ...styles.danger}} onClick={()=>nav("/")}>
          Logout
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
  danger: {
    background: "#e74c3c",
  }
};