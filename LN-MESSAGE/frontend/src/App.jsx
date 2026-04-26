import { useState } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const savedKey = localStorage.getItem("apiKey");
  const [apiKey, setApiKey] = useState(savedKey);

  function handleLogin(key) {
    localStorage.setItem("apiKey", key);
    setApiKey(key);
  }

  function logout() {
    localStorage.removeItem("apiKey");
    setApiKey(null);
  }

  if (!apiKey) {
    return <Login onLogin={handleLogin} />;
  }

  return <Dashboard apiKey={apiKey} onLogout={logout} />;
}