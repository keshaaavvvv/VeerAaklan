import React, { useState } from 'react';
// Fix: Use explicit '.ts' extension for module import.
import type { User, Post, Comment } from '../types.ts';
// Fix: Use explicit '.ts' extension for module import.
import { mockPosts } from '../data/mockData.ts';
import { ThumbsUpIcon } from './icons/ThumbsUpIcon.tsx';
import { MessageCircleIcon } from './icons/MessageCircleIcon.tsx';
import { MoreVerticalIcon } from './icons/MoreVerticalIcon.tsx';
import { SendIcon } from './icons/SendIcon.tsx';
import { LandmarkIcon } from './icons/LandmarkIcon.tsx';

interface SocialFeedProps {
    currentUser: User;
    language: string;
}

const translations = {
    title: { en: 'Idea Forum', hi: 'विचार मंच' },
    description: { en: 'Submit your ideas and proposals directly to sports authorities for consideration.', hi: 'विचार के लिए अपने विचार और प्रस्ताव सीधे खेल अधिकारियों को प्रस्तुत करें।' },
    proposalTitlePlaceholder: { en: 'Proposal Title', hi: 'प्रस्ताव का शीर्षक' },
    proposalDescPlaceholder: { en: 'Describe your proposal in detail...', hi: 'अपने प्रस्ताव का विस्तार से वर्णन करें...' },
    selectAuthority: { en: 'Select Target Authority', hi: 'लक्ष्य प्राधिकरण चुनें' },
    postButton: { en: 'Submit Proposal', hi: 'प्रस्ताव जमा करें' },
    support: { en: 'Support', hi: 'समर्थन' },
    supported: { en: 'Supported', hi: 'समर्थित' },
    comment: { en: 'Discuss', hi: 'चर्चा करें' },
    addCommentPlaceholder: { en: 'Share your thoughts...', hi: 'अपने विचार साझा करें...' },
    toAuthority: { en: 'To:', hi: 'प्रति:'},
};

const authorities = [
    'Sports Authority of India (SAI)',
    'Board of Control for Cricket in India (BCCI)',
    'All India Football Federation (AIFF)',
    'Boxing Federation of India (BFI)',
    'Swimming Federation of India (SFI)',
    'USA Basketball',
];

const getStatusStyles = (status: Post['status']) => {
    switch (status) {
        case 'Approved':
            return 'bg-green-500/20 text-green-300 border-green-500/50';
        case 'Under Review':
            return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50';
        case 'Rejected':
            return 'bg-red-500/20 text-red-300 border-red-500/50';
        case 'Submitted':
        default:
            return 'bg-blue-500/20 text-blue-300 border-blue-500/50';
    }
};

