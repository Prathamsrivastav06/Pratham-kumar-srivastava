export enum View {
  Dashboard = 'DASHBOARD',
  Quiz = 'QUIZ',
  Leaderboard = 'LEADERBOARD',
  Profile = 'PROFILE',
}

export enum Difficulty {
  Easy = 'Easy',
  Medium = 'Medium',
  Hard = 'Hard',
}

export interface User {
  name: string;
  points: number;
  avatar: string;
  badges: Badge[];
}

export interface Badge {
  name: string;
  icon: string;
  description: string;
}

export interface QuizTopic {
  id: string;
  title: string;
  description: string;
  color: string;
  icon: JSX.Element;
}

export interface Question {
  questionText: string;
  options: string[];
  correctAnswer: string;
}

export interface LeaderboardUser {
  rank: number;
  name: string;
  points: number;
  avatar: string;
}
