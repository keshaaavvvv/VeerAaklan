import React, { useState } from 'react';
import { UsersGroupIcon } from './icons/UsersGroupIcon';
import CommunityDetailModal from './CommunityDetailModal';

interface CommunitiesProps {
    language: string;
}

const translations = {
    title: { en: 'Athlete Communities', hi: 'एथलीट समुदाय' },
    description: { en: 'Connect with fellow athletes, join clubs, and share your journey.', hi: 'अन्य एथलीटों से जुड़ें, क्लबों में शामिल हों और अपनी यात्रा साझा करें।' },
    viewDetails: { en: 'View Details', hi: 'विवरण देखें' },
};

const mockCommunities = [
    { id: 'c1', name: 'Cricket Fanatics', sport: 'Cricket', members: 128, avatar: '🏏' },
    { id: 'c2', name: 'Football United', sport: 'Football', members: 256, avatar: '⚽️' },
    { id: 'c3', name: 'Hoops Nation', sport: 'Basketball', members: 97, avatar: '🏀' },
    { id: 'c4', name: 'Swim Squad', sport: 'Swimming', members: 72, avatar: '🏊' },
];

export default function Communities({ language }: CommunitiesProps) {
    const t = (key: keyof typeof translations) => translations[key][language as 'en' | 'hi'] || translations[key].en;
    const [selectedCommunity, setSelectedCommunity] = useState<any | null>(null);

    return (
        <>
            <div className="bg-black/40 backdrop-blur-lg rounded-xl shadow-xl border border-gray-700/80 p-6 animate-fade-in-up">
                <h1 className="text-3xl font-bold mb-2 text-blue-300">{t('title')}</h1>
                <p className="text-gray-400 mb-8">{t('description')}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {mockCommunities.map((community, index) => (
                        <div key={community.id} className="bg-gray-900/50 p-6 rounded-lg border border-gray-700/80 flex flex-col items-center text-center transition-all duration-300 hover:border-blue-500/70 hover:scale-105 opacity-0 animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                            <div className="text-6xl mb-4">{community.avatar}</div>
                            <h3 className="text-xl font-bold text-gray-100">{community.name}</h3>
                            <p className="text-sm text-gray-400">{community.members} Members</p>
                            <button
                                onClick={() => setSelectedCommunity(community)}
                                className="w-full mt-4 bg-blue-600/80 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md text-sm transition"
                            >
                                {t('viewDetails')}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            {selectedCommunity && (
                <CommunityDetailModal 
                    community={selectedCommunity} 
                    onClose={() => setSelectedCommunity(null)} 
                    language={language}
                />
            )}
        </>
    );
}
