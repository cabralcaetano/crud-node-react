import { useState, useEffect } from 'react'

function App() {

  const [tasks, setTasks] = useState([])

  useEffect(() => {
    fetch('http://localhost:3001/api/tasks')
      .then(res => res.json())
      .then(data => console.log(data))
  }, [])

  return (
    <h1>Tasks</h1>
  )
}

export default App
