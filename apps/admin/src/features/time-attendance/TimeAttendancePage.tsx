import React, { useState } from 'react';

const records = [
  { employee: 'John Smith',   avatar: 'JS', date: 'Dec 14, 2023', clockIn: '07:58', clockOut: '17:04', hours: 9.1, status: 'On time' },
  { employee: 'Marcus Lee',   avatar: 'ML', date: 'Dec 14, 2023', clockIn: '08:52', clockOut: '18:13', hours: 9.35, status: 'Late' },
  { employee: 'Sara Patel',   avatar: 'SP', date: 'Dec 14, 2023', clockIn: '10:01', clockOut: '19:00', hours: 8.98, status: 'On time' },
  { employee: 'Tom Chen',     avatar: 'TC', date: 'Dec 14, 2023', clockIn: '08:01', clockOut: '17:02', hours: 9.02, status: 'On time' },
  { employee: 'Anika Dorwat', avatar: 'AD', date: 'Dec 14, 2023', clockIn: '—',    clockOut: '—',     hours: 0,    status: 'Absent' },
  { employee: 'John Smith',   avatar: 'JS', date: 'Dec 13, 2023', clockIn: '07:52', clockOut: '17:02', hours: 9.17, status: 'On time' },
  { employee: 'Marcus Lee',   avatar: 'ML', date: 'Dec 13, 2023', clockIn: '09:00', clockOut: '18:05', hours: 9.08, status: 'On time' },
  { employee: 'Sara Patel',   avatar: 'SP', date: 'Dec 13, 2023', clockIn: '10:04', clockOut: '18:57', hours: 8.88, status: 'On time' },
];

const statusStyle: Record<string, string> = {
  'On time': 'badge-green',
  'Late':    'badge-amber',
  'Absent':  'badge-red',
};

export const TimeAttendancePage: React.FC = () => {
  const [filter, setFilter] = useState<'All' | 'On time' | 'Late' | 'Absent'>('All');

  const filtered = filter === 'All' ? records : records.filter((r) => r.status === filter);

  const total = records.filter((r) => r.date === 'Dec 14, 2023');
  const present = total.filter((r) => r.status !== 'Absent').length;
  const late = total.filter((r) => r.status === 'Late').length;
  const absent = total.filter((r) => r.status === 'Absent').length;

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-bold text-slate-900">Time & Attendance</h2>
          <p className="text-xs text-slate-500 mt-0.5">Review and adjust clock-in records before payroll.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn-secondary text-xs py-2">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
            </svg>
            Export CSV
          </button>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Present',    value: present, color: 'text-emerald-600', bg: 'bg-emerald-50', icon: '✅' },
          { label: 'Late',       value: late,    color: 'text-amber-600',   bg: 'bg-amber-50',   icon: '⏰' },
          { label: 'Absent',     value: absent,  color: 'text-red-600',     bg: 'bg-red-50',     icon: '❌' },
          { label: 'Avg hours',  value: `${(records.filter(r=>r.hours>0).reduce((a,r)=>a+r.hours,0)/records.filter(r=>r.hours>0).length).toFixed(1)}h`,
            color: 'text-sky-600', bg: 'bg-sky-50', icon: '⏱️' },
        ].map((s) => (
          <div key={s.label} className={`card p-4 flex items-center gap-3 border-l-4 ${s.color.replace('text-','border-')}`}>
            <div className={`h-9 w-9 rounded-xl ${s.bg} flex items-center justify-center text-lg flex-shrink-0`}>{s.icon}</div>
            <div>
              <p className="text-[11px] text-slate-500 font-medium">{s.label}</p>
              <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-b border-slate-100">
          <div className="flex items-center gap-1 text-xs">
            {(['All', 'On time', 'Late', 'Absent'] as const).map((f) => (
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
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            Dec 13–14, 2023
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full data-table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Date</th>
                <th>Clock in</th>
                <th>Clock out</th>
                <th className="text-right">Hours</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r, i) => (
                <tr key={i}>
                  <td>
                    <div className="flex items-center gap-2.5">
                      <div className="h-7 w-7 rounded-full bg-gradient-to-br from-slate-300 to-slate-400 flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0">
                        {r.avatar}
                      </div>
                      <span className="font-medium text-slate-900">{r.employee}</span>
                    </div>
                  </td>
                  <td className="text-slate-500">{r.date}</td>
                  <td className="font-mono text-slate-700">{r.clockIn}</td>
                  <td className="font-mono text-slate-700">{r.clockOut}</td>
                  <td className="text-right font-semibold text-slate-900">{r.hours > 0 ? `${r.hours}h` : '—'}</td>
                  <td><span className={statusStyle[r.status]}>{r.status}</span></td>
                  <td className="text-right">
                    <button className="btn-ghost">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
