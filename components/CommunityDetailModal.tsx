import React from 'react';
import { CloseIcon } from './icons/CloseIcon';

interface CommunityDetailModalProps {
    community: any;
    onClose: () => void;
    language: string;
}

export default function CommunityDetailModal({ community, onClose, language }: CommunityDetailModalProps) {
    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
            <div className="bg-gray-900 border border-gray-700 rounded-xl shadow-2xl w-full max-w-lg relative animate-slide-in-up">
                <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:bg-gray-800">
                    <CloseIcon className="w-5 h-5" />
                </button>
                <div className="p-8 text-center">
                    <div className="text-8xl mb-4">{community.avatar}</div>
                    <h2 className="text-3xl font-bold text-white">{community.name}</h2>
                    <p className="text-gray-400">{community.members} Members • {community.sport}</p>
                    <p className="text-gray-300 mt-4">Welcome to {community.name}! A place for all enthusiasts to connect, discuss, and share their passion.</p>
                    <button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition shine-effect">
                        Join Community
                    </button>
                </div>
            </div>
        </div>
    );
}
