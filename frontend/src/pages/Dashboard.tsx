import { useEffect, useState } from "react"
import { getProjectPlan } from "../services/api"
import type { ProjectPlan } from "../types/types"

import ProgressBar from "../components/Progressbar"
import ProjectSummary from "../components/ProjectSummary"
import TaskTable from "../components/TaskTable"
import TeamView from "../components/TeamView"
import RiskView from "../components/RiskView"
import Loader from "../components/Loader"
import UploadBox from "../components/UploadBox"
import {downloadProjectPlanAsPdf} from "../components/PdfGenerator"

export default function Dashboard() {

  const [data, setData] = useState<ProjectPlan | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)

  const loadData = async () => {
    try {
      setError(null)
      const plan = await getProjectPlan()
      if (!plan?.project_summary) {
        throw new Error("Project plan is missing required fields")
      }
      setData(plan)
    } catch (err) {
      console.error(err)
      setError(err instanceof Error ? err.message : String(err))
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleUploadSuccess = () => {
    setUploading(false)
    loadData() // Refresh data after upload
  }

  const handleUploadStart = () => {
    setUploading(true)
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", marginTop: "80px" }}>
        <p style={{ color: "#b91c1c" }}>{error}</p>
        <button
          onClick={loadData}
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

      <h1>Dashboard</h1>

      {/* Upload Section */}
      <div className="card" style={{ marginBottom: 30 }}>
        <h3>Upload Requirements PDF</h3>
        <p>Upload a PDF to generate an AI-powered project plan</p>
        <UploadBox onSuccess={handleUploadSuccess} onStart={handleUploadStart} />
        {uploading && <p style={{ marginTop: 10, color: "#6366f1" }}>Processing upload...</p>}
      </div>

      {!data ? (
        <div style={{ textAlign: "center", marginTop: "80px" }}>
          <Loader />
          <p>Loading AI generated project plan...</p>
        </div>
      ) : (
        <div>

          {/* Download Button */}
          <div style={{ textAlign: "right", marginBottom: 20 }}>
            <button
              onClick={() => downloadProjectPlanAsPdf(data)}
              style={{
                padding: "10px 20px",
                background: "#10b981",
                color: "white",
                border: "none",
                borderRadius: 8,
                cursor: "pointer",
                fontSize: 14
              }}
            >
              📄 Download PDF
            </button>
          </div>

          <ProjectSummary summary={data.project_summary} />

          <ProgressBar tasks={data.tasks} />

          <TaskTable tasks={data.tasks} />

          <TeamView tasks={data.tasks} />

          <RiskView risks={data.risk_analysis} />

        </div>
      )}

    </div>
  )
}
