import React from 'react';
import { AlertTriangleIcon } from './icons/AlertTriangleIcon';
import { TrendingUpIcon } from './icons/TrendingUpIcon';

interface PerformanceAlertsProps {
    language: string;
}

const translations = {
    title: { en: 'Performance Alerts', hi: 'प्रदर्शन अलर्ट' },
    description: { en: 'Recent notable changes in athlete performance metrics.', hi: 'एथलीट प्रदर्शन मेट्रिक्स में हाल के उल्लेखनीय परिवर्तन।' },
};

const mockAlerts = [
    { type: 'positive', athlete: 'Arjun Singh', metric: 'Sprint Speed', change: '+5%', message: 'Significant improvement in 100m sprint time over the last week.' },
    { type: 'negative', athlete: 'Isha Nair', metric: 'Free Throw %', change: '-8%', message: 'Noticeable drop in free throw accuracy during practice sessions.' },
    { type: 'positive', athlete: 'Priya Sharma', metric: 'Batting Average', change: '+12%', message: 'Consistent high scores in recent net sessions.' },
];

// A new icon would be needed for TrendingDownIcon, so we create a dummy one.
const TrendingDownIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline>
        <polyline points="17 18 23 18 23 12"></polyline>
    </svg>
);


const AlertIcon: React.FC<{ type: string }> = ({ type }) => {
    if (type === 'positive') {
        return <TrendingUpIcon className="w-6 h-6 text-green-400" />;
    }
    return <TrendingDownIcon className="w-6 h-6 text-red-400" />;
};


export default function PerformanceAlerts({ language }: PerformanceAlertsProps) {
    const t = (key: keyof typeof translations) => translations[key][language as 'en' | 'hi'] || translations[key].en;
    
    return (
        <div className="bg-black/40 backdrop-blur-lg rounded-xl shadow-xl border border-gray-700/80 p-6 animate-fade-in-up">
            <h1 className="text-3xl font-bold mb-2 text-red-300">{t('title')}</h1>
            <p className="text-gray-400 mb-8">{t('description')}</p>
            
            <div className="space-y-4">
                {mockAlerts.map((alert, index) => (
                    <div key={index} className="bg-gray-900/50 p-4 rounded-lg border-l-4 border-gray-700 flex items-start gap-4" style={{ borderColor: alert.type === 'positive' ? '#4ade80' : '#f87171' }}>
                        <AlertIcon type={alert.type} />
                        <div>
                            <p className="font-bold text-gray-100">{alert.athlete} - <span className={alert.type === 'positive' ? 'text-green-400' : 'text-red-400'}>{alert.metric} ({alert.change})</span></p>
                            <p className="text-sm text-gray-400">{alert.message}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
