import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function TakeQuiz() {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/api/quiz/${quizId}`)
      .then((res) => res.json())
      .then((data) => {
        setQuiz(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching quiz:', error);
        setLoading(false);
      });
  }, [quizId]);

  const handleAnswer = (answer) => {
    setAnswers({ ...answers, [currentQuestion]: answer });
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    let score = 0;
    quiz.questions.forEach((question, index) => {
      if (answers[index] === question.correct_answer) {
        score++;
      }
    });
    return score;
  };

  if (loading) {
    return <div className="text-center">Loading quiz...</div>;
  }

  if (!quiz) {
    return <div className="text-center">Quiz not found</div>;
  }

  if (showResults) {
    const score = calculateScore();
    return (
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4">Quiz Results</h2>
        <p className="text-xl mb-4">
          Your score: {score} out of {quiz.questions.length}
        </p>
        <p className="text-lg">
          Percentage: {((score / quiz.questions.length) * 100).toFixed(1)}%
        </p>
      </div>
    );
  }

  const question = quiz.questions[currentQuestion];

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">{quiz.title}</h2>
      <div className="mb-4">
        Question {currentQuestion + 1} of {quiz.questions.length}
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="text-lg mb-4">{question.question}</p>
        <div className="space-y-3">
          {question.choices.map((choice, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(choice)}
              className="w-full text-left p-3 border rounded-md hover:bg-gray-50"
            >
              {choice}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TakeQuiz;