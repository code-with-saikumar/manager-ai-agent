import json


class HRAgent:

    def __init__(self, employees):

        self.employees = employees

    def match_employee(self, skills):

        best = None
        best_score = 0

        for emp in self.employees:

            match = len(set(skills) & set(emp["skills"]))

            score = match - emp["current_workload_percent"] / 100

            if score > best_score:
                best = emp
                best_score = score

        return best

    def assign(self, tasks):

        for task in tasks:

            emp = self.match_employee(task["required_skills"])

            task["assigned_to"] = emp

        return tasks