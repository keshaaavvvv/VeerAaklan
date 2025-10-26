
import React from 'react';

export const RobotIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <rect x="5" y="11" width="14" height="10" rx="2" />
        <path d="M10 11V7a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v4" />
        <circle cx="12" cy="16" r="1" />
        <path d="M12 5a3 3 0 0 0-3 3" />
        <path d="M15 8a3 3 0 0 1-3-3" />
    </svg>
);
