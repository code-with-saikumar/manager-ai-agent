import nodemailer from 'nodemailer'
import type { Task } from '../types/project.js'

interface EmailConfig {
  host: string
  port: number
  secure: boolean
  auth: {
    user: string
    pass: string
  }
}

class EmailService {
  private transporter: nodemailer.Transporter

  constructor() {
    const config: EmailConfig = {
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER || '',
        pass: process.env.SMTP_PASS || ''
      }
    }

    this.transporter = nodemailer.createTransport(config)
  }

  async sendTaskNotification(email: string, name: string, tasks: Task[]): Promise<void> {
    const subject = `Your Tasks for ${new Date().toLocaleDateString()}`
    const html = this.generateTaskEmailHTML(name, tasks)

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: email,
      subject,
      html
    }

    try {
      await this.transporter.sendMail(mailOptions)
      console.log(`✅ Task notification sent to ${email}`)
    } catch (error) {
      console.error(`❌ Failed to send email to ${email}:`, error)
      throw new Error('Failed to send email notification')
    }
  }

  private generateTaskEmailHTML(name: string, tasks: Task[]): string {
    const taskListHTML = tasks.map(task => `
      <div style="background: #f8fafc; padding: 15px; margin: 10px 0; border-radius: 8px; border-left: 4px solid #667eea;">
        <h3 style="margin: 0 0 8px 0; color: #1a202c; font-size: 16px;">${task.task_name}</h3>
        <p style="margin: 0 0 8px 0; color: #4a5568; font-size: 14px;">${task.description}</p>
        <div style="display: flex; gap: 15px; font-size: 12px; color: #718096;">
          <span>📅 Deadline: ${new Date(task.deadline).toLocaleDateString()}</span>
          <span>⏱️ Duration: ${task.estimated_duration_days || 'N/A'} days</span>
          <span>📊 Status: ${task.status}</span>
        </div>
        ${task.required_skills && task.required_skills.length > 0 ? `
          <div style="margin-top: 8px;">
            <strong style="font-size: 12px; color: #4a5568;">Required Skills:</strong>
            <div style="display: flex; gap: 5px; margin-top: 4px;">
              ${task.required_skills.map((skill: string) => `<span style="background: #e2e8f0; padding: 2px 8px; border-radius: 12px; font-size: 11px;">${skill}</span>`).join('')}
            </div>
          </div>
        ` : ''}
      </div>
    `).join('')

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Your Daily Tasks</title>
        </head>
        <body style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; margin: 0; padding: 0; background: #f7fafc;">
          <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.1);">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700;">Aura++</h1>
              <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">AI-Powered Project Management</p>
            </div>

            <div style="padding: 40px 30px;">
              <h2 style="color: #1a202c; margin: 0 0 20px 0; font-size: 24px;">Hello ${name}!</h2>
              <p style="color: #4a5568; margin: 0 0 30px 0; font-size: 16px; line-height: 1.6;">
                Here are your assigned tasks for today. Please review them and let your project manager know if you need any assistance.
              </p>

              <div style="margin: 30px 0;">
                <h3 style="color: #1a202c; margin: 0 0 20px 0; font-size: 20px;">Your Tasks (${tasks.length})</h3>
                ${taskListHTML}
              </div>

              <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 30px 0; text-align: center;">
                <p style="margin: 0; color: #4a5568; font-size: 14px;">
                  <strong>Need help?</strong> Contact your project manager or visit the Aura++ dashboard for more details.
                </p>
              </div>

              <div style="text-align: center; margin-top: 40px; padding-top: 30px; border-top: 1px solid #e2e8f0;">
                <p style="margin: 0; color: #718096; font-size: 12px;">
                  This email was sent by Aura++ Project Management System<br>
                  ${new Date().toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `
  }

  async testConnection(): Promise<boolean> {
    try {
      await this.transporter.verify()
      return true
    } catch {
      return false
    }
  }
}

export const emailService = new EmailService()