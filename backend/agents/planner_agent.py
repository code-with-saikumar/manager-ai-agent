from langchain_mistralai import ChatMistralAI
from langchain_classic.prompts import ChatPromptTemplate
import os

class PlannerAgent:

    def __init__(self):

        self.llm = ChatMistralAI(
            model="mistral-large-latest",
            api_key="RmJMFXmgSD5Cwq5lYi5c5fehRANZoIof",
            temperature=0
        )

        self.prompt = ChatPromptTemplate.from_template(
        """
You are an AI Project Planner.

Using the project requirements:

<context>
{context}
</context>

Break the project into tasks.

Return JSON:

{{
"tasks":[
 {{
   "task_name":"",
   "description":"",
   "required_skills":[],
   "technologies":[],
   "estimated_duration_days":0
 }}
]
}}
"""
        )

    def run(self, context):

        chain = self.prompt | self.llm

        response = chain.invoke({
            "context": context
        })

        return response.content