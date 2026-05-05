import { useEffect, useState } from 'react'
import TaskForm from './components/TaskForm'
import TaskItem from './components/TaskItem'
import TaskList from './components/TaskList'
import { v4 as uuidv4 } from "uuid";

const initialTask = [
  { id: uuidv4(), title: "Complete my homework", completed: true },
  { id: uuidv4(), title: "Sleep at 10:40 PM", completed: true },
  { id: uuidv4(), title: "Wake, make bed and go to school", completed: true },
  { id: uuidv4(), title: "Complete my homework", completed: false },
  { id: uuidv4(), title: "Return home", completed: false },
]

const App = () => {
  const [tasks, setTasks] = useState(initialTask)
  // State to track which task is being edited[cite: 4]
  const [editId, setEditId] = useState(null)

  const addTask = (task) => {
    const newTask = { id: Date.now(), title: task, completed: false }
    setTasks([...tasks, newTask])
  }

  const handleToggle = (id) => {
    setTasks(tasks.map((task) => task.id === id ? { ...task, completed: !task.completed } : task))
  }

  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  // Function to save the edited task[cite: 4]
  const handleUpdate = (id, newTitle) => {
    // if(!task.trim()) return handleDelete(id)
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, title: newTitle } : task
    ))
    setEditId(null)
  }

  return (
    <div className='min-h-screen bg-slate-100 p-3 flex flex-col items-center'>
      <TaskForm onAdd={addTask} />
      <TaskList
        tasks={tasks}
        onToggle={handleToggle}
        onDelete={handleDelete}
        onEdit={setEditId} // Pass setEditId to trigger edit mode[cite: 3, 4]
        editId={editId}
        onUpdate={handleUpdate}
      />
    </div>
  )
}

export default App