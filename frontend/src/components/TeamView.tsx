import type { Task } from "../types/types"

type Props = {
  tasks: Task[]
}

export default function TeamView({ tasks }: Props) {
  const teamStats = tasks.reduce<Record<string, { count: number; completed: number; inProgress: number }>>((acc, t) => {
    const name = t.assignee || "Unassigned"
    if (!acc[name]) {
      acc[name] = { count: 0, completed: 0, inProgress: 0 }
    }
    acc[name].count++
    const status = (t.status || "").toLowerCase()
    if (["done", "completed"].includes(status)) {
      acc[name].completed++
    } else if (["in progress", "in-progress", "ongoing"].includes(status)) {
      acc[name].inProgress++
    }
    return acc
  }, {})

  const totalTasks = tasks.length

  return (
    <div className="card team-view-card">
      <h3>👥 Team Overview</h3>
      <div className="team-stats">
        {Object.entries(teamStats).map(([name, stats], index) => {
          const percentage = totalTasks > 0 ? (stats.count / totalTasks * 100).toFixed(1) : "0"
          return (
            <div key={name} className={`team-member stagger-${(index % 5) + 1}`}>
              <div className="member-header">
                <span className="member-name">{name}</span>
                <span className="member-percentage">{percentage}%</span>
              </div>
              <div className="member-stats">
                <div className="stat-bar">
                  <div
                    className="stat-completed"
                    style={{ width: `${(stats.completed / stats.count) * 100}%` }}
                  />
                  <div
                    className="stat-inprogress"
                    style={{ width: `${(stats.inProgress / stats.count) * 100}%` }}
                  />
                </div>
                <div className="stat-numbers">
                  <span className="total-tasks">{stats.count} tasks</span>
                  <span className="completed-count">{stats.completed} done</span>
                  <span className="inprogress-count">{stats.inProgress} active</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
