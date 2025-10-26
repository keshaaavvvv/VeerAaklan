import React from 'react';

export const FootballIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 22a4.8 4.8 0 0 0 5-5" />
        <path d="M12 2a4.8 4.8 0 0 1 5 5" />
        <path d="M12 12 7 7" />
        <path d="M12 12 7 17" />
        <path d="M12 12 17 7" />
        <path d="M12 12 17 17" />
        <path d="M22 12h-4.8" />
        <path d="M6.8 12H2" />
    </svg>
);