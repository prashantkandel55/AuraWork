import React from 'react';

export const TimeAttendancePage: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-slate-900">Time &amp; Attendance</h2>
          <p className="text-xs text-slate-500">Review and adjust hours before payroll.</p>
        </div>
        <button className="inline-flex items-center rounded-md border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-medium text-slate-900 hover:bg-slate-200">
          Export CSV
        </button>
      </div>
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between w-full">
          <div className="flex gap-2 text-xs text-slate-500">
            <span>Date range: Coming soon</span>
            <span className="hidden sm:inline-block">• Location: All</span>
          </div>
          <button className="text-xs px-2 text-slate-600 hover:text-slate-900">Filters</button>
        </div>
        <div className="p-4">
          <div className="overflow-x-auto">
            <table className="min-w-full text-xs">
              <thead className="border-b border-slate-200 text-left text-slate-500">
                <tr>
                  <th className="py-2 pr-4 font-medium">Employee</th>
                  <th className="py-2 pr-4 font-medium">Date</th>
                  <th className="py-2 pr-4 font-medium">Clock in</th>
                  <th className="py-2 pr-4 font-medium">Clock out</th>
                  <th className="py-2 pr-4 font-medium text-right">Hours</th>
                  <th className="py-2 pl-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-2 pr-4 text-slate-800">Example Employee</td>
                  <td className="py-2 pr-4 text-slate-600">Coming soon</td>
                  <td className="py-2 pr-4 text-slate-600">—</td>
                  <td className="py-2 pr-4 text-slate-600">—</td>
                  <td className="py-2 pr-4 text-right text-slate-800">0.0</td>
                  <td className="py-2 pl-4 text-right">
                    <button className="text-xs px-2 text-slate-600 hover:text-slate-900">Edit</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

