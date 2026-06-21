const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });
  if (!response.ok) throw new Error(`API error ${response.status}`);
  return response.json();
}

export const api = {
  health: () => request('/health'),
  createUser: (payload) => request('/users', { method: 'POST', body: JSON.stringify(payload) }),
  saveBodyLog: (payload) => request('/body-logs', { method: 'POST', body: JSON.stringify(payload) }),
  saveWorkout: (payload) => request('/workouts', { method: 'POST', body: JSON.stringify(payload) }),
};
