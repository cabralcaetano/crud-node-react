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
            {task.title}
            <button onClick={() => handleDelete(task.id)}>Deletar</button>
          </li>
        ))}
      </ul>
    </>
  )

}

export default App
