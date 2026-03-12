import React, { useState } from 'react';

type Status = 'Pending' | 'Approved' | 'Denied';
type ReqType = 'Time off' | 'Coverage' | 'Shift swap';

interface Request {
  id: number;
  employee: string;
  avatar: string;
  type: ReqType;
  dates: string;
  reason: string;
  status: Status;
  submitted: string;
}

const initialRequests: Request[] = [
  { id: 1, employee: 'Jane Cooper',   avatar: 'JC', type: 'Time off',   dates: 'Dec 20–22',  reason: 'Family vacation',        status: 'Pending',  submitted: '2h ago' },
  { id: 2, employee: 'Anika Dorwat', avatar: 'AD', type: 'Time off',   dates: 'Dec 26–31',  reason: 'Holiday travel',         status: 'Pending',  submitted: '5h ago' },
  { id: 3, employee: 'Marcus Lee',   avatar: 'ML', type: 'Coverage',   dates: 'Dec 16 AM',  reason: 'Doctor appointment',     status: 'Pending',  submitted: '1d ago' },
  { id: 4, employee: 'Tom Chen',     avatar: 'TC', type: 'Shift swap', dates: 'Dec 18↔19',  reason: 'Personal commitment',    status: 'Approved', submitted: '2d ago' },
  { id: 5, employee: 'Sara Patel',   avatar: 'SP', type: 'Time off',   dates: 'Dec 29',     reason: 'Personal day',           status: 'Denied',   submitted: '3d ago' },
];

const typeColor: Record<ReqType, string> = {
  'Time off':   'badge-blue',
  'Coverage':   'badge-amber',
  'Shift swap': 'badge-slate',
};

const statusStyle: Record<Status, string> = {
  'Pending':  'badge-amber',
  'Approved': 'badge-green',
  'Denied':   'badge-red',
};

export const RequestsPage: React.FC = () => {
  const [requests, setRequests] = useState<Request[]>(initialRequests);
  const [filter, setFilter] = useState<Status | 'All'>('All');

  const act = (id: number, action: 'Approved' | 'Denied') => {
    setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status: action } : r)));
  };

  const filtered = filter === 'All' ? requests : requests.filter((r) => r.status === filter);

  const counts = {
    All: requests.length,
    Pending: requests.filter((r) => r.status === 'Pending').length,
    Approved: requests.filter((r) => r.status === 'Approved').length,
    Denied: requests.filter((r) => r.status === 'Denied').length,
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-bold text-slate-900">Requests</h2>
          <p className="text-xs text-slate-500 mt-0.5">Approve or deny time off, coverage, and shift swap requests.</p>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {([
          { label: 'Pending',  count: counts.Pending,  color: 'text-amber-600',  bg: 'bg-amber-50',  icon: '⏳' },
          { label: 'Approved', count: counts.Approved, color: 'text-emerald-600',bg: 'bg-emerald-50',icon: '✅' },
          { label: 'Denied',   count: counts.Denied,   color: 'text-red-600',    bg: 'bg-red-50',    icon: '❌' },
          { label: 'Total',    count: counts.All,      color: 'text-slate-700',  bg: 'bg-slate-100', icon: '📋' },
        ] as const).map((s) => (
          <div key={s.label} className="card p-4 flex items-center gap-3">
            <div className={`h-9 w-9 rounded-xl ${s.bg} flex items-center justify-center text-lg flex-shrink-0`}>{s.icon}</div>
            <div>
              <p className="text-[11px] text-slate-500 font-medium">{s.label}</p>
              <p className={`text-xl font-bold ${s.color}`}>{s.count}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-b border-slate-100">
          <div className="flex items-center gap-1 text-xs">
            {(['All', 'Pending', 'Approved', 'Denied'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                  filter === f
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-500 hover:bg-slate-100'
                }`}
              >
                {f}
                {f !== 'All' && (
                  <span className={`ml-1.5 rounded-full px-1.5 py-0.5 text-[10px] ${filter === f ? 'bg-white/20' : 'bg-slate-200'}`}>
                    {counts[f]}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full data-table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Type</th>
                <th>Dates</th>
                <th>Reason</th>
                <th>Submitted</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id}>
                  <td>
                    <div className="flex items-center gap-2.5">
                      <div className="h-7 w-7 rounded-full bg-gradient-to-br from-slate-300 to-slate-400 flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0">
                        {r.avatar}
                      </div>
                      <span className="font-medium text-slate-900">{r.employee}</span>
                    </div>
                  </td>
                  <td><span className={typeColor[r.type]}>{r.type}</span></td>
                  <td className="text-slate-700 font-medium">{r.dates}</td>
                  <td className="text-slate-500 max-w-[160px] truncate">{r.reason}</td>
                  <td className="text-slate-400 text-[11px]">{r.submitted}</td>
                  <td><span className={statusStyle[r.status]}>{r.status}</span></td>
                  <td className="text-right">
                    {r.status === 'Pending' ? (
                      <div className="inline-flex gap-2">
                        <button
                          className="btn-primary text-xs py-1 px-3"
                          onClick={() => act(r.id, 'Approved')}
                        >
                          Approve
                        </button>
                        <button
                          className="btn-danger text-xs py-1 px-3"
                          onClick={() => act(r.id, 'Denied')}
                        >
                          Deny
                        </button>
                      </div>
                    ) : (
                      <button
                        className="btn-ghost text-xs"
                        onClick={() => act(r.id, 'Pending')}
                      >
                        Undo
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center text-slate-400 py-10">No requests match this filter.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
