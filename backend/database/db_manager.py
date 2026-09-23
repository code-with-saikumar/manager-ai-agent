from pymongo import MongoClient
from datetime import datetime
import os
from dotenv import load_dotenv

load_dotenv()

# -----------------------------
# DATABASE CONNECTION
# -----------------------------

MONGO_URI = os.getenv("MONGO_URI", "mongodb+srv://AuraAdmin:4321aura@cluster0.xd3nf72.mongodb.net/?appName=Cluster0")

client = MongoClient(MONGO_URI)

db = client["AuraAdmin"]


# -----------------------------
# CREATE COLLECTIONS
# -----------------------------

def create_collections():

    collections = [
        "employees",
        "projects",
        "tools",
        "project_history",
        "project_plans",
        "project_teams",
        "tasks",
        "task_dependencies",
        "risk_analysis",
        "employee_notifications",
        "project_progress",
        "ai_recommendations",
        "project_timeline",
        "agent_logs"
    ]

    existing = db.list_collection_names()

    for col in collections:
        if col not in existing:
            db.create_collection(col)
            print(f"Created collection: {col}")

    print("All collections verified.")


# -----------------------------
# STORE PROJECT PLAN
# -----------------------------

def store_project_plan(project_data):

    collection = db["project_plans"]

    project_data["created_at"] = datetime.utcnow()

    result = collection.insert_one(project_data)

    return result.inserted_id


# -----------------------------
# STORE TEAM STRUCTURE
# -----------------------------

def store_team_structure(team_data):

    collection = db["project_teams"]

    result = collection.insert_one(team_data)

    return result.inserted_id


# -----------------------------
# STORE TASKS
# -----------------------------

def store_tasks(tasks_list):

    collection = db["tasks"]

    result = collection.insert_many(tasks_list)

    return result.inserted_ids


# -----------------------------
# STORE TASK DEPENDENCIES
# -----------------------------

def store_task_dependencies(dep_list):

    collection = db["task_dependencies"]

    result = collection.insert_many(dep_list)

    return result.inserted_ids


# -----------------------------
# STORE RISKS
# -----------------------------

def store_risks(risk_list):

    collection = db["risk_analysis"]

    if not risk_list:
        print("No risks to store.")
        return

    # If a single dictionary is returned
    if isinstance(risk_list, dict):
        risk_list = [risk_list]

    result = collection.insert_many(risk_list)

    return result.inserted_ids


# -----------------------------
# STORE AI RECOMMENDATIONS
# -----------------------------

def store_recommendations(rec_data):

    collection = db["ai_recommendations"]

    result = collection.insert_one(rec_data)

    return result.inserted_id


# -----------------------------
# STORE PROJECT TIMELINE
# -----------------------------

def store_timeline(timeline_data):

    collection = db["project_timeline"]

    result = collection.insert_one(timeline_data)

    return result.inserted_id


# -----------------------------
# STORE PROJECT PROGRESS
# -----------------------------

def store_progress(progress_data):

    collection = db["project_progress"]

    result = collection.insert_one(progress_data)

    return result.inserted_id


# -----------------------------
# STORE NOTIFICATIONS
# -----------------------------

def store_notifications(notification_list):

    collection = db["employee_notifications"]

    result = collection.insert_many(notification_list)

    return result.inserted_ids


# -----------------------------
# STORE AGENT LOGS
# -----------------------------

def store_agent_log(log_data):

    collection = db["agent_logs"]

    log_data["timestamp"] = datetime.utcnow()

    result = collection.insert_one(log_data)

    return result.inserted_id