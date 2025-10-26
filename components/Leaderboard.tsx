import React from 'react';
// Fix: Corrected import path for mockData to be relative.
import { mockLeaderboard } from '../data/mockData';
import { TrophyIcon } from './icons/TrophyIcon';

interface LeaderboardProps {
    language: string;
}

const translations = {
    title: { en: 'Leaderboard', hi: 'लीडरबोर्ड' },
    description: { en: 'See how you rank against other athletes on the platform.', hi: 'देखें कि आप प्लेटफ़ॉर्म पर अन्य एथलीटों के मुकाबले कैसे रैंक करते हैं।' },
    rank: { en: 'Rank', hi: 'रैंक' },
    athlete: { en: 'Athlete', hi: 'एथलीट' },
    sport: { en: 'Primary Sport', hi: 'प्राथमिक खेल' },
    points: { en: 'Points', hi: 'अंक' },
};

const Leaderboard: React.FC<LeaderboardProps> = ({ language }) => {
    const t = (key: keyof typeof translations) => translations[key][language as 'en' | 'hi'] || translations[key].en;
    
    const rankColor = (rank: number) => {
        if (rank === 1) return 'text-yellow-400';
        if (rank === 2) return 'text-gray-300';
        if (rank === 3) return 'text-yellow-600';
        return 'text-gray-400';
    };

    return (
        <div className="bg-black/40 backdrop-blur-lg rounded-xl shadow-xl border border-gray-700/80 p-6 animate-fade-in-up">
            <h1 className="text-3xl font-bold mb-2 text-green-300">{t('title')}</h1>
            <p className="text-gray-400 mb-8">{t('description')}</p>
            
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-300">
                    <thead className="text-xs text-gray-400 uppercase bg-gray-900/50">
                        <tr>
                            <th scope="col" className="px-6 py-3">{t('rank')}</th>
                            <th scope="col" className="px-6 py-3">{t('athlete')}</th>
                            <th scope="col" className="px-6 py-3">{t('sport')}</th>
                            <th scope="col" className="px-6 py-3 text-right">{t('points')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mockLeaderboard.map((entry, index) => (
                             <tr key={entry.athlete.id} className="border-b border-gray-800 hover:bg-gray-800/40 opacity-0 animate-fade-in-up" style={{ animationDelay: `${index * 75}ms` }}>
                                <td className={`px-6 py-4 font-bold text-lg ${rankColor(entry.rank)}`}>
                                    <div className="flex items-center gap-2">
                                        {entry.rank <= 3 && <TrophyIcon className="w-5 h-5" />}
                                        {entry.rank}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <img src={entry.athlete.avatarUrl} alt={entry.athlete.fullName} className="w-10 h-10 rounded-full" />
                                        <span className="font-semibold text-white">{entry.athlete.fullName}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">{entry.primarySport}</td>
                                <td className="px-6 py-4 font-bold text-green-400 text-right">{entry.points.toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Leaderboard;
