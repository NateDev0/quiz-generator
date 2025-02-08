import openai
import json
from typing import List, Dict

class QuestionGenerator:
    def __init__(self, api_key: str):
        openai.api_key = api_key

    def generate_questions(self, content: str, num_questions: int = 5) -> List[Dict]:
        prompt = f"""
        Create {num_questions} multiple choice questions based on this content:
        {content}
        
        Format the response as a JSON array with this structure:
        [{{
            "question": "question text",
            "choices": ["choice1", "choice2", "choice3", "choice4"],
            "correct_answer": "correct choice text"
        }}]
        """

        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.7,
        )

        try:
            questions = json.loads(response.choices[0].message.content)
            return questions
        except json.JSONDecodeError:
            return []