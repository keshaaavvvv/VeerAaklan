import React, { useState, useEffect } from 'react';
import type { ExerciseAnalysis, JointFeedback } from '../types.ts';
import { analyzeExerciseVideo } from '../services/geminiService.ts';
import { VideoIcon } from './icons/VideoIcon.tsx';
import { UploadCloudIcon } from './icons/UploadCloudIcon.tsx';
import { SpinnerIcon } from './icons/SpinnerIcon.tsx';
import { CheckIcon } from './icons/CheckIcon.tsx';
import { AlertTriangleIcon } from './icons/AlertTriangleIcon.tsx';
import { YouTubeIcon } from './icons/YouTubeIcon.tsx';
import { LightbulbIcon } from './icons/LightbulbIcon.tsx';
import { BarChartIcon } from './icons/BarChartIcon.tsx';
import { RulerIcon } from './icons/RulerIcon.tsx';
import { ShieldIcon } from './icons/ShieldIcon.tsx';
import { ClockIcon } from './icons/ClockIcon.tsx';
import { UserIcon } from './icons/UserIcon.tsx';
import { PencilIcon } from './icons/PencilIcon.tsx';


interface VideoAnalysisProps {
    language: string;
}

const translations = {
    title: { en: 'AI Performance Analysis', hi: 'एआई प्रदर्शन विश्लेषण' },
    description: { en: 'Upload a video, describe the context, and select the movement type to get detailed feedback on your form and posture.', hi: 'अपने फॉर्म और मुद्रा पर विस्तृत प्रतिक्रिया प्राप्त करने के लिए एक वीडियो अपलोड करें, संदर्भ का वर्णन करें और मूवमेंट का प्रकार चुनें।' },
    uploadTitle: { en: 'Upload your video', hi: 'अपना वीडियो अपलोड करें' },
    selectExercise: { en: 'Select Exercise', hi: 'व्यायाम चुनें' },
    uploadButton: { en: 'Select a file', hi: 'एक फ़ाइल चुनें' },
    fileSelected: { en: 'File selected:', hi: 'फ़ाइल चयनित:' },
    analyzeButton: { en: 'Analyze Performance', hi: 'प्रदर्शन का विश्लेषण करें' },
    analyzing: { en: 'Analyzing...', hi: 'विश्लेषण हो रहा है...' },
    analysisError: { en: 'Analysis Failed', hi: 'विश्लेषण विफल रहा' },
    overallSummary: { en: 'Overall Summary', hi: 'समग्र सारांश' },
    strengths: { en: 'Strengths', hi: 'खूबियाँ' },
    improvements: { en: 'Areas for Improvement', hi: 'सुधार के क्षेत्र' },
    recommendations: { en: 'Recommended Videos', hi: 'अनुशंसित वीडियो' },
    keyMetrics: { en: 'Key Metrics', hi: 'प्रमुख मेट्रिक्स' },
    jointAnalysis: { en: 'Joint-by-Joint Analysis', hi: 'जोड़-दर-जोड़ विश्लेषण' },
    rom: { en: 'Range of Motion', hi: 'गति की सीमा' },
    stability: { en: 'Stability', hi: 'स्थिरता' },
    tempo: { en: 'Tempo', hi: 'गति' },
    formScore: { en: 'Form Score', hi: 'फॉर्म स्कोर' },
    describeVideo: { en: 'Describe your video', hi: 'अपने वीडियो का वर्णन करें' },
    describeVideoPlaceholder: { en: 'e.g., "This is my third set of 5 reps. I feel my lower back straining a bit."', hi: 'उदा., "यह 5 रेप्स का मेरा तीसरा सेट है। मुझे अपनी पीठ के निचले हिस्से में थोड़ा खिंचाव महसूस हो रहा है।"' },
};

const loadingMessages = [
    'Analyzing your form...',
    'Checking posture alignment...',
    'Evaluating joint angles...',
    'Identifying key movements...',
    'Compiling feedback...'
];

