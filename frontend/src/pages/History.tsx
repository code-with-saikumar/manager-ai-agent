import { useEffect, useState } from "react"
import { getProjectHistory } from "../services/api"
import type { ProjectPlan } from "../types/types"
import UploadBox from "../components/UploadBox"
import {downloadProjectPlanAsPdf} from "../components/PdfGenerator"
import Loader from "../components/Loader"
import Login from "./Login"

export default function History() {
    if(Login.isloggedin === 0) {
        return (
            <div className="login-required">
                <h2>Login Required</h2>
                <p>Please log in to view project history.</p>
                <Login />
            </div>
        )
    }
  const [plans, setPlans] = useState<ProjectPlan[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)

  const loadPlans = async () => {
    try {
      setError(null)
      const history = await getProjectHistory()
      // Assuming history is an array of plans
      setPlans(Array.isArray(history) ? history : [])
    } catch (err) {
      console.error(err)
      setError("Failed to load project history.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadPlans()
  }, [])

  const handleUploadSuccess = () => {
    setUploading(false)
    loadPlans() // Refresh history after upload
  }

  const handleUploadStart = () => {
    setUploading(true)
  }

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "80px" }}>
        <Loader />
        <p>Loading project history...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", marginTop: "80px" }}>
        <p style={{ color: "#b91c1c" }}>{error}</p>
        <button
          onClick={loadPlans}
          style={{
            marginTop: 20,
            padding: "10px 20px",
            background: "#6366f1",
            color: "white",
            border: "none",
            borderRadius: 8,
            cursor: "pointer"
          }}
        >
          Retry
        </button>
      </div>
    )
  }

  return (
    <div>

      <h1>Project History</h1>

      {/* Upload Section */}
      <div className="card" style={{ marginBottom: 30 }}>
        <h3>Upload New Requirements PDF</h3>
        <p>Generate a new AI-powered project plan</p>
        <UploadBox onSuccess={handleUploadSuccess} onStart={handleUploadStart} />
        {uploading && <p style={{ marginTop: 10, color: "#6366f1" }}>Processing upload...</p>}
      </div>

      {/* Plans List */}
      <div>
        <h2>All Generated Plans</h2>
        {plans.length === 0 ? (
          <p>No project plans found. Upload a PDF to get started.</p>
        ) : (
          <div style={{ display: "grid", gap: 20 }}>
            {plans.map((plan, index) => (
              <div key={index} className="card">
                <h3>{plan.project_summary.project_name}</h3>
                <p><strong>Client:</strong> {plan.project_summary.client_company}</p>
                <p><strong>Objective:</strong> {plan.project_summary.objective.slice(0, 100)}...</p>
                <p><strong>Tasks:</strong> {plan.tasks.length}</p>
                <p><strong>Risks:</strong> {plan.risk_analysis.risks.length}</p>
                <div style={{ marginTop: 15 }}>
                  <button
                    onClick={() => downloadProjectPlanAsPdf(plan)}
                    style={{
                      padding: "8px 16px",
                      background: "#10b981",
                      color: "white",
                      border: "none",
                      borderRadius: 6,
                      cursor: "pointer",
                      marginRight: 10
                    }}
                  >
                    📄 Download PDF
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  )
}
