import React from 'react';
// Fix: Use explicit '.ts' extension for module import.
import type { User } from '../types.ts';
import { AwardIcon } from './icons/AwardIcon.tsx';
import { CameraIcon } from './icons/CameraIcon.tsx';
import { TrophyIcon } from './icons/TrophyIcon.tsx';
import { StarIcon } from './icons/StarIcon.tsx';
import { BarChartIcon } from './icons/BarChartIcon.tsx';

interface ProfileProps {
    user: User;
    language: string;
}

const translations = {
    stats: { en: 'Stats', hi: 'आंकड़े' },
    skills: { en: 'Key Skills', hi: 'मुख्य कौशल' },
    achievements: { en: 'Achievements', hi: 'उपलब्धियां' },
    videos: { en: 'Video Library', hi: 'वीडियो लाइब्रेरी' },
    sport: { en: 'Sport', hi: 'खेल' },
    height: { en: 'Height', hi: 'ऊंचाई' },
    weight: { en: 'Weight', hi: 'वजन' },
    age: { en: 'Age', hi: 'आयु' },
    performanceStats: { en: 'Performance Stats', hi: 'प्रदर्शन आँकड़े' },
    ranking: { en: 'Ranking', hi: 'रैंकिंग' },
    personalBest: { en: 'Personal Best', hi: 'व्यक्तिगत सर्वश्रेष्ठ' },
    winLossRecord: { en: 'W/L Record', hi: 'जीत/हार रिकॉर्ड' },
};

const Profile: React.FC<ProfileProps> = ({ user, language }) => {
    const t = (key: keyof typeof translations) => translations[key][language as 'en' | 'hi'] || translations[key].en;

    return (
        <div className="space-y-8 animate-fade-in-up">
            {/* Profile Header */}
            <div className="bg-black/40 backdrop-blur-lg rounded-xl shadow-xl border border-gray-700/80 p-6 flex flex-col md:flex-row items-center gap-6">
                <img src={user.avatarUrl} alt={user.fullName} className="w-32 h-32 rounded-full border-4 border-purple-500/50" />
                <div className="text-center md:text-left">
                    <h1 className="text-4xl font-bold text-gray-100">{user.fullName}</h1>
                    <p className="text-lg text-purple-300 font-medium">{user.stats?.sport}</p>
                    <p className="text-gray-400">{user.email}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 space-y-8">
                    {/* Stats */}
                    <Widget title={t('stats')}>
                        <div className="space-y-3 text-sm">
                            <StatItem label={t('height')} value={user.stats?.height} />
                            <StatItem label={t('weight')} value={user.stats?.weight} />
                            <StatItem label={t('age')} value={user.stats?.age?.toString()} />
                        </div>
                    </Widget>

                    {/* Performance Stats */}
                    {(user.stats?.ranking || user.stats?.personalBest || user.stats?.winLossRecord) && (
                        <Widget title={t('performanceStats')}>
                            <div className="space-y-4">
                                <PerformanceStatItem 
                                    icon={<TrophyIcon className="w-6 h-6 text-yellow-400"/>} 
                                    label={t('ranking')} 
                                    value={user.stats?.ranking} 
                                />
                                <PerformanceStatItem 
                                    icon={<StarIcon className="w-6 h-6 text-purple-400"/>} 
                                    label={t('personalBest')} 
                                    value={user.stats?.personalBest} 
                                />
                                <PerformanceStatItem 
                                    icon={<BarChartIcon className="w-6 h-6 text-green-400"/>} 
                                    label={t('winLossRecord')} 
                                    value={user.stats?.winLossRecord} 
                                />
                            </div>
                        </Widget>
                    )}


                    {/* Skills */}
                    <Widget title={t('skills')}>
                        <div className="flex flex-wrap gap-2">
                            {user.skills?.map(skill => (
                                <span key={skill} className="bg-yellow-900/50 text-yellow-200 text-xs font-medium px-3 py-1 rounded-full">{skill}</span>
                            ))}
                        </div>
                    </Widget>
                </div>
                <div className="lg:col-span-2 space-y-8">
                    {/* Achievements */}
                    <Widget title={t('achievements')}>
                        {user.achievements?.length ? (
                            <ul className="space-y-3">
                                {user.achievements.map(ach => (
                                    <li key={ach.id} className="flex items-center gap-4 p-3 bg-gray-900/50 rounded-lg">
                                        <AwardIcon className="w-6 h-6 text-yellow-400 flex-shrink-0" />
                                        <div>
                                            <p className="font-semibold text-gray-200">{ach.title}</p>
                                            <p className="text-xs text-gray-400">{ach.event} - {ach.date}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : <p className="text-gray-500 text-sm">No achievements logged yet.</p>}
                    </Widget>
                    
                    {/* Video Library */}
                     <Widget title={t('videos')}>
                         {user.videos?.length ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                 {user.videos.map(video => (
                                     <div key={video.id} className="bg-gray-900/50 rounded-lg overflow-hidden">
                                        <div className="aspect-video bg-black flex items-center justify-center">
                                             <CameraIcon className="w-10 h-10 text-gray-600"/>
                                             {/* In a real app: <video src={video.url} controls /> */}
                                        </div>
                                         <div className="p-3">
                                            <p className="font-semibold text-sm text-gray-200 truncate">{video.title}</p>
                                             <p className="text-xs text-gray-500">{video.uploadedAt}</p>
                                         </div>
                                     </div>
                                 ))}
                            </div>
                         ) : <p className="text-gray-500 text-sm">No videos uploaded yet.</p>}
                     </Widget>
                </div>
            </div>
        </div>
    );
};

const Widget: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-black/40 backdrop-blur-lg rounded-xl shadow-xl border border-gray-700/80 p-6">
        <h2 className="text-xl font-bold text-gray-100 mb-4">{title}</h2>
        {children}
    </div>
);

const StatItem: React.FC<{ label: string; value?: string }> = ({ label, value }) => (
    <div className="flex justify-between items-center bg-gray-900/50 p-2 rounded-md">
        <span className="text-gray-400">{label}</span>
        <span className="font-semibold text-gray-100">{value || 'N/A'}</span>
    </div>
);

const PerformanceStatItem: React.FC<{ icon: React.ReactNode; label: string; value?: string }> = ({ icon, label, value }) => {
    if (!value) return null;
    return (
        <div className="flex items-center gap-4 p-3 bg-gray-900/50 rounded-lg">
            <div className="flex-shrink-0">{icon}</div>
            <div>
                <p className="text-sm text-gray-400">{label}</p>
                <p className="font-bold text-lg text-gray-100">{value}</p>
            </div>
        </div>
    );
};

export default Profile;