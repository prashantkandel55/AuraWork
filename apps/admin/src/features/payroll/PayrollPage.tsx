import React from 'react';

export const PayrollPage: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-slate-900">Payroll</h2>
          <p className="text-xs text-slate-500">Track hours and gross pay by payroll period.</p>
        </div>
        <button className="inline-flex items-center rounded-md bg-sky-600 px-3 py-1 text-xs font-medium text-white hover:bg-sky-700">
          New period
        </button>
      </div>
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between w-full">
          <span className="text-xs text-slate-500">Upcoming &amp; recent periods</span>
        </div>
        <div className="p-4">
          <div className="overflow-x-auto">
            <table className="min-w-full text-xs">
              <thead className="border-b border-slate-200 text-left text-slate-500">
                <tr>
                  <th className="py-2 pr-4 font-medium">Period</th>
                  <th className="py-2 pr-4 font-medium">Status</th>
                  <th className="py-2 pr-4 font-medium text-right">Total hours</th>
                  <th className="py-2 pr-4 font-medium text-right">Gross pay</th>
                  <th className="py-2 pl-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-2 pr-4 text-slate-800">Coming soon</td>
                  <td className="py-2 pr-4 text-amber-600">Open</td>
                  <td className="py-2 pr-4 text-right text-slate-800">0.0</td>
                  <td className="py-2 pr-4 text-right text-slate-800">$0.00</td>
                  <td className="py-2 pl-4 text-right">
                    <button className="text-xs px-2 text-slate-600 hover:text-slate-900">View</button>
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

