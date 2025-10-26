import React from 'react';
import { SearchIcon } from './icons/SearchIcon';
import { AlertTriangleIcon } from './icons/AlertTriangleIcon';

interface CoachSidebarProps {
    activeView: string;
    setActiveView: (view: string) => void;
    language: string;
}

const translations = {
    talentFeed: { en: 'Talent Feed', hi: 'प्रतिभा फ़ीड' },
    alerts: { en: 'Performance Alerts', hi: 'प्रदर्शन अलर्ट' },
};

const navItems = [
    { id: 'talentFeed', icon: SearchIcon },
    { id: 'alerts', icon: AlertTriangleIcon },
];

export default function CoachSidebar({ activeView, setActiveView, language }: CoachSidebarProps) {
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
