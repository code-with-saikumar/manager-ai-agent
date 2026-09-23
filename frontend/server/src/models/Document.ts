import { Schema, model } from "mongoose"
import type { ProjectPlan } from "../types/project.js"

export interface DocumentModel {
  originalFileName: string
  projectPlan: ProjectPlan
  createdAt: Date
  updatedAt: Date
}

const DocumentSchema = new Schema<DocumentModel>(
  {
    originalFileName: { type: String, required: true },
    projectPlan: { type: Object, required: true },
  },
  { timestamps: true }
)

export const Document = model<DocumentModel>("Document", DocumentSchema)
