import React from 'react';
import {
  Compass,
  LayoutDashboard,
  Bookmark,
  Briefcase,
  Sparkles,
  FileText,
  TrendingUp,
  Clock,
  ShieldCheck,
  Settings,
  ShieldAlert,
  Send,
  Zap,
  Laptop
} from 'lucide-react';
import { useApp, AppView } from '../../context/AppContext';

interface SidebarItem {
  id: AppView;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string | number;
}

export const Sidebar: React.FC = () => {
  const { currentView, setCurrentView, applications, reminders, jobs } = useApp();

  const activeAppsCount = applications.filter(a =>
    ['applied', 'interview', 'assessment', 'offer'].includes(a.status)
  ).length;

  const pendingRemindersCount = reminders.filter(r => !r.completed).length;
  const savedJobsCount = jobs.filter(j => j.isSaved).length;

  const mainNav: SidebarItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'jobs', label: 'Find Jobs', icon: Compass, badge: jobs.length },
    { id: 'applications-tracker', label: 'Applications', icon: Briefcase, badge: activeAppsCount || undefined },
    { id: 'resume-tailor', label: 'Resume Tailor', icon: Sparkles },
    { id: 'resume-builder', label: 'Resume Builder', icon: FileText },
    { id: 'cover-letter', label: 'Cover Letters', icon: Send },
    { id: 'career-insights', label: 'Career Insights', icon: TrendingUp },
    { id: 'reminders', label: 'Reminders', icon: Clock, badge: pendingRemindersCount || undefined },
    { id: 'extension-simulator', label: 'Browser Assistant', icon: Laptop }
  ];

  const secondaryNav: SidebarItem[] = [
    { id: 'settings', label: 'Settings & Privacy', icon: Settings },
    { id: 'admin', label: 'Admin Telemetry', icon: ShieldAlert }
  ];

  return (
    <aside className="w-64 border-r border-slate-800 bg-slate-950 flex flex-col justify-between shrink-0 select-none">
      {/* Brand Header */}
      <div>
        <div
          onClick={() => setCurrentView('landing')}
          className="h-16 flex items-center gap-3 px-5 border-b border-slate-800/80 cursor-pointer hover:bg-slate-900/40 transition-colors"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-sky-400 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
            <Zap className="w-5 h-5 text-white fill-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-base text-slate-100 tracking-tight">JobPilot</span>
              <span className="text-[11px] font-bold text-indigo-400 bg-indigo-500/10 px-1.5 py-0.2 rounded border border-indigo-500/20 uppercase tracking-wide">
                AI
              </span>
            </div>
            <p className="text-[11px] text-slate-400">Career Autopilot</p>
          </div>
        </div>

        {/* Navigation List */}
        <div className="p-3 space-y-1">
          <p className="px-3 pt-2 pb-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Core Workspace
          </p>
          {mainNav.map(item => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                id={`nav-btn-${item.id}`}
                onClick={() => setCurrentView(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-indigo-600/15 text-indigo-300 border border-indigo-500/30 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                      isActive
                        ? 'bg-indigo-500/20 text-indigo-200'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-4 pb-1">
            <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              System & Security
            </p>
          </div>

          {secondaryNav.map(item => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                id={`nav-btn-${item.id}`}
                onClick={() => setCurrentView(item.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-indigo-600/15 text-indigo-300 border border-indigo-500/30 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Safety & Integrity Guarantee Card */}
      <div className="p-3 border-t border-slate-800/80">
        <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-xl space-y-2">
          <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-semibold">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>Truthful AI Guarantee</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Zero fabricated skills or experience. Human review required for all form submissions.
          </p>
          <div className="flex items-center justify-between pt-1 text-[10px] text-slate-400 border-t border-slate-800/60">
            <span>Safety Policy</span>
            <span className="text-emerald-400 font-mono">100% Verified</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
