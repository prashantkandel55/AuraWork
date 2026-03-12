import React from 'react';
import { NavLink } from 'react-router-dom';

const tabs = [
  { to: '/',           icon: homeIcon,       label: 'Home',     end: true },
  { to: '/attendance', icon: clockIcon,       label: 'Clock',    end: false },
  { to: '/schedule',   icon: calendarIcon,   label: 'Schedule', end: false },
  { to: '/requests',   icon: requestsIcon,   label: 'Requests', end: false },
  { to: '/chat',       icon: chatIcon,       label: 'Chat',     end: false },
];

function homeIcon(active: boolean) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12L12 3L21 12V20H15V14H9V20H3V12Z" />
    </svg>
  );
}
function clockIcon(active: boolean) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
    </svg>
  );
}
function calendarIcon(active: boolean) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}
function requestsIcon(active: boolean) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
    </svg>
  );
}
function chatIcon(active: boolean) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

export const NavBar: React.FC = () => {
  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-50 flex items-center justify-around px-2 py-2"
      style={{
        background: 'rgba(10,15,26,0.9)',
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      {tabs.map(({ to, icon, label, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl text-[10px] font-semibold transition-all ${
              isActive ? 'text-sky-400' : 'text-slate-500 hover:text-slate-300'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <span className={isActive ? 'text-sky-400' : 'text-slate-500'}>{icon(isActive)}</span>
              {label}
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
};
