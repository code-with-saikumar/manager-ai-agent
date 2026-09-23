import { useEffect, useState } from "react"
import { getTasks } from "../services/api"
import type { Task } from "../types/types"
import TaskCard from "../components/TaskCard"
import Login from "./Login"

export default function Tasks() {
    if(Login.isloggedin === 0) {
        return (
            <div className="login-required">
                <h2>Login Required</h2>
                <p>Please log in to view project tasks.</p>
                <Login />
            </div>
        )
    }

  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {

    getTasks().then(setTasks)

  }, [])

  const columns = [
    { id: "backlog", title: "Backlog", className: "backlog" },
    { id: "todo", title: "To Do", className: "todo" },
    { id: "in-progress", title: "In Progress", className: "in-progress" },
    { id: "review", title: "Review", className: "review" },
    { id: "completed", title: "Completed", className: "done" }
  ]

  const getTaskCount = (status: string) => {
    return tasks.filter(task => task.status?.toLowerCase() === status.toLowerCase()).length
  }

  return (

    <div className="tasks-container">

      <div className="tasks-header">

        <h1>Project Tasks</h1>

        <p>Manage and track your project tasks with our interactive kanban board</p>

      </div>

      <div className="kanban">

        {columns.map((col) => (

          <div className={`column ${col.className}`} key={col.id}>

            <div className="column-header">

              <h3 className="column-title">{col.title}</h3>

              <span className="column-count">{getTaskCount(col.id)}</span>

            </div>

            {tasks
              .filter((t) => t.status?.toLowerCase() === col.id)
              .map((task) => (

                <TaskCard key={task._id} task={task} />

              ))}

          </div>

        ))}

      </div>

    </div>

  )
}
