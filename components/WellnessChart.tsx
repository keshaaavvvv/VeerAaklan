import React from 'react';
import type { WellnessEntry } from '../types.ts';
import { BarChartIcon } from './icons/BarChartIcon.tsx';

interface WellnessChartProps {
    data: WellnessEntry[];
    language: string;
}

const translations = {
    title: { en: 'Wellness History', hi: 'वेलनेस इतिहास' },
    sleep: { en: 'Sleep', hi: 'नींद' },
    hydration: { en: 'Hydration', hi: 'हाइड्रेशन' },
    mood: { en: 'Mood', hi: 'मनोदशा' },
    hours: { en: 'h', hi: 'घं' },
    liters: { en: 'L', hi: 'ली' },
};

const WellnessChart: React.FC<WellnessChartProps> = ({ data, language }) => {
    const lang = language as 'en' | 'hi';
    const t = (key: keyof typeof translations) => translations[key][lang] || translations[key].en;
    
    const maxSleep = Math.max(12, ...data.map(d => d.sleep));
    const maxHydration = Math.max(6, ...data.map(d => d.hydration));
    const maxMood = 4; // 0-4 scale

    interface ChartSectionProps {
        title: string;
        metricData: { date: string; value: number }[];
        maxVal: number;
        unit: string;
        color: string;
    }

    const ChartSection: React.FC<ChartSectionProps> = ({ title, metricData, maxVal, unit, color }) => (
        <div>
            <h3 className="text-lg font-semibold text-gray-200 mb-3">{title}</h3>
            <div className="flex items-end justify-around bg-gray-900/50 p-4 rounded-lg h-40 border-b-2 border-gray-600">
                {metricData.map((entry) => (
                    <div key={entry.date} className="flex flex-col items-center w-1/12 h-full" title={`${entry.value.toFixed(1)}${unit}`}>
                         <div className="relative flex-grow w-full flex items-end justify-center">
                            <div
                                className={`${color} w-full rounded-t-md transition-all duration-500 ease-out`}
                                style={{ height: maxVal > 0 ? `${(entry.value / maxVal) * 100}%` : '0%' }}
                            ></div>
                        </div>
                        <span className="text-xs text-gray-400 mt-2">{entry.date}</span>
                    </div>
                ))}
            </div>
        </div>
    );
    
    return (
        <div className="bg-black/40 backdrop-blur-lg rounded-xl shadow-xl border border-gray-700/80 p-6 animate-fade-in-up">
            <div className="flex items-center gap-4 mb-4">
                <BarChartIcon className="w-8 h-8 text-cyan-400" />
                <h2 className="text-2xl font-bold text-cyan-300">{t('title')}</h2>
            </div>
            <div className="space-y-8">
                <ChartSection
                    title={t('sleep')}
                    metricData={data.map(d => ({ date: d.date, value: d.sleep }))}
                    maxVal={maxSleep}
                    unit={t('hours')}
                    color="bg-purple-500"
                />
                <ChartSection
                    title={t('hydration')}
                    metricData={data.map(d => ({ date: d.date, value: d.hydration }))}
                    maxVal={maxHydration}
                    unit={t('liters')}
                    color="bg-blue-500"
                />
                <ChartSection
                    title={t('mood')}
                    // Invert mood so a higher bar is better (0=Great -> 4, 4=Awful -> 0)
                    metricData={data.map(d => ({ date: d.date, value: 4 - d.mood }))}
                    maxVal={maxMood}
                    unit=""
                    color="bg-green-500"
                />
            </div>
        </div>
    );
};

export default WellnessChart;