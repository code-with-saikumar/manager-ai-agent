import pdfParse from "pdf-parse"
import type { ProjectPlan } from "../types/project.js"

/**
 * Generate a ProjectPlan from a PDF buffer.
 *
 * This is a placeholder implementation. Replace the logic below with your own
 * AI/agent call (OpenAI, LangChain, etc.) that can turn requirements PDFs into
 * a structured project plan.
 */
export async function generateProjectPlanFromPdf(
  pdfBuffer: Buffer,
  originalFileName: string
): Promise<ProjectPlan> {
  const data = await pdfParse(pdfBuffer)
  const text = data?.text ?? ""

  // TODO: Replace this stub with an AI / agent call.
  // For now we return a simple scaffold based on the extracted text.
  const now = new Date()
  const in7Days = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)

  return {
    project_summary: {
      project_name: `Generated plan for ${originalFileName}`,
      client_company: "Unknown",
      objective: text.slice(0, 240) || "Extracted requirements from the uploaded PDF.",
      key_features: [
        "PDF upload and parsing",
        "AI-generated project plan",
        "MongoDB storage",
      ],
      recommended_methodology: "Agile",
      estimated_project_duration_days: 30,
    },
    tasks: [
      {
        task_name: "Parse PDF and extract requirements",
        description: "Extracted text from the uploaded PDF and used it to create a structured project plan.",
        required_skills: ["analysis", "typescript"],
        technologies: ["Node.js", "MongoDB"],
        estimated_duration_days: 3,
        assigned_to: {
          _id: "emp_1",
          employee_id: "EMP0001",
          name: "John Doe",
          role: "Senior Developer",
          skills: "typescript;react;node.js",
          experience_years: 8,
          current_workload_percent: 75,
          email: "john.doe@company.com",
        },
        start_date: now.toISOString().split("T")[0],
        deadline: in7Days.toISOString().split("T")[0],
        status: "In Progress",
      },
      {
        task_name: "Design User Interface",
        description: "Create wireframes and mockups for the application interface.",
        required_skills: ["design", "figma"],
        technologies: ["Figma", "Adobe XD"],
        estimated_duration_days: 5,
        assigned_to: {
          _id: "emp_2",
          employee_id: "EMP0002",
          name: "Jane Smith",
          role: "UI/UX Designer",
          skills: "design;figma;user-research",
          experience_years: 6,
          current_workload_percent: 60,
          email: "jane.smith@company.com",
        },
        start_date: now.toISOString().split("T")[0],
        deadline: new Date(now.getTime() + 10 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        status: "Not started",
      },
      {
        task_name: "Project Management",
        description: "Oversee project timeline, resources, and team coordination.",
        required_skills: ["management", "agile"],
        technologies: ["Jira", "Slack"],
        estimated_duration_days: 30,
        assigned_to: {
          _id: "emp_3",
          employee_id: "EMP0003",
          name: "Mike Johnson",
          role: "Project Manager",
          skills: "management;agile;communication",
          experience_years: 10,
          current_workload_percent: 80,
          email: "mike.johnson@company.com",
        },
        start_date: now.toISOString().split("T")[0],
        deadline: new Date(now.getTime() + 35 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        status: "In Progress",
      },
    ],
    employees: [
      {
        _id: "emp_1",
        employee_id: "EMP0001",
        name: "John Doe",
        role: "Senior Developer",
        skills: "typescript;react;node.js",
        experience_years: 8,
        current_workload_percent: 75,
        email: "john.doe@company.com",
      },
      {
        _id: "emp_2",
        employee_id: "EMP0002",
        name: "Jane Smith",
        role: "UI/UX Designer",
        skills: "design;figma;user-research",
        experience_years: 6,
        current_workload_percent: 60,
        email: "jane.smith@company.com",
      },
      {
        _id: "emp_3",
        employee_id: "EMP0003",
        name: "Mike Johnson",
        role: "Project Manager",
        skills: "management;agile;communication",
        experience_years: 10,
        current_workload_percent: 80,
        email: "mike.johnson@company.com",
      },
      {
        _id: "emp_4",
        employee_id: "EMP0004",
        name: "Sarah Wilson",
        role: "QA Engineer",
        skills: "testing;automation;quality-assurance",
        experience_years: 7,
        current_workload_percent: 70,
        email: "sarah.wilson@company.com",
      },
    ],
    risk_analysis: {
      risks: [
        {
          risk_description: "AI-generated plan may need manual review.",
          impact_level: "Medium",
          probability: "Medium",
          mitigation_strategy: "Have a human review final plan and adjust as needed.",
        },
      ],
    },
  }
}
