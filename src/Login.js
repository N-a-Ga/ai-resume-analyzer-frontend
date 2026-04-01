import { useState } from "react";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:8080/api";

export default function Login() {
  const nav = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const formData = new URLSearchParams();
    formData.append("username", username);
    formData.append("password", password);

    try {
      const res = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData,
      });

      const data = await res.text();

      if (data.includes("success")) {
        nav("/dashboard");
      } else {
        alert(data);
      }
    } catch {
      alert("Login failed");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Login</h2>

        <input style={styles.input} placeholder="Username" onChange={(e)=>setUsername(e.target.value)} />
        <input style={styles.input} type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />

        <button style={styles.button} onClick={handleLogin}>Login</button>

        <p onClick={()=>nav("/signup")}>Signup</p>
      </div>
    </div>
  );
}

const styles = {
  container: { height:"100vh", display:"flex", justifyContent:"center", alignItems:"center" },
  card: { background:"#f5f5f5", padding:"30px", borderRadius:"10px", width:"350px", textAlign:"center" },
  input: { width:"100%", padding:"10px", margin:"10px 0" },
  button: { width:"100%", padding:"10px", background:"#3b5998", color:"white", border:"none" }
};