
import React from 'react';
import type { LeaderboardUser } from '../types';
import { TrophyIcon } from './icons/TrophyIcon';
import { Card } from './Card';

interface LeaderboardProps {
  users: LeaderboardUser[];
  currentUser: string;
}

const getRankColor = (rank: number) => {
  if (rank === 1) return 'text-yellow-400';
  if (rank === 2) return 'text-gray-400';
  if (rank === 3) return 'text-yellow-600';
  return 'text-gray-500';
};

export const Leaderboard: React.FC<LeaderboardProps> = ({ users, currentUser }) => {
  const sortedUsers = [...users].sort((a, b) => b.points - a.points).map((user, index) => ({...user, rank: index + 1}));

  return (
    <div className="container mx-auto p-6 md:p-8 max-w-4xl">
      <div className="text-center mb-10">
        <TrophyIcon className="w-16 h-16 text-yellow-500 mx-auto" />
        <h2 className="text-4xl font-bold text-gray-800 dark:text-white mt-4">Leaderboard</h2>
        <p className="text-lg text-gray-500 dark:text-gray-400 mt-2">See where you stand among the top Eco-Warriors!</p>
      </div>

      <Card className="p-4 md:p-6">
        <div className="flow-root">
          <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
            {sortedUsers.map((user) => (
              <li
                key={user.rank}
                className={`py-4 px-2 md:px-4 flex items-center space-x-4 rounded-lg transition-colors ${
                  user.name === currentUser ? 'bg-green-100 dark:bg-green-900/30' : ''
                }`}
              >
                <div className="w-8 text-center">
                  <span className={`text-2xl font-bold ${getRankColor(user.rank)}`}>
                    {user.rank}
                  </span>
                </div>
                <div className="flex-shrink-0">
                  <img className="h-12 w-12 rounded-full" src={user.avatar} alt={`${user.name} avatar`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-lg font-semibold text-gray-900 dark:text-white truncate">{user.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-green-500">{user.points.toLocaleString()}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Points</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Card>
    </div>
  );
};
