import type { ProjectSummary } from "../types/types"

type Props = {
  summary: ProjectSummary
}

export default function ProjectSummary({ summary }: Props) {
  return (
    <div className="card project-summary-card">
      <div className="summary-header">
        <h1>📋 Project Summary</h1>
        <div className="project-id-badge">ID: {summary.project_id}</div>
      </div>

      <div className="summary-grid">
        <div className="summary-item">
          <span className="label">🏢 Project:</span>
          <span className="value">{summary.project_name}</span>
        </div>
        <div className="summary-item">
          <span className="label">👥 Client:</span>
          <span className="value">{summary.client_company}</span>
        </div>
        <div className="summary-item">
          <span className="label">🎯 Objective:</span>
          <span className="value">{summary.objective}</span>
        </div>
        <div className="summary-item">
          <span className="label">⚙️ Methodology:</span>
          <span className="value">{summary.recommended_methodology}</span>
        </div>
        <div className="summary-item">
          <span className="label">⏱️ Duration:</span>
          <span className="value">{summary.estimated_project_duration_days} days</span>
        </div>
      </div>

      {summary.key_features?.length ? (
        <div className="key-features">
          <h3>✨ Key Features</h3>
          <div className="features-list">
            {summary.key_features.map((feature, index) => (
              <div key={feature} className="feature-item">
                <span className="feature-number">{index + 1}</span>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
}
