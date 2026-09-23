from langchain_mistralai import ChatMistralAI
from langchain_classic.prompts import ChatPromptTemplate
import os

class RequirementAgent:

    def __init__(self):

        self.llm = ChatMistralAI(
            model="mistral-large-latest",
            api_key="RmJMFXmgSD5Cwq5lYi5c5fehRANZoIof",
            temperature=0
        )

        self.prompt = ChatPromptTemplate.from_template(
        """
You are a senior Business Analyst.

Analyze the project requirements.

<context>
{context}
</context>

Extract structured information.

Return JSON:

{{
"project_id":"",
"project_name":"",
"client_company":"",
"objective":"",
"key_features":[],
"recommended_methodology":"",
"estimated_project_duration_days":0
}}
"""
        )

    def run(self, context):

        chain = self.prompt | self.llm

        response = chain.invoke({
            "context": context
        })

        return response.content