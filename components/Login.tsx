import React from 'react';
// Fix: Use explicit '.ts' extension for module import.
import type { User } from '../types.ts';
import { mockUsers } from '../data/mockData.ts';
import { UserIcon } from './icons/UserIcon.tsx';
import { ShieldIcon } from './icons/ShieldIcon.tsx';

interface LoginProps {
    onLogin: (user: User) => void;
}

export default function Login({ onLogin }: LoginProps) {
    const athleteUser = mockUsers.find(u => u.role === 'athlete');
    const coachUser = mockUsers.find(u => u.role === 'coach');

    if (!athleteUser || !coachUser) {
        return <div>Error: Demo users not found.</div>;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-4">
            <div className="w-full max-w-md bg-black/40 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-700/80 p-8 text-center animate-fade-in-up">
                <img src="https://i.postimg.cc/FFJbPKz8/image.png" alt="VEERआकलन Logo" className="h-16 mx-auto mb-4" />
                <p className="text-purple-300 font-semibold tracking-wider uppercase text-sm mb-8">A platform to DISCOVER, TRAIN & CONQUER</p>

                <div className="space-y-4">
                    <button
                        onClick={() => onLogin(athleteUser)}
                        className="w-full flex items-center justify-center gap-3 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg transition-transform transform hover:scale-105 shine-effect"
                    >
                        <UserIcon className="w-6 h-6" />
                        <span>Login as Demo Athlete</span>
                    </button>
                    <button
                        onClick={() => onLogin(coachUser)}
                        className="w-full flex items-center justify-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition-transform transform hover:scale-105 shine-effect"
                    >
                        <ShieldIcon className="w-6 h-6" />
                        <span>Login as Demo Coach</span>
                    </button>
                </div>
                <p className="text-xs text-gray-500 mt-8">
                    This is a demonstration application. All data is mocked.
                </p>
            </div>
        </div>
    );
}