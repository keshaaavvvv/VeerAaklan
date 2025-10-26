import React from 'react';
import { CloseIcon } from './icons/CloseIcon.tsx';
import { ShieldIcon } from './icons/ShieldIcon.tsx';
import { CalendarIcon } from './icons/CalendarIcon.tsx';
import { LightbulbIcon } from './icons/LightbulbIcon.tsx';

interface AuthorityDetailModalProps {
    authority: any;
    onClose: () => void;
    language: string;
}

const translations = {
    certifications: { en: 'Certifications Offered', hi: 'प्रस्तावित प्रमाणपत्र' },
    events: { en: 'Upcoming Events', hi: 'आगामी कार्यक्रम' },
    guidance: { en: 'Guidance Programs', hi: 'मार्गदर्शन कार्यक्रम' },
};

const AuthorityDetailModal: React.FC<AuthorityDetailModalProps> = ({ authority, onClose, language }) => {
    const lang = language as 'en' | 'hi';
    const t = (key: keyof typeof translations) => translations[key][lang] || translations[key].en;

    const DetailSection: React.FC<{ title: string, items: { en: string, hi: string }[], icon: React.ReactNode }> = ({ title, items, icon }) => (
        <div className="mt-4">
            <h4 className="font-semibold text-gray-200 flex items-center gap-3 mb-2 text-lg">
                <span className="text-cyan-400">{icon}</span>
                {title}
            </h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-400 pl-8">
                {items.map((item, index) => <li key={index}>{item[lang]}</li>)}
            </ul>
        </div>
    );

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
            <div className="bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl w-full max-w-2xl relative animate-slide-in-up max-h-[90vh] flex flex-col">
                <header className="p-6 border-b border-gray-700/80 flex items-start justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">{authority.name}</h2>
                        <p className="text-gray-400 text-sm mt-1">{authority.desc[lang]}</p>
                    </div>
                     <button onClick={onClose} className="p-2 rounded-full text-gray-400 hover:bg-gray-800 transition-colors flex-shrink-0 ml-4">
                        <CloseIcon className="w-6 h-6" />
                    </button>
                </header>
                <main className="p-6 overflow-y-auto">
                    <DetailSection title={t('certifications')} items={authority.certs} icon={<ShieldIcon className="w-5 h-5"/>} />
                    <DetailSection title={t('events')} items={authority.events} icon={<CalendarIcon className="w-5 h-5"/>} />
                    <DetailSection title={t('guidance')} items={authority.guidance} icon={<LightbulbIcon className="w-5 h-5"/>} />
                </main>
            </div>
        </div>
    );
};

export default AuthorityDetailModal;
