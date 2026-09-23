import { Link } from "react-router-dom"

export default function Sidebar() {

  return (

    <div className="sidebar">

      <h2 className="logo">AURA++</h2>

      <nav>

        <Link to="/">Dashboard</Link>
        <Link to="/upload">Upload PDF</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/tasks">Tasks</Link>
        <Link to="/employees">Employees</Link>
        <Link to="/analytics">Analytics</Link>
        <Link to="/history">History</Link>
        <Link to="/settings">Settings</Link>
        <Link to="/login">Logout</Link>
      </nav>

    </div>
  )
}