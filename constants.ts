
import type { User, LeaderboardUser } from './types';

export const CURRENT_USER: User = {
  name: 'Alex Green',
  points: 1250,
  avatar: 'https://picsum.photos/seed/alex/100',
  badges: [
    { name: 'Recycle Rookie', icon: '♻️', description: 'Completed the Recycling quiz.' },
    { name: 'Climate Champion', icon: '🌍', description: 'Scored 100% on the Climate Change quiz.' },
  ],
};

export const LEADERBOARD_DATA: LeaderboardUser[] = [
  { rank: 1, name: 'EcoWarrior Jane', points: 3400, avatar: 'https://picsum.photos/seed/jane/100' },
  { rank: 2, name: 'SolarSam', points: 3150, avatar: 'https://picsum.photos/seed/sam/100' },
  { rank: 3, name: 'GreenGuru', points: 2800, avatar: 'https://picsum.photos/seed/guru/100' },
  { rank: 4, name: 'Alex Green', points: 1250, avatar: 'https://picsum.photos/seed/alex/100' },
  { rank: 5, name: 'RecycleRita', points: 1100, avatar: 'https://picsum.photos/seed/rita/100' },
  { rank: 6, name: 'BioBen', points: 950, avatar: 'https://picsum.photos/seed/ben/100' },
  { rank: 7, name: 'ForestFrank', points: 800, avatar: 'https://picsum.photos/seed/frank/100' },
];
