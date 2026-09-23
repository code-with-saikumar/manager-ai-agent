# Manager AI Agent

Manager AI Agent is an AI-powered project management system that automates project planning, task generation, employee assignment, scheduling, and risk analysis.

The system accepts project requirements, analyzes the provided documents using a Retrieval-Augmented Generation (RAG) pipeline, and coordinates multiple specialized AI agents to generate a structured project plan.

## Features

* 📄 Upload project requirement documents
* 🤖 AI-powered requirement analysis
* 📋 Automatic project task generation
* 👥 Intelligent employee/task assignment
* 📅 Automated task scheduling
* ⚠️ Project risk identification and analysis
* 🔎 Retrieval-Augmented Generation (RAG)
* 🧠 Multi-agent project planning
* 📊 Project dashboard and analytics
* 👨‍💻 Employee management
* 📁 Project and task management
* 📜 Project history
* 📄 Generate project reports as PDF
* 💾 Store project information in MongoDB
* 🔐 Environment-based configuration
* 🌐 React-based web interface

## How It Works

The system follows a multi-agent workflow to convert project requirements into an actionable project plan.

```text
                    Project Requirements
                            │
                            ▼
                    PDF / Document Upload
                            │
                            ▼
                    RAG Processing
                            │
                            ▼
                 Requirement Agent
                            │
                            ▼
                    Planner Agent
                            │
              ┌─────────────┼─────────────┐
              │             │             │
              ▼             ▼             ▼
          HR Agent     Scheduler Agent   Risk Agent
              │             │             │
              └─────────────┼─────────────┘
                            │
                            ▼
                    Final Project Plan
                            │
                            ▼
                    MongoDB Storage
                            │
                            ▼
                    Manager Dashboard
```

## AI Agents

### Requirement Agent

Analyzes project requirements and extracts important information such as:

* Project objectives
* Functional requirements
* Technical requirements
* Project scope
* Important constraints

### Planner Agent

Converts the analyzed requirements into structured project tasks.

It helps determine:

* Tasks
* Task descriptions
* Dependencies
* Priorities
* Required skills

### HR Agent

Assigns tasks to suitable employees based on available employee information and task requirements.

### Scheduler Agent

Creates a structured project schedule based on the generated tasks and their dependencies.

### Risk Agent

Analyzes project requirements and identifies potential project risks.

The generated analysis can include:

* Risk description
* Potential impact
* Risk severity
* Possible mitigation strategies

## RAG Pipeline

The project uses Retrieval-Augmented Generation to provide the AI agents with relevant information from uploaded project documents.

The general workflow is:

```text
Document
   ↓
PDF Processing
   ↓
Text Extraction
   ↓
Document Embeddings
   ↓
ChromaDB Vector Store
   ↓
Similarity Search
   ↓
Relevant Context
   ↓
AI Agents
   ↓
Structured Project Plan
```

## Technology Stack

### Frontend

* React
* TypeScript
* Vite
* React Router
* Tailwind CSS
* Recharts
* Axios
* jsPDF

### AI / Machine Learning

* Python
* LangChain
* LangChain Community
* LangChain Mistral integration
* Sentence Transformers
* ChromaDB
* Retrieval-Augmented Generation (RAG)
* Multi-agent architecture

### Backend

* Python
* FastAPI
* Uvicorn
* Node.js
* Express.js

### Database

* MongoDB
* Mongoose
* ChromaDB

### Document Processing

* PyPDF
* PDF parsing
* Vector embeddings
* PDF report generation

## Project Structure

```text
Manager-AI-Agent/
│
├── backend/
│   ├── agents/
│   │   ├── hr_agent.py
│   │   ├── planner_agent.py
│   │   ├── requirement_agent.py
│   │   ├── risk_agent.py
│   │   └── scheduler_agent.py
│   │
│   ├── database/
│   │   └── db_manager.py
│   │
│   ├── data/
│   │   └── demo_employees.py
│   │
│   ├── rag/
│   │   └── rag_pipeline.py
│   │
│   ├── utils/
│   │   └── json_cleaner.py
│   │
│   ├── uploads/
│   ├── chroma_db/
│   ├── main.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── EmployeeCard.tsx
│   │   │   ├── ProjectCard.tsx
│   │   │   ├── ProjectSummary.tsx
│   │   │   ├── RiskView.tsx
│   │   │   ├── TaskCard.tsx
│   │   │   ├── TaskTable.tsx
│   │   │   ├── TeamView.tsx
│   │   │   ├── UploadBox.tsx
│   │   │   └── ...
│   │   │
│   │   ├── pages/
│   │   │   ├── Analytics.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Employees.tsx
│   │   │   ├── History.tsx
│   │   │   ├── Login.tsx
│   │   │   ├── Projects.tsx
│   │   │   ├── Settings.tsx
│   │   │   ├── Tasks.tsx
│   │   │   └── UploadPage.tsx
│   │   │
│   │   ├── services/
│   │   │   └── api.ts
│   │   │
│   │   ├── types/
│   │   │   └── types.ts
│   │   │
│   │   ├── App.tsx
│   │   └── main.tsx
│   │
│   ├── server/
│   ├── package.json
│   ├── vite.config.ts
│   └── ...
│
└── README.md
```

