import React, { useState } from 'react';
// Fix: Use explicit '.ts' extension for module import.
import type { User, AIAnalysis } from '../types.ts';
// Fix: Use explicit '.tsx' extension for module import.
import Header from './Header.tsx';
import Footer from './Footer.tsx';
import CandidateList from './CandidateList.tsx';
import AnalysisPanel from './AnalysisPanel.tsx';
import { analyzeCandidateWithAI } from '../services/geminiService.ts';
import { mockAthleteListForCoach } from '../data/mockData.ts';


interface CoachDashboardProps {
    currentUser: User;
    language: string;
    setLanguage: (lang: string) => void;
    onLogout: () => void;
}

export default function CoachDashboard({ currentUser, language, setLanguage, onLogout }: CoachDashboardProps) {
    const [candidates] = useState<User[]>(mockAthleteListForCoach);
    const [selectedCandidate, setSelectedCandidate] = useState<User | null>(null);
    const [analysisResult, setAnalysisResult] = useState<AIAnalysis | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSelectCandidate = (candidate: User) => {
        setSelectedCandidate(candidate);
        setAnalysisResult(null);
        setError(null);
    };

    const handleAnalyze = async (candidate: User) => {
        setSelectedCandidate(candidate);
        setIsLoading(true);
        setError(null);
        setAnalysisResult(null);

        try {
            // In a real app, you'd process the actual video. Here we create a descriptive prompt.
            const videoDescription = `The candidate, ${candidate.fullName}, is showcasing their skills in ${candidate.stats?.sport}. They appear focused and driven, executing several drills with precision. They also briefly explain their training philosophy with clarity and confidence.`;
            const result = await analyzeCandidateWithAI(videoDescription);
            setAnalysisResult(result);
        } catch (err) {
            setError(err instanceof Error ? err.message : "An unknown error occurred during analysis.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Header
                user={currentUser}
                language={language}
                setLanguage={setLanguage}
                onLogout={onLogout}
            />
            <div className="container mx-auto px-4 md:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1">
                         <CandidateList
                            candidates={candidates}
                            onSelectCandidate={handleSelectCandidate}
                            onAnalyze={handleAnalyze}
                            selectedCandidateId={selectedCandidate?.id}
                            isLoading={isLoading}
                        />
                    </div>
                    <div className="lg:col-span-2">
                        <AnalysisPanel
                            candidate={selectedCandidate}
                            analysis={analysisResult}
                            isLoading={isLoading}
                            error={error}
                        />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}