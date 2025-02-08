import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateQuiz from './components/CreateQuiz';
import TakeQuiz from './components/TakeQuiz';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-lg">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex justify-between">
              <div className="flex space-x-7">
                <div className="flex items-center py-4">
                  <span className="font-semibold text-gray-500 text-lg">QuizGen</span>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreateQuiz />} />
            <Route path="/quiz/:quizId" element={<TakeQuiz />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;