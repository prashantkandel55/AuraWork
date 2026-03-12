import React, { useState } from 'react';

const periods = [
  { period: 'Dec 1–15, 2023',  status: 'Open',    hours: 312.5, pay: 18750, employees: 5 },
  { period: 'Nov 16–30, 2023', status: 'Closed',  hours: 298.0, pay: 17880, employees: 5 },
  { period: 'Nov 1–15, 2023',  status: 'Paid',    hours: 285.5, pay: 17130, employees: 5 },
  { period: 'Oct 16–31, 2023', status: 'Paid',    hours: 310.0, pay: 18600, employees: 5 },
];

const employeePayroll = [
  { name: 'John Smith',   avatar: 'JS', role: 'UX Designer',      hours: 76.5, rate: 55, gross: 4207.50 },
  { name: 'Marcus Lee',   avatar: 'ML', role: 'Backend Engineer', hours: 80.0, rate: 70, gross: 5600.00 },
  { name: 'Sara Patel',   avatar: 'SP', role: 'Product Manager',  hours: 72.0, rate: 75, gross: 5400.00 },
  { name: 'Tom Chen',     avatar: 'TC', role: 'DevOps Engineer',  hours: 84.0, rate: 65, gross: 5460.00 },
  { name: 'Anika Dorwat', avatar: 'AD', role: 'React Developer',  hours: 0,    rate: 60, gross: 0 },
];

const statusStyle: Record<string, string> = {
  'Open':   'badge-amber',
  'Closed': 'badge-blue',
  'Paid':   'badge-green',
};

export const PayrollPage: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState(0);
  const current = periods[selectedPeriod];

  const totalGross = employeePayroll.reduce((a, e) => a + e.gross, 0);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-bold text-slate-900">Payroll</h2>
          <p className="text-xs text-slate-500 mt-0.5">Track hours and gross pay by payroll period.</p>
        </div>
        <button className="btn-primary text-xs py-2">+ New period</button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Period',       value: current.period, color: 'text-slate-900',   icon: '📆' },
          { label: 'Total hours',  value: `${current.hours}h`,   color: 'text-sky-700',    icon: '⏱️' },
          { label: 'Gross pay',    value: `$${current.pay.toLocaleString()}`, color: 'text-emerald-700', icon: '💰' },
          { label: 'Status',       value: current.status, color: current.status === 'Open' ? 'text-amber-700' : current.status === 'Paid' ? 'text-emerald-700' : 'text-sky-700', icon: current.status === 'Paid' ? '✅' : '🔓' },
        ].map((s) => (
          <div key={s.label} className="card p-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-base">{s.icon}</span>
              <p className="text-[11px] text-slate-500 font-medium">{s.label}</p>
            </div>
            <p className={`text-sm font-bold ${s.color} leading-snug`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Period list */}
      <div className="card overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100">
          <h3 className="text-sm font-semibold text-slate-900">Payroll periods</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full data-table">
            <thead>
              <tr>
                <th>Period</th>
                <th>Status</th>
                <th className="text-right">Employees</th>
                <th className="text-right">Total hours</th>
                <th className="text-right">Gross pay</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {periods.map((p, i) => (
                <tr
                  key={p.period}
                  className={`cursor-pointer ${selectedPeriod === i ? 'bg-emerald-50/60' : ''}`}
                  onClick={() => setSelectedPeriod(i)}
                >
                  <td className="font-medium text-slate-900">{p.period}</td>
                  <td><span className={statusStyle[p.status]}>{p.status}</span></td>
                  <td className="text-right text-slate-600">{p.employees}</td>
                  <td className="text-right font-mono text-slate-700">{p.hours}h</td>
                  <td className="text-right font-semibold text-slate-900">${p.pay.toLocaleString()}</td>
                  <td className="text-right">
                    <div className="inline-flex gap-1">
                      <button className="btn-ghost text-xs">View</button>
                      {p.status === 'Open' && (
                        <button className="btn-primary text-xs py-1 px-3">Run payroll</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Employee breakdown */}
      <div className="card overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <h3 className="text-sm font-semibold text-slate-900">
            Employee breakdown · <span className="text-slate-500 font-normal">{current.period}</span>
          </h3>
          <button className="btn-secondary text-xs py-1.5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
            </svg>
            Export
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full data-table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Role</th>
                <th className="text-right">Hours</th>
                <th className="text-right">Rate / hr</th>
                <th className="text-right">Gross pay</th>
              </tr>
            </thead>
            <tbody>
              {employeePayroll.map((e) => (
                <tr key={e.name}>
                  <td>
                    <div className="flex items-center gap-2.5">
                      <div className="h-7 w-7 rounded-full bg-gradient-to-br from-slate-300 to-slate-400 flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0">
                        {e.avatar}
                      </div>
                      <span className="font-medium text-slate-900">{e.name}</span>
                    </div>
                  </td>
                  <td className="text-slate-500">{e.role}</td>
                  <td className="text-right font-mono text-slate-700">{e.hours > 0 ? `${e.hours}h` : '—'}</td>
                  <td className="text-right text-slate-500">${e.rate}/hr</td>
                  <td className={`text-right font-semibold ${e.gross > 0 ? 'text-slate-900' : 'text-slate-400'}`}>
                    {e.gross > 0 ? `$${e.gross.toLocaleString('en-US', { minimumFractionDigits: 2 })}` : '—'}
                  </td>
                </tr>
              ))}
              {/* Total row */}
              <tr className="border-t-2 border-slate-200 bg-slate-50">
                <td colSpan={4} className="text-right font-semibold text-slate-700 text-sm">Total gross pay</td>
                <td className="text-right font-bold text-emerald-700 text-sm">
                  ${totalGross.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
