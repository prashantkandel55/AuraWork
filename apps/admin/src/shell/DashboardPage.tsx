import React, { useState, useEffect } from 'react';

/* ── mini SVG bar chart ─────────────────────────────────────────── */
const BarChart: React.FC<{ data: number[]; colors: string[] }> = ({ data, colors }) => {
  const max = Math.max(...data);
  return (
    <div className="flex items-end gap-1 h-28">
      {data.map((v, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1">
          <div
            className={`w-full rounded-t-md transition-all duration-700 ${colors[i % colors.length]}`}
            style={{ height: `${(v / max) * 100}%` }}
          />
        </div>
      ))}
    </div>
  );
};

/* ── sparkline ──────────────────────────────────────────────────── */
const Sparkline: React.FC<{ data: number[]; color: string }> = ({ data, color }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const w = 80, h = 28;
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / (max - min + 1)) * h;
    return `${x},${y}`;
  });
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points.join(' ')}
      />
    </svg>
  );
};

/* ── donut chart ────────────────────────────────────────────────── */
const DonutChart: React.FC<{ full: number; part: number; color: string }> = ({ full, part, color }) => {
  const r = 36, stroke = 8;
  const circ = 2 * Math.PI * r;
  const dash = (part / full) * circ;
  return (
    <svg width="96" height="96" viewBox="0 0 96 96">
      <circle cx="48" cy="48" r={r} fill="none" stroke="#f1f5f9" strokeWidth={stroke} />
      <circle
        cx="48" cy="48" r={r} fill="none"
        stroke={color} strokeWidth={stroke}
        strokeDasharray={`${dash} ${circ - dash}`}
        strokeLinecap="round"
        transform="rotate(-90 48 48)"
        style={{ transition: 'stroke-dasharray 1s ease' }}
      />
      <text x="48" y="48" textAnchor="middle" dominantBaseline="central" fontSize="14" fontWeight="700" fill="#0f172a">
        {Math.round((part / full) * 100)}%
      </text>
    </svg>
  );
};

/* ─── mock data ─────────────────────────────────────────────────── */
const designHours  = [32, 41, 38, 55, 47, 62, 70];
const devHours     = [48, 52, 61, 45, 70, 68, 75];
const weekDays     = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const employees = [
  { name: 'John Smith',   role: 'UX Designer',      status: 'Active',   location: 'Main',  avatar: 'JS', hours: 38.5, trend: [7,8,8,7.5,8] },
  { name: 'Anika Dorwat', role: 'React Developer',  status: 'On leave', location: 'West',  avatar: 'AD', hours: 0,    trend: [8,8,0,0,0] },
  { name: 'Marcus Lee',   role: 'Backend Engineer', status: 'Active',   location: 'Main',  avatar: 'ML', hours: 40,   trend: [8,8,8,8,8] },
  { name: 'Sara Patel',   role: 'Product Manager',  status: 'Remote',   location: 'Remote',avatar: 'SP', hours: 36,   trend: [7,7,7,7,8] },
  { name: 'Tom Chen',     role: 'DevOps Engineer',  status: 'Active',   location: 'East',  avatar: 'TC', hours: 42,   trend: [8,9,8,8,9] },
];

const statusColor: Record<string, string> = {
  'Active':   'badge-green',
  'On leave': 'badge-amber',
  'Remote':   'badge-blue',
};

const events = [
  { title: 'Marketing meeting',  time: '08:00', type: 'meeting' },
  { title: 'Development sync',   time: '11:30', type: 'meeting' },
  { title: 'Design review',      time: '14:00', type: 'review' },
  { title: 'Q4 planning kickoff',time: '15:30', type: 'planning' },
];

const birthdays = [
  { name: 'Jane Cooper',  when: 'Today 🎂' },
  { name: 'Jacob Jones',  when: 'Tomorrow' },
  { name: 'Esther Howard', when: 'Dec 16' },
];

