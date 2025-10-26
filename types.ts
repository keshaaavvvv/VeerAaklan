export interface Stats {
    sport: string;
    height: string;
    weight: string;
    age: number;
    ranking?: string;
    personalBest?: string;
    winLossRecord?: string;
}

export interface Achievement {
    id: string;
    title: string;
    event: string;
    date: string;
}

export interface Video {
    id:string;
    title: string;
    url: string;
    uploadedAt: string;
}

export interface Badge {
    id: string;
    name: string;
    description: string;
    icon: string;
    color: string;
}

export interface User {
    id: string;
    email: string;
    fullName: string;
    role: 'athlete' | 'coach' | 'coordinator';
    avatarUrl?: string;
    stats?: Stats;
    skills?: string[];
    achievements?: Achievement[];
    videos?: Video[];
    badges?: Badge[];
}

export interface Comment {
    id: string;
    author: { id: string; fullName: string; avatarUrl?: string; };
    timestamp: string;
    text: string;
}

export interface Post {
    id: string;
    author: { id:string; fullName: string; avatarUrl?: string; };
    timestamp: string;
    title: string;
    content: string;
    targetAuthority: string;
    status: 'Submitted' | 'Under Review' | 'Approved' | 'Rejected';
    likes: number;
    comments: Comment[];
}

export interface LeaderboardEntry {
    rank: number;
    athlete: { id: string; fullName: string; avatarUrl?: string; };
    primarySport: string;
    points: number;
}

export interface Challenge {
    id: string;
    title: string;
    description: string;
    reward: string;
    isCompleted: boolean;
}

export interface AIAnalysis {
    passionForSports: string;
    communicationClarity: string;
    confidenceLevel: string;
    keySkills: string[];
    guidance: string;
}

export interface ChatMessage {
    id: number;
    role: 'user' | 'model';
    text: string;
}

export interface WellnessEntry {
    date: string;
    sleep: number;
    hydration: number;
    mood: number; // 0-4 index, 0 = Great
}

export interface ExerciseVideoSuggestion {
    title: string;
    description: string;
    url: string;
}

export interface JointFeedback {
    joint: string;
    feedback: string;
    rating: 'good' | 'average' | 'poor';
}

export interface PerformanceMetrics {
    rangeOfMotion: number;
    stability: number;
    tempo: number;
}

export interface ExerciseAnalysis {
    overallSummary: string;
    overallScore: number;
    pros: string[];
    cons: string[];
    performanceMetrics: PerformanceMetrics;
    jointSpecificFeedback: JointFeedback[];
    videoSuggestions: ExerciseVideoSuggestion[];
}