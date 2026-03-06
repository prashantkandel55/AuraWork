import React from 'react';
import { Link } from 'react-router-dom';

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col">
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-10 text-center space-y-10">
        <div className="flex flex-col items-center gap-3">
          <div className="h-12 w-12 rounded-2xl bg-slate-900/80 flex items-center justify-center shadow-lg shadow-sky-500/20 overflow-hidden">
            <img src="/logo.png" alt="AuraWork logo" className="h-9 w-9 object-contain" />
          </div>
          <div className="space-y-2 max-w-xs">
            <p className="text-[11px] uppercase tracking-[0.18em] text-sky-400/80">AuraWork</p>
            <h1 className="text-2xl font-semibold leading-snug">
              Workforce management that feels{' '}
              <span className="text-sky-400">simple</span> again.
            </h1>
          </div>
          <p className="text-[13px] text-slate-400 max-w-xs">
            One place for your team to clock in, view schedules, request time off, and stay connected.
          </p>
        </div>

        <div className="w-full max-w-xs space-y-3">
          <Link
            to="/attendance"
            className="block w-full rounded-xl bg-sky-500 py-3 text-sm font-semibold text-white shadow-sm hover:bg-sky-600"
          >
            Open employee app
          </Link>
          <a
            href="http://localhost:5175/login"
            className="block w-full rounded-xl border border-slate-700 py-3 text-sm font-semibold text-slate-50 hover:bg-slate-900/60"
          >
            Admin login
          </a>
        </div>

        <div className="w-full max-w-xs space-y-3 text-[11px] text-slate-500">
          <p className="font-medium text-slate-300">Add AuraWork to your home screen</p>
          <p>
            On your phone, open this site in your browser menu and choose{' '}
            <span className="font-semibold text-slate-200">"Add to Home Screen"</span> for a full-screen app
            experience.
          </p>
        </div>
      </main>

      <footer className="py-4 text-center text-[11px] text-slate-500">
        <span>AuraWork &mdash; Free, self-hosted workforce management</span>
      </footer>
    </div>
  );
};

