import React from 'react';

export default function Footer() {
    return (
        <footer className="bg-transparent mt-12 py-6 border-t border-purple-500/30">
            <div className="container mx-auto px-4 md:px-8 text-center text-gray-400">
                <p className="text-sm">&copy; {new Date().getFullYear()} VEERआकलन. All rights reserved.</p>
            </div>
        </footer>
    );
}