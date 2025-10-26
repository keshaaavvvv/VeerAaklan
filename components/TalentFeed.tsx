import React, { useState } from 'react';
// Fix: Use explicit '.ts' extension for module import.
import { mockAthleteListForCoach } from '../data/mockData.ts';
// Fix: Use explicit '.ts' extension for module import.
import type { User } from '../types.ts';
import AthleteProfileView from './AthleteProfileView.tsx';

interface TalentFeedProps {
    language: string;
}

const translations = {
    title: { en: 'Talent Discovery Feed', hi: 'प्रतिभा खोज फ़ीड' },
    description: { en: 'Browse and analyze athlete profiles to find the next star.', hi: 'अगले स्टार को खोजने के लिए एथलीट प्रोफाइल ब्राउज़ करें और उनका विश्लेषण करें।' },
    viewProfile: { en: 'View Profile', hi: 'प्रोफ़ाइल देखें' },
};

const TalentFeed: React.FC<TalentFeedProps> = ({ language }) => {
    const t = (key: keyof typeof translations) => translations[key][language as 'en' | 'hi'] || translations[key].en;
    const [selectedAthlete, setSelectedAthlete] = useState<User | null>(null);

    if (selectedAthlete) {
        return <AthleteProfileView athlete={selectedAthlete} onBack={() => setSelectedAthlete(null)} language={language} />;
    }

    return (
        <div className="bg-black/40 backdrop-blur-lg rounded-xl shadow-xl border border-gray-700/80 p-6 animate-fade-in-up">
            <h1 className="text-3xl font-bold mb-2 text-purple-300">{t('title')}</h1>
            <p className="text-gray-400 mb-8">{t('description')}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockAthleteListForCoach.map((athlete, index) => (
                    <div key={athlete.id} className="bg-gray-900/50 p-6 rounded-lg border border-gray-700/80 flex flex-col items-center text-center transition-all duration-300 hover:border-purple-500/70 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/10 opacity-0 animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                        <img src={athlete.avatarUrl} alt={athlete.fullName} className="w-24 h-24 rounded-full border-4 border-gray-600 mb-4" />
                        <h3 className="text-xl font-bold text-gray-100">{athlete.fullName}</h3>
                        <p className="text-purple-300 text-sm font-medium mb-4">{athlete.stats?.sport}</p>
                        <button 
                            onClick={() => setSelectedAthlete(athlete)}
                            className="w-full mt-auto bg-purple-600/80 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-md text-sm transition shine-effect"
                        >
                            {t('viewProfile')}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TalentFeed;
