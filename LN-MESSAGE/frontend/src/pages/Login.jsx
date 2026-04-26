import { useState } from "react";

export default function Login({ onLogin }) {
  const [key, setKey] = useState("");

  function handleLogin() {
    if (!key) return alert("API key obrigatória");

    localStorage.setItem("apiKey", key);
    onLogin(key);
  }

  return (
    <div style={{ padding: 30 }}>
      <h2>Login LN-MESSAGE</h2>

      <input
        placeholder="API Key"
        value={key}
        onChange={(e) => setKey(e.target.value)}
      />

      <button onClick={handleLogin}>
        Entrar
      </button>
    </div>
  );
}