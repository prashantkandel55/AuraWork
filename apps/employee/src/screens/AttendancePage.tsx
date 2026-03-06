import React from 'react';
import { Link } from 'react-router-dom';

export const AttendancePage: React.FC = () => {
  const today = 'Thu, 14 Nov 2023 (today)';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col">
      <header className="h-16 px-4 flex items-center justify-between bg-gradient-to-r from-sky-800 to-sky-600 shadow-sm">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-2xl bg-slate-950/20 flex items-center justify-center overflow-hidden">
              <img src="/logo.png" alt="AuraWork logo" className="h-6 w-6 object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-[0.18em] text-sky-100/80">AuraWork</span>
              <span className="text-xs font-semibold text-white/90">Live attendance</span>
            </div>
          </Link>
        </div>
        <Link to="/chat" className="text-[11px] text-sky-50/90 underline-offset-2">
          Chat
        </Link>
      </header>

      <main className="flex-1 px-4 py-4 space-y-4 max-w-sm w-full mx-auto">
        <section className="rounded-2xl bg-white text-slate-900 shadow-sm p-4 space-y-4">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-slate-700">Live attendance</p>
            <p className="text-[11px] text-slate-500">{today}</p>
            <p className="text-[11px] text-slate-500">Working office hours (08:00 - 17:00)</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between text-[11px] text-slate-500">
              <span>Start time</span>
              <span>End time</span>
            </div>
            <div className="h-1.5 rounded-full bg-slate-100 relative overflow-hidden">
              <div className="absolute inset-y-0 left-0 w-1/3 rounded-full bg-sky-500" />
            </div>
          </div>

          <button className="w-full rounded-xl bg-sky-600 py-3 text-sm font-semibold text-white shadow-sm hover:bg-sky-700">
            Clock in
          </button>
        </section>

        <section className="rounded-2xl bg-white text-slate-900 shadow-sm p-4 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-slate-700">Attendance log</p>
            <button className="rounded-full border border-slate-200 px-3 py-1 text-[11px] text-slate-600 hover:bg-slate-50">
              Filter
            </button>
          </div>

          <div className="space-y-3 text-[11px]">
            <div className="border-b border-slate-100 pb-2">
              <p className="text-slate-500 mb-1">13 Nov 2023</p>
              <div className="flex justify-between">
                <div>
                  <p className="text-slate-400">Start time</p>
                  <p className="text-slate-800">07:52</p>
                </div>
                <div>
                  <p className="text-slate-400">End time</p>
                  <p className="text-slate-800">17:02</p>
                </div>
                <div className="text-right">
                  <p className="text-slate-400">Working time</p>
                  <p className="text-emerald-600 font-semibold">09:18:24</p>
                </div>
              </div>
            </div>
            <div className="border-b border-slate-100 pb-2">
              <p className="text-slate-500 mb-1">12 Nov 2023</p>
              <div className="flex justify-between">
                <div>
                  <p className="text-slate-400">Start time</p>
                  <p className="text-slate-800">08:37</p>
                </div>
                <div>
                  <p className="text-slate-400">End time</p>
                  <p className="text-slate-800">16:18</p>
                </div>
                <div className="text-right">
                  <p className="text-slate-400">Working time</p>
                  <p className="text-rose-600 font-semibold">07:41:21</p>
                </div>
              </div>
            </div>
            <div>
              <p className="text-slate-500 mb-1">11 Nov 2023</p>
              <div className="flex justify-between">
                <div>
                  <p className="text-slate-400">Start time</p>
                  <p className="text-slate-800">08:00</p>
                </div>
                <div>
                  <p className="text-slate-400">End time</p>
                  <p className="text-slate-800">17:28</p>
                </div>
                <div className="text-right">
                  <p className="text-slate-400">Working time</p>
                  <p className="text-emerald-600 font-semibold">09:28:54</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

