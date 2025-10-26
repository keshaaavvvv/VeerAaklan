import React, { useState, useEffect } from 'react';
import { HeartPulseIcon } from './icons/HeartPulseIcon.tsx';
import { PlusIcon } from './icons/PlusIcon.tsx';
import { MinusIcon } from './icons/MinusIcon.tsx';
import { AwardIcon } from './icons/AwardIcon.tsx';
import { SparklesIcon } from './icons/SparklesIcon.tsx';
import { SpinnerIcon } from './icons/SpinnerIcon.tsx';
import WellnessChart from './WellnessChart.tsx';
import { analyzeWellnessData } from '../services/geminiService.ts';
import type { WellnessEntry } from '../types.ts';

const translations = {
    title: { en: 'Daily Wellness Tracker', hi: 'दैनिक वेलनेस ट्रैकर' },
    description: { en: "Log your daily metrics to track your well-being and performance over time.", hi: 'समय के साथ अपनी भलाई और प्रदर्शन को ट्रैक करने के लिए अपने दैनिक मेट्रिक्स लॉग करें।' },
    sleep: { en: 'Hours of Sleep', hi: 'नींद के घंटे' },
    hydration: { en: 'Hydration (Liters)', hi: 'हाइड्रेशन (लीटर)' },
    mood: { en: 'Mood', hi: 'मनोदशा' },
    logEntry: { en: 'Log Entry', hi: 'एंट्री लॉग करें' },
    moods: {
        en: ['Great', 'Good', 'Okay', 'Bad', 'Awful'],
        hi: ['बहुत अच्छा', 'अच्छा', 'ठीक है', 'खराब', 'बहुत खराब']
    },
    mentorshipTitle: { en: 'Coach Mentorship', hi: 'कोच मेंटरशिप' },
    mentorshipDesc: { en: 'Get personalized mentorship and suggestions from an AI coach based on your logged data.', hi: 'अपने लॉग किए गए डेटा के आधार पर एआई कोच से व्यक्तिगत मार्गदर्शन और सुझाव प्राप्त करें।' },
    analyzeButton: { en: 'Analyze My Wellness', hi: 'मेरे वेलनेस का विश्लेषण करें' },
    analyzingButton: { en: 'Analyzing...', hi: 'विश्लेषण हो रहा है...' },
};

const moodEmojis = ['😄', '😊', '😐', '😕', '😩'];

const mockHistory: WellnessEntry[] = [
    { date: 'Mon', sleep: 7.5, hydration: 2.5, mood: 1 },
    { date: 'Tue', sleep: 6, hydration: 2.0, mood: 2 },
    { date: 'Wed', sleep: 8, hydration: 3.0, mood: 0 },
    { date: 'Thu', sleep: 7, hydration: 2.8, mood: 1 },
    { date: 'Fri', sleep: 8.5, hydration: 3.5, mood: 0 },
    { date: 'Sat', sleep: 9, hydration: 3.2, mood: 0 },
    { date: 'Sun', sleep: 6.5, hydration: 2.2, mood: 2 },
];


interface PersonalTrackerProps {
    language: string;
}

