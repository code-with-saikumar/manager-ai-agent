# # # import json

# # # from rag.rag_pipeline import create_vector_store
# # # from agents.requirement_agent import RequirementAgent
# # # from agents.planner_agent import PlannerAgent
# # # from agents.hr_agent import HRAgent
# # # from agents.scheduler_agent import SchedulerAgent
# # # from agents.risk_agent import RiskAgent

# # # from data.demo_employees import employees
# # # from dotenv import load_dotenv
# # # from utils.json_cleaner import extract_json

# # # load_dotenv()


# # # def main():

# # #     vectordb = create_vector_store("requirements.pdf")

# # #     retriever = vectordb.as_retriever()

# # #     docs = retriever.invoke("project requirements")

# # #     context = "\n".join([d.page_content for d in docs])

# # #     print("Requirement Agent Running...")
# # #     req_agent = RequirementAgent()
# # #     requirements = extract_json(req_agent.run(context))

# # #     print("Planner Agent Running...")
# # #     planner = PlannerAgent()
# # #     tasks_json = planner.run(context)

# # #     tasks_data = extract_json(tasks_json)["tasks"]

# # #     print("HR Agent Running...")
# # #     hr = HRAgent(employees)
# # #     tasks_data = hr.assign(tasks_data)

# # #     print("Scheduler Agent Running...")
# # #     scheduler = SchedulerAgent()
# # #     tasks_data = scheduler.schedule(tasks_data)

# # #     print("Risk Agent Running...")
# # #     risk = RiskAgent()
# # #     risks = extract_json(risk.run(context))

# # #     final_output = {

# # #         "project_summary": requirements,

# # #         "tasks": tasks_data,

# # #         "risk_analysis": risks

# # #     }

# # #     print("\nFINAL PROJECT PLAN\n")

# # #     print(json.dumps(final_output, indent=4))


# # # if __name__ == "__main__":
# # #     main()


# # import json

# # from rag.rag_pipeline import create_vector_store
# # from agents.requirement_agent import RequirementAgent
# # from agents.planner_agent import PlannerAgent
# # from agents.hr_agent import HRAgent
# # from agents.scheduler_agent import SchedulerAgent
# # from agents.risk_agent import RiskAgent

# # from data.demo_employees import employees
# # from dotenv import load_dotenv
# # from utils.json_cleaner import extract_json

# # from langchain_core.runnables import RunnableParallel
# # from database.db_manager import *
# # load_dotenv()



# # def main():

# #     # -----------------------------
# #     # CREATE VECTOR STORE
# #     # -----------------------------

# #     vectordb = create_vector_store("requirements.pdf")

# #     retriever = vectordb.as_retriever()

# #     docs = retriever.invoke("project requirements")

# #     context = "\n".join([d.page_content for d in docs])

# #     # -----------------------------
# #     # REQUIREMENT AGENT
# #     # -----------------------------
# #     print("Requirement Agent Running...")
# #     req_agent = RequirementAgent()
# #     requirements = extract_json(req_agent.run(context))

# #     # -----------------------------
# #     # PLANNER AGENT
# #     # -----------------------------
# #     print("Planner Agent Running...")
# #     planner = PlannerAgent()

# #     tasks_json = planner.run(context)

# #     print("\nRAW REQUIREMENT AGENT OUTPUT:\n")
# #     print(requirements)

# #     tasks_data = extract_json(tasks_json)["tasks"]

# #     # -----------------------------
# #     # INITIALIZE AGENTS
# #     # -----------------------------
# #     hr = HRAgent(employees)
# #     scheduler = SchedulerAgent()
# #     risk = RiskAgent()

# #     # -----------------------------
# #     # PARALLEL AGENT EXECUTION
# #     # -----------------------------
# #     print("Running HR, Scheduler and Risk Agents in Parallel...")

# #     parallel_agents = RunnableParallel(
# #         hr_agent=lambda x: hr.assign(tasks_data),
# #         scheduler_agent=lambda x: scheduler.schedule(tasks_data),
# #         risk_agent=lambda x: extract_json(risk.run(context))
# #     )

# #     results = parallel_agents.invoke({})

# #     # Results from parallel agents
# #     hr_tasks = results["hr_agent"]
# #     scheduled_tasks = results["scheduler_agent"]
# #     risks = results["risk_agent"]

# #     # -----------------------------
# #     # FINAL OUTPUT JSON
# #     # -----------------------------
# #     final_output = {

# #         "project_summary": requirements,

# #         "tasks": scheduled_tasks,

# #         "risk_analysis": risks

# #     }
# #     print("\nFINAL PROJECT PLAN\n")

# #     print(json.dumps(final_output, indent=4))

# #     create_collections()

# #     store_project_plan(final_output)

# #     store_tasks(final_output["tasks"])