## Requirements

### Backend

Make sure Python is installed.

Install the Python dependencies:

```bash
cd backend
pip install -r requirements.txt
```

The main Python dependencies include:

```text
fastapi
uvicorn
pymongo
chromadb
pypdf
python-dotenv
sentence-transformers
langchain-community
langchain-mistralai
```

### Frontend

Make sure Node.js and npm are installed.

```bash
cd frontend
npm install
```

## Environment Variables

Create the required `.env` files locally.

For the backend, configure the required AI and database credentials, for example:

```env
MONGODB_URI=your_mongodb_connection_string
```

Add any required model/API credentials used by the AI agents.

For the Node.js service, use the provided environment template:

```text
frontend/server/.env.example
```

Copy it to:

```text
frontend/server/.env
```

and configure the required values.

### Security

Never commit:

```text
.env
.env.local
API keys
Database passwords
Authentication tokens
Private credentials
```

Make sure these files are included in `.gitignore`.

## Running the Backend

Navigate to the backend:

```bash
cd backend
```

Start the FastAPI application:

```bash
uvicorn main:app --reload
```

The backend will normally be available at:

```text
http://localhost:8000
```

## Running the Frontend

Open another terminal and navigate to:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

## Running the Node.js Service

If the project requires the additional Node.js service:

```bash
cd frontend/server
npm install
npm run dev
```

For a production build:

```bash
npm run build
npm start
```

## Application Modules

### Dashboard

Provides an overview of:

* Active projects
* Tasks
* Team members
* Project progress
* Risks
* Project statistics

### Projects

Allows managers to view and manage generated project plans.

### Tasks

Provides a structured view of generated tasks and their status.

### Employees

Displays employee information used by the HR agent for task assignment.

### Analytics

Provides visual project and task analytics.

### History

Maintains information about previously processed projects.

### Upload

Allows project requirement documents to be uploaded for AI analysis.

## Example Workflow

A typical workflow is:

1. Manager uploads a project requirements document.
2. The RAG pipeline extracts and indexes the document.
3. Relevant project context is retrieved.
4. The Requirement Agent analyzes the requirements.
5. The Planner Agent generates project tasks.
6. The HR Agent assigns tasks to suitable employees.
7. The Scheduler Agent creates the project schedule.
8. The Risk Agent analyzes potential project risks.
9. The generated project plan is stored in MongoDB.
10. The manager reviews the results through the dashboard.
11. A project report can be generated for further use.

## Development

After making changes:

```bash
git add .
git commit -m "Describe your changes"
git push
```

To retrieve the latest version:

```bash
git pull
```

## Security Best Practices

* Keep API keys outside the source code.
* Never commit `.env` files.
* Protect MongoDB credentials.
* Validate uploaded files.
* Restrict production CORS settings.
* Avoid storing sensitive employee information in public repositories.
* Keep generated database/vector-store files out of Git when they contain private data.
* Review files with `git status` before every commit.

## Future Enhancements

Potential improvements include:

* Real-time task tracking
* Advanced employee skill matching
* Team workload optimization
* Calendar integration
* Email and notification services
* Automated progress monitoring
* Deadline prediction
* Advanced risk prediction
* Employee performance analytics
* Role-based authentication
* Cloud deployment
* Support for additional AI models
* Real-time collaborative project management

## Use Case

Manager AI Agent can be used by:

* Software development teams
* Project managers
* Startups
* Hackathon teams
* IT organizations
* Student project teams
* Small and medium-sized businesses

## License

This project is developed for educational, research, and project-management use.
