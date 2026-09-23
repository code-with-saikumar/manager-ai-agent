import { useState } from "react"
import Login from "./Login"

export default function Settings(){
    if(Login.isloggedin === 0) {
        return (
            <div className="login-required">
                <h2>Login Required</h2>
                <p>Please log in to view settings.</p>
                <Login />
            </div>
        )
    }



  const [name,setName] = useState("Admin")
  const [email,setEmail] = useState("admin@aura.ai")
  const [theme,setTheme] = useState("light")

  const saveSettings = () => {

    alert("Settings Saved")

  }

  return(

    <div className="settings-page">

      <h1>Settings</h1>

      <div className="settings-grid">

        {/* PROFILE SETTINGS */}

        <div className="card">

          <h3>Profile</h3>

          <label>Name</label>

          <input
            value={name}
            onChange={(e)=>setName(e.target.value)}
          />

          <label>Email</label>

          <input
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />

        </div>

        {/* SYSTEM SETTINGS */}

        <div className="card">

          <h3>System</h3>

          <label>Theme</label>

          <select
            value={theme}
            onChange={(e)=>setTheme(e.target.value)}
          >

            <option value="light">Light</option>
            <option value="dark">Dark</option>

          </select>

          <button onClick={saveSettings}>
            Save Settings
          </button>

        </div>

        {/* AI SETTINGS */}

        <div className="card">

          <h3>AI Configuration</h3>

          <p>Model: GPT-4</p>

          <p>Vector Database: Chroma</p>

          <p>Agents: Planner, HR, Scheduler, Risk</p>

        </div>

      </div>

    </div>

  )
}