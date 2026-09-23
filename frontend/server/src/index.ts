import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import multer from "multer"
import dotenv from "dotenv"

import { generateProjectPlanFromPdf } from "./agents/pdfAgent.js"
import { Document } from "./models/Document.js"
import { emailService } from "./services/emailService.js"
import type { Task } from "./types/project.js"

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

const upload = multer({ storage: multer.memoryStorage() })

const MONGODB_URI = process.env.MONGODB_URI
if (!MONGODB_URI) {
  throw new Error("MONGODB_URI must be set in .env")
}

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => {
    console.error("❌ Failed to connect to MongoDB", err)
    process.exit(1)
  })

app.post("/upload", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "file is required" })
  }

  try {
    const projectPlan = await generateProjectPlanFromPdf(
      req.file.buffer,
      req.file.originalname
    )

    const saved = await Document.create({
      originalFileName: req.file.originalname,
      projectPlan,
    })

    return res.status(201).json({ id: saved._id, projectPlan })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Failed to generate project plan" })
  }
})

app.get("/project-plan", async (req, res) => {
  const latest = await Document.findOne().sort({ createdAt: -1 }).lean()
  if (!latest) {
    return res.status(404).json({ message: "No project plan found" })
  }

  return res.json(latest.projectPlan)
})

app.get("/employees", async (req, res) => {
  const latest = await Document.findOne().sort({ createdAt: -1 }).lean()
  if (!latest) {
    return res.status(404).json({ message: "No project plan found" })
  }

  const employees = latest.projectPlan.employees || []
  return res.json(employees)
})

app.get("/tasks", async (req, res) => {
  // Mock data for testing
  const mockTasks = [
    {
      _id: "task1",
      task_name: "Project Planning & Requirements",
      description: "Define project scope and gather requirements",
      assignee: "John Doe",
      required_skills: ["Project Management", "Analysis"],
      deadline: "2024-12-15",
      status: "completed"
    },
    {
      _id: "task2",
      task_name: "Backend Development",
      description: "Develop the backend API services",
      assignee: "Jane Smith",
      required_skills: ["Python", "FastAPI"],
      deadline: "2024-12-20",
      status: "in-progress"
    },
    {
      _id: "task3",
      task_name: "Frontend Development",
      description: "Build the user interface components",
      assignee: "Bob Johnson",
      required_skills: ["React", "TypeScript"],
      deadline: "2024-12-25",
      status: "todo"
    },
    {
      _id: "task4",
      task_name: "Testing & QA",
      description: "Perform comprehensive testing",
      assignee: "Alice Brown",
      required_skills: ["Testing", "QA"],
      deadline: "2024-12-30",
      status: "backlog"
    },
    {
      _id: "task5",
      task_name: "Deployment",
      description: "Deploy application to production",
      assignee: "Charlie Wilson",
      required_skills: ["DevOps", "Docker"],
      deadline: "2025-01-05",
      status: "review"
    }
  ]
  return res.json(mockTasks)
})

app.post("/send-task-emails", async (req, res) => {
  try {
    const { employeeId } = req.body

    if (!employeeId) {
      return res.status(400).json({ message: "employeeId is required" })
    }

    // Get the latest project plan
    const latest = await Document.findOne().sort({ createdAt: -1 }).lean()
    if (!latest) {
      return res.status(404).json({ message: "No project plan found" })
    }

    const projectPlan = latest.projectPlan as any

    // Find the employee
    const employee = projectPlan.employees?.find((emp: any) => emp._id === employeeId)
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" })
    }

    if (!employee.email) {
      return res.status(400).json({ message: "Employee does not have an email address" })
    }

    // Get tasks assigned to this employee
    const employeeTasks = projectPlan.tasks?.filter((task: Task) =>
      task.assigned_to?._id === employeeId ||
      task.assigned_to?.name === employee.name
    ) || []

    if (employeeTasks.length === 0) {
      return res.status(400).json({ message: "No tasks assigned to this employee" })
    }

    // Send email with tasks
    await emailService.sendTaskNotification(employee.email, employee.name, employeeTasks)

    return res.json({
      message: `Task notification sent to ${employee.name} (${employee.email})`,
      taskCount: employeeTasks.length
    })

  } catch (error) {
    console.error("Failed to send task emails:", error)
    return res.status(500).json({ message: "Failed to send task notification" })
  }
})

const port = Number(process.env.PORT ?? 8000)
app.listen(port, () => {
  console.log(`🚀 Server listening on http://localhost:${port}`)
})
