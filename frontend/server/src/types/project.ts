export interface Employee {
  _id: string
  employee_id: string
  name: string
  role: string
  skills: string
  experience_years: number
  current_workload_percent: number
  email?: string
}

export interface Task {
  task_name: string
  description: string
  required_skills: string[]
  technologies: string[]
  estimated_duration_days: number
  assigned_to?: Employee | null
  start_date: string
  deadline: string
  status?: string
}

export interface ProjectSummary {
  project_name: string
  client_company: string
  objective: string
  key_features: string[]
  recommended_methodology: string
  estimated_project_duration_days: number
}

export interface Risk {
  risk_description: string
  impact_level: string
  probability: string
  mitigation_strategy: string
}

export interface RiskAnalysis {
  risks: Risk[]
}

export interface ProjectPlan {
  project_summary: ProjectSummary
  tasks: Task[]
  employees: Employee[]
  risk_analysis: RiskAnalysis
}
