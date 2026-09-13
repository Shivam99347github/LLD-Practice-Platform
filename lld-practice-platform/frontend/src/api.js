const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

async function request(path, options = {}) {
  const response = await fetch(`${API}${path}`, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options
  });
  const body = await response.json();
  if (!response.ok) throw new Error(body.message || "Request failed");
  return body;
}

export const api = {
  problems: () => request("/problems"),
  problem: id => request(`/problems/${id}`),
  startAttempt: problemId => request("/attempts", {
    method: "POST", body: JSON.stringify({ problemId })
  }),
  getAttempt: id => request(`/attempts/${id}`),
  saveAttempt: (id, data) => request(`/attempts/${id}`, {
    method: "PUT", body: JSON.stringify(data)
  }),
  submitAttempt: id => request(`/attempts/${id}/submit`, {
    method: "POST"
  }),
  history: () => request("/attempts/history")
};