const SocialFeed: React.FC<SocialFeedProps> = ({ currentUser, language }) => {
    const t = (key: keyof typeof translations) => translations[key][language as 'en' | 'hi'] || translations[key].en;
    
    const [posts, setPosts] = useState<Post[]>(mockPosts);
    const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set(['post2']));
    const [activeCommentBox, setActiveCommentBox] = useState<string | null>(null);
    const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});

    const handleLike = (postId: string) => {
        const newLikedPosts = new Set(likedPosts);
        let likeAdjustment = 0;

        if (newLikedPosts.has(postId)) {
            newLikedPosts.delete(postId);
            likeAdjustment = -1;
        } else {
            newLikedPosts.add(postId);
            likeAdjustment = 1;
        }
        setLikedPosts(newLikedPosts);
        
        setPosts(posts.map(p => p.id === postId ? { ...p, likes: p.likes + likeAdjustment } : p));
    };

    const handlePostComment = (postId: string) => {
        const commentText = commentInputs[postId]?.trim();
        if (!commentText) return;

        const newComment: Comment = {
            id: `c${Date.now()}`,
            author: {
                id: currentUser.id,
                fullName: currentUser.fullName,
                avatarUrl: currentUser.avatarUrl,
            },
            timestamp: 'Just now',
            text: commentText,
        };

        setPosts(posts.map(p => 
            p.id === postId 
                ? { ...p, comments: [...p.comments, newComment] } 
                : p
        ));

        setCommentInputs(prev => ({ ...prev, [postId]: '' }));
    };

    return (
        <div className="max-w-3xl mx-auto space-y-8 animate-fade-in-up">
            <header className="bg-black/40 backdrop-blur-lg rounded-xl shadow-xl border border-gray-700/80 p-6">
                <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">{t('title')}</h1>
                <p className="text-gray-400 mt-2">{t('description')}</p>
            </header>
            
            {/* Create Proposal */}
            <div className="bg-black/40 backdrop-blur-lg rounded-xl shadow-xl border border-gray-700/80 p-4">
                <div className="flex items-start gap-4">
                    <img src={currentUser.avatarUrl} alt={currentUser.fullName} className="w-12 h-12 rounded-full" />
                    <div className="flex-1 space-y-3">
                         <input
                            type="text"
                            placeholder={t('proposalTitlePlaceholder')}
                            className="w-full bg-gray-800/50 border border-gray-600 rounded-md px-3 py-2 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                         <textarea
                            placeholder={t('proposalDescPlaceholder')}
                            className="w-full bg-gray-800/50 border border-gray-600 rounded-md px-3 py-2 text-gray-200 resize-none placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            rows={4}
                        ></textarea>
                         <div className="relative">
                            <LandmarkIcon className="w-5 h-5 absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            <select className="w-full bg-gray-800/50 border border-gray-600 rounded-md py-2 pl-10 pr-4 text-sm text-gray-200 focus:ring-2 focus:ring-purple-500 focus:outline-none appearance-none">
                                <option value="">{t('selectAuthority')}</option>
                                {authorities.map(auth => <option key={auth} value={auth}>{auth}</option>)}
                            </select>
                        </div>
                         <div className="flex justify-end mt-2">
                             <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-full text-sm transition shine-effect">{t('postButton')}</button>
                         </div>
                    </div>
                </div>
            </div>

            {/* Proposals */}
            <div className="space-y-6">
            {posts.map(post => {
                const isLiked = likedPosts.has(post.id);
                const isCommenting = activeCommentBox === post.id;
                const commentText = commentInputs[post.id] || '';

                return (
                    <div key={post.id} className="bg-black/40 backdrop-blur-lg rounded-xl shadow-xl border border-gray-700/80 p-6 transition-all duration-300">
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <h2 className="text-xl font-bold text-gray-100">{post.title}</h2>
                                <p className="text-xs text-gray-400 mt-1">{t('toAuthority')} <span className="font-semibold text-cyan-400">{post.targetAuthority}</span></p>
                            </div>
                            <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${getStatusStyles(post.status)}`}>
                                {post.status}
                            </span>
                        </div>

                        <div className="flex items-center justify-between mb-4">
                             <div className="flex items-center gap-3">
                                <img src={post.author.avatarUrl} alt={post.author.fullName} className="w-8 h-8 rounded-full" />
                                <div>
                                    <p className="text-sm font-semibold text-gray-300">{post.author.fullName}</p>
                                    <p className="text-xs text-gray-500">{post.timestamp}</p>
                                </div>
                            </div>
                            <button className="text-gray-400 hover:text-white p-2 rounded-full"><MoreVerticalIcon className="w-5 h-5"/></button>
                        </div>

                        <p className="text-gray-300 whitespace-pre-wrap mb-4 border-t border-gray-700/50 pt-4">{post.content}</p>

                        <div className="flex items-center justify-between text-gray-400 border-t border-gray-700/50 pt-3">
                            <button 
                                onClick={() => handleLike(post.id)}
                                className={`flex items-center gap-2 transition-colors text-sm font-semibold ${isLiked ? 'text-purple-400' : 'hover:text-purple-400'}`}
                            >
                                <ThumbsUpIcon className={`w-5 h-5 ${isLiked ? 'fill-purple-400' : ''}`} />
                                <span>{isLiked ? t('supported') : t('support')} ({post.likes})</span>
                            </button>
                            <button 
                                onClick={() => setActiveCommentBox(isCommenting ? null : post.id)}
                                className={`flex items-center gap-2 transition-colors text-sm font-semibold ${isCommenting ? 'text-purple-400' : 'hover:text-purple-400'}`}
                            >
                                <MessageCircleIcon className="w-5 h-5" />
                                <span>{t('comment')} ({post.comments.length})</span>
                            </button>
                        </div>

                        {isCommenting && (
                            <div className="mt-4 pt-4 border-t border-gray-700/50 space-y-4 animate-fade-in-up">
                                {post.comments.length > 0 && (
                                    <div className="max-h-48 overflow-y-auto space-y-4 pr-2">
                                        {post.comments.map(comment => (
                                            <div key={comment.id} className="flex items-start gap-3">
                                                <img src={comment.author.avatarUrl} alt={comment.author.fullName} className="w-8 h-8 rounded-full" />
                                                <div className="bg-gray-800/50 rounded-lg p-3 text-sm flex-1">
                                                    <div className="flex items-baseline justify-between">
                                                        <p className="font-bold text-gray-200">{comment.author.fullName}</p>
                                                        <p className="text-xs text-gray-500">{comment.timestamp}</p>
                                                    </div>
                                                    <p className="text-gray-300 whitespace-pre-wrap mt-1">{comment.text}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                <div className="flex items-start gap-3 pt-4 border-t border-gray-800">
                                    <img src={currentUser.avatarUrl} alt={currentUser.fullName} className="w-8 h-8 rounded-full" />
                                    <form onSubmit={(e) => { e.preventDefault(); handlePostComment(post.id); }} className="flex-1 flex gap-2">
                                        <input
                                            type="text"
                                            value={commentText}
                                            onChange={(e) => setCommentInputs(prev => ({ ...prev, [post.id]: e.target.value }))}
                                            placeholder={t('addCommentPlaceholder')}
                                            className="w-full bg-gray-800/50 border border-gray-600 rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
                                            autoFocus
                                        />
                                        <button 
                                            type="submit" 
                                            className="p-2 h-10 w-10 flex-shrink-0 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition transform hover:scale-110 disabled:bg-indigo-400/50 disabled:cursor-not-allowed disabled:scale-100"
                                            disabled={!commentText.trim()}
                                            aria-label="Send Comment"
                                        >
                                            <SendIcon className="w-5 h-5" />
                                        </button>
                                    </form>
                                </div>
                            </div>
                        )}
                    </div>
                );
            })}
            </div>
        </div>
    );
};

export default SocialFeed;