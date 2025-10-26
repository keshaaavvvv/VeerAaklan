import React, { useState, useRef, useEffect } from 'react';
// Fix: Use explicit '.ts' extension for module import.
import type { ChatMessage } from '../types.ts';
// Fix: Use explicit '.ts' extension for module import.
import { getChatbotResponse } from '../services/geminiService.ts';
import { RobotIcon } from './icons/RobotIcon.tsx';
import { CloseIcon } from './icons/CloseIcon.tsx';
import { SendIcon } from './icons/SendIcon.tsx';
import { SpinnerIcon } from './icons/SpinnerIcon.tsx';

interface ChatbotProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const Chatbot: React.FC<ChatbotProps> = ({ isOpen, setIsOpen }) => {
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            id: 1,
            role: 'model',
            text: 'Hello! I am the VEERआकलन Assistant. How can I help you with the application process today?'
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [messages, isOpen]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        const trimmedInput = inputValue.trim();
        if (!trimmedInput) return;

        const userMessage: ChatMessage = { id: Date.now() + Math.random(), role: 'user', text: trimmedInput };
        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsLoading(true);

        try {
            const responseText = await getChatbotResponse(trimmedInput);
            const modelMessage: ChatMessage = { id: Date.now() + Math.random(), role: 'model', text: responseText };
            setMessages(prev => [...prev, modelMessage]);
        } catch (error) {
            console.error('Chatbot error:', error);
            const errorMessage: ChatMessage = { id: Date.now() + Math.random(), role: 'model', text: 'Sorry, I encountered an error. Please try again.' };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const closeChat = () => setIsOpen(false);

    return (
        <div
            className={`fixed bottom-6 right-6 sm:bottom-8 sm:right-8 w-[calc(100%-3rem)] max-w-sm h-[70vh] flex flex-col bg-gray-900/80 backdrop-blur-lg border border-gray-700 rounded-2xl shadow-2xl transition-all duration-300 ease-in-out z-50 overflow-hidden ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
            aria-modal="true"
            role="dialog"
            aria-labelledby="chatbot-heading"
        >
            {/* Header */}
            <div className="relative z-10 flex items-center justify-between p-4 border-b border-gray-700/50">
                <h3 id="chatbot-heading" className="font-bold text-lg text-indigo-300">VEERआकलन Assistant</h3>
                <button
                    onClick={closeChat}
                    className="p-1 rounded-full text-gray-300 hover:bg-gray-700/50"
                    aria-label="Close Chat"
                >
                    <CloseIcon className="w-5 h-5" />
                </button>
            </div>

            {/* Messages */}
            <div className="relative z-10 flex-1 p-4 space-y-4 overflow-y-auto">
                {messages.map((msg) => (
                    <div key={msg.id} className={`flex items-end gap-2 animate-slide-in-up ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                         {msg.role === 'model' && (
                             <div className="w-8 h-8 rounded-full bg-indigo-500 flex-shrink-0 flex items-center justify-center text-white">
                                 <RobotIcon className="w-5 h-5"/>
                             </div>
                        )}
                        <div className={`max-w-[80%] p-3 rounded-2xl ${msg.role === 'user' ? 'bg-purple-600 text-white rounded-br-none' : 'bg-gray-700 text-gray-100 rounded-bl-none'}`}>
                            <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                        </div>
                    </div>
                ))}
                {isLoading && (
                     <div className="flex items-end gap-2 justify-start animate-slide-in-up">
                        <div className="w-8 h-8 rounded-full bg-indigo-500 flex-shrink-0 flex items-center justify-center text-white">
                            <RobotIcon className="w-5 h-5"/>
                         </div>
                        <div className="max-w-[80%] p-3 rounded-2xl bg-gray-700">
                            <div className="flex gap-1.5">
                                <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce delay-0"></span>
                                <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
                                <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce delay-300"></span>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="relative z-10 p-4 border-t border-gray-700/50">
                <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Ask a question..."
                        className="flex-1 bg-gray-800/50 border border-gray-600 rounded-full px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm"
                        disabled={isLoading}
                    />
                    <button
                        type="submit"
                        className="w-10 h-10 flex-shrink-0 rounded-full bg-indigo-600 text-white flex items-center justify-center hover:bg-indigo-700 transition-all transform hover:scale-110 disabled:bg-indigo-400 disabled:cursor-not-allowed"
                        disabled={isLoading}
                        aria-label="Send Message"
                    >
                        {isLoading ? <SpinnerIcon className="w-5 h-5 animate-spin"/> : <SendIcon className="w-5 h-5" />}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Chatbot;
