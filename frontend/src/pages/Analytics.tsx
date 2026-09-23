import { useEffect, useState } from "react"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

import { getTasks, getEmployees, getProjectHistory } from "../services/api"
import Login from "./Login"

export default function Analytics() {

    
    if(Login.isloggedin === 0) {
        return (
            <div className="login-required">
                <h2>Login Required</h2>
                <p>Please log in to view analytics.</p>
                <Login />
            </div>
        )
    }
    
    if(getTasks.length === 0 || getEmployees.length === 0 || getProjectHistory.length === 0) {
        return (
            <div className="analytics-placeholder">
                <h2>Loading Analytics...</h2>
                <p>Analytics data is being fetched. Please wait a moment.</p>
            </div>
        )
    }

  const [tasks, setTasks] = useState([])
  const [employees, setEmployees] = useState([])
  const [projects, setProjects] = useState([])

  useEffect(() => {

    getTasks().then(setTasks)
    getEmployees().then(setEmployees)
    getProjectHistory().then(setProjects)

  }, [])

  // -------------------------
  // TASK STATUS GRAPH
  // -------------------------

  const statusCount: any = {}

  tasks.forEach((t: any) => {

    const status = t.status || "Backlog"

    statusCount[status] = (statusCount[status] || 0) + 1

  })

  const taskChartData = Object.keys(statusCount).map((k) => ({
    status: k,
    tasks: statusCount[k]
  }))

  // -------------------------
  // EMPLOYEE WORKLOAD GRAPH
  // -------------------------

  const employeeChartData = employees.map((emp: any) => ({
    name: emp.name,
    workload: emp.workload || 0
  }))

  return (

    <div className="analytics-page">

      <h1>Analytics</h1>

      <div className="analytics-grid">

        {/* TASK STATUS GRAPH */}
        <div className="card">

          <h3>Tasks by Status</h3>

          <ResponsiveContainer width="100%" height={250}>

            <BarChart data={taskChartData}>

              <XAxis dataKey="status" />
              <YAxis />
              <Tooltip />

              <Bar dataKey="tasks" fill="#6366f1" animationDuration={1200} />

            </BarChart>

          </ResponsiveContainer>

        </div>

        {/* EMPLOYEE WORKLOAD GRAPH */}
        <div className="card">

          <h3>Employee Workload</h3>

          <ResponsiveContainer width="100%" height={250}>

            <BarChart data={employeeChartData}>

              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />

              <Bar dataKey="workload" fill="#a855f7" animationDuration={1200} />

            </BarChart>

          </ResponsiveContainer>

        </div>

        {/* PROJECT HISTORY */}
        <div className="card">

          <h3>Project History</h3>

          <ul>

            {projects.slice(0, 5).map((p: any) => (

              <li key={p._id}>

                <strong>{p.project_summary?.project_name}</strong>

                <p>{p.project_summary?.description}</p>

              </li>

            ))}

          </ul>

        </div>

        {/* TEAM PRODUCTIVITY */}
        <div className="card">

          <h3>Team Productivity</h3>

          <p>Total Employees: {employees.length}</p>

          <p>Total Tasks: {tasks.length}</p>

          <p>
            Avg Workload:
            {employees.length
              ? (
                  employees.reduce(
                    (sum: number, e: any) => sum + (e.workload || 0),
                    0
                  ) / employees.length
                ).toFixed(1)
              : 0}
            %
          </p>

        </div>

        {/* TOOLS & INTEGRATIONS */}
        <div className="card">

          <h3>Tools & Integrations</h3>

          <div className="tool-tags">

            <span>React</span>
            <span>Python</span>
            <span>LangChain</span>
            <span>MongoDB</span>
            <span>Docker</span>
            <span>AWS</span>

          </div>

        </div>

      </div>

    </div>

  )
}