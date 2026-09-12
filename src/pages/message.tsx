import React, { useState, useRef, useEffect, ReactNode, useMemo } from 'react';
import {
    Search, MoreVertical, Phone, Video, User,
    Smile, Paperclip, Send, Check, CheckCheck,
    Image as ImageIcon, FileText, Mic, Settings,
    MoreHorizontal, Plus
} from 'lucide-react';

import Container from "../components/shared/container";
import Section from "../components/shared/section";

/**
 * =========================================================================
 * CHAT COMPONENT LOGIC
 * =========================================================================
 */

// --- Types ---

interface User {
    id: string;
    name: string;
    avatar: string;
    status: 'online' | 'offline' | 'away';
    isTyping?: boolean;
}

interface Message {
    id: string;
    senderId: string; // 'me' or user.id
    text?: string;
    images?: string[];
    file?: { name: string; size: string };
    time: string;
    status: 'sent' | 'delivered' | 'read';
    replyTo?: string;
}

// --- Mock Data ---

const USERS: User[] = [
    { id: '1', name: 'Victoria P. Miller', avatar: 'https://i.pravatar.cc/150?u=1', status: 'online' },
    { id: '2', name: 'Dallas C. Payne', avatar: 'https://i.pravatar.cc/150?u=2', status: 'offline' },
    { id: '3', name: 'Florence A. Lopez', avatar: 'https://i.pravatar.cc/150?u=3', status: 'away' },
    { id: '4', name: 'Gail A. Nix', avatar: 'https://i.pravatar.cc/150?u=4', status: 'online' },
    { id: '5', name: 'Lynne J. Petty', avatar: 'https://i.pravatar.cc/150?u=5', status: 'online' },
];

const INITIAL_CONVERSATIONS: Record<string, Message[]> = {
    '1': [
        { id: '1', senderId: '1', text: 'Hey 😉', time: '2 hours ago', status: 'read' },
        { id: '2', senderId: 'me', text: 'Hii', time: '2 hours ago', status: 'read' },
        { id: '3', senderId: '1', text: 'Hi Gaston, thanks for joining the meeting. Let\'s dive into our quarterly performance review.', time: '2 hours ago', status: 'read' },
        { id: '4', senderId: 'me', text: 'Hi Gilbert, thanks for having me. I\'m ready to discuss how things have been going.', time: '2 hours ago', status: 'read', replyTo: '3' },
        { id: '5', senderId: '1', images: ['https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=400&q=80'], time: '2 hours ago', status: 'read' },
    ],
    '2': [
        { id: '1', senderId: '2', text: 'Hey! a reminder for tomorrow\'s meeting...', time: '31 minutes ago', status: 'delivered' },
    ],
    '3': [
        { id: '1', senderId: '3', text: 'Hello! I just got your assignment, everything\'s alright.', time: '1 hour ago', status: 'read' },
        { id: '2', senderId: 'me', text: 'Great, thanks Florence!', time: '55 mins ago', status: 'read' },
    ],
    '4': [
        { id: '1', senderId: '4', text: 'Are we going to have this week\'s planning meeting today?', time: '1 hour ago', status: 'read' },
    ],
    '5': [
        { id: '1', senderId: '5', text: 'Please check this template...', time: '2 hours ago', status: 'read' },
        { id: '2', senderId: '5', file: { name: 'template_v2.pdf', size: '1.2 MB' }, time: '2 hours ago', status: 'read' },
    ]
};

// --- Sub-Components ---