# #     risks = extract_json(risk.run(context))

# #     if "risk_analysis" in risks:
# #         risks = risks["risk_analysis"]
# #     store_risks(risks)


# # if __name__ == "__main__":
# #     main()



# import json
# import os
# import shutil

# from fastapi import FastAPI, UploadFile, File
# from fastapi.middleware.cors import CORSMiddleware

# from rag.rag_pipeline import create_vector_store
# from agents.requirement_agent import RequirementAgent
# from agents.planner_agent import PlannerAgent
# from agents.hr_agent import HRAgent
# from agents.scheduler_agent import SchedulerAgent
# from agents.risk_agent import RiskAgent

# from data.demo_employees import employees
# from dotenv import load_dotenv
# from utils.json_cleaner import extract_json

# from langchain_core.runnables import RunnableParallel
# from database.db_manager import *
# from bson import ObjectId

# load_dotenv()

# app = FastAPI()

# # Allow React frontend
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# PROJECT_DATA = {}

# def serialize_mongo(data):
#     if isinstance(data, list):
#         return [serialize_mongo(item) for item in data]
#     if isinstance(data, dict):
#         new_data = {}
#         for key, value in data.items():
#             if isinstance(value, ObjectId):
#                 new_data[key] = str(value)
#             else:
#                 new_data[key] = serialize_mongo(value)

#         return new_data
#     return data
# # ---------------------------------
# # AI PIPELINE FUNCTION
# # ---------------------------------
# def run_pipeline(pdf_path):

#     # -----------------------------
#     # CREATE VECTOR STORE
#     # -----------------------------
#     vectordb = create_vector_store(pdf_path)

#     retriever = vectordb.as_retriever()

#     docs = retriever.invoke("project requirements")

#     context = "\n".join([d.page_content for d in docs])

#     # -----------------------------
#     # REQUIREMENT AGENT
#     # -----------------------------
#     print("Requirement Agent Running...")
#     req_agent = RequirementAgent()

#     requirements = extract_json(req_agent.run(context))

#     # -----------------------------
#     # PLANNER AGENT
#     # -----------------------------
#     print("Planner Agent Running...")

#     planner = PlannerAgent()

#     tasks_json = planner.run(context)

#     tasks_data = extract_json(tasks_json)["tasks"]

#     # -----------------------------
#     # INITIALIZE AGENTS
#     # -----------------------------
#     hr = HRAgent(employees)

#     scheduler = SchedulerAgent()

#     risk = RiskAgent()

#     # -----------------------------
#     # PARALLEL AGENT EXECUTION
#     # -----------------------------
#     print("Running HR, Scheduler and Risk Agents in Parallel...")

#     parallel_agents = RunnableParallel(
#         hr_agent=lambda x: hr.assign(tasks_data),
#         scheduler_agent=lambda x: scheduler.schedule(tasks_data),
#         risk_agent=lambda x: extract_json(risk.run(context))
#     )

#     results = parallel_agents.invoke({})

#     scheduled_tasks = results["scheduler_agent"]

#     risks = results["risk_agent"]

#     # -----------------------------
#     # FINAL OUTPUT
#     # -----------------------------
#     final_output = {

#         "project_summary": requirements,

#         "tasks": scheduled_tasks,

#         "risk_analysis": risks

#     }

#     print("\nFINAL PROJECT PLAN\n")

#     print(json.dumps(final_output, indent=4))

#     # -----------------------------
#     # DATABASE STORAGE
#     # -----------------------------
#     create_collections()

#     store_project_plan(final_output)

#     store_tasks(final_output["tasks"])

#     if "risk_analysis" in risks:
#         store_risks(risks["risk_analysis"])
#     else:
#         store_risks(risks)

#     return final_output


# # ---------------------------------
# # API: Upload Requirements PDF
# # ---------------------------------
# @app.post("/upload")
# async def upload_requirements(file: UploadFile = File(...)):

#     file_path = f"uploads/{file.filename}"

#     os.makedirs("uploads", exist_ok=True)

#     with open(file_path, "wb") as buffer:
#         shutil.copyfileobj(file.file, buffer)

#     global PROJECT_DATA

#     PROJECT_DATA = run_pipeline(file_path)

#     return {
#         "message": "Project plan generated successfully"
#     }


# # ---------------------------------
# # API: Get Generated Plan
# # ---------------------------------
# @app.get("/project-plan")
# async def get_project_plan():

#     global PROJECT_DATA

#     return serialize_mongo(PROJECT_DATA)




import json
import os
import shutil
from datetime import datetime

from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from bson import ObjectId

from rag.rag_pipeline import create_vector_store
from agents.requirement_agent import RequirementAgent
from agents.planner_agent import PlannerAgent
from agents.hr_agent import HRAgent
from agents.scheduler_agent import SchedulerAgent
from agents.risk_agent import RiskAgent

