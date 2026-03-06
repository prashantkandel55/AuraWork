import React from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';

const baseNavItemClass =
  'flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors';

export const AppShell: React.FC = () => {
  const location = useLocation();
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
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex">
      <aside className="w-72 border-r border-slate-200 bg-white flex flex-col">
        <div className="h-16 flex items-center px-5 border-b border-slate-100">
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="AuraWork logo" className="h-8 w-8 rounded-md object-contain" />
            <span className="font-semibold text-lg tracking-tight">AuraWork</span>
          </Link>
        </div>
        <nav className="flex-1 px-4 py-4 space-y-4 text-sm">
          <div>
            <p className="px-1 mb-2 text-[11px] font-semibold uppercase tracking-wide text-slate-400">General</p>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `${baseNavItemClass} ${
                  isActive ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`
              }
            >
              Overview
            </NavLink>
            <NavLink
              to="/employees"
              className={({ isActive }) =>
                `${baseNavItemClass} ${
                  isActive ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`
              }
            >
              Employees
            </NavLink>
          </div>
          <div>
            <p className="px-1 mt-2 mb-2 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
              Management
            </p>
            <NavLink
              to="/schedule"
              className={({ isActive }) =>
                `${baseNavItemClass} ${
                  isActive ? 'bg-emerald-50 text-emerald-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`
              }
            >
              Schedule
            </NavLink>
            <NavLink
              to="/time-and-attendance"
              className={({ isActive }) =>
                `${baseNavItemClass} ${
                  isActive ? 'bg-emerald-50 text-emerald-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`
              }
            >
              Attendance
            </NavLink>
            <NavLink
              to="/requests"
              className={({ isActive }) =>
                `${baseNavItemClass} ${
                  isActive ? 'bg-emerald-50 text-emerald-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`
              }
            >
              Requests
            </NavLink>
            <NavLink
              to="/payroll"
              className={({ isActive }) =>
                `${baseNavItemClass} ${
                  isActive ? 'bg-emerald-50 text-emerald-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`
              }
            >
              Payroll
            </NavLink>
          </div>
        </nav>
      </aside>

      <main className="flex-1 flex flex-col">
        <header className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-semibold">{title}</h1>
            <div className="hidden md:flex items-center gap-2 text-xs text-slate-500">
              <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">This week</span>
              <span className="px-2 py-0.5 rounded-full bg-slate-100">Location: All</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center rounded-full bg-slate-100 px-3 py-1.5 text-xs text-slate-500">
              <span className="mr-2">🔍</span>
              <input
                className="bg-transparent outline-none placeholder:text-slate-400 w-40"
                placeholder="Search employees, shifts..."
              />
            </div>
            <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-semibold">
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

