import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="max-w-2xl mx-auto text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">
        Welcome to QuizGen
      </h1>
      <p className="text-gray-600 mb-8">
        Create custom quizzes from any learning material instantly using AI.
      </p>
      <Link
        to="/create"
        className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
      >
        Create New Quiz
      </Link>
    </div>
  );
}

export default Home;