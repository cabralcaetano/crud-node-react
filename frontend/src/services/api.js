// exportar para .env
const API = import.meta.env.VITE_API_URL

export function getTasks() {
  // retorna a promise do fetch
  return fetch(`${API}/tasks`).then(res => res.json())
}

export function addTask(title) {
  // recebe um title, faz o POST, retorna a promise
  return fetch(`${API}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title })
  }).then(res => res.json())
}

// olhar aq dps
export async function updateTask(id, title, done) {
  // recebe id, title, done — faz o PUT
  const res = await fetch(`${API}/tasks/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, done })
  })
  return await res.json()
}

export function deleteTask(id) {
  // recebe um id, faz o DELETE
  return fetch(`${API}/tasks/${id}`, {
    method: 'DELETE'
  }).then(res => res.json())
}