const exercises = [
    { id: 'squat', name: 'Squat' },
    { id: 'pushup', name: 'Push-up' },
    { id: 'deadlift', name: 'Deadlift' },
];

export default function VideoAnalysis({ language }: VideoAnalysisProps) {
    const lang = language as 'en' | 'hi';
    const t = (key: keyof typeof translations) => translations[key][lang] || translations[key].en;

    const [videoFile, setVideoFile] = useState<File | null>(null);
    const [exerciseType, setExerciseType] = useState<string>('');
    const [videoDescription, setVideoDescription] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const [analysis, setAnalysis] = useState<ExerciseAnalysis | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loadingMessage, setLoadingMessage] = useState(loadingMessages[0]);
    
    useEffect(() => {
        let interval: number;
        if (isLoading) {
            interval = window.setInterval(() => {
                setLoadingMessage(prev => {
                    const currentIndex = loadingMessages.indexOf(prev);
                    const nextIndex = (currentIndex + 1) % loadingMessages.length;
                    return loadingMessages[nextIndex];
                });
            }, 2500);
        }
        return () => window.clearInterval(interval);
    }, [isLoading]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setVideoFile(e.target.files[0]);
            setAnalysis(null);
            setError(null);
        }
    };

    const handleAnalyze = async () => {
        if (!videoFile || !exerciseType || !videoDescription.trim()) return;

        setIsLoading(true);
        setError(null);
        setAnalysis(null);

        try {
            const result = await analyzeExerciseVideo(videoDescription, exerciseType);
            setAnalysis(result);
        } catch (err) {
            setError(err instanceof Error ? err.message : "An unknown error occurred.");
        } finally {
            setIsLoading(false);
        }
    };

    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="text-center p-8">
                    <SpinnerIcon className="w-16 h-16 text-purple-500 mx-auto animate-spin" />
                    <h3 className="mt-4 text-xl font-semibold text-gray-200">{t('analyzing')}</h3>
                    <p className="text-gray-400 mt-2">{loadingMessage}</p>
                </div>
            );
        }

        if (error) {
            return (
                <div className="p-8 bg-red-900/30 rounded-lg text-center">
                    <h3 className="text-xl font-bold text-red-400">{t('analysisError')}</h3>
                    <p className="text-red-400/80 mt-2">{error}</p>
                </div>
            );
        }
        
        if (analysis) {
            return (
                <div className="space-y-8 p-1 animate-fade-in-up">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                        <div className="lg:col-span-1 flex flex-col items-center">
                            <ScoreGauge score={analysis.overallScore} />
                            <h3 className="mt-4 text-xl font-bold text-gray-200">{t('formScore')}</h3>
                        </div>
                        <div className="lg:col-span-2">
                            <AnalysisSection icon={<LightbulbIcon className="w-6 h-6 text-indigo-400"/>} title={t('overallSummary')}>
                                <p className="text-gray-300">{analysis.overallSummary}</p>
                            </AnalysisSection>
                        </div>
                    </div>
                    
                    <AnalysisSection icon={<BarChartIcon className="w-6 h-6 text-cyan-400"/>} title={t('keyMetrics')}>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <PerformanceMetricItem icon={<RulerIcon className="w-6 h-6"/>} label={t('rom')} value={analysis.performanceMetrics.rangeOfMotion}/>
                            <PerformanceMetricItem icon={<ShieldIcon className="w-6 h-6"/>} label={t('stability')} value={analysis.performanceMetrics.stability}/>
                            <PerformanceMetricItem icon={<ClockIcon className="w-6 h-6"/>} label={t('tempo')} value={analysis.performanceMetrics.tempo}/>
                        </div>
                    </AnalysisSection>

                    <AnalysisSection icon={<UserIcon className="w-6 h-6 text-teal-400"/>} title={t('jointAnalysis')}>
                        <div className="space-y-3">
                            {analysis.jointSpecificFeedback.map((item, i) => <JointFeedbackItem key={i} feedback={item}/>)}
                        </div>
                    </AnalysisSection>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <AnalysisSection icon={<CheckIcon className="w-6 h-6 text-green-400"/>} title={t('strengths')}>
                            <ul className="space-y-2 list-inside list-disc text-gray-300">
                                {analysis.pros.map((pro, i) => <li key={i}>{pro}</li>)}
                            </ul>
                        </AnalysisSection>
                        <AnalysisSection icon={<AlertTriangleIcon className="w-6 h-6 text-yellow-400"/>} title={t('improvements')}>
                             <ul className="space-y-2 list-inside list-disc text-gray-300">
                                {analysis.cons.map((con, i) => <li key={i}>{con}</li>)}
                            </ul>
                        </AnalysisSection>
                    </div>

                     <AnalysisSection icon={<YouTubeIcon className="w-6 h-6 text-red-500"/>} title={t('recommendations')}>
                        <div className="space-y-4">
                            {analysis.videoSuggestions.map((vid, i) => (
                                <a href={vid.url} target="_blank" rel="noopener noreferrer" key={i} className="flex items-center gap-4 p-3 bg-gray-900/50 rounded-lg hover:bg-gray-800/80 transition-all group border border-transparent hover:border-purple-500/50">
                                    <div className="flex-shrink-0 w-28 h-20 bg-black rounded-md flex items-center justify-center overflow-hidden">
                                        <YouTubeIcon className="w-10 h-10 text-red-600/70 group-hover:text-red-500 group-hover:scale-110 transition-all" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-gray-100 group-hover:text-purple-300 transition-colors">{vid.title}</h4>
                                        <p className="text-sm text-gray-400 mt-1">{vid.description}</p>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </AnalysisSection>
                </div>
            );
        }

        return null;
    }


    return (
        <div className="bg-black/40 backdrop-blur-lg rounded-xl shadow-xl border border-gray-700/80 p-6 space-y-6 animate-fade-in-up">
            <header>
                <div className="flex items-center gap-4">
                    <VideoIcon className="w-8 h-8 text-purple-400" />
                    <h1 className="text-3xl font-bold text-purple-300">{t('title')}</h1>
                </div>
                <p className="text-gray-400 mt-2">{t('description')}</p>
            </header>

            {!analysis && (
                <div className="border-t border-gray-700 pt-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center flex flex-col justify-center">
                            <UploadCloudIcon className="w-12 h-12 mx-auto text-gray-500" />
                            <h2 className="mt-4 text-xl font-semibold text-gray-200">{t('uploadTitle')}</h2>
                            <input type="file" id="video-upload" className="hidden" accept="video/*" onChange={handleFileChange} />
                            <label htmlFor="video-upload" className="mt-4 inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition shine-effect cursor-pointer">
                                {t('uploadButton')}
                            </label>
                             {videoFile && <p className="text-gray-400 text-sm mt-3">{t('fileSelected')} <span className="font-medium text-purple-300">{videoFile.name}</span></p>}
                        </div>
                        <div className="bg-gray-900/50 rounded-lg p-8 flex flex-col justify-center">
                             <label htmlFor="exercise-select" className="text-lg font-semibold text-gray-200 mb-3">{t('selectExercise')}</label>
                             <select 
                                id="exercise-select"
                                value={exerciseType}
                                onChange={(e) => setExerciseType(e.target.value)}
                                className="w-full bg-gray-800/80 border border-gray-600 rounded-md py-3 px-4 text-gray-200 focus:ring-2 focus:ring-purple-500 focus:outline-none appearance-none"
                            >
                                <option value="" disabled>{t('selectExercise')}...</option>
                                {exercises.map(ex => <option key={ex.id} value={ex.id}>{ex.name}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="bg-gray-900/50 rounded-lg p-6">
                         <label htmlFor="video-description" className="text-lg font-semibold text-gray-200 mb-3 flex items-center gap-2">
                            <PencilIcon className="w-5 h-5" />
                            {t('describeVideo')}
                        </label>
                        <textarea
                            id="video-description"
                            value={videoDescription}
                            onChange={(e) => setVideoDescription(e.target.value)}
                            placeholder={t('describeVideoPlaceholder')}
                            className="w-full bg-gray-800/80 border border-gray-600 rounded-md py-3 px-4 text-gray-200 focus:ring-2 focus:ring-purple-500 focus:outline-none resize-none"
                            rows={3}
                        />
                    </div>

                    {videoFile && exerciseType && videoDescription.trim() && (
                        <div className="mt-4 text-center">
                            <button
                                onClick={handleAnalyze}
                                disabled={isLoading}
                                className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition shine-effect disabled:bg-green-400/50 disabled:cursor-not-allowed"
                            >
                                {t('analyzeButton')}
                            </button>
                        </div>
                    )}
                </div>
            )}
            
            {renderContent()}

        </div>
    );
}

const AnalysisSection: React.FC<{title: string; icon: React.ReactNode; children: React.ReactNode}> = ({ title, icon, children }) => (
    <div className="bg-black/20 p-6 rounded-xl border border-gray-700/80">
        <h3 className="flex items-center gap-3 text-xl font-bold text-gray-100 mb-4">
            {icon}
            <span>{title}</span>
        </h3>
        {children}
    </div>
);

const ScoreGauge: React.FC<{ score: number }> = ({ score }) => {
    const getScoreColor = () => {
        if (score >= 85) return 'text-green-400';
        if (score >= 60) return 'text-yellow-400';
        return 'text-red-400';
    };

    const circumference = 2 * Math.PI * 52; // 2 * pi * radius
    const offset = circumference - (score / 100) * circumference;

    return (
        <div className="relative w-48 h-48">
            <svg className="w-full h-full" viewBox="0 0 120 120">
                <circle className="text-gray-700" strokeWidth="10" stroke="currentColor" fill="transparent" r="52" cx="60" cy="60" />
                <circle
                    className={`${getScoreColor()} transition-all duration-1000 ease-out`}
                    strokeWidth="10"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="52"
                    cx="60"
                    cy="60"
                    transform="rotate(-90 60 60)"
                />
            </svg>
            <span className={`absolute inset-0 flex items-center justify-center text-4xl font-bold ${getScoreColor()}`}>
                {score}
            </span>
        </div>
    );
};

const PerformanceMetricItem: React.FC<{icon: React.ReactNode, label: string, value: number}> = ({ icon, label, value }) => {
    const percentage = value * 10;
    const getColor = (val: number) => {
        if (val >= 8) return 'bg-green-500';
        if (val >= 5) return 'bg-yellow-500';
        return 'bg-red-500';
    };

    return (
        <div className="bg-gray-900/50 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                    <div className="text-purple-400">{icon}</div>
                    <p className="text-base font-semibold text-gray-300">{label}</p>
                </div>
                <p className="text-xl font-bold text-white">{value}<span className="text-sm text-gray-400">/10</span></p>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div 
                    className={`${getColor(value)} h-2.5 rounded-full transition-all duration-500 ease-out`} 
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>
        </div>
    );
};

const JointFeedbackItem: React.FC<{feedback: JointFeedback}> = ({ feedback }) => {
    const ratingStyles = {
        good: { color: 'bg-green-500', text: 'Good' },
        average: { color: 'bg-yellow-500', text: 'Average' },
        poor: { color: 'bg-red-500', text: 'Poor' },
    };
    const style = ratingStyles[feedback.rating] || ratingStyles.average;

    return (
        <div className="flex items-start gap-4 p-3 bg-gray-900/50 rounded-lg">
            <div className={`w-3 h-3 mt-1.5 rounded-full flex-shrink-0 ${style.color}`}></div>
            <div className="flex-1">
                <h4 className="font-semibold text-gray-200">{feedback.joint}</h4>
                <p className="text-sm text-gray-400">{feedback.feedback}</p>
            </div>
        </div>
    );
};