from flask import Flask, request, jsonify
from flask_cors import CORS
from models import db, Quiz, Question, Choice
from question_generator import QuestionGenerator
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///quiz.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
question_generator = QuestionGenerator(os.getenv('OPENAI_API_KEY'))

with app.app_context():
    db.create_all()

@app.route('/api/generate-quiz', methods=['POST'])
def generate_quiz():
    data = request.json
    content = data.get('content')
    title = data.get('title', 'Untitled Quiz')
    
    questions = question_generator.generate_questions(content)
    
    quiz = Quiz(title=title)
    db.session.add(quiz)
    
    for q in questions:
        question = Question(
            quiz=quiz,
            question_text=q['question'],
            correct_answer=q['correct_answer']
        )
        db.session.add(question)
        
        for choice_text in q['choices']:
            choice = Choice(question=question, choice_text=choice_text)
            db.session.add(choice)
    
    db.session.commit()
    return jsonify({'quiz_id': quiz.id})

@app.route('/api/quiz/<int:quiz_id>', methods=['GET'])
def get_quiz(quiz_id):
    quiz = Quiz.query.get_or_404(quiz_id)
    
    questions = []
    for question in quiz.questions:
        questions.append({
            'id': question.id,
            'question': question.question_text,
            'choices': [choice.choice_text for choice in question.choices],
            'correct_answer': question.correct_answer
        })
    
    return jsonify({
        'id': quiz.id,
        'title': quiz.title,
        'questions': questions
    })

if __name__ == '__main__':
    app.run(debug=True)