import React from 'react';
import { Link } from 'react-router-dom';

export const SchedulePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col">
      <header className="h-14 flex items-center justify-between px-4 border-b border-slate-800">
        <Link to="/" className="text-xs text-slate-400">
          Back
        </Link>
        <span className="text-sm font-semibold">My schedule</span>
        <div className="w-8" />
      </header>
      <main className="flex-1 p-4 space-y-3">
        <div className="rounded-xl border border-slate-800 bg-slate-900">
          <div className="px-4 py-3 border-b border-slate-800">
            <span className="text-xs text-slate-400">Upcoming shifts</span>
          </div>
          <div className="p-4">
            <p className="text-xs text-slate-500">Your upcoming shifts will appear here.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

