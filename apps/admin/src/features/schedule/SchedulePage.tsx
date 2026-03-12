import React, { useState } from 'react';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const shifts = [
  { employee: 'John Smith',   avatar: 'JS', shifts: ['08:00-17:00', '08:00-17:00', '09:00-18:00', '08:00-17:00', '08:00-16:00', '', ''] },
  { employee: 'Anika Dorwat', avatar: 'AD', shifts: ['', '', '', '', '', '', ''] },
  { employee: 'Marcus Lee',   avatar: 'ML', shifts: ['09:00-18:00', '09:00-18:00', '09:00-18:00', '09:00-18:00', '09:00-17:00', '', ''] },
  { employee: 'Sara Patel',   avatar: 'SP', shifts: ['10:00-19:00', '10:00-19:00', '', '10:00-19:00', '10:00-18:00', '', ''] },
  { employee: 'Tom Chen',     avatar: 'TC', shifts: ['08:00-17:00', '', '08:00-17:00', '08:00-17:00', '08:00-17:00', '09:00-14:00', ''] },
];

const weekOf = 'Dec 11 – Dec 17, 2023';

export const SchedulePage: React.FC = () => {
  const [published, setPublished] = useState(false);
  const [selectedCell, setSelectedCell] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-bold text-slate-900">Weekly Schedule</h2>
          <p className="text-xs text-slate-500 mt-0.5">Manage and publish shifts for your team.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn-secondary text-xs py-2">← Prev week</button>
          <span className="text-xs font-semibold text-slate-700 px-3 py-2 rounded-xl border border-slate-200 bg-white">{weekOf}</span>
          <button className="btn-secondary text-xs py-2">Next week →</button>
          <button
            className={`text-xs py-2 px-4 rounded-xl font-semibold transition-all ${
              published
                ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                : 'bg-slate-900 text-white hover:bg-slate-800'
            }`}
            onClick={() => setPublished((p) => !p)}
          >
            {published ? '✓ Published' : 'Publish schedule'}
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 text-[11px] text-slate-500">
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm bg-emerald-500" /> Shift
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm bg-amber-400" /> Draft
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm bg-slate-200 border border-dashed border-slate-300" /> Empty
        </span>
      </div>

      {/* Grid */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs table-fixed">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="py-3 px-4 text-left font-semibold text-slate-500 bg-slate-50 w-40">Employee</th>
                {days.map((d, i) => (
                  <th key={d} className={`py-3 px-3 text-center font-semibold text-slate-500 bg-slate-50 ${i === 3 ? 'bg-emerald-50 text-emerald-700' : ''}`}>
                    <div>{d}</div>
                    <div className={`text-[10px] font-normal mt-0.5 ${i === 3 ? 'text-emerald-500' : 'text-slate-400'}`}>
                      Dec {11 + i}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {shifts.map((row) => (
                <tr key={row.employee} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50 group">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2.5">
                      <div className="h-7 w-7 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0">
                        {row.avatar}
                      </div>
                      <span className="font-medium text-slate-800">{row.employee}</span>
                    </div>
                  </td>
                  {row.shifts.map((shift, si) => {
                    const key = `${row.employee}-${si}`;
                    const isSelected = selectedCell === key;
                    return (
                      <td key={si} className="py-2 px-2">
                        {shift ? (
                          <button
                            className={`w-full rounded-lg px-2 py-1.5 text-center font-medium transition-all text-[11px] ${
                              published
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                                : 'bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100'
                            } ${isSelected ? 'ring-2 ring-emerald-400' : ''}`}
                            onClick={() => setSelectedCell(isSelected ? null : key)}
                          >
                            {shift}
                          </button>
                        ) : (
                          <button
                            className="w-full h-8 rounded-lg border border-dashed border-slate-200 bg-slate-50/60 hover:border-emerald-300 hover:bg-emerald-50 transition-colors text-slate-300 hover:text-emerald-500"
                            title="Add shift"
                          >
                            +
                          </button>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Total shifts', value: '23', icon: '📅' },
          { label: 'Open slots', value: '12', icon: '⬜' },
          { label: 'Coverage', value: '66%', icon: '📊' },
          { label: 'Hours scheduled', value: '184h', icon: '⏱️' },
        ].map((s) => (
          <div key={s.label} className="card p-4 flex items-center gap-3">
            <span className="text-xl">{s.icon}</span>
            <div>
              <p className="text-xs text-slate-500">{s.label}</p>
              <p className="text-lg font-bold text-slate-900">{s.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
