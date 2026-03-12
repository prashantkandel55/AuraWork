import React, { useState } from 'react';

export const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('account');

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header Profile Section */}
      <div className="relative rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-sm shadow-slate-200/50">
        <div className="h-32 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500" />
        <div className="px-8 pb-8">
          <div className="flex flex-col md:flex-row items-end gap-6 -mt-12">
            <div className="h-32 w-32 rounded-3xl bg-white p-1.5 shadow-xl shadow-slate-200 ring-1 ring-slate-100">
              <div className="h-full w-full rounded-[1.2rem] bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-3xl font-bold text-white shadow-inner">
                AD
              </div>
            </div>
            <div className="flex-1 pb-2">
              <h2 className="text-2xl font-bold text-slate-900">Admin User</h2>
              <p className="text-sm text-slate-500 font-medium">System Administrator · AuraWork Enterprise</p>
            </div>
            <div className="pb-2">
              <button className="btn-primary py-2 px-6 text-sm flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                </svg>
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-8 border-t border-slate-100 bg-slate-50/50 flex gap-8">
          {['account', 'security', 'workspace', 'notifications'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 text-xs font-bold uppercase tracking-widest transition-all relative ${
                activeTab === tab ? 'text-emerald-600' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="card border-slate-200 bg-white p-8">
            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-3">
               <div className="h-8 w-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                   <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                 </svg>
               </div>
               Public Information
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Full Name</label>
                <input 
                  type="text" 
                  defaultValue="Admin User"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:border-emerald-400 focus:ring-4 focus:ring-emerald-50 outline-none transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email Address</label>
                <input 
                  type="email" 
                  defaultValue="admin@aurawork.io"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:border-emerald-400 focus:ring-4 focus:ring-emerald-50 outline-none transition-all"
                />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Job Title</label>
                <input 
                  type="text" 
                  defaultValue="System Administrator"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:border-emerald-400 focus:ring-4 focus:ring-emerald-50 outline-none transition-all"
                />
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end">
               <button className="text-sm font-bold text-emerald-600 hover:text-emerald-700 transition-colors">
                 Save changes
               </button>
            </div>
          </div>

          <div className="card border-slate-200 bg-white p-8">
            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-3">
               <div className="h-8 w-8 rounded-lg bg-teal-100 text-teal-600 flex items-center justify-center">
                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                   <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
                 </svg>
               </div>
               Workspace Settings
            </h3>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-2xl bg-slate-100 flex items-center justify-center border-2 border-dashed border-slate-300">
                  <img src="/logoo.png" alt="Workspace Logo" className="h-10 w-10 object-contain opacity-50" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">Workspace Logo</p>
                  <p className="text-xs text-slate-500">Recommended size: 256x256px</p>
                  <button className="text-[10px] uppercase tracking-widest font-bold text-emerald-600 mt-1 hover:underline">Change logo</button>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Workspace Name</label>
                <input 
                  type="text" 
                  defaultValue="AuraWork Enterprise"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:border-emerald-400 focus:ring-4 focus:ring-emerald-50 outline-none transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card border-slate-200 bg-white p-6">
             <h4 className="text-sm font-bold text-slate-900 mb-4">Quick Stats</h4>
             <div className="space-y-4">
               {[
                 { label: 'Employees', val: '154', color: 'bg-emerald-50 text-emerald-600' },
                 { label: 'Active Shifts', val: '42', color: 'bg-blue-50 text-blue-600' },
                 { label: 'Pending Req', val: '12', color: 'bg-amber-50 text-amber-600' },
               ].map((stat, i) => (
                 <div key={i} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100">
                   <span className="text-xs font-medium text-slate-500">{stat.label}</span>
                   <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${stat.color}`}>{stat.val}</span>
                 </div>
               ))}
             </div>
          </div>

          <div className="card border-slate-200 bg-red-50 border-red-100 p-6">
             <h4 className="text-sm font-bold text-red-900 mb-2">Danger Zone</h4>
             <p className="text-xs text-red-600/80 mb-4">Permanent actions for your account.</p>
             <button className="w-full py-2.5 rounded-xl border border-red-200 bg-white text-red-600 text-xs font-bold shadow-sm hover:bg-red-50 transition-all">
                Deactivate Account
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};
