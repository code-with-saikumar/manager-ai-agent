const API = "http://localhost:8000"

import type { ProjectPlan } from "../types/types"

async function safeFetchJson<T>(url: string, fallback: T): Promise<T> {
  try {
    const res = await fetch(url)
    if (!res.ok) {
      return fallback
    }
    return (await res.json()) as T
  } catch {
    return fallback
  }
}

export async function getProjects() {
  return safeFetchJson(`${API}/projects`, [])
}

export async function getTasks() {
  return safeFetchJson(`${API}/tasks`, [])
}

export async function getEmployees() {
  return safeFetchJson(`${API}/employees`, [])
}

export async function getProjectHistory() {
  return safeFetchJson(`${API}/project-history`, [])
}

export async function getProjectPlan(): Promise<ProjectPlan> {
  const res = await fetch(`${API}/project-plan`)

  if (!res.ok) {
    const body = await res.text().catch(() => "")
    throw new Error(`Project plan request failed: ${res.status} ${res.statusText} ${body}`)
  }

  try {
    const json = await res.json()
    return json as ProjectPlan
  } catch (jsonErr) {
    const text = await res.text().catch(() => "")
    throw new Error(`Project plan response was not JSON: ${text}`)
  }
}

export async function sendTaskEmail(employeeId: string) {
  const res = await fetch(`${API}/send-task-emails`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ employeeId }),
  })

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Failed to send email' }))
    throw new Error(error.message || 'Failed to send task email')
  }

  return res.json()
}


