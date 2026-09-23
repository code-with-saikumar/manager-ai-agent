import type { Task } from "../types/types"

type Props = {
  tasks: Task[]
}

export default function ProgressBar({ tasks }: Props) {
  const total = tasks.length
  const completed = tasks.filter((t) => {
    const status = typeof t.status === "string" ? t.status.toLowerCase() : ""
    return ["done", "completed"].includes(status)
  }).length
  const inProgress = tasks.filter((t) => {
    const status = typeof t.status === "string" ? t.status.toLowerCase() : ""
    return ["in progress", "in-progress", "ongoing"].includes(status)
  }).length
  const pending = total - completed - inProgress
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100)

  return (
    <div className="card progress-card">
      <div className="progress-header">
        <h3>📊 Project Progress</h3>
        <div className="progress-percentage">{percent}%</div>
      </div>

      <div className="progress-container">
        <div className="progress-bar-bg">
          <div
            className="progress-bar-completed"
            style={{ width: `${percent}%` }}
            aria-label="Completed tasks"
          />
          <div
            className="progress-bar-inprogress"
            style={{ width: `${inProgress / total * 100}%`, left: `${percent}%` }}
            aria-label="In progress tasks"
          />
        </div>
      </div>

      <div className="progress-stats">
        <div className="stat-item">
          <span className="stat-number completed">{completed}</span>
          <span className="stat-label">Completed</span>
        </div>
        <div className="stat-item">
          <span className="stat-number inprogress">{inProgress}</span>
          <span className="stat-label">In Progress</span>
        </div>
        <div className="stat-item">
          <span className="stat-number pending">{pending}</span>
          <span className="stat-label">Pending</span>
        </div>
        <div className="stat-item">
          <span className="stat-number total">{total}</span>
          <span className="stat-label">Total</span>
        </div>
      </div>
    </div>
  )
}
