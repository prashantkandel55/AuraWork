import React from 'react';

export const DashboardPage: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 grid-cols-1 xl:grid-cols-4">
        <div className="xl:col-span-2 rounded-2xl border border-slate-200 bg-white shadow-sm flex overflow-hidden">
          <div className="flex-1 p-5 flex flex-col justify-between">
            <div>
              <p className="text-xs font-semibold tracking-wide text-emerald-600 uppercase mb-1">Hello, Admin</p>
              <h2 className="text-lg font-semibold text-slate-900 mb-1">Here&apos;s your workforce overview</h2>
              <p className="text-xs text-slate-500">
                Monitor attendance, upcoming shifts, and open requests for this week.
              </p>
            </div>
            <button className="mt-4 inline-flex items-center rounded-lg bg-emerald-600 px-3 py-2 text-xs font-medium text-white hover:bg-emerald-700 w-fit">
              Review schedule
            </button>
          </div>
          <div className="hidden md:flex w-40 bg-emerald-50 items-center justify-center">
            <span className="text-5xl">📊</span>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-4 flex flex-col gap-3">
          <p className="text-xs font-medium text-slate-500">Total present</p>
          <p className="text-2xl font-semibold text-slate-900">99</p>
          <p className="text-[11px] text-emerald-600">+8 vs. yesterday</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-4 flex flex-col gap-3">
          <p className="text-xs font-medium text-slate-500">On leave</p>
          <p className="text-2xl font-semibold text-slate-900">6</p>
          <p className="text-[11px] text-slate-500">Across all locations</p>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-1 xl:grid-cols-4">
        <div className="xl:col-span-3 rounded-2xl border border-slate-200 bg-white shadow-sm p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">Team performance</h3>
              <p className="text-xs text-slate-500">Designer vs. developer hours this month.</p>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-slate-500">
              <span className="inline-flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-emerald-500" /> Design
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-sky-500" /> Development
              </span>
            </div>
          </div>
          <div className="h-40 rounded-xl bg-slate-50 border border-dashed border-slate-200 flex items-center justify-center text-xs text-slate-400">
            Chart placeholder
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-4 flex flex-col gap-3">
          <h3 className="text-sm font-semibold text-slate-900">Total employees</h3>
          <div className="flex items-center justify-center h-28">
            <div className="h-20 w-20 rounded-full border-[6px] border-emerald-500 border-t-slate-100 border-l-slate-100" />
          </div>
          <ul className="space-y-1 text-[11px] text-slate-500">
            <li className="flex justify-between">
              <span>Full-time</span>
              <span>42</span>
            </li>
            <li className="flex justify-between">
              <span>Part-time</span>
              <span>18</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-1 xl:grid-cols-3">
        <div className="xl:col-span-2 rounded-2xl border border-slate-200 bg-white shadow-sm p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-slate-900">Employee status</h3>
            <input
              className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs text-slate-600 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              placeholder="Search employees..."
            />
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-xs">
              <thead className="border-b border-slate-200 text-left text-slate-500">
                <tr>
                  <th className="py-2 pr-4 font-medium">Name</th>
                  <th className="py-2 pr-4 font-medium">Role</th>
                  <th className="py-2 pr-4 font-medium">Status</th>
                  <th className="py-2 pr-4 font-medium text-right">Location</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-2 pr-4 text-slate-800">John Smith</td>
                  <td className="py-2 pr-4 text-slate-600">UX Designer</td>
                  <td className="py-2 pr-4">
                    <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700">
                      Active
                    </span>
                  </td>
                  <td className="py-2 pr-4 text-right text-slate-500">Main</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 text-slate-800">Anika Dorwat</td>
                  <td className="py-2 pr-4 text-slate-600">React Developer</td>
                  <td className="py-2 pr-4">
                    <span className="inline-flex items-center rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-medium text-amber-700">
                      On leave
                    </span>
                  </td>
                  <td className="py-2 pr-4 text-right text-slate-500">West</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-slate-900">Events &amp; meetings</h3>
              <button className="inline-flex items-center rounded-md bg-slate-900 px-2 py-1 text-[11px] font-medium text-white hover:bg-slate-800">
                Add
              </button>
            </div>
            <ul className="space-y-2 text-xs text-slate-600">
              <li className="flex justify-between">
                <span>Marketing meeting</span>
                <span>08:00</span>
              </li>
              <li className="flex justify-between">
                <span>Development sync</span>
                <span>11:30</span>
              </li>
            </ul>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-4">
            <h3 className="text-sm font-semibold text-slate-900 mb-2">Birthdays</h3>
            <ul className="space-y-2 text-xs text-slate-600">
              <li className="flex justify-between">
                <span>Jane Cooper</span>
                <span>Today</span>
              </li>
              <li className="flex justify-between">
                <span>Jacob Jones</span>
                <span>Tomorrow</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

