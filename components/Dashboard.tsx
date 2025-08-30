
import React from 'react';
import type { User, QuizTopic } from '../types';
import { Card } from './Card';
import { ClimateIcon, RecycleIcon, OceanIcon, ForestIcon } from './icons/QuizIcons';

interface DashboardProps {
  user: User;
  onStartQuiz: (topic: QuizTopic) => void;
}

const quizTopics: QuizTopic[] = [
  { id: 'climate-change', title: 'Climate Change', description: 'Test your knowledge on global warming.', color: 'from-red-500 to-orange-500', icon: <ClimateIcon className="w-12 h-12" /> },
  { id: 'recycling', title: 'Recycling & Waste', description: 'How well do you know recycling?', color: 'from-blue-500 to-cyan-500', icon: <RecycleIcon className="w-12 h-12" /> },
  { id: 'ocean-conservation', title: 'Ocean Conservation', description: 'Dive deep into marine life protection.', color: 'from-teal-500 to-emerald-500', icon: <OceanIcon className="w-12 h-12" /> },
  { id: 'deforestation', title: 'Deforestation', description: 'Explore the impact on our forests.', color: 'from-lime-600 to-green-600', icon: <ForestIcon className="w-12 h-12" /> },
];


const TopicCard: React.FC<{ topic: QuizTopic; onStartQuiz: (topic: QuizTopic) => void }> = ({ topic, onStartQuiz }) => (
  <Card className="transform hover:-translate-y-2 transition-transform duration-300">
    <button onClick={() => onStartQuiz(topic)} className="w-full text-left p-6">
        <div className={`p-4 rounded-xl text-white inline-block bg-gradient-to-br ${topic.color}`}>
            {topic.icon}
        </div>
        <h3 className="mt-4 text-xl font-bold text-gray-800 dark:text-white">{topic.title}</h3>
        <p className="mt-1 text-gray-500 dark:text-gray-400">{topic.description}</p>
        <span className="mt-4 inline-block font-semibold text-green-600 dark:text-green-400 hover:text-green-500">
            Start Quiz &rarr;
        </span>
    </button>
  </Card>
);

export const Dashboard: React.FC<DashboardProps> = ({ user, onStartQuiz }) => {
  return (
    <div className="container mx-auto p-6 md:p-8">
      <div className="bg-gradient-to-r from-green-500 to-teal-500 text-white p-8 rounded-2xl shadow-2xl mb-12">
        <h2 className="text-4xl font-bold">Welcome back, {user.name}!</h2>
        <p className="mt-2 text-lg opacity-90">Ready to save the planet? Choose a topic below to start learning.</p>
      </div>

      <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Choose a Quiz Topic</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {quizTopics.map((topic) => (
          <TopicCard key={topic.id} topic={topic} onStartQuiz={onStartQuiz} />
        ))}
      </div>
    </div>
  );
};
