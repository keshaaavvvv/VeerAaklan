import React, { useState } from 'react';
// Fix: Use explicit '.ts' extension for module import.
import type { User } from '../types.ts';
// Fix: Use explicit '.tsx' extension for module import.
import Header from './Header.tsx';
import Footer from './Footer.tsx';
import AthleteSidebar from './AthleteSidebar.tsx';
import Profile from './Profile.tsx';
import Badges from './Badges.tsx';
// Fix: Use explicit '.tsx' extension for module import.
import PersonalTracker from './PersonalTracker.tsx';
import SocialFeed from './SocialFeed.tsx';
import Leaderboard from './Leaderboard.tsx';
import Challenges from './Challenges.tsx';
import Communities from './Communities.tsx';
import Authorities from './Authorities.tsx';
import SkillBenchmarking from './SkillBenchmarking.tsx';
import VideoAnalysis from './VideoAnalysis.tsx';

interface AthleteDashboardProps {
    currentUser: User;
    language: string;
    setLanguage: (lang: string) => void;
    onLogout: () => void;
}

export default function AthleteDashboard({ currentUser, language, setLanguage, onLogout }: AthleteDashboardProps) {
    const [activeView, setActiveView] = useState('profile');

    const renderContent = () => {
        switch (activeView) {
            case 'profile':
                return <Profile user={currentUser} language={language} />;
            case 'badges':
                return <Badges user={currentUser} language={language} />;
            case 'tracker':
                return <PersonalTracker language={language} />;
            case 'feed':
                return <SocialFeed currentUser={currentUser} language={language} />;
            case 'leaderboard':
                return <Leaderboard language={language} />;
            case 'challenges':
                return <Challenges currentUser={currentUser} language={language} />;
            case 'communities':
                return <Communities language={language} />;
            case 'authorities':
                return <Authorities language={language} />;
            case 'benchmarking':
                return <SkillBenchmarking language={language} currentUser={currentUser} />;
            case 'videoAnalysis':
                return <VideoAnalysis language={language} />;
            default:
                return <Profile user={currentUser} language={language} />;
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
            <div className="flex flex-1 container mx-auto px-4 md:px-8 py-8">
                <AthleteSidebar activeView={activeView} setActiveView={setActiveView} language={language} />
                <main className="flex-1 lg:pl-8">
                    {renderContent()}
                </main>
            </div>
            <Footer />
        </>
    );
}