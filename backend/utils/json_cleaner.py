import json
import re


def extract_json(text):
    """
    Extract and clean JSON returned from LLM output.
    Handles markdown blocks and invalid characters.
    """

    if text is None:
        raise ValueError("LLM returned empty output")

    # Remove markdown blocks
    text = text.replace("```json", "")
    text = text.replace("```", "")

    # Extract JSON section
    match = re.search(r"\{.*\}", text, re.DOTALL)

    if not match:
        raise ValueError("No JSON found in LLM output")

    json_str = match.group(0)

    # Remove control characters
    json_str = re.sub(r"[\x00-\x1F]+", " ", json_str)

    # Fix trailing commas
    json_str = re.sub(r",\s*}", "}", json_str)
    json_str = re.sub(r",\s*]", "]", json_str)

    return json.loads(json_str)