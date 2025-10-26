import React, { useState, useEffect } from 'react';
import type { User } from './types.ts';
import Login from './components/Login.tsx';
import AthleteDashboard from './components/AthleteDashboard.tsx';
import CoachDashboard from './components/CoachDashboard.tsx';

export default function App() {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [language, setLanguage] = useState('en');
    
    // Simple session persistence
    useEffect(() => {
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
            setCurrentUser(JSON.parse(savedUser));
        }
    }, []);

    const handleLogin = (user: User) => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        setCurrentUser(user);
    };

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        setCurrentUser(null);
    };

    const renderDashboard = () => {
        if (!currentUser) {
            return <Login onLogin={handleLogin} />;
        }

        switch (currentUser.role) {
            case 'athlete':
                return (
                    <AthleteDashboard
                        currentUser={currentUser}
                        language={language}
                        setLanguage={setLanguage}
                        onLogout={handleLogout}
                    />
                );
            case 'coach':
                return (
                    <CoachDashboard
                        currentUser={currentUser}
                        language={language}
                        setLanguage={setLanguage}
                        onLogout={handleLogout}
                    />
                );
            default:
                return <div>Unsupported user role.</div>;
        }
    };

    return (
        <div className={`min-h-screen bg-gray-900 text-gray-100 font-sans ${language === 'hi' ? 'font-noto-sans' : ''}`}>
            {renderDashboard()}
        </div>
    );
}