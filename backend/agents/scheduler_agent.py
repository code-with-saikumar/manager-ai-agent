from datetime import datetime, timedelta
import os

class SchedulerAgent:

    def schedule(self, tasks):

        start = datetime.today()

        for task in tasks:

            duration = task["estimated_duration_days"]

            task["start_date"] = start.strftime("%Y-%m-%d")

            end = start + timedelta(days=duration)

            task["deadline"] = end.strftime("%Y-%m-%d")

            start = end

        return tasks