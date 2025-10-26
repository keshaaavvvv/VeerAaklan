import React from 'react';
// Fix: Use explicit '.ts' extension for module import.
import type { User } from '../types.ts';
import { SunIcon } from './icons/SunIcon.tsx'; // Using existing icons as placeholders
import { ShieldIcon } from './icons/ShieldIcon.tsx';

interface BadgesProps {
    user: User;
    language: string;
}

const translations = {
    title: { en: 'My Badges & Rewards', hi: 'मेरे बैज और पुरस्कार' },
    description: { en: 'A collection of all the badges you have earned through challenges and milestones.', hi: 'चुनौतियों और मील के पत्थर के माध्यम से आपके द्वारा अर्जित सभी बैजों का संग्रह।' },
    noBadges: { en: 'No badges earned yet. Complete some challenges to get started!', hi: 'अभी तक कोई बैज अर्जित नहीं किया गया है। आरंभ करने के लिए कुछ चुनौतियाँ पूरी करें!' },
};

// Dummy FitnessIcon, as it doesn't exist in the provided files.
const FitnessIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M5 12h14M12 5l7 7-7 7"/></svg>
);


const BadgeIcon: React.FC<{ icon: string }> = ({ icon }) => {
    switch (icon) {
        case 'Sunrise': return <SunIcon className="w-10 h-10" />;
        case 'Fitness': return <FitnessIcon className="w-10 h-10" />;
        default: return <ShieldIcon className="w-10 h-10" />;
    }
};

const Badges: React.FC<BadgesProps> = ({ user, language }) => {
    const t = (key: keyof typeof translations) => translations[key][language as 'en' | 'hi'] || translations[key].en;

    const colorClasses = {
        blue: { bg: 'bg-blue-900/40', text: 'text-blue-300', border: 'border-blue-500/50' },
        green: { bg: 'bg-green-900/40', text: 'text-green-300', border: 'border-green-500/50' },
        yellow: { bg: 'bg-yellow-900/40', text: 'text-yellow-300', border: 'border-yellow-500/50' },
        purple: { bg: 'bg-purple-900/40', text: 'text-purple-300', border: 'border-purple-500/50' },
    };
    
    return (
        <div className="bg-black/40 backdrop-blur-lg rounded-xl shadow-xl border border-gray-700/80 p-6 animate-fade-in-up">
            <h1 className="text-3xl font-bold mb-2 text-yellow-300">{t('title')}</h1>
            <p className="text-gray-400 mb-8">{t('description')}</p>

            {user.badges && user.badges.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {user.badges.map((badge, index) => {
                         const colors = colorClasses[badge.color as keyof typeof colorClasses] || colorClasses.purple;
                        return (
                             <div key={badge.id} className={`p-6 flex flex-col items-center justify-center text-center rounded-lg border transition-all duration-300 transform hover:scale-105 ${colors.bg} ${colors.border} opacity-0 animate-fade-in-up`} style={{ animationDelay: `${index * 100}ms` }}>
                                 <div className={`mb-4 ${colors.text}`}>
                                     <BadgeIcon icon={badge.icon} />
                                 </div>
                                <h3 className="font-bold text-lg text-gray-100">{badge.name}</h3>
                                <p className="text-xs text-gray-400 mt-1">{badge.description}</p>
                            </div>
                        )
                    })}
                </div>
            ) : (
                <div className="text-center py-12 text-gray-500">{t('noBadges')}</div>
            )}
        </div>
    );
};

export default Badges;
