import React from 'react';

export const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="px-4 py-3 border-b border-slate-100">
          <h1 className="text-lg font-semibold text-slate-900">Sign in to AuraWork</h1>
          <p className="text-sm text-slate-500">Admin access for schedule and workforce management.</p>
        </div>
        <div className="p-4">
          <form className="space-y-4">
            <div className="space-y-1">
              <label className="block text-sm font-medium text-slate-700">Email</label>
              <input
                type="email"
                className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                placeholder="you@example.com"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-sm font-medium text-slate-700">Password</label>
              <input
                type="password"
                className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                placeholder="••••••••"
              />
            </div>
            <button
              className="w-full mt-4 inline-flex items-center justify-center rounded-md bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-500"
              type="submit"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

