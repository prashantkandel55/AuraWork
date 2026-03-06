import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';

interface ChatItem {
  id: string;
  body: string;
  createdAt: string;
}

export const ChatPage: React.FC = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<ChatItem[]>([]);
  const [draft, setDraft] = useState('');

  useEffect(() => {
    const s = io('http://localhost:3000');
    s.on('message:new', (msg: ChatItem) => {
      setMessages((prev) => [...prev, msg]);
    });
    setSocket(s);
    return () => {
      s.disconnect();
    };
  }, []);

  const send = () => {
    if (!socket || !draft.trim()) return;
    socket.emit('message:send', { body: draft });
    setDraft('');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col">
      <header className="h-14 flex items-center justify-between px-4 border-b border-slate-800">
        <Link to="/" className="text-xs text-slate-400">
          Back
        </Link>
        <span className="text-sm font-semibold">General chat</span>
        <div className="w-8" />
      </header>
      <main className="flex-1 p-4 flex flex-col gap-3">
        <div className="flex-1 rounded-xl border border-slate-800 bg-slate-900">
          <div className="px-4 py-3 border-b border-slate-800">
            <span className="text-xs text-slate-400">Messages</span>
          </div>
          <div className="p-4 flex flex-col gap-2 text-xs text-slate-200 max-h-[60vh] overflow-y-auto">
            {messages.length === 0 ? (
              <p className="text-slate-500 text-[11px]">Chat messages will appear here.</p>
            ) : (
              messages.map((m) => (
                <div key={m.id} className="rounded-lg bg-slate-800 px-3 py-2">
                  <p>{m.body}</p>
                  <p className="text-[10px] text-slate-400 mt-1">
                    {new Date(m.createdAt).toLocaleTimeString()}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <input
            className="flex-1 rounded-full bg-slate-900 border border-slate-800 px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
            placeholder="Message everyone..."
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                send();
              }
            }}
          />
          <button
            className="inline-flex items-center rounded-md bg-sky-600 px-3 py-2 text-xs font-medium text-white hover:bg-sky-700"
            onClick={send}
          >
            Send
          </button>
        </div>
      </main>
    </div>
  );
};

