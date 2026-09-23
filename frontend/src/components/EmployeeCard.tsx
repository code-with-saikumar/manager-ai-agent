import { useState } from "react"
import { sendTaskEmail } from "../services/api"
import type { Employee, Task } from "../types/types"

type Props = {
  employee: Employee
  tasks: Task[]
}

export default function EmployeeCard({ employee, tasks }: Props) {
  const [sendingEmail, setSendingEmail] = useState(false)
  const [emailSent, setEmailSent] = useState(false)

  // Parse skills from semicolon-separated string
  const skillsArray = employee.skills ? employee.skills.split(';').filter(skill => skill.trim()) : []

  const handleEmailTasks = async () => {
    if (tasks.length === 0) return

    setSendingEmail(true)
    try {
      await sendTaskEmail(employee._id)
      setEmailSent(true)
      setTimeout(() => setEmailSent(false), 3000) // Reset after 3 seconds
    } catch (error) {
      console.error('Failed to send email:', error)
      alert('Failed to send email. Please try again.')
    } finally {
      setSendingEmail(false)
    }
  }

  return (
    <div className="employee-card">
      <h3>{employee.name}</h3>
      <p>{employee.role}</p>
      <div className="employee-details">
        <p><strong>Employee ID:</strong> {employee.employee_id}</p>
        <p><strong>Experience:</strong> {employee.experience_years} years</p>
      </div>
      <div className="skills">
        {skillsArray.map((skill) => (
          <span key={skill.trim()}>{skill.trim()}</span>
        ))}
      </div>
      {employee.email && <p><strong>Email:</strong> {employee.email}</p>}
      <div className="progress">
        <div
          className="progress-bar"
          style={{ width: `${employee.current_workload_percent}%` }}
        />
      </div>
      <p>Workload: {employee.current_workload_percent}%</p>
      <p>Assigned Tasks: {tasks.length}</p>
      {tasks.length > 0 && (
        <button
          onClick={handleEmailTasks}
          disabled={sendingEmail}
          className={`email-btn ${emailSent ? 'sent' : ''}`}
        >
          {sendingEmail ? (
            <>
              <span className="spinner">⏳</span>
              Sending...
            </>
          ) : emailSent ? (
            <>
              <span className="checkmark">✅</span>
              Email Sent!
            </>
          ) : (
            <>
              <span>📧</span>
              Send Tasks
            </>
          )}
        </button>
      )}
    </div>
  )
}