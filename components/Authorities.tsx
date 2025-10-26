import React, { useState } from 'react';
import { ShieldIcon } from './icons/ShieldIcon';
import { CalendarIcon } from './icons/CalendarIcon';
import { LightbulbIcon } from './icons/LightbulbIcon';
import AuthorityDetailModal from './AuthorityDetailModal.tsx';


interface AuthoritiesProps {
    language: string;
}

const translations = {
    title: { en: 'Sports Authorities', hi: 'खेल अधिकारी' },
    description: { en: 'Information on certifications, guidance, and events from national and international sports governing bodies.', hi: 'राष्ट्रीय और अंतरराष्ट्रीय खेल शासी निकायों से प्रमाणपत्र, मार्गदर्शन और घटनाओं की जानकारी।' },
    certifications: { en: 'Certifications Offered', hi: 'प्रस्तावित प्रमाणपत्र' },
    events: { en: 'Upcoming Events', hi: 'आगामी कार्यक्रम' },
    guidance: { en: 'Guidance Programs', hi: 'मार्गदर्शन कार्यक्रम' },
    viewDetails: { en: 'View Details', hi: 'विवरण देखें' },
};

const authoritiesData = [
    {
        id: 'sai',
        name: 'Sports Authority of India (SAI)',
        logoUrl: 'https://aniportalimages.s3.amazonaws.com/media/details/SAI_logo20220616144825.jpg',
        desc: {
            en: 'The apex national sports body for the development of sports in India.',
            hi: 'भारत में खेलों के विकास के लिए शीर्ष राष्ट्रीय खेल निकाय।',
        },
        certs: [
            { en: 'National Coaching Certification', hi: 'राष्ट्रीय कोचिंग प्रमाणन' },
            { en: 'Sports Science Diploma', hi: 'खेल विज्ञान डिप्लोमा' },
        ],
        events: [
            { en: 'Khelo India Youth Games', hi: 'खेलो इंडिया यूथ गेम्स' },
            { en: 'National Sports Awards', hi: 'राष्ट्रीय खेल पुरस्कार' },
        ],
        guidance: [
            { en: 'Talent Identification & Development', hi: 'प्रतिभा पहचान और विकास' },
            { en: 'Athlete Support Programs', hi: 'एथलीट सहायता कार्यक्रम' },
        ]
    },
    {
        id: 'bcci',
        name: 'Board of Control for Cricket in India (BCCI)',
        desc: {
            en: 'The governing body for cricket in India.',
            hi: 'भारत में क्रिकेट के लिए शासी निकाय।',
        },
        certs: [
            { en: 'Umpiring & Scoring Certification', hi: 'अंपायरिंग और स्कोरिंग प्रमाणन' },
            { en: 'Level 1 Coaching Course', hi: 'स्तर 1 कोचिंग कोर्स' },
        ],
        events: [
            { en: 'Indian Premier League (IPL)', hi: 'इंडियन प्रीमियर लीग (आईपीएल)' },
            { en: 'Ranji Trophy', hi: 'रणजी ट्रॉफी' },
        ],
        guidance: [
            { en: 'National Cricket Academy (NCA)', hi: 'राष्ट्रीय क्रिकेट अकादमी (एनसीए)' },
            { en: 'Grassroots Development Programs', hi: 'जमीनी स्तर के विकास कार्यक्रम' },
        ]
    },
    {
        id: 'aiff',
        name: 'All India Football Federation (AIFF)',
        desc: {
            en: 'The organization that manages association football in India.',
            hi: 'भारत में एसोसिएशन फुटबॉल का प्रबंधन करने वाला संगठन।',
        },
        certs: [
            { en: 'AIFF D-License Coaching Course', hi: 'एआईएफएफ डी-लाइसेंस कोचिंग कोर्स' },
            { en: 'Refereeing Certification', hi: 'रेफरीिंग प्रमाणन' },
        ],
        events: [
            { en: 'Indian Super League (ISL)', hi: 'इंडियन सुपर लीग (आईएसएल)' },
            { en: 'Santosh Trophy', hi: 'संतोष ट्रॉफी' },
        ],
        guidance: [
            { en: 'Youth Development Leagues', hi: 'युवा विकास लीग' },
            { en: 'Scouting Network Programs', hi: 'स्काउटिंग नेटवर्क कार्यक्रम' },
        ]
    },
    {
        id: 'bfi',
        name: 'Boxing Federation of India (BFI)',
        desc: {
            en: 'The governing body for amateur boxing in India.',
            hi: 'भारत में शौकिया मुक्केबाजी के लिए शासी निकाय।',
        },
        certs: [
            { en: '1-Star Coach Certification', hi: '1-स्टार कोच प्रमाणन' },
            { en: 'Ringside Physician Course', hi: 'रिंगसाइड फिजिशियन कोर्स' },
        ],
        events: [
            { en: 'National Boxing Championships', hi: 'राष्ट्रीय मुक्केबाजी चैंपियनशिप' },
            { en: 'Youth National Tournaments', hi: 'युवा राष्ट्रीय टूर्नामेंट' },
        ],
        guidance: [
            { en: 'National Training Camps', hi: 'राष्ट्रीय प्रशिक्षण शिविर' },
            { en: 'Athlete Mentorship Programs', hi: 'एथलीट मेंटरशिप कार्यक्रम' },
        ]
    },
    {
        id: 'sfi',
        name: 'Swimming Federation of India (SFI)',
        desc: {
            en: 'The national governing body for aquatics in India.',
            hi: 'भारत में जलीय खेलों के लिए राष्ट्रीय शासी निकाय।',
        },
        certs: [
            { en: 'Level 1 Swim Coach Certification', hi: 'स्तर 1 तैराकी कोच प्रमाणन' },
            { en: 'Official/Timekeeper Course', hi: 'अधिकारी/टाइमकीपर कोर्स' },
        ],
        events: [
            { en: 'National Aquatic Championships', hi: 'राष्ट्रीय जलीय चैंपियनशिप' },
            { en: 'Junior National Swimming Meet', hi: 'जूनियर राष्ट्रीय तैराकी मीट' },
        ],
        guidance: [
            { en: 'Long-Term Athlete Development Plan', hi: 'दीर्घकालिक एथलीट विकास योजना' },
            { en: 'Para-Swimming Development', hi: 'पैरा-तैराकी विकास' },
        ]
    },
     {
        id: 'usab',
        name: 'USA Basketball',
        desc: {
            en: 'The national governing body for basketball in the United States.',
            hi: 'संयुक्त राज्य अमेरिका में बास्केटबॉल के लिए राष्ट्रीय शासी निकाय।',
        },
        certs: [
            { en: 'Coach License Program', hi: 'कोच लाइसेंस कार्यक्रम' },
            { en: 'Gold Level Coaching Certification', hi: 'गोल्ड लेवल कोचिंग प्रमाणन' },
        ],
        events: [
            { en: 'National Team Trials', hi: 'राष्ट्रीय टीम ट्रायल' },
            { en: '3x3 National Championship', hi: '3x3 राष्ट्रीय चैम्पियनशिप' },
        ],
        guidance: [
            { en: 'Youth Development Guidelines', hi: 'युवा विकास दिशानिर्देश' },
            { en: 'Player Development Camps', hi: 'खिलाड़ी विकास शिविर' },
        ]
    },
];

