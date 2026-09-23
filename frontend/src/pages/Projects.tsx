import { useEffect, useState } from "react"
import { getProjects } from "../services/api"
import ProjectCard from "../components/ProjectCard"
import type { Project } from "../types/types"
import UploadBox from "../components/UploadBox"
import Login from "./Login"


export default function Projects() {

    if(Login.isloggedin === 0) {
        return (
            <div className="login-required">
                <h2>Login Required</h2>
                <p>Please log in to view your projects.</p>
                <Login />
            </div>
        )
    }

  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {

    getProjects().then(setProjects)

  }, [])

  return (

    <div>

      <h1>Projects</h1>

      <div className="project-grid">

        {projects.map((p) => (
          <ProjectCard key={p._id} project={p} />
        ))}

      </div>

    </div>

  )
}