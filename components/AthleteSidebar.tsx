import React from 'react';
import { UserIcon } from './icons/UserIcon';
import { AwardIcon } from './icons/AwardIcon';
import { HeartPulseIcon } from './icons/HeartPulseIcon';
import { MessageSquareIcon } from './icons/MessageSquareIcon';
import { BarChartIcon } from './icons/BarChartIcon';
import { TargetIcon } from './icons/TargetIcon';
import { UsersGroupIcon } from './icons/UsersGroupIcon';
import { LandmarkIcon } from './icons/LandmarkIcon';
import { RulerIcon } from './icons/RulerIcon';
import { VideoIcon } from './icons/VideoIcon.tsx';

interface AthleteSidebarProps {
    activeView: string;
    setActiveView: (view: string) => void;
    language: string;
}

const translations = {
    profile: { en: 'My Profile', hi: 'मेरी प्रोफाइल' },
    badges: { en: 'Badges', hi: 'बैज' },
    tracker: { en: 'Wellness Tracker', hi: 'वेलनेस ट्रैकर' },
    feed: { en: 'Idea Forum', hi: 'विचार मंच' },
    leaderboard: { en: 'Leaderboard', hi: 'लीडरबोर्ड' },
    challenges: { en: 'Challenges', hi: 'चुनौतियां' },
    communities: { en: 'Communities', hi: 'समुदाय' },
    authorities: { en: 'Authorities', hi: 'अधिकारी' },
    benchmarking: { en: 'Skill Benchmarking', hi: 'कौशल बेंचमार्किंग'},
    videoAnalysis: { en: 'Performance Analysis', hi: 'प्रदर्शन विश्लेषण' },
};

const navItems = [
    { id: 'profile', icon: UserIcon },
    { id: 'badges', icon: AwardIcon },
    { id: 'tracker', icon: HeartPulseIcon },
    { id: 'videoAnalysis', icon: VideoIcon },
    { id: 'feed', icon: MessageSquareIcon },
    { id: 'leaderboard', icon: BarChartIcon },
    { id: 'challenges', icon: TargetIcon },
    { id: 'communities', icon: UsersGroupIcon },
    { id: 'authorities', icon: LandmarkIcon },
    { id: 'benchmarking', icon: RulerIcon },
];

export default function AthleteSidebar({ activeView, setActiveView, language }: AthleteSidebarProps) {
    const t = (key: keyof typeof translations) => translations[key][language as 'en' | 'hi'] || translations[key].en;

    return (
        <aside className="hidden lg:block w-64 flex-shrink-0">
            <nav className="sticky top-28 bg-black/40 backdrop-blur-lg rounded-xl shadow-xl border border-gray-700/80 p-4">
                <ul className="space-y-2">
                    {navItems.map(item => (
                        <li key={item.id}>
                            <button
                                onClick={() => setActiveView(item.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-md text-sm font-semibold transition-colors ${
                                    activeView === item.id 
                                    ? 'bg-purple-600 text-white' 
                                    : 'text-gray-300 hover:bg-gray-800'
                                }`}
                            >
                                <item.icon className="w-5 h-5" />
                                <span>{t(item.id as keyof typeof translations)}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
}