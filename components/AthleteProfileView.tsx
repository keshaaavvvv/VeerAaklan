import React from 'react';
// Fix: Use explicit '.ts' extension for module import.
import type { User } from '../types.ts';
import Profile from './Profile.tsx';
import { ChevronLeftIcon } from './icons/ChevronLeftIcon.tsx';

interface AthleteProfileViewProps {
    athlete: User;
    onBack: () => void;
    language: string;
}

const translations = {
    back: { en: 'Back to Talent Feed', hi: 'प्रतिभा फ़ीड पर वापस' },
};

export default function AthleteProfileView({ athlete, onBack, language }: AthleteProfileViewProps) {
    const t = (key: keyof typeof translations) => translations[key][language as 'en' | 'hi'] || translations[key].en;

    return (
        <div>
            <button onClick={onBack} className="flex items-center gap-2 text-sm font-semibold text-purple-400 hover:text-purple-300 mb-4">
                <ChevronLeftIcon className="w-5 h-5" />
                <span>{t('back')}</span>
            </button>
            <Profile user={athlete} language={language} />
        </div>
    );
}
