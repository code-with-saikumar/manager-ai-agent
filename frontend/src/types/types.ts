export interface ProjectSummary {
  project_id: string
  project_name: string
  client_company: string
  objective: string
  key_features: string[]
  recommended_methodology: string
  estimated_project_duration_days: number
  // Optional fields for UI components that use 'description' or 'progress'
  description?: string
  progress?: number
}

export interface Task {
  _id: string
  task_name: string
  description: string
  assignee?: string
  required_skills?: string[]
  technologies?: string[]
  estimated_duration_days?: number
  assigned_to?: Employee | null
  start_date?: string
  deadline: string
  status: string
  priority: string
}

export interface Employee {
  _id: string
  employee_id: string
  name: string
  role: string
  skills: string // semicolon-separated string
  experience_years: number
  current_workload_percent: number
  email?: string // optional for backward compatibility
}

export interface RiskItem {
  risk_description: string
  impact_level: string
  probability: string
  mitigation_strategy: string
}

export interface RiskAnalysis {
  risks: RiskItem[]
}

export interface ProjectPlan {
  project_summary: ProjectSummary
  tasks: Task[]
  employees: Employee[]
  risk_analysis: RiskAnalysis
}

export interface Project {
  _id: string
  project_summary: ProjectSummary
  created_at: string
}
