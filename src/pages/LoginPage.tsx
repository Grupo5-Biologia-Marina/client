import { useState } from "react";
import FormInput from "../components/FormInput";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login data:", { email, password });
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <form onSubmit={handleSubmit} style={{ width: "300px", padding: "2rem", border: "1px solid #ccc", borderRadius: "0.5rem" }}>
        <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>Login</h2>
        <FormInput label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <FormInput label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" style={{ width: "100%", padding: "0.6rem", marginTop: "1rem", background: "#0077ff", color: "white", borderRadius: "0.3rem" }}>
          Log In
        </button>
      </form>
    </div>
  );
}
