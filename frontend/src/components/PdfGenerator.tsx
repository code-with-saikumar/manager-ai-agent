import jsPDF from 'jspdf'
import type { ProjectPlan } from '../types/types'

export function downloadProjectPlanAsPdf(plan: ProjectPlan) {
  const doc = new jsPDF()

  // Title
  doc.setFontSize(20)
  doc.text('Project Plan: ' + plan.project_summary.project_name, 20, 30)

  // Summary
  doc.setFontSize(14)
  doc.text('Summary:', 20, 50)
  doc.setFontSize(12)
  const summaryLines = doc.splitTextToSize(
    `Client: ${plan.project_summary.client_company}\nObjective: ${plan.project_summary.objective}\nMethodology: ${plan.project_summary.recommended_methodology}\nDuration: ${plan.project_summary.estimated_project_duration_days} days`,
    170
  )
  doc.text(summaryLines, 20, 60)

  let y = 80 + summaryLines.length * 5

  // Tasks
  doc.setFontSize(14)
  doc.text('Tasks:', 20, y)
  y += 10
  doc.setFontSize(12)
  plan.tasks.forEach((task, index) => {
    const taskText = `${index + 1}. ${task.task_name} - ${task.description} (Assignee: ${task.assignee || 'Unassigned'}, Deadline: ${task.deadline})`
    const lines = doc.splitTextToSize(taskText, 170)
    doc.text(lines, 20, y)
    y += lines.length * 5 + 5
    if (y > 270) {
      doc.addPage()
      y = 30
    }
  })

  // Risks
  if (plan.risk_analysis?.risks?.length) {
    doc.setFontSize(14)
    doc.text('Risk Analysis:', 20, y)
    y += 10
    doc.setFontSize(12)
    plan.risk_analysis.risks.forEach((risk, index) => {
      const riskText = `${index + 1}. ${risk.risk_description} (Impact: ${risk.impact_level}, Probability: ${risk.probability}) - Mitigation: ${risk.mitigation_strategy}`
      const lines = doc.splitTextToSize(riskText, 170)
      doc.text(lines, 20, y)
      y += lines.length * 5 + 5
      if (y > 270) {
        doc.addPage()
        y = 30
      }
    })
  }

  // Save
  doc.save(`${plan.project_summary.project_name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_plan.pdf`)
}