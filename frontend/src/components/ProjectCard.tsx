import { useNavigate } from "react-router-dom"
import type { Project } from "../types/types"

export default function ProjectCard({ project }: { project: Project }) {
  const navigate = useNavigate()

  const summary = project.project_summary
  const description = summary.description ?? summary.objective

  const handleOpenProject = () => {
    // Navigate to dashboard to view project details
    navigate('/')
  }

  return (
    <div className="project-card">
      <h3>{summary.project_name}</h3>
      <p>{description}</p>

      <div className="project-status">
        <span className="project-status active">Active</span>
      </div>

      <div className="project-progress">
        <div className="project-progress-bar">
          <div className="project-progress-fill" style={{ width: `${summary.progress || 0}%` }}></div>
        </div>
        <span className="progress-text">{summary.progress || 0}% Complete</span>
      </div>

      <button onClick={handleOpenProject} className="open-project-btn">
        <span>Open Project</span>
        <span className="arrow">→</span>
      </button>
    </div>
  )
}