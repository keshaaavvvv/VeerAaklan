import React from 'react';
// Fix: Use explicit '.ts' extension for module import.
import type { User } from '../types.ts';
import { LogOutIcon } from './icons/LogOutIcon.tsx';
import { GlobeIcon } from './icons/GlobeIcon.tsx';

interface HeaderProps {
    user: User;
    language: string;
    setLanguage: (lang: string) => void;
    onLogout: () => void;
}

export default function Header({ user, language, setLanguage, onLogout }: HeaderProps) {
    return (
        <header className="sticky top-0 z-40 bg-black/60 backdrop-blur-lg border-b border-gray-700/80">
            <div className="container mx-auto px-4 md:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex items-center gap-4">
                        <img src="https://i.postimg.cc/FFJbPKz8/image.png" alt="VEERआकलन Logo" className="h-10" />
                    </div>
                    <div className="flex items-center gap-4">
                         <div className="relative">
                            <GlobeIcon className="w-5 h-5 absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            <select 
                                value={language}
                                onChange={(e) => setLanguage(e.target.value)}
                                className="bg-gray-800/50 border border-gray-700 rounded-md py-2 pl-10 pr-4 text-sm text-gray-200 focus:ring-2 focus:ring-purple-500 focus:outline-none appearance-none"
                            >
                                <option value="en">English</option>
                                <option value="hi">हिन्दी</option>
                            </select>
                        </div>
                        
                        <div className="flex items-center gap-3">
                            <img src={user.avatarUrl} alt={user.fullName} className="w-10 h-10 rounded-full" />
                            <div className="hidden md:block">
                                <p className="font-semibold text-gray-200">{user.fullName}</p>
                                <p className="text-xs text-gray-400 capitalize">{user.role}</p>
                            </div>
                        </div>

                        <button onClick={onLogout} className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-full transition-colors" aria-label="Logout">
                            <LogOutIcon className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}