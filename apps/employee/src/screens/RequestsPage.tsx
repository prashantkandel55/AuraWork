import React from 'react';
import { Link } from 'react-router-dom';

export const RequestsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col">
      <header className="h-14 flex items-center justify-between px-4 border-b border-slate-800">
        <Link to="/" className="text-xs text-slate-400">
          Back
        </Link>
        <span className="text-sm font-semibold">Requests</span>
        <div className="w-8" />
      </header>
      <main className="flex-1 p-4 space-y-3">
        <div className="rounded-xl border border-slate-800 bg-slate-900">
          <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between w-full">
            <span className="text-xs text-slate-400">Time off</span>
            <button className="inline-flex items-center rounded-md bg-sky-600 px-3 py-1 text-xs font-medium text-white hover:bg-sky-700">
              New
            </button>
          </div>
          <div className="p-4">
            <p className="text-xs text-slate-500">Submit and track your time-off requests.</p>
          </div>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900">
          <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between w-full">
            <span className="text-xs text-slate-400">Coverage</span>
            <button className="inline-flex items-center rounded-md bg-slate-100 px-3 py-1 text-xs font-medium text-slate-900 hover:bg-slate-200">
              Open shifts
            </button>
          </div>
          <div className="p-4">
            <p className="text-xs text-slate-500">Request coverage or pick up extra shifts.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