const Authorities: React.FC<AuthoritiesProps> = ({ language }) => {
    const lang = language as 'en' | 'hi';
    const t = (key: keyof typeof translations) => translations[key][lang] || translations[key].en;
    const [selectedAuthority, setSelectedAuthority] = useState<any | null>(null);

    return (
        <>
            <div className="bg-black/40 backdrop-blur-lg rounded-xl shadow-xl border border-gray-700/80 p-6 animate-fade-in-up">
                <h1 className="text-3xl font-bold mb-2 text-cyan-300">{t('title')}</h1>
                <p className="text-gray-400 mb-8">{t('description')}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {authoritiesData.map((authority, index) => (
                        <div 
                            key={authority.id} 
                            className="bg-gray-900/50 p-6 rounded-lg border border-gray-700/80 flex flex-col transition-all duration-300 hover:border-cyan-500/70 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/10 opacity-0 animate-fade-in-up" 
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                             {authority.logoUrl && (
                                <div className="flex justify-center items-center h-20 mb-4 bg-white/10 rounded-md p-2">
                                    <img src={authority.logoUrl} alt={`${authority.name} logo`} className="max-h-full object-contain" />
                                </div>
                            )}
                            <h3 className={`text-xl font-bold text-gray-100 ${authority.logoUrl ? 'text-center' : ''}`}>{authority.name}</h3>
                            <p className={`text-gray-400 text-sm mt-1 mb-4 flex-grow ${authority.logoUrl ? 'text-center' : ''}`}>{authority.desc[lang]}</p>
                            
                            <div className="mt-auto pt-4 border-t border-gray-700/50">
                                <button
                                    onClick={() => setSelectedAuthority(authority)}
                                    className="w-full bg-cyan-600/80 hover:bg-cyan-700 text-white font-semibold py-2 px-4 rounded-md text-sm transition shine-effect"
                                >
                                    {t('viewDetails')}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {selectedAuthority && (
                <AuthorityDetailModal 
                    authority={selectedAuthority} 
                    onClose={() => setSelectedAuthority(null)} 
                    language={language}
                />
            )}
        </>
    );
};

export default Authorities;