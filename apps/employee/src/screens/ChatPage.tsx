import React, { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { NavBar } from './NavBar';

interface ChatItem {
  id: string;
  sender: string;
  avatar: string;
  body: string;
  createdAt: string;
  own?: boolean;
}

// Seed messages for demo (no server required to look good)
const SEED_MESSAGES: ChatItem[] = [
  { id: '1', sender: 'Marcus Lee',  avatar: 'ML', body: "Hey team! Don't forget we have the design review at 14:00 today 🎨", createdAt: new Date(Date.now() - 3600000 * 2).toISOString() },
  { id: '2', sender: 'Sara Patel',  avatar: 'SP', body: 'On it! I\'ll prepare the slides by 13:30.', createdAt: new Date(Date.now() - 3600000 * 1.5).toISOString() },
  { id: '3', sender: 'Tom Chen',    avatar: 'TC', body: 'Great, I\'ll join remotely. 👍', createdAt: new Date(Date.now() - 3600000).toISOString() },
  { id: '4', sender: 'You',         avatar: 'AX', body: 'Sounds good, I\'ll be there!', createdAt: new Date(Date.now() - 1800000).toISOString(), own: true },
  { id: '5', sender: 'Marcus Lee',  avatar: 'ML', body: 'Also, who\'s covering the morning shift on Friday?', createdAt: new Date(Date.now() - 600000).toISOString() },
];

const avatarColor: Record<string, string> = {
  ML: 'from-purple-500 to-pink-500',
  SP: 'from-orange-400 to-rose-500',
  TC: 'from-sky-400 to-blue-500',
  AX: 'from-emerald-400 to-teal-500',
  JC: 'from-yellow-400 to-orange-500',
};

export const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<ChatItem[]>(SEED_MESSAGES);
  const [draft, setDraft] = useState('');
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connected, setConnected] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const s = io('http://localhost:3000', { timeout: 3000 });
      s.on('connect', () => setConnected(true));
      s.on('disconnect', () => setConnected(false));
      s.on('message:new', (msg: ChatItem) => {
        setMessages((prev) => [...prev, msg]);
      });
      setSocket(s);
      return () => { s.disconnect(); };
    } catch {
      // Server not running – run in demo mode
    }
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = () => {
    const body = draft.trim();
    if (!body) return;
    const msg: ChatItem = {
      id: String(Date.now()),
      sender: 'You',
      avatar: 'AX',
      body,
      createdAt: new Date().toISOString(),
      own: true,
    };
    if (socket && connected) {
      socket.emit('message:send', { body });
    }
    setMessages((prev) => [...prev, msg]);
    setDraft('');
  };

  const formatTime = (iso: string) =>
    new Date(iso).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="min-h-screen flex flex-col pb-20" style={{ background: 'linear-gradient(160deg, #0a0f1a 0%, #0f172a 100%)' }}>
      {/* Header */}
      <header className="px-5 pt-12 pb-3 border-b border-white/5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-white">Team chat</h1>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className={`h-1.5 w-1.5 rounded-full ${connected ? 'bg-emerald-500' : 'bg-slate-600'}`} />
              <p className="text-xs text-slate-500">{connected ? 'Connected · General' : 'Offline mode'}</p>
            </div>
          </div>
          <div className="flex -space-x-2">
            {['ML', 'SP', 'TC'].map((av) => (
              <div key={av} className={`h-8 w-8 rounded-full bg-gradient-to-br ${avatarColor[av]} flex items-center justify-center text-[10px] font-bold text-white border-2 border-[#0a0f1a]`}>
                {av}
              </div>
            ))}
            <div className="h-8 w-8 rounded-full bg-slate-800 border-2 border-[#0a0f1a] flex items-center justify-center text-[10px] text-slate-400 font-semibold">+2</div>
          </div>
        </div>
      </header>

      {/* Messages */}
      <main className="flex-1 px-4 py-4 overflow-y-auto flex flex-col gap-3">
        {messages.map((m) => (
          <div key={m.id} className={`flex items-end gap-2.5 ${m.own ? 'flex-row-reverse' : ''}`}>
            {!m.own && (
              <div className={`h-7 w-7 rounded-full bg-gradient-to-br ${avatarColor[m.avatar] ?? 'from-slate-400 to-slate-500'} flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0`}>
                {m.avatar}
              </div>
            )}
            <div className={`max-w-[75%] ${m.own ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
              {!m.own && <p className="text-[10px] text-slate-500 px-1">{m.sender}</p>}
              <div
                className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                  m.own
                    ? 'rounded-br-md text-white'
                    : 'rounded-bl-md text-slate-100'
                }`}
                style={m.own
                  ? { background: 'linear-gradient(135deg, #0ea5e9, #0284c7)' }
                  : { background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.08)' }
                }
              >
                {m.body}
              </div>
              <p className="text-[10px] text-slate-600 px-1">{formatTime(m.createdAt)}</p>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </main>

      {/* Input */}
      <div
        className="px-4 py-3 flex items-center gap-2"
        style={{ background: 'rgba(10,15,26,0.8)', backdropFilter: 'blur(20px)', borderTop: '1px solid rgba(255,255,255,0.06)' }}
      >
        <input
          className="flex-1 rounded-2xl bg-slate-800 border border-slate-700 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500 transition-all"
          placeholder="Message the team..."
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } }}
        />
        <button
          onClick={send}
          disabled={!draft.trim()}
          className="h-11 w-11 rounded-2xl flex items-center justify-center text-white transition-all active:scale-90 disabled:opacity-40"
          style={{ background: 'linear-gradient(135deg, #0ea5e9, #0284c7)', boxShadow: '0 4px 14px rgba(14,165,233,0.3)' }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </div>

      <NavBar />
    </div>
  );
};
