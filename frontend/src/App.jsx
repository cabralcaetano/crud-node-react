import { useState, useEffect } from 'react'

function App() {

  const [tasks, setTasks] = useState([])

  useEffect(() => {
    fetch('http://localhost:3001/api/tasks')
      .then(res => res.json())
      .then(data => setTasks(data))
  }, [])

  const [title, setTitle] = useState('')

  function handleAdd() {
    fetch('http://localhost:3001/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title })
    })
      .then(res => res.json())
      .then(newTask => setTasks([...tasks, newTask]))

  }

  function handleDelete(id) {
    fetch(`http://localhost:3001/api/tasks/${id}`, {
      method: 'DELETE'
    })
      .then(() => setTasks(tasks.filter(task => task.id !== id)))
  }

  const [editingId, setEditingId] = useState(null)
  const [editingTitle, setEditingTitle] = useState('')

  function handleSave(id) {
    fetch(`http://localhost:3001/api/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: editingTitle, done: 0 })
    })
      .then(res => res.json())
      .then(updatedTask => {
        setTasks(tasks.map(t => t.id === id ? updatedTask : t))
        setEditingId(null)
      })
  }

  return (
    <>
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Nova task"
      />
      <button onClick={handleAdd}>Adicionar</button>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.id === editingId
              ? <input value={editingTitle} onChange={e => setEditingTitle(e.target.value)} />
              : task.title
            }
            {task.id === editingId
              ? <button onClick={() => handleSave(task.id)}>Salvar</button>
              : <button onClick={() => { setEditingId(task.id); setEditingTitle(task.title) }}>Editar</button>
            }
            <button onClick={() => handleDelete(task.id)}>Deletar</button>
          </li>
        ))}
      </ul>
    </>
  )

}

export default App
