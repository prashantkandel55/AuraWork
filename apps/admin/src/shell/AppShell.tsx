import React, { useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';

interface NavItem {
  to: string;
  label: string;
  icon: React.ReactNode;
  end?: boolean;
}

const Icon = ({ d, size = 18 }: { d: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

const generalNav: NavItem[] = [
  {
    to: '/', end: true, label: 'Overview',
    icon: <Icon d="M3 12L12 3L21 12V20H15V14H9V20H3V12Z" />,
  },
  {
    to: '/employees', label: 'Employees',
    icon: <Icon d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />,
  },
];

const managementNav: NavItem[] = [
  {
    to: '/schedule', label: 'Schedule',
    icon: <Icon d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />,
  },
  {
    to: '/time-and-attendance', label: 'Attendance',
    icon: <Icon d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
  },
  {
    to: '/requests', label: 'Requests',
    icon: <Icon d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8zM6 1v3M10 1v3M14 1v3" />,
  },
  {
    to: '/payroll', label: 'Payroll',
    icon: <Icon d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />,
  },
];

export const AppShell: React.FC = () => {
  const location = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const title =
    location.pathname.startsWith('/schedule')
      ? 'Schedule'
      : location.pathname.startsWith('/time-and-attendance')
        ? 'Time & Attendance'
        : location.pathname.startsWith('/requests')
          ? 'Requests'
          : location.pathname.startsWith('/payroll')
            ? 'Payroll'
            : location.pathname.startsWith('/employees')
              ? 'Employees'
              : 'Dashboard';

  const now = new Date();
  const dateStr = now.toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Sidebar */}
      <aside
        className={`${sidebarCollapsed ? 'w-[72px]' : 'w-64'} flex-shrink-0 border-r border-slate-200 bg-white flex flex-col transition-all duration-300 ease-in-out relative`}
      >
        {/* Logo */}
        <div className={`h-16 flex items-center ${sidebarCollapsed ? 'justify-center px-2' : 'px-5'} border-b border-slate-100 flex-shrink-0`}>
          <Link to="/" className="flex items-center gap-2.5 min-w-0">
            <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-md shadow-emerald-200 flex-shrink-0 overflow-hidden">
              <img src="/logoo.png" alt="AuraWork" className="h-9 w-9 object-contain" />
            </div>
            {!sidebarCollapsed && (
              <div>
                <span className="font-bold text-[15px] tracking-tight text-slate-900">AuraWork</span>
                <p className="text-[10px] text-slate-400 leading-none -mt-0.5">Admin Console</p>
              </div>
            )}
          </Link>
        </div>

        {/* Nav */}
        <nav className={`flex-1 ${sidebarCollapsed ? 'px-2' : 'px-3'} py-4 space-y-5 overflow-y-auto`}>
          <div>
            {!sidebarCollapsed && (
              <p className="px-2 mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-slate-400">General</p>
            )}
            <div className="space-y-0.5">
              {generalNav.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  title={sidebarCollapsed ? item.label : undefined}
                  className={({ isActive }) =>
                    `nav-item ${isActive ? 'nav-item-active' : 'nav-item-inactive'} ${sidebarCollapsed ? 'justify-center' : ''}`
                  }
                >
                  <span className="flex-shrink-0">{item.icon}</span>
                  {!sidebarCollapsed && <span>{item.label}</span>}
                </NavLink>
              ))}
            </div>
          </div>

          <div>
            {!sidebarCollapsed && (
              <p className="px-2 mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-slate-400">Management</p>
            )}
            <div className="space-y-0.5">
              {managementNav.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  title={sidebarCollapsed ? item.label : undefined}
                  className={({ isActive }) =>
                    `nav-item ${isActive ? 'nav-item-active' : 'nav-item-inactive'} ${sidebarCollapsed ? 'justify-center' : ''}`
                  }
                >
                  <span className="flex-shrink-0">{item.icon}</span>
                  {!sidebarCollapsed && <span>{item.label}</span>}
                </NavLink>
              ))}
            </div>
          </div>
        </nav>

        {/* Collapse toggle */}
        <button
          onClick={() => setSidebarCollapsed((c) => !c)}
          className="absolute -right-3 top-20 h-6 w-6 rounded-full border border-slate-200 bg-white shadow-sm flex items-center justify-center text-slate-500 hover:text-slate-900 hover:shadow-md transition-all z-10"
          title={sidebarCollapsed ? 'Expand' : 'Collapse'}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d={sidebarCollapsed ? 'M9 18l6-6-6-6' : 'M15 18l-6-6 6-6'} />
          </svg>
        </button>

        {/* Bottom user area */}
        {!sidebarCollapsed && (
          <div className="mx-3 mb-4 mt-2 rounded-xl bg-slate-50 border border-slate-200 p-3 flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
              AD
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-slate-800 truncate">Admin User</p>
              <p className="text-[11px] text-slate-500 truncate">admin@aurawork.io</p>
            </div>
            <button className="ml-auto text-slate-400 hover:text-slate-600 flex-shrink-0">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
              </svg>
            </button>
          </div>
        )}
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top header */}
        <header className="h-16 flex-shrink-0 border-b border-slate-200 bg-white flex items-center justify-between px-6 gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <h1 className="text-[17px] font-bold text-slate-900">{title}</h1>
            <span className="hidden md:inline text-[11px] text-slate-400 font-medium">{dateStr}</span>
          </div>
          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="hidden md:flex items-center gap-2 rounded-xl bg-slate-100 border border-slate-200 px-3 py-2 text-sm text-slate-500 w-56 transition-all focus-within:border-emerald-400 focus-within:ring-2 focus-within:ring-emerald-100">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
              <input
                className="bg-transparent outline-none placeholder:text-slate-400 text-xs flex-1 text-slate-700"
                placeholder="Search employees, shifts..."
              />
            </div>
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setNotifOpen((o) => !o)}
                className="h-9 w-9 rounded-xl border border-slate-200 bg-white flex items-center justify-center text-slate-500 hover:bg-slate-50 hover:text-slate-900 relative transition-all"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
                <span className="absolute -top-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-500 border-2 border-white text-[8px] flex items-center justify-center text-white font-bold">2</span>
              </button>
              {notifOpen && (
                <div className="absolute right-0 top-11 w-72 rounded-2xl border border-slate-200 bg-white shadow-xl z-50 overflow-hidden">
                  <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-900">Notifications</span>
                    <button className="text-[11px] text-emerald-600 hover:underline" onClick={() => setNotifOpen(false)}>Mark all read</button>
                  </div>
                  {[
                    { title: 'New time-off request', body: 'Jane Cooper · Vacation request for Dec 20–22', time: '2m ago', dot: 'bg-emerald-500' },
                    { title: 'Clock-in anomaly', body: 'John Smith clocked in 47 min late today', time: '1h ago', dot: 'bg-amber-500' },
                  ].map((n, i) => (
                    <div key={i} className="px-4 py-3 hover:bg-slate-50 flex items-start gap-3 border-b border-slate-100 last:border-0 cursor-pointer">
                      <span className={`mt-1.5 h-2 w-2 rounded-full flex-shrink-0 ${n.dot}`} />
                      <div>
                        <p className="text-xs font-semibold text-slate-900">{n.title}</p>
                        <p className="text-[11px] text-slate-500 mt-0.5">{n.body}</p>
                        <p className="text-[10px] text-slate-400 mt-1">{n.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {/* Avatar */}
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-xs font-bold text-white shadow-sm cursor-pointer hover:shadow-md transition-all">
              AD
            </div>
          </div>
        </header>

        <section className="flex-1 p-4 md:p-6 overflow-y-auto">
          <Outlet />
        </section>
      </main>
    </div>
  );
};
