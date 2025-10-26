import React from 'react';
// Fix: Use explicit '.ts' extension for module import.
import type { User } from '../types.ts';
import { RulerIcon } from './icons/RulerIcon.tsx';

interface SkillBenchmarkingProps {
    language: string;
    currentUser: User;
}

const translations = {
    title: { en: 'Skill Benchmarking', hi: 'कौशल बेंचमार्किंग' },
    description: { en: 'Compare your skills against the community average.', hi: 'समुदाय के औसत के मुकाबले अपने कौशल की तुलना करें।' },
    yourSkill: { en: 'Your Skill', hi: 'आपका कौशल' },
    communityAverage: { en: 'Community Average', hi: 'समुदाय औसत' },
};

const mockSkillData = {
    "Speed": { user: 85, community: 75 },
    "Agility": { user: 90, community: 80 },
    "Strength": { user: 70, community: 78 },
    "Endurance": { user: 80, community: 82 },
    "Accuracy": { user: 92, community: 85 },
};

export default function SkillBenchmarking({ language, currentUser }: SkillBenchmarkingProps) {
    const t = (key: keyof typeof translations) => translations[key][language as 'en' | 'hi'] || translations[key].en;

    return (
        <div className="bg-black/40 backdrop-blur-lg rounded-xl shadow-xl border border-gray-700/80 p-6 animate-fade-in-up">
            <div className="flex items-center gap-4 mb-2">
                <RulerIcon className="w-8 h-8 text-indigo-300" />
                <h1 className="text-3xl font-bold text-indigo-300">{t('title')}</h1>
            </div>
            <p className="text-gray-400 mb-8">{t('description')}</p>

            <div className="space-y-6">
                {Object.entries(mockSkillData).map(([skill, data], index) => (
                    <div key={skill} className="opacity-0 animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                        <h3 className="text-lg font-semibold text-gray-200 mb-2">{skill}</h3>
                        <div className="space-y-3">
                            {/* User's Skill */}
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="font-medium text-purple-300">{t('yourSkill')}</span>
                                    <span className="text-gray-400">{data.user}/100</span>
                                </div>
                                <div className="w-full bg-gray-700 rounded-full h-2.5">
                                    <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: `${data.user}%` }}></div>
                                </div>
                            </div>
                            {/* Community Average */}
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="font-medium text-cyan-300">{t('communityAverage')}</span>
                                    <span className="text-gray-400">{data.community}/100</span>
                                </div>
                                <div className="w-full bg-gray-700 rounded-full h-2.5">
                                    <div className="bg-cyan-500 h-2.5 rounded-full" style={{ width: `${data.community}%` }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
