import React from 'react';
import type { User } from '../types';
import { SparklesIcon } from './icons/SparklesIcon';
import { SpinnerIcon } from './icons/SpinnerIcon';

interface CandidateListProps {
    candidates: User[];
    onSelectCandidate: (candidate: User) => void;
    onAnalyze: (candidate: User) => void;
    selectedCandidateId?: string | null;
    isLoading: boolean;
}

const CandidateList: React.FC<CandidateListProps> = ({ candidates, onSelectCandidate, onAnalyze, selectedCandidateId, isLoading }) => {
    return (
        <div className="bg-black/40 backdrop-blur-lg rounded-xl shadow-xl border border-gray-700/80 p-4 sticky top-28">
            <h2 className="text-xl font-bold text-gray-200 mb-4 px-2">Athlete Candidates</h2>
            <div className="space-y-2 max-h-[70vh] overflow-y-auto">
                {candidates.map(candidate => (
                    <div
                        key={candidate.id}
                        className={`p-3 rounded-lg cursor-pointer transition-colors ${
                            selectedCandidateId === candidate.id ? 'bg-purple-900/50' : 'hover:bg-gray-800/60'
                        }`}
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3" onClick={() => onSelectCandidate(candidate)}>
                                <img src={candidate.avatarUrl} alt={candidate.fullName} className="w-12 h-12 rounded-full" />
                                <div>
                                    <p className="font-semibold text-gray-100">{candidate.fullName}</p>
                                    <p className="text-sm text-gray-400">{candidate.stats?.sport}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => onAnalyze(candidate)}
                                disabled={isLoading && selectedCandidateId === candidate.id}
                                className="flex items-center gap-2 text-xs font-semibold bg-indigo-600 text-white px-3 py-2 rounded-md hover:bg-indigo-700 transition-all shine-effect disabled:bg-indigo-400/50 disabled:cursor-not-allowed"
                            >
                                {isLoading && selectedCandidateId === candidate.id ? (
                                    <SpinnerIcon className="w-4 h-4 animate-spin" />
                                ) : (
                                    <SparklesIcon className="w-4 h-4" />
                                )}
                                <span>Analyze</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CandidateList;
