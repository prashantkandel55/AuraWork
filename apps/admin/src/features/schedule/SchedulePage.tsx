import React from 'react';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const SchedulePage: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-slate-900">Weekly Schedule</h2>
          <p className="text-xs text-slate-500">Drag employees into shifts and publish when ready.</p>
        </div>
      </div>
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between w-full">
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-semibold text-slate-900">Week of</span>
            <span className="text-sm text-slate-600">Coming soon</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="inline-flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-emerald-500" /> Published
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-amber-400" /> Draft
            </span>
          </div>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-8 gap-px bg-slate-200 rounded-lg overflow-hidden text-xs">
            <div className="bg-slate-50 p-3 font-medium text-slate-500">Employee</div>
            {days.map((day) => (
              <div key={day} className="bg-slate-50 p-3 text-center font-medium text-slate-500">
                {day}
              </div>
            ))}
            <div className="bg-white p-3 text-sm text-slate-700">Example Employee</div>
            {days.map((day) => (
              <div key={day} className="bg-white p-2 align-top">
                <div className="h-16 rounded border border-dashed border-slate-200 bg-slate-50/60" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