/* ─── Dashboard Page ────────────────────────────────────────────── */
export const DashboardPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [activeDay, setActiveDay] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  const filteredEmployees = employees.filter(
    (e) =>
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={`space-y-5 transition-all duration-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>

      {/* ── Hero row ── */}
      <div className="grid gap-4 grid-cols-1 xl:grid-cols-4">
        {/* Welcome card */}
        <div className="xl:col-span-2 rounded-2xl overflow-hidden flex" style={{ background: 'linear-gradient(135deg, #059669 0%, #0d9488 100%)' }}>
          <div className="flex-1 p-6 flex flex-col justify-between text-white">
            <div>
              <p className="text-xs font-semibold tracking-wide text-emerald-100 uppercase mb-1">Hello, Admin 👋</p>
              <h2 className="text-xl font-bold mb-1">Your workforce at a glance</h2>
              <p className="text-sm text-emerald-100/80">
                Monitor attendance, upcoming shifts, and open requests for this week.
              </p>
            </div>
            <div className="flex gap-2 mt-5">
              <button className="inline-flex items-center rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur px-4 py-2 text-sm font-semibold text-white transition-all">
                Review schedule
              </button>
              <button className="inline-flex items-center rounded-xl border border-white/30 hover:bg-white/10 px-4 py-2 text-sm font-semibold text-white transition-all">
                View reports
              </button>
            </div>
          </div>
          <div className="hidden md:flex w-36 items-center justify-center opacity-20 select-none text-7xl">
            📊
          </div>
        </div>

        {/* Stat cards */}
        {[
          {
            label: 'Present today',
            value: '99',
            sub: '+8 vs. yesterday',
            subColor: 'text-emerald-600',
            icon: '✅',
            trend: [85, 88, 92, 95, 99],
            trendColor: '#10b981',
          },
          {
            label: 'On leave',
            value: '6',
            sub: 'Across all locations',
            subColor: 'text-slate-500',
            icon: '🏖️',
            trend: [3, 4, 5, 6, 6],
            trendColor: '#f59e0b',
          },
        ].map((s, i) => (
          <div key={i} className="stat-card">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-slate-500">{s.label}</p>
              <span className="text-lg">{s.icon}</span>
            </div>
            <p className="text-3xl font-bold text-slate-900">{s.value}</p>
            <div className="flex items-end justify-between mt-auto pt-1">
              <p className={`text-[11px] font-medium ${s.subColor}`}>{s.sub}</p>
              <Sparkline data={s.trend} color={s.trendColor} />
            </div>
          </div>
        ))}
      </div>

      {/* ── Charts row ── */}
      <div className="grid gap-4 grid-cols-1 xl:grid-cols-4">
        {/* Bar chart */}
        <div className="xl:col-span-3 card p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">Team hours this week</h3>
              <p className="text-xs text-slate-500">Design vs. Development · daily logged hours</p>
            </div>
            <div className="flex items-center gap-3 text-[11px] text-slate-500">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-sm bg-emerald-500" /> Design
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-sm bg-sky-400" /> Dev
              </span>
            </div>
          </div>
          {/* Stacked bars */}
          <div className="flex items-end gap-2 h-32">
            {weekDays.map((day, i) => {
              const isActive = activeDay === i;
              return (
                <div
                  key={day}
                  className="flex-1 flex flex-col items-center gap-1 cursor-pointer group"
                  onMouseEnter={() => setActiveDay(i)}
                  onMouseLeave={() => setActiveDay(null)}
                >
                  {isActive && (
                    <div className="text-[10px] text-slate-600 bg-white border border-slate-200 rounded-lg px-1.5 py-0.5 shadow-sm whitespace-nowrap">
                      {designHours[i] + devHours[i]}h total
                    </div>
                  )}
                  <div className="w-full flex flex-col rounded-t-md overflow-hidden" style={{ height: `${((designHours[i] + devHours[i]) / 145) * 100}%` }}>
                    <div className="bg-sky-400 transition-all" style={{ height: `${(devHours[i] / (designHours[i] + devHours[i])) * 100}%` }} />
                    <div className="bg-emerald-500 transition-all flex-1" />
                  </div>
                  <span className={`text-[10px] font-medium transition-colors ${isActive ? 'text-slate-900' : 'text-slate-400'}`}>{day}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Donut */}
        <div className="card p-5 flex flex-col gap-3">
          <h3 className="text-sm font-semibold text-slate-900">Employees</h3>
          <div className="flex items-center justify-center">
            <DonutChart full={60} part={42} color="#10b981" />
          </div>
          <ul className="space-y-2 text-xs">
            {[
              { label: 'Full-time', count: 42, color: 'bg-emerald-500' },
              { label: 'Part-time', count: 12, color: 'bg-teal-400' },
              { label: 'Contractors', count: 6, color: 'bg-slate-300' },
            ].map((item) => (
              <li key={item.label} className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-slate-600">
                  <span className={`h-2 w-2 rounded-full ${item.color}`} />
                  {item.label}
                </span>
                <span className="font-semibold text-slate-900">{item.count}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── Employee table + side widgets ── */}
      <div className="grid gap-4 grid-cols-1 xl:grid-cols-3">
        {/* Employee table */}
        <div className="xl:col-span-2 card overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <h3 className="text-sm font-semibold text-slate-900">Employee status</h3>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 rounded-xl bg-slate-100 border border-slate-200 px-3 py-1.5 text-xs text-slate-500">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                </svg>
                <input
                  className="bg-transparent outline-none placeholder:text-slate-400 text-slate-700 w-28"
                  placeholder="Filter by name..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <button className="btn-secondary text-xs py-1.5">Export</button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full data-table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Role</th>
                  <th>This week</th>
                  <th>Status</th>
                  <th className="text-right">Location</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((emp) => (
                  <tr key={emp.name} className="hover:bg-slate-50/60 cursor-pointer">
                    <td>
                      <div className="flex items-center gap-2.5">
                        <div className="h-7 w-7 rounded-full bg-gradient-to-br from-slate-300 to-slate-400 flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0">
                          {emp.avatar}
                        </div>
                        <span className="font-medium text-slate-900">{emp.name}</span>
                      </div>
                    </td>
                    <td className="text-slate-500">{emp.role}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-700 font-medium">{emp.hours}h</span>
                        <Sparkline data={emp.trend} color="#10b981" />
                      </div>
                    </td>
                    <td><span className={statusColor[emp.status]}>{emp.status}</span></td>
                    <td className="text-right text-slate-500">{emp.location}</td>
                  </tr>
                ))}
                {filteredEmployees.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center text-slate-400 py-8">No employees match your search.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Side widgets */}
        <div className="space-y-4">
          {/* Events */}
          <div className="card p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-slate-900">Today's events</h3>
              <button className="btn-primary text-xs py-1 px-3">+ Add</button>
            </div>
            <ul className="space-y-2">
              {events.map((ev, i) => (
                <li key={i} className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
                  <div className="h-8 w-8 rounded-lg bg-emerald-50 flex items-center justify-center flex-shrink-0">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-slate-800 truncate">{ev.title}</p>
                    <p className="text-[10px] text-slate-500">{ev.time}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {/* Birthdays */}
          <div className="card p-5">
            <h3 className="text-sm font-semibold text-slate-900 mb-3">🎂 Birthdays</h3>
            <ul className="space-y-2">
              {birthdays.map((b, i) => (
                <li key={i} className="flex items-center justify-between text-xs">
                  <span className="font-medium text-slate-700">{b.name}</span>
                  <span className={`font-semibold ${b.when.startsWith('Today') ? 'text-emerald-600' : 'text-slate-500'}`}>{b.when}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
