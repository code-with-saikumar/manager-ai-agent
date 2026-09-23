import { useEffect, useState } from "react"
import { getEmployees, getTasks } from "../services/api"
import type { Employee, Task } from "../types/types"
import EmployeeCard from "../components/EmployeeCard"
import Login from "./Login"

export default function Employees() {

    if(Login.isloggedin === 0) {
        return (
            <div className="login-required">
                <h2>Login Required</h2>
                <p>Please log in to view employee information.</p>
                <Login />
            </div>
        )
    }
  const [employees, setEmployees] = useState<Employee[]>([])
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    Promise.all([getEmployees(), getTasks()]).then(([emps, tsks]) => {
      setEmployees(emps)
      setTasks(tsks)
    })
  }, [])

  return (

    <div>

      <h1>Employees</h1>

      <div className="employee-grid">

        {employees.map((emp) => {

          const employeeTasks = tasks.filter(t => t.assignee === emp.name || t.assigned_to?.name === emp.name)

          return <EmployeeCard key={emp._id} employee={emp} tasks={employeeTasks} />

        })}

      </div>

    </div>

  )
}