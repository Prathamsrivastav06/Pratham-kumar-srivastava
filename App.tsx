
import React, { useState } from 'react';
import { View } from './types';
import type { User, QuizTopic } from './types';
import { CURRENT_USER, LEADERBOARD_DATA } from './constants';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { Quiz } from './components/Quiz';
import { Leaderboard } from './components/Leaderboard';
import { Profile } from './components/Profile';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.Dashboard);
  const [user, setUser] = useState<User>(CURRENT_USER);
  const [activeQuizTopic, setActiveQuizTopic] = useState<QuizTopic | null>(null);

  const setView = (view: View) => {
    setCurrentView(view);
  };

  const handleStartQuiz = (topic: QuizTopic) => {
    setActiveQuizTopic(topic);
    setCurrentView(View.Quiz);
  };
  
  const handleQuizComplete = (score: number) => {
    setUser(prevUser => ({
      ...prevUser,
      points: prevUser.points + score,
    }));
    setCurrentView(View.Dashboard);
  };

  const renderContent = () => {
    switch (currentView) {
      case View.Quiz:
        return activeQuizTopic && <Quiz topic={activeQuizTopic} onQuizComplete={handleQuizComplete} onBack={() => setView(View.Dashboard)} />;
      case View.Leaderboard:
        return <Leaderboard users={LEADERBOARD_DATA} currentUser={user.name} />;
      case View.Profile:
        return <Profile user={user} />;
      case View.Dashboard:
      default:
        return <Dashboard user={user} onStartQuiz={handleStartQuiz} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Header points={user.points} setView={setView} currentView={currentView} />
      <main>
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
