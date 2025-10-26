import React, { useState } from 'react';
import { HelpCircleIcon } from './icons/HelpCircleIcon';
import { CloseIcon } from './icons/CloseIcon';
import { AtSignIcon } from './icons/AtSignIcon';
import { PhoneIcon } from './icons/PhoneIcon';
import { InstagramIcon } from './icons/InstagramIcon';
import { LinkedInIcon } from './icons/LinkedInIcon';
import { ClockIcon } from './icons/ClockIcon';

export default function MaintainerContactFAB() {
    const [isOpen, setIsOpen] = useState(false);

    const maintainer = {
        name: 'Keshav Chauhan',
        role: 'Helpbuddy',
        email: 'keshav.chauhan@srmist.edu.in',
        phone: '+91 91234 56789',
        instagram: 'keshav_chauhan_dev',
        linkedin: 'https://www.linkedin.com/in/keshavchauhan',
        availability: 'Mon - Fri, 4 PM - 8 PM IST'
    };

    const toggleOpen = () => setIsOpen(!isOpen);

    const ContactItem: React.FC<{ href?: string; icon: React.ReactNode; text: string }> = ({ href, icon, text }) => {
        const content = (
            <div className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-800/50 transition-colors group cursor-pointer">
                <div className="text-gray-500 group-hover:text-cyan-400 transition-colors">{icon}</div>
                <span className="text-gray-300 group-hover:text-white transition-colors">{text}</span>
            </div>
        );
        return href ? <a href={href} target="_blank" rel="noopener noreferrer">{content}</a> : content;
    };

    return (
        <>
            {/* Contact Panel */}
            <div
                className={`fixed bottom-24 left-6 z-50 w-full max-w-sm p-6 bg-gray-900/80 backdrop-blur-lg border border-purple-500/50 rounded-2xl shadow-2xl transition-all duration-300 ease-in-out ${
                    isOpen ? 'opacity-100 animate-slide-in-left' : 'opacity-0 pointer-events-none'
                }`}
            >
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">
                        Get in Touch
                    </h3>
                </div>
                 <p className="text-sm text-gray-400 mb-6">
                    Have feedback, a suggestion, or a technical issue? Don't hesitate to reach out to our manager.
                </p>
                <div className="space-y-3 text-sm">
                    <div>
                        <p className="font-bold text-xl text-gray-100">{maintainer.name}</p>
                        <p className="text-sm text-purple-300 font-medium">{maintainer.role}</p>
                    </div>
                     <div className="border-t border-gray-700 my-4"></div>
                    <ContactItem href={`mailto:${maintainer.email}`} icon={<AtSignIcon className="w-5 h-5" />} text={maintainer.email} />
                    <ContactItem href={maintainer.linkedin} icon={<LinkedInIcon className="w-5 h-5" />} text="LinkedIn Profile" />
                    <ContactItem href={`https://instagram.com/${maintainer.instagram}`} icon={<InstagramIcon className="w-5 h-5" />} text={`@${maintainer.instagram}`} />
                    <ContactItem icon={<PhoneIcon className="w-5 h-5" />} text={maintainer.phone} />
                    <ContactItem icon={<ClockIcon className="w-5 h-5" />} text={maintainer.availability} />
                </div>
            </div>

            {/* Floating Action Button */}
            <button
                onClick={toggleOpen}
                className={`fixed bottom-6 left-6 w-16 h-16 rounded-full text-white flex items-center justify-center shadow-lg transition-all duration-300 transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 z-50 ${isOpen ? 'bg-red-600 hover:bg-red-700 rotate-[360deg]' : 'bg-purple-600 hover:bg-purple-700 animate-pulse-glow'}`}
                aria-label={isOpen ? "Close contact details" : "Open contact details"}
            >
                <div className={`transition-transform duration-300 transform ${isOpen ? 'rotate-180 scale-0' : 'rotate-0 scale-100'}`}>
                   <HelpCircleIcon className="w-8 h-8 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                </div>
                 <div className={`transition-transform duration-300 transform ${isOpen ? 'rotate-0 scale-100' : '-rotate-180 scale-0'}`}>
                   <CloseIcon className="w-8 h-8 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                </div>

            </button>
        </>
    );
}