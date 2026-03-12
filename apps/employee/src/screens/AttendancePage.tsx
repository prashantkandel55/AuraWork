import React, { useState, useEffect, useRef } from 'react';
import { NavBar } from './NavBar';

const LOG = [
  { date: 'Wed, Dec 13', clockIn: '07:52', clockOut: '17:02', hours: '9:10', status: 'Full day' },
  { date: 'Tue, Dec 12', clockIn: '08:37', clockOut: '16:18', hours: '7:41', status: 'Short day' },
  { date: 'Mon, Dec 11', clockIn: '08:00', clockOut: '17:28', hours: '9:28', status: 'Full day' },
  { date: 'Fri, Dec 8',  clockIn: '07:55', clockOut: '17:05', hours: '9:10', status: 'Full day' },
  { date: 'Thu, Dec 7',  clockIn: '09:10', clockOut: '18:10', hours: '9:00', status: 'Full day' },
];

export const AttendancePage: React.FC = () => {
  const [clockedIn, setClockedIn] = useState(false);
  const [clockInTime, setClockInTime] = useState<Date | null>(null);
  const [elapsed, setElapsed] = useState('00:00:00');
  const [now, setNow] = useState(new Date());
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Live clock
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  // Elapsed timer
  useEffect(() => {
    if (clockedIn && clockInTime) {
      tickRef.current = setInterval(() => {
        const diff = Date.now() - clockInTime.getTime();
        const h = Math.floor(diff / 3600000);
        const m = Math.floor((diff % 3600000) / 60000);
        const s = Math.floor((diff % 60000) / 1000);
        setElapsed(
          `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
        );
      }, 1000);
    } else {
      if (tickRef.current) clearInterval(tickRef.current);
      setElapsed('00:00:00');
    }
    return () => { if (tickRef.current) clearInterval(tickRef.current); };
  }, [clockedIn, clockInTime]);

  const handleClockAction = () => {
    if (clockedIn) {
      setClockedIn(false);
      setClockInTime(null);
    } else {
      setClockedIn(true);
      setClockInTime(new Date());
    }
  };

  const shiftStart = new Date(); shiftStart.setHours(9, 0, 0, 0);
  const shiftEnd   = new Date(); shiftEnd.setHours(18, 0, 0, 0);
  const progress = Math.min(((now.getTime() - shiftStart.getTime()) / (shiftEnd.getTime() - shiftStart.getTime())) * 100, 100);
  const clampedProgress = Math.max(0, progress);

  const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  return (
    <div className="min-h-screen flex flex-col pb-20" style={{ background: 'linear-gradient(160deg, #0a0f1a 0%, #0f172a 100%)' }}>
      <header className="px-5 pt-12 pb-4 flex items-center justify-between">
        <div>
          <p className="text-xs text-slate-500 font-medium">Thu, Dec 14, 2023</p>
          <h1 className="text-xl font-bold text-white">Attendance</h1>
        </div>
        <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-xs font-bold text-white shadow-lg shadow-emerald-500/30">
          AX
        </div>
      </header>

      <div className="flex-1 px-5 space-y-4">
        {/* Live clock */}
        <div
          className="rounded-2xl p-6 flex flex-col items-center text-center"
          style={{ background: 'linear-gradient(135deg, #1e293b, #0f172a)', border: '1px solid rgba(255,255,255,0.08)' }}
        >
          <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold mb-3">Live clock</p>
          <p className="text-5xl font-bold text-white font-mono tabular-nums" style={{ letterSpacing: '-0.02em' }}>
            {timeStr}
          </p>
          <p className="text-xs text-slate-500 mt-2">Working hours: 09:00 – 18:00</p>

          {/* Progress bar */}
          <div className="w-full mt-4">
            <div className="flex justify-between text-[10px] text-slate-500 mb-1.5">
              <span>09:00</span>
              <span>18:00</span>
            </div>
            <div className="h-2 rounded-full bg-slate-800 overflow-hidden relative">
              <div
                className="h-full rounded-full transition-all duration-1000"
                style={{ width: `${clampedProgress}%`, background: 'linear-gradient(90deg, #10b981, #0ea5e9)' }}
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-1.5 text-right">{Math.round(clampedProgress)}% of shift complete</p>
          </div>
        </div>

        {/* Clock in/out */}
        <div className="glass-card p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 font-medium">Status</p>
              <div className="flex items-center gap-2 mt-1">
                <span className={`h-2 w-2 rounded-full ${clockedIn ? 'bg-emerald-500' : 'bg-slate-600'} ${clockedIn ? 'animate-pulse' : ''}`} />
                <span className={`text-sm font-semibold ${clockedIn ? 'text-emerald-400' : 'text-slate-400'}`}>
                  {clockedIn ? 'Clocked in' : 'Not clocked in'}
                </span>
              </div>
            </div>
            {clockedIn && (
              <div className="text-right">
                <p className="text-[10px] text-slate-500">Elapsed</p>
                <p className="text-lg font-bold text-white font-mono tabular-nums">{elapsed}</p>
              </div>
            )}
          </div>
          {clockedIn && clockInTime && (
            <p className="text-xs text-slate-500">
              Clocked in at <span className="text-white font-semibold">{clockInTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
            </p>
          )}
          <button
            onClick={handleClockAction}
            className={clockedIn ? 'emp-btn-danger' : 'emp-btn-primary'}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              {clockedIn
                ? <><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></>
                : <><circle cx="12" cy="12" r="10" /><polygon points="10 8 16 12 10 16 10 8" /></>
              }
            </svg>
            {clockedIn ? 'Clock out' : 'Clock in now'}
          </button>
        </div>

        {/* Log */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-white">Attendance log</h2>
            <button className="text-xs text-sky-400 hover:text-sky-300">View all →</button>
          </div>
          <div className="space-y-2">
            {LOG.map((r) => (
              <div key={r.date} className="glass-card p-4 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-white">{r.date}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">{r.clockIn} → {r.clockOut}</p>
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-sm font-bold text-emerald-400 font-mono">{r.hours}</p>
                  <span className={`pill ${r.status === 'Full day' ? 'pill-green' : 'pill-amber'}`}>{r.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <NavBar />
    </div>
  );
};
