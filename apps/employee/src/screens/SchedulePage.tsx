import React from 'react';
import { NavBar } from './NavBar';

const shifts = [
  { day: 'Thu', date: 'Dec 14', start: '09:00', end: '18:00', role: 'UX Designer',     location: 'Main Office', status: 'today' },
  { day: 'Fri', date: 'Dec 15', start: '09:00', end: '18:00', role: 'UX Designer',     location: 'Main Office', status: 'upcoming' },
  { day: 'Mon', date: 'Dec 18', start: '09:00', end: '18:00', role: 'UX Designer',     location: 'Remote',      status: 'upcoming' },
  { day: 'Tue', date: 'Dec 19', start: '10:00', end: '19:00', role: 'Design Review',   location: 'West Office', status: 'upcoming' },
  { day: 'Wed', date: 'Dec 20', start: '09:00', end: '18:00', role: 'UX Designer',     location: 'Main Office', status: 'upcoming' },
  { day: 'Thu', date: 'Dec 21', start: '09:00', end: '17:00', role: 'UX Designer',     location: 'Main Office', status: 'upcoming' },
  { day: 'Fri', date: 'Dec 22', start: '—',     end: '—',     role: 'Time off',        location: '—',           status: 'off' },
];

const weekDays = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
const today = new Date();
const weekStart = new Date(today);
weekStart.setDate(today.getDate() - today.getDay() + 1);

export const SchedulePage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col pb-20" style={{ background: 'linear-gradient(160deg, #0a0f1a 0%, #0f172a 100%)' }}>
      <header className="px-5 pt-12 pb-4">
        <p className="text-xs text-slate-500 font-medium">Dec 11 – Dec 17, 2023</p>
        <h1 className="text-xl font-bold text-white">My schedule</h1>
      </header>

      <div className="flex-1 px-5 space-y-4">
        {/* Week mini calendar */}
        <div className="glass-card p-4">
          <div className="grid grid-cols-7 gap-1">
            {weekDays.map((d, i) => {
              const date = new Date(weekStart);
              date.setDate(weekStart.getDate() + i);
              const isToday = date.toDateString() === today.toDateString();
              const hasShift = i < 5;
              return (
                <div key={d} className={`flex flex-col items-center gap-1 py-2 rounded-xl ${isToday ? 'bg-sky-500' : ''}`}>
                  <span className={`text-[10px] font-semibold ${isToday ? 'text-white' : 'text-slate-500'}`}>{d}</span>
                  <span className={`text-sm font-bold ${isToday ? 'text-white' : 'text-slate-300'}`}>{date.getDate()}</span>
                  {hasShift && !isToday && (
                    <span className="h-1 w-1 rounded-full bg-emerald-500" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Shifts',      value: '5' },
            { label: 'Total hours', value: '45h' },
            { label: 'Days off',    value: '2' },
          ].map((s) => (
            <div key={s.label} className="glass-card p-3 text-center">
              <p className="text-lg font-bold text-white">{s.value}</p>
              <p className="text-[10px] text-slate-500 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Shift list */}
        <div>
          <h2 className="text-sm font-semibold text-white mb-3">Upcoming shifts</h2>
          <div className="space-y-2.5">
            {shifts.map((s, i) => (
              <div
                key={i}
                className={`rounded-2xl p-4 flex items-center gap-4 ${
                  s.status === 'today'
                    ? 'border border-sky-500/50'
                    : s.status === 'off'
                      ? 'border border-slate-700/50 opacity-60'
                      : 'glass-card'
                }`}
                style={s.status === 'today' ? { background: 'linear-gradient(135deg, rgba(14,165,233,0.15), rgba(2,132,199,0.10))' } : {}}
              >
                <div
                  className="flex flex-col items-center justify-center h-12 w-12 rounded-xl flex-shrink-0"
                  style={{ background: s.status === 'today' ? 'rgba(14,165,233,0.2)' : 'rgba(255,255,255,0.05)' }}
                >
                  <p className="text-[10px] font-semibold text-slate-400">{s.day}</p>
                  <p className="text-base font-bold text-white">{s.date.split(' ')[1]}</p>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-white truncate">{s.role}</p>
                    {s.status === 'today' && (
                      <span className="pill pill-sky flex-shrink-0">Today</span>
                    )}
                    {s.status === 'off' && (
                      <span className="pill pill-amber flex-shrink-0">Day off</span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5 truncate">
                    {s.start !== '—' ? `${s.start} – ${s.end} · ${s.location}` : s.location}
                  </p>
                </div>
                {s.start !== '—' && (
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs font-semibold text-slate-300 font-mono">{s.start}</p>
                    <p className="text-[10px] text-slate-600">→ {s.end}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <NavBar />
    </div>
  );
};
