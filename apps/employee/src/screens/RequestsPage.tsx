import React, { useState } from 'react';
import { NavBar } from './NavBar';

type ReqStatus = 'Pending' | 'Approved' | 'Denied';

interface MyRequest {
  id: number;
  type: string;
  dates: string;
  reason: string;
  status: ReqStatus;
  submitted: string;
}

const myRequests: MyRequest[] = [
  { id: 1, type: 'Time off', dates: 'Dec 22', reason: 'Family vacation', status: 'Approved', submitted: 'Dec 10' },
  { id: 2, type: 'Coverage', dates: 'Dec 19 AM', reason: 'Doctor appointment', status: 'Pending', submitted: 'Dec 13' },
];

const statusStyle: Record<ReqStatus, string> = {
  'Approved': 'pill-green',
  'Pending':  'pill-amber',
  'Denied':   'pill-red',
};

export const RequestsPage: React.FC = () => {
  const [tab, setTab] = useState<'new' | 'history'>('history');
  const [form, setForm] = useState({ type: 'Time off', startDate: '', endDate: '', reason: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setTab('history'); setForm({ type: 'Time off', startDate: '', endDate: '', reason: '' }); }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col pb-20" style={{ background: 'linear-gradient(160deg, #0a0f1a 0%, #0f172a 100%)' }}>
      <header className="px-5 pt-12 pb-4">
        <p className="text-xs text-slate-500 font-medium">Manage your requests</p>
        <h1 className="text-xl font-bold text-white">Requests</h1>
      </header>

      <div className="flex-1 px-5 space-y-4">
        {/* Tabs */}
        <div className="flex gap-1 p-1 rounded-2xl" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
          {(['history', 'new'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                tab === t
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {t === 'history' ? 'My requests' : '+ New request'}
            </button>
          ))}
        </div>

        {tab === 'history' && (
          <div className="space-y-3">
            {myRequests.length === 0 ? (
              <div className="glass-card p-8 text-center text-slate-500 text-sm">No requests yet.</div>
            ) : (
              myRequests.map((r) => (
                <div key={r.id} className="glass-card p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-semibold text-white">{r.type}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{r.dates}</p>
                    </div>
                    <span className={`pill ${statusStyle[r.status]}`}>{r.status}</span>
                  </div>
                  <p className="text-xs text-slate-400">{r.reason}</p>
                  <p className="text-[10px] text-slate-600">Submitted {r.submitted}</p>
                </div>
              ))
            )}
          </div>
        )}

        {tab === 'new' && (
          <div className="glass-card p-5">
            {submitted ? (
              <div className="flex flex-col items-center gap-3 py-6">
                <span className="text-5xl">✅</span>
                <p className="text-sm font-semibold text-white">Request submitted!</p>
                <p className="text-xs text-slate-500">Your manager will review it shortly.</p>
              </div>
            ) : (
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-2">Request type</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Time off', 'Coverage', 'Shift swap'].map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setForm((f) => ({ ...f, type: t }))}
                        className={`py-2.5 rounded-xl text-xs font-semibold transition-all border ${
                          form.type === t
                            ? 'bg-sky-500 border-sky-500 text-white'
                            : 'border-slate-700 text-slate-400 hover:border-slate-500'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1.5">Start date</label>
                    <input
                      type="date"
                      className="w-full rounded-xl px-3 py-2.5 text-sm bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500 transition-all"
                      value={form.startDate}
                      onChange={(e) => setForm((f) => ({ ...f, startDate: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1.5">End date</label>
                    <input
                      type="date"
                      className="w-full rounded-xl px-3 py-2.5 text-sm bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500 transition-all"
                      value={form.endDate}
                      onChange={(e) => setForm((f) => ({ ...f, endDate: e.target.value }))}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">Reason</label>
                  <textarea
                    rows={3}
                    className="w-full rounded-xl px-3 py-2.5 text-sm bg-slate-800 border border-slate-700 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500 transition-all resize-none"
                    placeholder="Briefly explain your request..."
                    value={form.reason}
                    onChange={(e) => setForm((f) => ({ ...f, reason: e.target.value }))}
                    required
                  />
                </div>
                <button type="submit" className="emp-btn-primary">Submit request</button>
              </form>
            )}
          </div>
        )}
      </div>

      <NavBar />
    </div>
  );
};