const Avatar = ({ src, status, size = 'md' }: { src: string, status?: User['status'], size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' }) => {
    const sizeClasses = {
        xs: 'w-6 h-6',
        sm: 'w-8 h-8',
        md: 'w-10 h-10',
        lg: 'w-12 h-12',
        xl: 'w-14 h-14',
    }[size];

    const statusColor = {
        online: 'bg-emerald-500',
        offline: 'bg-slate-500',
        away: 'bg-amber-500',
    };

    return (
        <div className="relative inline-block">
            <img src={src} alt="Avatar" className={`${sizeClasses} rounded-full object-cover border-2 border-slate-900`} />
            {status && (
                <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-slate-900 ${statusColor[status]}`} />
            )}
        </div>
    );
};

const ChatSidebarItem = ({
    user,
    active,
    onClick,
    lastMessage,
    lastTime
}: {
    user: User,
    active: boolean,
    onClick: () => void,
    lastMessage?: string,
    lastTime?: string
}) => (
    <div
        onClick={onClick}
        className={`flex items-center gap-4 p-4 cursor-pointer border-l-[3px] transition-all duration-200 ${active
            ? 'bg-slate-800/50 border-blue-500'
            : 'border-transparent hover:bg-slate-800/30'
            }`}
    >
        <Avatar src={user.avatar} status={user.status} />
        <div className="flex-1 min-w-0">
            <div className="flex justify-between items-baseline mb-1">
                <h4 className={`text-sm font-semibold truncate ${active ? 'text-white' : 'text-slate-300'}`}>{user.name}</h4>
                <span className="text-xs text-slate-500">{lastTime}</span>
            </div>
            <p className="text-xs text-slate-400 truncate">
                {user.isTyping ? <span className="text-blue-400 italic">Typing...</span> : lastMessage}
            </p>
        </div>
    </div>
);

const MessageBubble = ({ message, isMe, users }: { message: Message, isMe: boolean, users: User[] }) => {
    return (
        <div className={`flex gap-3 mb-6 ${isMe ? 'flex-row-reverse' : ''} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
            {/* Avatar (only for other person) */}
            {!isMe && (
                <div className="flex-shrink-0 mt-auto">
                    <Avatar src={users.find(u => u.id === message.senderId)?.avatar || ''} size="xs" />
                </div>
            )}

            <div className={`flex flex-col max-w-[70%] ${isMe ? 'items-end' : 'items-start'}`}>

                {/* Main Bubble */}
                <div className={`
          relative px-4 py-3 rounded-2xl text-sm shadow-sm
          ${isMe
                        ? 'bg-blue-600 text-white rounded-br-none'
                        : 'bg-slate-800 text-slate-200 rounded-bl-none'}
        `}>

                    {/* Text Content */}
                    {message.text && <p className="leading-relaxed whitespace-pre-wrap">{message.text}</p>}

                    {/* Image Grid Content */}
                    {message.images && (
                        <div className={`grid gap-2 mt-1 ${message.images.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                            {message.images.map((img, i) => (
                                <img key={i} src={img} alt="Attachment" className="rounded-lg object-cover w-full h-32 hover:opacity-90 cursor-pointer" />
                            ))}
                        </div>
                    )}

                    {/* File Attachment Content */}
                    {message.file && (
                        <div className="flex items-center gap-3 p-3 bg-white/10 rounded-lg mt-1 min-w-[240px]">
                            <div className="w-10 h-10 bg-white/20 rounded flex items-center justify-center">
                                <FileText size={20} className="text-white" />
                            </div>
                            <div className="flex-1 overflow-hidden">
                                <div className="font-medium truncate">{message.file.name}</div>
                                <div className="text-xs opacity-70">{message.file.size}</div>
                            </div>
                            <button className="text-white/80 hover:text-white p-1">
                                <div className="w-5 h-5 border-2 border-current rounded-full flex items-center justify-center">
                                    <span className="text-[10px] font-bold">↓</span>
                                </div>
                            </button>
                        </div>
                    )}
                </div>

                {/* Metadata (Time + Status) */}
                <div className={`flex items-center gap-1 mt-1 text-xs text-slate-500`}>
                    <span>{message.time}</span>
                    {isMe && (
                        <span className={message.status === 'read' ? 'text-blue-500' : ''}>
                            {message.status === 'read' ? <CheckCheck size={14} /> : <Check size={14} />}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

// --- Main Chat App ---

export default function Messages() {
    const [activeTab, setActiveTab] = useState('Chat');
    const [activeUser, setActiveUser] = useState<User>(USERS[0]);
    const [conversations, setConversations] = useState<Record<string, Message[]>>(INITIAL_CONVERSATIONS);
    const [inputText, setInputText] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [typingUsers, setTypingUsers] = useState<Record<string, boolean>>({});

    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Get current chat messages
    const messages = conversations[activeUser.id] || [];

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages, activeUser]);

    // Handle Search
    const filteredUsers = useMemo(() => {
        return USERS.filter(user =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (activeTab === 'Chat' || activeTab === 'Contact') // Simplified tab logic for demo
        );
    }, [searchTerm, activeTab]);

    // Simulate receiving a reply
    const simulateReply = (userId: string) => {
        setTypingUsers(prev => ({ ...prev, [userId]: true }));

        setTimeout(() => {
            setTypingUsers(prev => ({ ...prev, [userId]: false }));

            const reply: Message = {
                id: Date.now().toString(),
                senderId: userId,
                text: `This is an automated reply from ${USERS.find(u => u.id === userId)?.name.split(' ')[0]}!`,
                time: 'Just now',
                status: 'read'
            };

            setConversations(prev => ({
                ...prev,
                [userId]: [...(prev[userId] || []), reply]
            }));
        }, 3000);
    };

    const handleSendMessage = (type: 'text' | 'image' | 'file' = 'text') => {
        if (type === 'text' && !inputText.trim()) return;

        const newMessage: Message = {
            id: Date.now().toString(),
            senderId: 'me',
            text: type === 'text' ? inputText : undefined,
            images: type === 'image' ? ['https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=400&q=80'] : undefined,
            file: type === 'file' ? { name: 'document.pdf', size: '1.5 MB' } : undefined,
            time: 'Just now',
            status: 'sent'
        };

        setConversations(prev => ({
            ...prev,
            [activeUser.id]: [...(prev[activeUser.id] || []), newMessage]
        }));

        if (type === 'text') setInputText('');

        // Trigger reply
        simulateReply(activeUser.id);
    };

    return (
        <Container title="Chat Application" description="A feature-rich chat interface with active users, multimedia support, and real-time status indicators.">
            <Section title="Messenger">

                <div className='flex'>
                    {/* --- Sidebar --- */}
                    <aside className="w-80 border-r border-slate-800 flex flex-col bg-slate-950/50">

                        {/* Header & Search */}
                        <div className="p-4 border-b border-slate-800">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-bold text-white">Chat</h2>
                                <Settings className="text-slate-400 hover:text-white cursor-pointer" size={18} />
                            </div>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Search users..."
                                    className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500 transition-colors"
                                />
                            </div>
                        </div>

                        {/* Active Users (Stories) */}
                        <div className="py-4 border-b border-slate-800 overflow-x-auto no-scrollbar">
                            <div className="flex gap-4 px-4 min-w-max">
                                {USERS.map(user => (
                                    <div
                                        key={user.id}
                                        className="flex flex-col items-center gap-1 cursor-pointer group"
                                        onClick={() => setActiveUser(user)}
                                    >
                                        <div className={`relative p-0.5 rounded-full ${user.id === activeUser.id ? 'bg-blue-500' : 'bg-transparent'}`}>
                                            <Avatar src={user.avatar} size="lg" status={user.status} />
                                        </div>
                                        <span className="text-xs text-slate-400 group-hover:text-white truncate w-14 text-center">
                                            {user.name.split(' ')[0]}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Tabs */}
                        <div className="flex border-b border-slate-800">
                            {['Chat', 'Group', 'Contact'].map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`
                  flex-1 py-3 text-sm font-medium transition-all relative
                  ${activeTab === tab ? 'text-white' : 'text-slate-500 hover:text-slate-300'}
                `}
                                >
                                    {tab}
                                    {activeTab === tab && (
                                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 rounded-t-full" />
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* User List */}
                        <div className="flex-1 overflow-y-auto">
                            {filteredUsers.length > 0 ? (
                                filteredUsers.map(user => {
                                    const userMessages = conversations[user.id] || [];
                                    const lastMsg = userMessages[userMessages.length - 1];

                                    return (
                                        <ChatSidebarItem
                                            key={user.id}
                                            user={{ ...user, isTyping: typingUsers[user.id] }}
                                            active={activeUser.id === user.id}
                                            onClick={() => setActiveUser(user)}
                                            lastMessage={lastMsg ? (lastMsg.text || (lastMsg.file ? 'Sent a file' : 'Sent an image')) : 'No messages yet'}
                                            lastTime={lastMsg?.time}
                                        />
                                    );
                                })
                            ) : (
                                <div className="p-8 text-center text-slate-500 text-sm">No users found</div>
                            )}
                        </div>

                        {/* Current User Profile (Bottom) */}
                        <div className="p-4 bg-slate-900 border-t border-slate-800 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Avatar src="https://i.pravatar.cc/150?u=99" status="online" size="sm" />
                                <div>
                                    <div className="text-sm font-semibold text-white">Patrick Hendry</div>
                                    <div className="text-xs text-slate-500">Senior Developer</div>
                                </div>
                            </div>
                            <button className="text-slate-400 hover:text-white"><MoreVertical size={18} /></button>
                        </div>
                    </aside>

                    {/* --- Main Chat Window --- */}
                    <main className="flex-1 flex flex-col bg-slate-900 relative">
                        {/* Decorative Background Pattern */}
                        <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
                            style={{ backgroundImage: `radial-gradient(#fff 1px, transparent 1px)`, backgroundSize: '20px 20px' }}
                        />

                        {/* Chat Header */}
                        <div className="h-16 border-b border-slate-800 flex items-center justify-between px-6 bg-slate-900/80 backdrop-blur-md z-10">
                            <div className="flex items-center gap-3">
                                <Avatar src={activeUser.avatar} status={activeUser.status} />
                                <div>
                                    <h3 className="font-bold text-white text-sm">{activeUser.name}</h3>
                                    <span className={`text-xs flex items-center gap-1 ${typingUsers[activeUser.id] ? 'text-blue-400' : 'text-emerald-500'}`}>
                                        {typingUsers[activeUser.id] ? (
                                            'Typing...'
                                        ) : (
                                            <>
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                                Online
                                            </>
                                        )}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 text-slate-400">
                                <button className="hover:text-white hover:bg-slate-800 p-2 rounded-full transition-colors"><Video size={20} /></button>
                                <button className="hover:text-white hover:bg-slate-800 p-2 rounded-full transition-colors"><Phone size={20} /></button>
                                <button className="hover:text-white hover:bg-slate-800 p-2 rounded-full transition-colors"><User size={20} /></button>
                                <button className="hover:text-white hover:bg-slate-800 p-2 rounded-full transition-colors"><MoreHorizontal size={20} /></button>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-6 scroll-smooth">
                            {messages.length > 0 ? (
                                messages.map((msg) => (
                                    <MessageBubble
                                        key={msg.id}
                                        message={msg}
                                        isMe={msg.senderId === 'me'}
                                        users={USERS}
                                    />
                                ))
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center text-slate-500 opacity-50">
                                    <Smile size={48} className="mb-2" />
                                    <p>No messages yet. Say hello!</p>
                                </div>
                            )}

                            {/* Typing Indicator Bubble */}
                            {typingUsers[activeUser.id] && (
                                <div className="flex gap-3 mb-6 animate-pulse">
                                    <Avatar src={activeUser.avatar} size="xs" />
                                    <div className="bg-slate-800 rounded-2xl rounded-bl-none px-4 py-3 flex items-center gap-1">
                                        <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                        <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                        <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                                    </div>
                                </div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-4 border-t border-slate-800 bg-slate-900 z-10">
                            <div className="flex items-end gap-2 bg-slate-800/50 p-2 rounded-xl border border-slate-700/50 focus-within:border-blue-500/50 transition-colors">

                                <button className="p-3 text-slate-400 hover:text-yellow-400 transition-colors rounded-lg hover:bg-slate-800">
                                    <Smile size={20} />
                                </button>

                                <textarea
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            handleSendMessage('text');
                                        }
                                    }}
                                    placeholder="Enter your message..."
                                    className="flex-1 bg-transparent text-slate-200 placeholder-slate-500 text-sm p-3 focus:outline-none resize-none max-h-32"
                                    rows={1}
                                    style={{ minHeight: '44px' }}
                                />

                                <div className="flex items-center gap-1 pb-1">
                                    <button
                                        onClick={() => handleSendMessage('file')}
                                        className="p-2 text-slate-400 hover:text-blue-400 transition-colors rounded-lg hover:bg-slate-800"
                                        title="Attach File"
                                    >
                                        <Paperclip size={20} />
                                    </button>
                                    <button
                                        onClick={() => handleSendMessage('image')}
                                        className="p-2 text-slate-400 hover:text-blue-400 transition-colors rounded-lg hover:bg-slate-800"
                                        title="Send Image"
                                    >
                                        <ImageIcon size={20} />
                                    </button>
                                    <button className="p-2 text-slate-400 hover:text-blue-400 transition-colors rounded-lg hover:bg-slate-800" title="Voice Message">
                                        <Mic size={20} />
                                    </button>
                                    <button
                                        onClick={() => handleSendMessage('text')}
                                        disabled={!inputText.trim()}
                                        className={`p-3 text-white rounded-lg shadow-lg transition-all ml-1 ${!inputText.trim() ? 'bg-slate-700 cursor-not-allowed opacity-50' : 'bg-blue-600 hover:bg-blue-500 shadow-blue-900/20'}`}
                                    >
                                        <Send size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>

                    </main>
                </div>
            </Section>
        </Container>
    );
}