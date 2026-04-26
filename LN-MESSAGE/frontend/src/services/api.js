const BASE_URL = "http://localhost:3000";

// helper para tratar erros
async function request(url, options) {
  const res = await fetch(url, options);

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.error || "Erro na requisição");
  }

  return data;
}

// 📊 stats
export async function getStats(apiKey) {
  return request(`${BASE_URL}/messages/stats`, {
    headers: {
      "x-api-key": apiKey
    }
  });
}

// 📩 mensagens
export async function getMessages(apiKey) {
  return request(`${BASE_URL}/messages`, {
    headers: {
      "x-api-key": apiKey
    }
  });
}

// 🚀 enviar mensagem
export async function sendMessage(apiKey, data) {
  return request(`${BASE_URL}/messages/send`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey
    },
    body: JSON.stringify(data)
  });
}