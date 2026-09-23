import type { Task } from "../types/types"

type Props = {
  tasks: Task[]
}

const getStatusColor = (status: string) => {
  const s = (status || "").toLowerCase()
  if (["done", "completed"].includes(s)) return "#10b981"
  if (["in progress", "in-progress", "ongoing"].includes(s)) return "#f59e0b"
  if (["pending", "todo"].includes(s)) return "#ef4444"
  return "#6b7280"
}

const getStatusIcon = (status: string) => {
  const s = (status || "").toLowerCase()
  if (["done", "completed"].includes(s)) return "✅"
  if (["in progress", "in-progress", "ongoing"].includes(s)) return "🔄"
  if (["pending", "todo"].includes(s)) return "⏳"
  return "❓"
}

export default function TaskTable({ tasks }: Props) {
  return (
    <div className="card task-table-card">
      <h3>📋 Task Details</h3>
      <div className="table-container">
        <table className="task-table">
          <thead>
            <tr>
              <th>Task Name</th>
              <th>Description</th>
              <th>Assignee</th>
              <th>Status</th>
              <th>Deadline</th>
              <th>Skills</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={task._id} className={`task-row stagger-${(index % 5) + 1}`}>
                <td className="task-name">{task.task_name}</td>
                <td className="task-desc">{task.description}</td>
                <td className="assignee">
                  {task.assignee ? (
                    <span className="assignee-badge">{task.assignee}</span>
                  ) : (
                    <span className="unassigned">Unassigned</span>
                  )}
                </td>
                <td>
                  <span
                    className="status-badge"
                    style={{ backgroundColor: getStatusColor(task.status) }}
                  >
                    {getStatusIcon(task.status)} {task.status}
                  </span>
                </td>
                <td className="deadline">
                  <span className="deadline-date">{task.deadline}</span>
                </td>
                <td>
                  <div className="skills-list">
                    {task.required_skills?.slice(0, 2).map((skill) => (
                      <span key={skill} className="skill-tag">{skill}</span>
                    ))}
                    {task.required_skills && task.required_skills.length > 2 && (
                      <span className="skill-more">+{task.required_skills.length - 2}</span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
