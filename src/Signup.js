import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "./api";

export default function Signup() {
  const nav = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
  try {
    const res = await fetch(`${BASE_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await res.text();
    alert(data);

    if (data.toLowerCase().includes("success")) {
      nav("/login");
    }
  } catch {
    alert("Signup failed");
  }
};

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Create Account</h2>

        <input style={styles.input} placeholder="Username" onChange={(e)=>setUsername(e.target.value)} />
        <input style={styles.input} placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
        <input style={styles.input} type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />

        <button style={styles.button} onClick={handleSignup}>Signup</button>

        <p onClick={()=>nav("/login")}>Login</p>
      </div>
    </div>
  );
  const styles = {
  container: { height:"100vh", display:"flex", justifyContent:"center", alignItems:"center" },
  card: { background:"#f5f5f5", padding:"30px", borderRadius:"10px", width:"350px", textAlign:"center" },
  input: { width:"100%", padding:"10px", margin:"10px 0" },
  button: { width:"100%", padding:"10px", background:"#3b5998", color:"white", border:"none" }
};
}