from data.demo_employees import employees
from dotenv import load_dotenv
from utils.json_cleaner import extract_json

from langchain_core.runnables import RunnableParallel
from database.db_manager import *

load_dotenv()

app = FastAPI()
from datetime import datetime

# -----------------------------
# CORS
# -----------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

PROJECT_DATA = {}

# -----------------------------
# Mongo Serializer
# -----------------------------
def serialize_mongo(data):

    if isinstance(data, list):
        return [serialize_mongo(item) for item in data]

    if isinstance(data, dict):

        new_data = {}

        for key, value in data.items():

            if isinstance(value, ObjectId):
                new_data[key] = str(value)

            else:
                new_data[key] = serialize_mongo(value)

        return new_data

    return data


def store_project_history(project_name, action):

    db["project_history"].insert_one({
        "project_name": project_name,
        "action": action,
        "timestamp": datetime.utcnow()
    })
# ---------------------------------
# AI PIPELINE
# ---------------------------------
def run_pipeline(pdf_path):

    vectordb = create_vector_store(pdf_path)

    retriever = vectordb.as_retriever()

    docs = retriever.invoke("project requirements")

    context = "\n".join([d.page_content for d in docs])

    # -----------------------------
    # REQUIREMENT AGENT
    # -----------------------------
    print("Requirement Agent Running...")
    req_agent = RequirementAgent()

    requirements = extract_json(req_agent.run(context))

    # -----------------------------
    # PLANNER AGENT
    # -----------------------------
    print("Planner Agent Running...")
    planner = PlannerAgent()

    tasks_json = planner.run(context)

    tasks_data = extract_json(tasks_json)["tasks"]

    # -----------------------------
    # AGENTS
    # -----------------------------

    hr = HRAgent(employees)
    scheduler = SchedulerAgent()
    risk = RiskAgent()

    # -----------------------------
    # PARALLEL EXECUTION
    # -----------------------------
    print("Running HR, Scheduler and Risk Agents in Parallel...")
    parallel_agents = RunnableParallel(
        hr_agent=lambda x: hr.assign(tasks_data),
        scheduler_agent=lambda x: scheduler.schedule(tasks_data),
        risk_agent=lambda x: extract_json(risk.run(context))
    )

    results = parallel_agents.invoke({})

    scheduled_tasks = results["scheduler_agent"]

    risks = results["risk_agent"]

    print("Final Output:")
    final_output = {

        "project_summary": requirements,
        "tasks": scheduled_tasks,
        "risk_analysis": risks

    }
    print(json.dumps(final_output, indent=4))

    # -----------------------------
    # STORE IN DATABASE
    # -----------------------------
    create_collections()

    project_id = store_project_plan(final_output)

    for task in final_output["tasks"]:
        task["project_id"] = project_id

    store_tasks(final_output["tasks"])
    store_project_history(final_output["project_summary"]["project_name"], "Project Plan Created")

    if "risk_analysis" in risks:
        store_risks(risks["risk_analysis"])
    else:
        store_risks(risks)

    return final_output


# ---------------------------------
# Upload Requirements
# ---------------------------------
@app.post("/upload")

async def upload_requirements(file: UploadFile = File(...)):

    os.makedirs("uploads", exist_ok=True)

    file_path = f"uploads/{file.filename}"

    print(file_path)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    global PROJECT_DATA

    PROJECT_DATA = run_pipeline(file_path)

    return {

        "message": "Project plan generated successfully"

    }


# ---------------------------------
# GET CURRENT PROJECT PLAN
# ---------------------------------
@app.get("/project-plan")

async def get_project_plan():

    global PROJECT_DATA

    return serialize_mongo(PROJECT_DATA)


# ---------------------------------
# GET PROJECTS
# ---------------------------------
@app.get("/projects")

async def get_projects():

    projects = list(db["project_plans"].find())

    return serialize_mongo(projects)


# ---------------------------------
# GET TASKS
# ---------------------------------
@app.get("/tasks")

async def get_tasks():

    tasks = list(db["tasks"].find())

    return serialize_mongo(tasks)


# ---------------------------------
# GET EMPLOYEES
# ---------------------------------
@app.get("/employees")

async def get_employees():

    employees = list(db["employees"].find())

    return serialize_mongo(employees)


# ---------------------------------
# GET RISKS
# ---------------------------------
@app.get("/risks")

async def get_risks():

    risks = list(db["risk_analysis"].find())

    return serialize_mongo(risks)

# ---------------------------------
# GET PROJECT HISTORY
# ---------------------------------
@app.get("/project-history")
async def get_project_history():

    history = list(db["project_history"].find())

    return serialize_mongo(history)