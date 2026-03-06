import React from 'react';

export const RequestsPage: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-slate-900">Requests</h2>
          <p className="text-xs text-slate-500">Approve or deny time off and coverage requests in one place.</p>
        </div>
      </div>
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between w-full">
          <div className="flex gap-3 text-xs text-slate-500">
            <span>Type: All</span>
            <span>Status: Pending</span>
          </div>
          <button className="text-xs px-2 text-slate-600 hover:text-slate-900">Filters</button>
        </div>
        <div className="p-4">
          <div className="overflow-x-auto">
            <table className="min-w-full text-xs">
              <thead className="border-b border-slate-200 text-left text-slate-500">
                <tr>
                  <th className="py-2 pr-4 font-medium">Employee</th>
                  <th className="py-2 pr-4 font-medium">Type</th>
                  <th className="py-2 pr-4 font-medium">Dates / Shift</th>
                  <th className="py-2 pr-4 font-medium">Reason</th>
                  <th className="py-2 pr-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-2 pr-4 text-slate-800">Example Employee</td>
                  <td className="py-2 pr-4 text-sky-700">Time off</td>
                  <td className="py-2 pr-4 text-slate-600">Coming soon</td>
                  <td className="py-2 pr-4 text-slate-600">Requested time away.</td>
                  <td className="py-2 pl-4 text-right">
                    <div className="inline-flex gap-2">
                      <button className="text-xs px-2 rounded-md bg-slate-100 border border-slate-200 hover:bg-slate-200">
                        Approve
                      </button>
                      <button className="text-xs px-2 text-slate-600 hover:text-slate-900">Deny</button>
                    </div>
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

