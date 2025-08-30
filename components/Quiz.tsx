import React, { useState, useEffect, useCallback } from 'react';
import { Question, QuizTopic, Difficulty } from '../types';
import { generateQuizQuestions } from '../services/geminiService';
import { Card } from './Card';

interface QuizProps {
  topic: QuizTopic;
  onQuizComplete: (score: number) => void;
  onBack: () => void;
}

const DifficultyButton: React.FC<{
  difficulty: Difficulty;
  color: string;
  icon: JSX.Element;
  onClick: (difficulty: Difficulty) => void;
}> = ({ difficulty, color, icon, onClick }) => (
    <button 
        onClick={() => onClick(difficulty)}
        className={`w-full sm:w-auto flex-1 p-6 rounded-2xl text-white font-bold text-2xl flex flex-col items-center justify-center transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl ${color}`}
    >
        <div className="w-12 h-12 mb-2">{icon}</div>
        {difficulty}
    </button>
);

const QuizLoadingSkeleton: React.FC = () => (
    <div className="animate-pulse space-y-6">
        <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded-md w-3/4"></div>
        <div className="space-y-4">
            <div className="h-12 bg-gray-200 dark:bg-gray-600 rounded-lg"></div>
            <div className="h-12 bg-gray-200 dark:bg-gray-600 rounded-lg"></div>
            <div className="h-12 bg-gray-200 dark:bg-gray-600 rounded-lg"></div>
            <div className="h-12 bg-gray-200 dark:bg-gray-600 rounded-lg"></div>
        </div>
    </div>
);

export const Quiz: React.FC<QuizProps> = ({ topic, onQuizComplete, onBack }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Start as false
  const [error, setError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);

  const fetchQuestions = useCallback(async () => {
    if (!difficulty) return;

    setIsLoading(true);
    setError(null);
    try {
      const fetchedQuestions = await generateQuizQuestions(topic.title, difficulty);
      setQuestions(fetchedQuestions);
    } catch (e: any) {
      setError(e.message || "An unknown error occurred.");
    } finally {
      setIsLoading(false);
    }
  }, [topic.title, difficulty]);

  useEffect(() => {
    if (difficulty) {
      fetchQuestions();
    }
  }, [difficulty, fetchQuestions]);

  const handleAnswerSelect = (answer: string) => {
    if (feedback) return; // Prevent changing answer after submission
    setSelectedAnswer(answer);
  };

  const handleSubmit = () => {
    if (!selectedAnswer) return;

    const currentQuestion = questions[currentQuestionIndex];
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(score + 100);
      setFeedback('Correct!');
    } else {
      setFeedback(`Incorrect. The correct answer was: ${currentQuestion.correctAnswer}`);
    }

    setTimeout(() => {
      setFeedback(null);
      setSelectedAnswer(null);
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setIsFinished(true);
        onQuizComplete(score + (selectedAnswer === currentQuestion.correctAnswer ? 100 : 0));
      }
    }, 2000);
  };
  
  const getButtonClass = (option: string) => {
    if (!feedback) {
        return selectedAnswer === option 
            ? 'bg-indigo-600 text-white' 
            : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600';
    }
    const isCorrect = option === questions[currentQuestionIndex].correctAnswer;
    const isSelected = option === selectedAnswer;

    if (isCorrect) return 'bg-green-500 text-white';
    if (isSelected && !isCorrect) return 'bg-red-500 text-white';
    return 'bg-gray-100 dark:bg-gray-700 opacity-50 cursor-not-allowed';
  }

  if (!difficulty) {
    return (
        <div className="container mx-auto p-8 max-w-3xl text-center">
            <Card className="p-10">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Choose Difficulty</h2>
                <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">for the {topic.title} quiz</p>
                <div className="mt-8 flex flex-col sm:flex-row justify-center gap-6">
                    <DifficultyButton difficulty={Difficulty.Easy} color="bg-gradient-to-br from-green-400 to-green-600" onClick={setDifficulty} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>} />
                    <DifficultyButton difficulty={Difficulty.Medium} color="bg-gradient-to-br from-blue-400 to-blue-600" onClick={setDifficulty} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>} />
                    <DifficultyButton difficulty={Difficulty.Hard} color="bg-gradient-to-br from-red-500 to-red-700" onClick={setDifficulty} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>} />
                </div>
                <button onClick={onBack} className="mt-10 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 font-semibold transition-colors">
                  &larr; Back to Dashboard
                </button>
            </Card>
        </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto p-8 max-w-3xl">
        <Card className="p-8">
            <h2 className="text-2xl font-bold text-center mb-6 dark:text-white">Generating {difficulty} Quiz on {topic.title}...</h2>
            <QuizLoadingSkeleton />
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-8 max-w-3xl text-center">
        <Card className="p-8 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700">
          <h2 className="text-2xl font-bold text-red-700 dark:text-red-300">Error!</h2>
          <p className="mt-2 text-red-600 dark:text-red-400">{error}</p>
          <button onClick={onBack} className="mt-6 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
            Back to Dashboard
          </button>
        </Card>
      </div>
    );
  }

  if (isFinished) {
    const finalScore = score;
    return (
      <div className="container mx-auto p-8 max-w-3xl text-center">
        <Card className="p-12">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white">Quiz Complete!</h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">Topic: {topic.title} ({difficulty})</p>
          <p className="mt-8 text-6xl font-bold text-green-500">{finalScore}</p>
          <p className="text-xl text-gray-500 dark:text-gray-400">Points Earned</p>
          <button onClick={onBack} className="mt-10 bg-green-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
            Return to Dashboard
          </button>
        </Card>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  return (
    <div className="container mx-auto p-4 md:p-8 max-w-3xl">
      <Card className="p-6 md:p-8">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{topic.title} Quiz</h2>
            <div className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                <span>{currentQuestionIndex + 1}</span> / <span>{questions.length}</span>
            </div>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-8">
            <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}></div>
        </div>

        {currentQuestion && (
            <div>
                <h3 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">{currentQuestion.questionText}</h3>
                <div className="space-y-4">
                    {currentQuestion.options.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => handleAnswerSelect(option)}
                            disabled={!!feedback}
                            className={`w-full text-left p-4 rounded-lg text-lg transition-all duration-300 font-medium ${getButtonClass(option)}`}
                        >
                            {option}
                        </button>
                    ))}
                </div>
                <div className="mt-6 flex justify-end">
                    <button
                        onClick={handleSubmit}
                        disabled={!selectedAnswer || !!feedback}
                        className="bg-green-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-300 transform disabled:scale-100 hover:scale-105 shadow-lg"
                    >
                        {currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next Question'}
                    </button>
                </div>
            </div>
        )}
      </Card>
    </div>
  );
};
