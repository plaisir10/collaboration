
const TaskItem = ({ task }) => {
    return (
            <li className="mt-4 border rounded flex justify-between p-2 w-140">
                <input
                    className="hover:cursor-pointer "
                    type="checkbox"
                    checked={task.completed}
                />
                <span>{task.title}</span>
                <button
                    className='bg-red-500 rounded p-1 text-white text-sm w-20 hover:cursor-pointer hover:bg-red-600'
                >
                    Delete
                </button>
            </li>
    )
}

export default TaskItem