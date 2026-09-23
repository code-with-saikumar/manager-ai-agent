import { useState } from "react"

type Props = {
  onSuccess?: () => void
  onStart?: () => void
}

export default function UploadBox({ onSuccess, onStart }: Props) {
  const [file, setFile] = useState<File | null>(null)
  const [status, setStatus] = useState<string | null>(null)
  const [dragging, setDragging] = useState(false)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!file) {
      setStatus("Please select a file to upload.")
      return
    }

    setStatus("Uploading…")
    onStart?.()

    const formData = new FormData()
    formData.append("file", file)

    try {
      const res = await fetch("http://localhost:8000/upload", {
        method: "POST",
        body: formData,
      })

      if (!res.ok) {
        throw new Error(`Upload failed: ${res.status}`)
      }

      const data = await res.json()
      setStatus(`Upload successful! Project plan ID: ${data.id}`)
      onSuccess?.()
    } catch (error) {
      console.error(error)
      setStatus("Upload failed. Check the server and try again.")
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const files = e.dataTransfer.files
    if (files.length > 0) {
      setFile(files[0])
      setStatus(null)
    }
  }

  return (
    <div
      style={{
        maxWidth: 480,
        margin: "0 auto",
        border: dragging ? "2px dashed #6366f1" : "2px dashed #ccc",
        borderRadius: 8,
        padding: 20,
        textAlign: "center",
        transition: "border-color 0.2s"
      }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <form onSubmit={handleSubmit}>
        <p>Drag & drop a PDF here or click to select</p>
        <input
          type="file"
          accept="application/pdf"
          onChange={(event) => {
            setFile(event.target.files?.[0] ?? null)
            setStatus(null)
          }}
          style={{ marginBottom: 12 }}
        />
        <button type="submit" style={{ marginTop: 12 }}>
          Upload PDF
        </button>
      </form>
      {file && <p>Selected: {file.name}</p>}
      {status ? <p style={{ marginTop: 12 }}>{status}</p> : null}
    </div>
  )
}
