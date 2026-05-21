import { useState, useEffect } from 'react'
import './App.css'

// URL base da API em uma constante — se a porta mudar, muda só aqui
const API = 'http://localhost:3001/api'

function App() {

  const [tasks, setTasks] = useState([])

  // busca todas as tasks ao carregar a página (array vazio = roda só uma vez)
  useEffect(() => {
    fetch(`${API}/tasks`)
      .then(res => res.json())
      .then(data => setTasks(data))
  }, [])

  const [title, setTitle] = useState('')

  function handleAdd() {
    // validação no frontend: não envia se título estiver vazio
    if (!title) return

    fetch(`${API}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title })
    })
      .then(res => res.json())
      .then(newTask => {
        setTasks([...tasks, newTask])
        setTitle('') // limpa o input após adicionar
      })
  }

  function handleDelete(id) {
    fetch(`${API}/tasks/${id}`, {
      method: 'DELETE'
    })
      // remove a task do array local sem precisar rebuscar tudo da API
      .then(() => setTasks(tasks.filter(task => task.id !== id)))
  }

  const [editingId, setEditingId] = useState(null)
  const [editingTitle, setEditingTitle] = useState('')

  function handleSave(id) {
    // busca a task atual no array pelo id para pegar o done atual
    const currentTask = tasks.find(t => t.id === id)

    fetch(`${API}/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      // envia o novo título + o done atual (sem sobrescrever com undefined)
      body: JSON.stringify({ title: editingTitle, done: currentTask.done })
    })
      .then(res => res.json())
      .then(updatedTask => {
        // substitui a task antiga pela atualizada no array
        setTasks(tasks.map(t => t.id === id ? updatedTask : t))
        setEditingId(null) // sai do modo de edição
      })
  }

  function handleToggleDone(task) {
    fetch(`${API}/tasks/${task.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      // inverte o done atual: se era 0 vira 1, se era 1 vira 0
      body: JSON.stringify({ title: task.title, done: task.done === 1 ? 0 : 1 })
    })
      .then(res => res.json())
      .then(updatedTask => {
        setTasks(tasks.map(t => t.id === task.id ? updatedTask : t))
      })
  }

  return (
    <>
      <h1>Tasks</h1>
      <div className="form">
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Nova task"
        />
        <button className="btn-add" onClick={handleAdd}>Adicionar</button>
      </div>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {/* checkbox para marcar como feita/não feita */}
            <input
              type="checkbox"
              checked={task.done === 1}
              onChange={() => handleToggleDone(task)}
            />
            {task.id === editingId
              ? <input value={editingTitle} onChange={e => setEditingTitle(e.target.value)} />
              : <span>{task.title}</span>
            }
            {task.id === editingId
              ? <button className="btn-save" onClick={() => handleSave(task.id)}>Salvar</button>
              : <button onClick={() => { setEditingId(task.id); setEditingTitle(task.title) }}>Editar</button>
            }
            <button className="btn-delete" onClick={() => handleDelete(task.id)}>Deletar</button>
          </li>
        ))}
      </ul>
    </>
  )

}

export default App
