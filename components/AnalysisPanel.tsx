import React from 'react';
// Fix: Use explicit '.ts' extension for module import.
import type { User, AIAnalysis } from '../types.ts';
import { SpinnerIcon } from './icons/SpinnerIcon.tsx';
import { RobotIcon } from './icons/RobotIcon.tsx';
import { CheckIcon } from './icons/CheckIcon.tsx';
import { LightbulbIcon } from './icons/LightbulbIcon.tsx';
import { TrendingUpIcon } from './icons/TrendingUpIcon.tsx';
import { MessageSquareIcon } from './icons/MessageSquareIcon.tsx';
import { SparklesIcon } from './icons/SparklesIcon.tsx';


interface AnalysisPanelProps {
    // Fix: The candidate is an athlete, which is of type 'User'.
    candidate: User | null;
    analysis: AIAnalysis | null;
    isLoading: boolean;
    error: string | null;
}

const AnimatedSection: React.FC<{ delay: number; children: React.ReactNode; className?: string }> = ({ delay, children, className = '' }) => (
    <div className={`opacity-0 animate-fade-in-up ${className}`} style={{ animationDelay: `${delay}ms` }}>
        {children}
    </div>
);

const AnalysisPanel: React.FC<AnalysisPanelProps> = ({ candidate, analysis, isLoading, error }) => {
    
    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="flex flex-col items-center justify-center h-full text-center p-8">
                    <SpinnerIcon className="w-12 h-12 animate-spin text-purple-500 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-300">Analyzing Candidate...</h3>
                    <p className="text-sm text-gray-400">The AI is evaluating the video submission. This might take a moment.</p>
                </div>
            );
        }

        if (error) {
            return (
                <div className="flex flex-col items-center justify-center h-full text-center p-8 bg-red-900/30 rounded-lg">
                     <p className="text-red-400 font-semibold">Analysis Failed</p>
                     <p className="text-sm text-red-400/80 mt-2">{error}</p>
                </div>
            );
        }

        if (!candidate) {
            return (
                <div className="flex flex-col items-center justify-center h-full text-center p-8">
                    <RobotIcon className="w-16 h-16 text-gray-600 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-300">AI Analysis Panel</h3>
                    <p className="text-sm text-gray-400">Select a candidate and click "Analyze with AI" to see their evaluation.</p>
                </div>
            );
        }

        if (!analysis) {
             return (
                <div className="flex flex-col items-center justify-center h-full text-center p-8">
                    {/* Fix: Use 'fullName' property from the 'User' type. */}
                    <h3 className="text-xl font-bold text-gray-200">{candidate.fullName}</h3>
                    <p className="text-gray-400">Ready for analysis.</p>
                </div>
            );
        }

        return (
            <div className="p-1 md:p-2 space-y-6">
                {/* Fix: Use 'fullName' property from the 'User' type. */}
                <h3 className="text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">{candidate.fullName}</h3>
                
                 <AnimatedSection delay={300}>
                    <div className="p-4 rounded-xl bg-gray-900/30">
                        <h4 className="font-semibold text-lg mb-2 text-indigo-400 flex items-center gap-2">
                            <SparklesIcon className="w-5 h-5"/> Passion Summary
                        </h4>
                        <p className="text-gray-400 text-sm">{analysis.passionForSports}</p>
                    </div>
                </AnimatedSection>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     <AnimatedSection delay={450} className="p-4 rounded-xl bg-gray-900/30">
                        <h4 className="font-semibold text-lg mb-2 text-cyan-400 flex items-center gap-2">
                           <MessageSquareIcon className="w-5 h-5"/> Communication
                        </h4>
                        <p className="text-gray-300 text-sm">{analysis.communicationClarity}</p>
                    </AnimatedSection>
                     <AnimatedSection delay={600} className="p-4 rounded-xl bg-gray-900/30">
                        <h4 className="font-semibold text-lg mb-2 text-green-400 flex items-center gap-2">
                           <TrendingUpIcon className="w-5 h-5"/> Confidence
                        </h4>
                        <p className="text-gray-300 text-sm">{analysis.confidenceLevel}</p>
                    </AnimatedSection>
                </div>

                <div className="space-y-4">
                    <AnimatedSection delay={750}>
                        <h4 className="font-semibold text-lg mb-2 text-yellow-400 flex items-center gap-2">
                            <CheckIcon className="w-5 h-5"/> Key Skills Identified
                        </h4>
                        <div className="flex flex-wrap gap-2">
                             {analysis.keySkills.map((s, i) => <span key={i} className="bg-yellow-900/50 text-yellow-200 text-xs font-medium px-3 py-1 rounded-full">{s}</span>)}
                        </div>
                    </AnimatedSection>
                   
                     <AnimatedSection delay={900}>
                        <h4 className="font-semibold text-lg mb-2 text-purple-400 flex items-center gap-2">
                            <LightbulbIcon className="w-5 h-5"/>
                            Guidance for Candidate
                        </h4>
                         <p className="text-gray-400 text-sm">{analysis.guidance}</p>
                    </AnimatedSection>
                </div>
            </div>
        );
    };

    return (
        <div className="bg-black/40 backdrop-blur-lg rounded-xl shadow-xl border border-gray-700/80 sticky top-28">
            <div className="p-4 md:p-6 min-h-[80vh] max-h-[80vh] overflow-y-auto">
                {renderContent()}
            </div>
        </div>
    );
};

export default AnalysisPanel;
