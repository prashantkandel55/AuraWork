import React from 'react';
import { Link } from 'react-router-dom';
import { NavBar } from './NavBar';

export const HomePage: React.FC = () => {
  const now = new Date();
  const greeting =
    now.getHours() < 12 ? 'Good morning' :
    now.getHours() < 18 ? 'Good afternoon' : 'Good evening';
  const dateStr = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  const quickLinks = [
    { to: '/attendance', icon: '🕐', label: 'Clock in',     sub: 'Track your time' },
    { to: '/schedule',   icon: '📅', label: 'My schedule',  sub: 'View upcoming shifts' },
    { to: '/requests',   icon: '📝', label: 'Requests',     sub: 'Time off & coverage' },
    { to: '/chat',       icon: '💬', label: 'Team chat',    sub: '3 new messages' },
  ];

  const todayShift = { start: '09:00', end: '18:00', location: 'Main Office', role: 'UX Designer' };

  return (
    <div className="min-h-screen flex flex-col pb-20" style={{ background: 'linear-gradient(160deg, #0a0f1a 0%, #0f172a 60%, #0a1628 100%)' }}>
      {/* Header */}
      <header className="px-5 pt-12 pb-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(135deg, #10b981, #0d9488)', boxShadow: '0 0 25px rgba(16,185,129,0.5)' }}>
              <img src="/logoo.png" alt="AuraWork" className="h-full w-full object-contain p-1" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-emerald-400/80 font-semibold">AuraWork</p>
              <p className="text-xs text-slate-400 font-medium leading-none mt-0.5">Employee Portal</p>
            </div>
          </div>
          <Link to="/chat" className="relative h-9 w-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-300">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-sky-500 border-2 border-[#0a0f1a] text-[9px] flex items-center justify-center text-white font-bold">3</span>
          </Link>
        </div>
        <p className="text-sm text-slate-400">{dateStr}</p>
        <h1 className="text-2xl font-bold text-white mt-1">{greeting}, Alex 👋</h1>
      </header>

      <div className="flex-1 px-5 space-y-4">
        {/* Today's shift card */}
        <div className="rounded-2xl p-5" style={{ background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 50%, #0369a1 100%)', boxShadow: '0 8px 32px rgba(14,165,233,0.25)' }}>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sky-100/80 text-xs font-semibold uppercase tracking-wide">Today's shift</p>
              <p className="text-white text-2xl font-bold mt-1">{todayShift.start} – {todayShift.end}</p>
              <p className="text-sky-100/80 text-xs mt-1">{todayShift.role} · {todayShift.location}</p>
            </div>
            <div className="h-10 w-10 rounded-2xl bg-white/20 flex items-center justify-center">
              <span className="text-xl">📍</span>
            </div>
          </div>
          <div className="mt-4 h-1.5 rounded-full bg-white/20">
            <div className="h-full w-1/3 rounded-full bg-white/70" />
          </div>
          <div className="flex justify-between text-xs text-sky-100/60 mt-1">
            <span>3h elapsed</span>
            <span>6h remaining</span>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: 'Hours this week', value: '24.5h', icon: '⏱️', color: '#10b981' },
            { label: 'Days present',    value: '3 of 5', icon: '📊', color: '#0ea5e9' },
          ].map((s) => (
            <div key={s.label} className="glass-card p-4">
              <span className="text-xl">{s.icon}</span>
              <p className="text-xl font-bold text-white mt-2" style={{ color: s.color }}>{s.value}</p>
              <p className="text-[11px] text-slate-500 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Quick links */}
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">Quick access</p>
          <div className="grid grid-cols-2 gap-3">
            {quickLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="glass-card p-4 flex items-start gap-3 hover:border-sky-500/40 transition-all active:scale-95"
              >
                <span className="text-2xl flex-shrink-0">{l.icon}</span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-white">{l.label}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5 truncate">{l.sub}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* PWA tip */}
        <div className="glass-card p-4 flex items-center gap-3">
          <span className="text-2xl flex-shrink-0">📱</span>
          <div>
            <p className="text-xs font-semibold text-slate-300">Add to Home Screen</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Tap your browser menu → "Add to Home Screen" for the full app experience.</p>
          </div>
        </div>
      </div>

      <NavBar />
    </div>
  );
};
