import React, { useState } from 'react';
// Fix: Use explicit '.ts' extension for module import.
import type { User } from '../types.ts';
// Fix: Use explicit '.ts' extension for module import.
import { mockChallenges } from '../data/mockData.ts';
import { TargetIcon } from './icons/TargetIcon.tsx';
import { CheckIcon } from './icons/CheckIcon.tsx';

interface ChallengesProps {
    currentUser: User;
    language: string;
}

const translations = {
    title: { en: 'Community Challenges', hi: 'सामुदायिक चुनौतियां' },
    description: { en: 'Participate in challenges, test your skills, and earn exclusive badges.', hi: 'चुनौतियों में भाग लें, अपने कौशल का परीक्षण करें, और विशेष बैज अर्जित करें।' },
    reward: { en: 'Reward:', hi: 'इनाम:' },
    joinChallenge: { en: 'Join Challenge', hi: 'चुनौती में शामिल हों' },
    completed: { en: 'Completed', hi: 'पूरा हुआ' },
};

const Challenges: React.FC<ChallengesProps> = ({ currentUser, language }) => {
    const t = (key: keyof typeof translations) => translations[key][language as 'en' | 'hi'] || translations[key].en;
    const [challenges, setChallenges] = useState(mockChallenges);

    const handleCompleteChallenge = (challengeId: string) => {
        setChallenges(prevChallenges =>
            prevChallenges.map(challenge =>
                challenge.id === challengeId
                    ? { ...challenge, isCompleted: true }
                    : challenge
            )
        );
    };
    
    return (
        <div className="bg-black/40 backdrop-blur-lg rounded-xl shadow-xl border border-gray-700/80 p-6 animate-fade-in-up">
            <h1 className="text-3xl font-bold mb-2 text-indigo-300">{t('title')}</h1>
            <p className="text-gray-400 mb-8">{t('description')}</p>

            <div className="space-y-4">
                {challenges.map((challenge, index) => (
                    <div key={challenge.id} className="bg-gray-900/50 p-6 rounded-lg border border-gray-700/80 flex flex-col md:flex-row items-center justify-between gap-4 opacity-0 animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                        <div className="flex items-center gap-4">
                            <TargetIcon className="w-10 h-10 text-indigo-400 flex-shrink-0" />
                            <div>
                                <h3 className="text-xl font-bold text-gray-100">{challenge.title}</h3>
                                <p className="text-sm text-gray-400">{challenge.description}</p>
                                <p className="text-xs text-yellow-400 mt-1 font-semibold">{t('reward')} {challenge.reward}</p>
                            </div>
                        </div>
                         {currentUser.role === 'athlete' && (
                            <div className="mt-4 md:mt-0">
                                {challenge.isCompleted ? (
                                    <button disabled className="w-full md:w-auto flex items-center justify-center gap-2 bg-green-600 text-white font-semibold py-2 px-4 rounded-md text-sm cursor-default">
                                        <CheckIcon className="w-5 h-5" /> {t('completed')}
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => handleCompleteChallenge(challenge.id)}
                                        className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md text-sm transition shine-effect">
                                        {t('joinChallenge')}
                                    </button>
                                )}
                            </div>
                         )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Challenges;