const PersonalTracker: React.FC<PersonalTrackerProps> = ({ language }) => {
    const lang = language as 'en' | 'hi';
    const t = (key: Exclude<keyof typeof translations, 'moods'>) => translations[key][lang] || translations[key].en;
    const t_moods = translations.moods[lang] || translations.moods.en;
    
    const [sleep, setSleep] = useState(8);
    const [hydration, setHydration] = useState(2.5);
    const [mood, setMood] = useState(0);

    const [logHistory, setLogHistory] = useState<WellnessEntry[]>(() => {
        const savedHistory = localStorage.getItem('wellnessHistory');
        return savedHistory ? JSON.parse(savedHistory) : mockHistory;
    });
    const [dayCounter, setDayCounter] = useState<number>(() => {
        const savedCounter = localStorage.getItem('wellnessDayCounter');
        return savedCounter ? JSON.parse(savedCounter) : mockHistory.length + 1;
    });
    
    const [analysis, setAnalysis] = useState<string | null>(() => {
        return localStorage.getItem('wellnessAnalysis');
    });
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisError, setAnalysisError] = useState<string | null>(null);

    useEffect(() => {
        localStorage.setItem('wellnessHistory', JSON.stringify(logHistory));
    }, [logHistory]);

    useEffect(() => {
        localStorage.setItem('wellnessDayCounter', JSON.stringify(dayCounter));
    }, [dayCounter]);

    useEffect(() => {
        if (analysis) {
            localStorage.setItem('wellnessAnalysis', analysis);
        } else {
            localStorage.removeItem('wellnessAnalysis');
        }
    }, [analysis]);


    const handleLog = () => {
        const newEntry: WellnessEntry = {
            date: `Day ${dayCounter}`,
            sleep,
            hydration,
            mood,
        };
        setLogHistory(prev => [...prev.slice(-6), newEntry]);
        setDayCounter(prev => prev + 1);
    };

    const handleAnalysis = async () => {
        setIsAnalyzing(true);
        setAnalysis(null);
        setAnalysisError(null);
        try {
            const result = await analyzeWellnessData(logHistory);
            setAnalysis(result);
        } catch (err) {
            setAnalysisError(err instanceof Error ? err.message : "An unknown error occurred.");
        } finally {
            setIsAnalyzing(false);
        }
    };

    return (
        <div className="space-y-8 animate-fade-in-up">
            <div className="bg-black/40 backdrop-blur-lg rounded-xl shadow-xl border border-gray-700/80 p-6">
                <div className="flex items-center gap-4 mb-2">
                    <HeartPulseIcon className="w-8 h-8 text-pink-400" />
                    <h1 className="text-3xl font-bold text-pink-300">{t('title')}</h1>
                </div>
                <p className="text-gray-400 mb-8">{t('description')}</p>

                <div className="space-y-8">
                    <TrackerControl 
                        label={t('sleep')} 
                        value={sleep} 
                        setValue={setSleep}
                        step={0.5} 
                        unit="hrs" 
                        min={0}
                        max={12}
                    />
                    
                    <TrackerControl 
                        label={t('hydration')} 
                        value={hydration} 
                        setValue={setHydration}
                        step={0.25} 
                        unit="L" 
                        min={0}
                        max={6}
                    />

                    <div>
                        <h3 className="text-lg font-semibold text-gray-200 mb-4">{t('mood')}</h3>
                        <div className="flex justify-between items-center space-x-2">
                            {moodEmojis.map((emoji, index) => (
                                <button 
                                    key={index}
                                    onClick={() => setMood(index)}
                                    className={`flex-1 flex flex-col items-center p-3 rounded-lg transition-all transform hover:scale-110 ${mood === index ? 'bg-purple-600' : 'bg-gray-800/50'}`}
                                >
                                    <span className="text-4xl">{emoji}</span>
                                    <span className={`mt-2 text-xs font-medium ${mood === index ? 'text-white' : 'text-gray-400'}`}>
                                        {t_moods[index]}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="border-t border-gray-700/50 pt-6">
                        <button 
                            onClick={handleLog}
                            className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition shine-effect">
                            <AwardIcon className="w-5 h-5" />
                            {t('logEntry')}
                        </button>
                    </div>
                </div>
            </div>

            <WellnessChart data={logHistory} language={language} />

            <div className="bg-black/40 backdrop-blur-lg rounded-xl shadow-xl border border-gray-700/80 p-6">
                <div className="flex items-center gap-4 mb-4">
                    <SparklesIcon className="w-8 h-8 text-indigo-400" />
                    <h2 className="text-2xl font-bold text-indigo-300">{t('mentorshipTitle')}</h2>
                </div>
                <p className="text-gray-400 mb-6">{t('mentorshipDesc')}</p>
                
                <button
                    onClick={handleAnalysis}
                    disabled={isAnalyzing}
                    className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition shine-effect disabled:bg-indigo-400/50 disabled:cursor-not-allowed"
                >
                    {isAnalyzing ? (
                        <SpinnerIcon className="w-5 h-5 animate-spin" />
                    ) : (
                        <SparklesIcon className="w-5 h-5" />
                    )}
                    <span>{isAnalyzing ? t('analyzingButton') : t('analyzeButton')}</span>
                </button>

                {analysis && (
                    <div className="mt-6 p-4 bg-gray-900/50 rounded-lg border border-gray-700 animate-fade-in-up">
                        <p className="text-gray-300 whitespace-pre-wrap">{analysis}</p>
                    </div>
                )}
                {analysisError && (
                     <div className="mt-6 p-4 bg-red-900/30 rounded-lg text-red-400 text-sm">
                        {analysisError}
                     </div>
                )}
            </div>

        </div>
    );
};

interface TrackerControlProps {
    label: string;
    value: number;
    setValue: (value: number) => void;
    step: number;
    unit: string;
    min: number;
    max: number;
}

const TrackerControl: React.FC<TrackerControlProps> = ({ label, value, setValue, step, unit, min, max }) => {
    const increment = () => setValue(Math.min(max, value + step));
    const decrement = () => setValue(Math.max(min, value - step));

    return (
        <div>
            <h3 className="text-lg font-semibold text-gray-200 mb-3">{label}</h3>
            <div className="flex items-center justify-between bg-gray-900/50 p-4 rounded-lg">
                <button onClick={decrement} className="p-2 rounded-full bg-gray-700 text-white hover:bg-gray-600"><MinusIcon className="w-6 h-6"/></button>
                <span className="text-3xl font-bold text-purple-300">{value.toFixed(2)} <span className="text-lg text-gray-400">{unit}</span></span>
                <button onClick={increment} className="p-2 rounded-full bg-gray-700 text-white hover:bg-gray-600"><PlusIcon className="w-6 h-6"/></button>
            </div>
        </div>
    );
}

export default PersonalTracker;