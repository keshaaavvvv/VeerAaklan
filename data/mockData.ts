import type { User, Post, Challenge, LeaderboardEntry } from './types';

const athlete1: User = {
    id: 'athlete-1',
    email: 'priyanka.tiwari@veer.com',
    fullName: 'Priyanka Tiwari',
    role: 'athlete',
    avatarUrl: 'https://i.pravatar.cc/150?u=priya',
    stats: {
        sport: 'Cricket',
        height: '168 cm',
        weight: '55 kg',
        age: 22,
        ranking: 'State #3',
        personalBest: '112* (not out)',
        winLossRecord: '28-11',
    },
    skills: ['Right-hand bat', 'Off-spin bowler', 'Agile fielder'],
    achievements: [
        { id: 'ach1', title: 'Player of the Match', event: 'University Nationals', date: '2023-03-15' },
        { id: 'ach2', title: 'Best Bowler', event: 'State Championship', date: '2022-11-20' },
    ],
    videos: [
        { id: 'vid1', title: 'Net Practice Highlights', url: '#', uploadedAt: '2023-05-10' },
        { id: 'vid2', title: 'Fielding Drills', url: '#', uploadedAt: '2023-04-22' },
    ],
    badges: [
        { id: 'b1', name: 'Sunrise Starter', description: 'Completed 5 early morning practice sessions.', icon: 'Sunrise', color: 'yellow' },
        { id: 'b2', name: 'Fitness Fiend', description: 'Logged 100 hours of fitness training.', icon: 'Fitness', color: 'green' },
    ],
};

const athlete2: User = {
    id: 'athlete-2',
    email: 'arjun.singh@veer.com',
    fullName: 'Arjun Singh',
    role: 'athlete',
    avatarUrl: 'https://i.pravatar.cc/150?u=arjun',
    stats: { 
        sport: 'Football', 
        height: '182 cm', 
        weight: '78 kg', 
        age: 24,
        ranking: 'League #1 Striker',
        personalBest: '34 Goals (Season)',
        winLossRecord: '22-4-2',
    },
    skills: ['Striker', 'Dribbling', 'Header Accuracy'],
    achievements: [{ id: 'ach3', title: 'Top Scorer', event: 'National League', date: '2023-04-01' }],
    videos: [{ id: 'vid3', title: 'Goal Compilation', url: '#', uploadedAt: '2023-05-01' }],
    badges: [],
};

const athlete3: User = {
    id: 'athlete-3',
    email: 'isha.nair@veer.com',
    fullName: 'Isha Nair',
    role: 'athlete',
    avatarUrl: 'https://i.pravatar.cc/150?u=isha',
    stats: { 
        sport: 'Basketball', 
        height: '175 cm', 
        weight: '65 kg', 
        age: 21,
        ranking: 'Univ. Top 5 PG',
        personalBest: '28 Points (Game)',
        winLossRecord: '18-6',
    },
    skills: ['Point Guard', 'Three-point shooter', 'Playmaking'],
    achievements: [],
    videos: [],
    badges: [],
};


const coachUser: User = {
    id: 'coach-1',
    email: 'coach@veer.com',
    fullName: 'Rajesh Kumar',
    role: 'coach',
    avatarUrl: 'https://i.pravatar.cc/150?u=coach',
};

const demoAthlete: User = {
    id: 'athlete-demo',
    email: 'athlete@veer.com',
    fullName: 'Priyanka Tiwari',
    role: 'athlete',
    avatarUrl: 'https://i.pravatar.cc/150?u=priya',
    stats: athlete1.stats,
    skills: athlete1.skills,
    achievements: athlete1.achievements,
    videos: athlete1.videos,
    badges: athlete1.badges,
};

export const mockUsers: User[] = [demoAthlete, coachUser];

export const mockAthleteListForCoach: User[] = [athlete1, athlete2, athlete3];

export const mockPosts: Post[] = [
    {
        id: 'post1',
        author: { id: 'athlete-1', fullName: 'Priyanka Tiwari', avatarUrl: 'https://i.pravatar.cc/150?u=priya' },
        timestamp: '2 days ago',
        title: 'Grassroots Cricket Coaching App',
        content: 'I propose that the BCCI develops and sponsors a free mobile app for grassroots coaching. It would provide drills, skill guides, and remote mentorship opportunities for young talent in rural areas who lack access to professional coaches.',
        targetAuthority: 'Board of Control for Cricket in India (BCCI)',
        status: 'Under Review',
        likes: 152,
        comments: [
            { id: 'c1', author: { id: 'athlete-2', fullName: 'Arjun Singh', avatarUrl: 'https://i.pravatar.cc/150?u=arjun' }, timestamp: '1 day ago', text: 'This is a fantastic idea! Would level the playing field.' },
            { id: 'c2', author: { id: 'coach-1', fullName: 'Rajesh Kumar', avatarUrl: 'https://i.pravatar.cc/150?u=coach' }, timestamp: '1 day ago', text: 'Great initiative. The NCA could help develop the curriculum for this.' },
        ],
    },
    {
        id: 'post2',
        author: { id: 'athlete-2', fullName: 'Arjun Singh', avatarUrl: 'https://i.pravatar.cc/150?u=arjun' },
        timestamp: '5 days ago',
        title: 'Mental Wellness Workshops for National Camps',
        content: 'Requesting SAI to integrate mandatory mental wellness and resilience workshops into all national-level training camps. Athlete mental health is as crucial as physical health for peak performance.',
        targetAuthority: 'Sports Authority of India (SAI)',
        status: 'Approved',
        likes: 289,
        comments: [],
    },
    {
        id: 'post3',
        author: { id: 'athlete-3', fullName: 'Isha Nair', avatarUrl: 'https://i.pravatar.cc/150?u=isha' },
        timestamp: '1 week ago',
        title: 'Improve Scouting at University Basketball Tournaments',
        content: 'The current scouting system at university-level basketball tournaments feels inadequate. I suggest a more structured and transparent scouting program, managed by a national body, to ensure no talent goes unnoticed.',
        targetAuthority: 'Sports Authority of India (SAI)',
        status: 'Submitted',
        likes: 98,
        comments: [],
    },
];

export const mockLeaderboard: LeaderboardEntry[] = [
    { rank: 1, athlete: { id: 'athlete-2', fullName: 'Arjun Singh', avatarUrl: 'https://i.pravatar.cc/150?u=arjun' }, primarySport: 'Football', points: 1540 },
    { rank: 2, athlete: { id: 'athlete-1', fullName: 'Priyanka Tiwari', avatarUrl: 'https://i.pravatar.cc/150?u=priya' }, primarySport: 'Cricket', points: 1480 },
    { rank: 3, athlete: { id: 'athlete-4', fullName: 'Rohan Verma', avatarUrl: 'https://i.pravatar.cc/150?u=rohan' }, primarySport: 'Swimming', points: 1320 },
    { rank: 4, athlete: { id: 'athlete-3', fullName: 'Isha Nair', avatarUrl: 'https://i.pravatar.cc/150?u=isha' }, primarySport: 'Basketball', points: 1250 },
];

export const mockChallenges: Challenge[] = [
    { id: 'ch1', title: '30-Day Fitness Streak', description: 'Complete a fitness activity every day for 30 days.', reward: 'Fitness Fiend Badge', isCompleted: true },
    { id: 'ch2', title: 'Early Riser', description: 'Log 10 practice sessions before 7 AM.', reward: 'Sunrise Starter Badge', isCompleted: false },
    { id: 'ch3', title: 'Community Contributor', description: 'Make 20 helpful posts or comments in the feed.', reward: 'Community Pillar Badge', isCompleted: false },
];