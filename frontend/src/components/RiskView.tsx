import type { RiskAnalysis } from "../types/types"

type Props = {
  risks: RiskAnalysis
}

const getRiskColor = (impact: string, probability: string) => {
  const impactScore = { low: 1, medium: 2, high: 3, critical: 4 }[(impact || "").toLowerCase()] || 1
  const probScore = { low: 1, medium: 2, high: 3 }[(probability || "").toLowerCase()] || 1
  const total = impactScore * probScore

  if (total >= 8) return { bg: "#dc2626", text: "#ffffff" } // Critical
  if (total >= 4) return { bg: "#ea580c", text: "#ffffff" } // High
  if (total >= 2) return { bg: "#ca8a04", text: "#ffffff" } // Medium
  return { bg: "#16a34a", text: "#ffffff" } // Low
}

const getRiskIcon = (impact: string, probability: string) => {
  const impactScore = { low: 1, medium: 2, high: 3, critical: 4 }[(impact || "").toLowerCase()] || 1
  const probScore = { low: 1, medium: 2, high: 3 }[(probability || "").toLowerCase()] || 1
  const total = impactScore * probScore

  if (total >= 8) return "🚨"
  if (total >= 4) return "⚠️"
  if (total >= 2) return "🟡"
  return "🟢"
}

export default function RiskView({ risks }: Props) {
  return (
    <div className="card risk-view-card">
      <h3>⚠️ Risk Analysis</h3>
      {risks?.risks?.length ? (
        <div className="risks-list">
          {risks.risks.map((risk, index) => {
            const colors = getRiskColor(risk.impact_level, risk.probability)
            return (
              <div
                key={index}
                className="risk-item"
                style={{
                  borderLeft: `4px solid ${colors.bg}`,
                  background: `linear-gradient(135deg, ${colors.bg}15, ${colors.bg}05)`
                }}
              >
                <div className="risk-header">
                  <span className="risk-icon">{getRiskIcon(risk.impact_level, risk.probability)}</span>
                  <div className="risk-levels">
                    <span
                      className="risk-badge impact"
                      style={{ backgroundColor: colors.bg, color: colors.text }}
                    >
                      {risk.impact_level}
                    </span>
                    <span
                      className="risk-badge probability"
                      style={{ backgroundColor: colors.bg, color: colors.text }}
                    >
                      {risk.probability}
                    </span>
                  </div>
                </div>
                <div className="risk-content">
                  <p className="risk-description">{risk.risk_description}</p>
                  <div className="risk-mitigation">
                    <strong>🛡️ Mitigation:</strong> {risk.mitigation_strategy}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="no-risks">
          <span className="no-risks-icon">✅</span>
          <p>No risks identified for this project.</p>
        </div>
      )}
    </div>
  )
}
