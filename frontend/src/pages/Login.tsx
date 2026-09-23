import { useState } from "react"
import { useNavigate } from "react-router-dom"
Login.isloggedin = 0

export default function Login() {


  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleLogin = (e: React.FormEvent) => {

    e.preventDefault()

    // Simple local authentication for demo
    if (email === "admin@aura.com" && password === "admin123") {
      setError("")
      navigate("/dashboard")
      Login.isloggedin = 1
      return
    }

    setError("Invalid credentials. Please try again.")
  }

  return (

    <div className="login-container">

      <div className="login-card">

        <h2>AURA+</h2>

        <p className="login-subtitle">
          AI Project Management Platform
        </p>

        <form onSubmit={handleLogin}>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />

          {error && (
            <div className="login-error">
              {error}
            </div>
          )}

          <button type="submit">
            Login
          </button>

        </form>

      </div>

    </div>

  )
}