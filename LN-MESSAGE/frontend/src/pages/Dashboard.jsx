import { useEffect, useState } from "react";
import { getStats, getMessages } from "../services/api";

export default function Dashboard({ apiKey, onLogout }) {
  const [stats, setStats] = useState({
    credits: 0,
    totalMessages: 0,
    sent: 0,
    failed: 0
  });

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (apiKey) loadData();
  }, [apiKey]);

  async function loadData() {
    try {
      setLoading(true);

      const statsData = await getStats(apiKey);
      const msgData = await getMessages(apiKey);

      setStats(statsData);
      setMessages(msgData);
    } catch (err) {
      console.error("Erro dashboard:", err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Dashboard SaaS</h1>

      {/* LOGOUT */}
      <button onClick={onLogout} style={{ marginBottom: 20 }}>
        Sair
      </button>

      {/* LOADING */}
      {loading && <p>Carregando dados...</p>}

      {/* STATS */}
      <div style={{ display: "flex", gap: 20, marginBottom: 20 }}>
        <div>Credits: {stats.credits}</div>
        <div>Total: {stats.totalMessages}</div>
        <div>Sent: {stats.sent}</div>
        <div>Failed: {stats.failed}</div>
      </div>

      {/* MESSAGES */}
      <h2>Messages</h2>

      {messages.length === 0 ? (
        <p>Nenhuma mensagem ainda</p>
      ) : (
        <ul>
          {messages.map((m) => (
            <li key={m.id}>
              {m.to} - {m.message} ({m.status})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}