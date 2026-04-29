import { useState } from 'react'
import TaskForm from './components/TaskForm'
import TaskItem from './components/TaskItem'
import TaskList from './components/TaskList'

const initialTask = [
  { id: 1, title: "Complete my homework", completed: true },
  { id: 2, title: "Sleep at 10:40 PM", completed: true },
  { id: 3, title: "Wake, make bed and go to school", completed: true },
  { id: 4, title: "Complete my homework", completed: true },
  { id: 5, title: "Return home", completed: false },
]

const App = () => {
  const [tasks, setTasks] = useState(initialTask)

  const addTask = (task) => {
    const newTask = { id: Date.now(), title: task, completed: false }
    setTasks([...tasks, newTask])
  }

  const handleDelete = (index) =>{
    setTasks((_, i)=> i !== index)
  }

  console.log(tasks)
  return (
    <div className='min-h-screen bg-slate-50 p-3 flex flex-col items-center'>
      <TaskForm onAdd={addTask} />
      <TaskList tasks={tasks} />
    </div>
  )
}

export default App