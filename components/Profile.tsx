
import React from 'react';
import type { User } from '../types';
import { Card } from './Card';

interface ProfileProps {
  user: User;
}

export const Profile: React.FC<ProfileProps> = ({ user }) => {
  return (
    <div className="container mx-auto p-6 md:p-8 max-w-4xl">
      <Card className="overflow-visible">
        <div className="bg-gradient-to-r from-green-500 to-teal-500 h-32 rounded-t-2xl relative">
          <div className="absolute -bottom-16 left-1/2 -translate-x-1/2">
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="w-32 h-32 rounded-full border-8 border-white dark:border-gray-800 shadow-lg"
            />
          </div>
        </div>
        <div className="pt-20 pb-10 text-center">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white">{user.name}</h2>
          <p className="mt-4 text-2xl font-semibold text-yellow-500">{user.points.toLocaleString()} Points</p>
        </div>

        <div className="px-6 pb-10">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">My Badges</h3>
          {user.badges.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {user.badges.map((badge, index) => (
                <Card key={index} className="p-6 text-center bg-gray-50 dark:bg-gray-700/50">
                  <div className="text-6xl mb-4">{badge.icon}</div>
                  <h4 className="text-xl font-semibold text-gray-800 dark:text-white">{badge.name}</h4>
                  <p className="text-gray-500 dark:text-gray-400 mt-1">{badge.description}</p>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400">
              No badges yet. Complete quizzes to earn them!
            </p>
          )}
        </div>
      </Card>
    </div>
  );
};
