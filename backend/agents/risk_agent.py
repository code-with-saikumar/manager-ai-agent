from langchain_mistralai import ChatMistralAI
from langchain_classic.prompts import ChatPromptTemplate
import os

class RiskAgent:

    def __init__(self):

        self.llm = ChatMistralAI(
            model="mistral-large-latest",
            api_key="RmJMFXmgSD5Cwq5lYi5c5fehRANZoIof",
            temperature=0
        )

        self.prompt = ChatPromptTemplate.from_template(
        """
Analyze project risks.

<context>
{context}
</context>

Return JSON:

{{
"risks":[
 {{
   "risk_description":"",
   "impact_level":"",
   "probability":"",
   "mitigation_strategy":""
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