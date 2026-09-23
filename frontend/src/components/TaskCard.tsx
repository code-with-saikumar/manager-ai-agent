import type { Task } from "../types/types"

type Props = {
  task: Task
}

export default function TaskCard({ task }: Props) {
  const getPriorityClass = (priority?: string) => {
    if (!priority) return "low"
    const pri = priority.toLowerCase()
    if (pri.includes("high")) return "high"
    if (pri.includes("medium")) return "medium"
    return "low"
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return "No deadline"
    try {
      return new Date(dateString).toLocaleDateString()
    } catch {
      return dateString
    }
  }

  return (
    <div className="task-card">
      <h4>{task.task_name}</h4>
      <p>{task.description}</p>

      <div className="task-meta">
        <div className="task-priority">
          <span className={`task-priority ${getPriorityClass(task.priority)}`}>
            {task.priority || "Low"}
          </span>
        </div>
        <div className="task-assignee">
          {task.assignee || "Unassigned"}
        </div>
      </div>

      <div className="task-due-date">
        Due: {formatDate(task.deadline)}
      </div>

      {task.required_skills && task.required_skills.length > 0 && (
        <div className="task-tags">
          {task.required_skills.slice(0, 3).map((skill, index) => (
            <span key={index} className="task-tag">{skill.trim()}</span>
          ))}
          {task.required_skills.length > 3 && (
            <span className="task-tag">+{task.required_skills.length - 3}</span>
          )}
        </div>
      )}
    </div>
  )
}