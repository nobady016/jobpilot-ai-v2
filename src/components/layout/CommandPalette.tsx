import React, { useState, useEffect } from 'react';
import {
  Search,
  Briefcase,
  FileText,
  Sparkles,
  Layers,
  Settings,
  ShieldCheck,
  TrendingUp,
  X,
  Compass
} from 'lucide-react';
import { useApp, AppView } from '../../context/AppContext';

export const CommandPalette: React.FC = () => {
  const {
    isCommandPaletteOpen,
    setIsCommandPaletteOpen,
    setCurrentView,
    jobs,
    setSelectedJobId,
    startApplicationForJob
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!isCommandPaletteOpen) {
      setSearchQuery('');
    }
  }, [isCommandPaletteOpen]);

  if (!isCommandPaletteOpen) return null;

  const navigateTo = (view: AppView) => {
    setCurrentView(view);
    setIsCommandPaletteOpen(false);
  };

  const navItems = [
    { label: 'Dashboard Overview', view: 'dashboard' as AppView, icon: Layers, desc: 'Application stats & quick recommendations' },
    { label: 'Find & Discover Jobs', view: 'jobs' as AppView, icon: Compass, desc: 'Search open listings with match scores' },
    { label: 'Applications Kanban & Tracker', view: 'applications-tracker' as AppView, icon: Briefcase, desc: 'Manage your active job pipeline' },
    { label: 'Resume Tailor & ATS Optimizer', view: 'resume-tailor' as AppView, icon: Sparkles, desc: 'Truth-grounded tailored resume' },
    { label: 'Resume Builder & Export', view: 'resume-builder' as AppView, icon: FileText, desc: 'Create and export PDF resume versions' },
    { label: 'Cover Letter Generator', view: 'cover-letter' as AppView, icon: FileText, desc: 'Generate customized authentic cover letters' },
    { label: 'Analytics & Search Metrics', view: 'analytics' as AppView, icon: TrendingUp, desc: 'Response rate and score distribution' },
    { label: 'AI Career Insights', view: 'career-insights' as AppView, icon: Sparkles, desc: 'Skill gap and market demand analysis' },
    { label: 'Chrome Extension Assistant', view: 'extension-simulator' as AppView, icon: ShieldCheck, desc: 'Simulated browser form autofill panel' },
    { label: 'Security & App Settings', view: 'settings' as AppView, icon: Settings, desc: 'Privacy, export data, job preferences' },
    { label: 'Admin Telemetry Panel', view: 'admin' as AppView, icon: ShieldCheck, desc: 'System health & token telemetry' }
  ];

  const q = (searchQuery || '').toLowerCase();
  const filteredNav = navItems.filter(item =>
    (item.label || '').toLowerCase().includes(q) ||
    (item.desc || '').toLowerCase().includes(q)
  );

  const filteredJobs = (jobs || []).filter(j =>
    (j.title || '').toLowerCase().includes(q) ||
    (j.company || '').toLowerCase().includes(q)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="w-full max-w-2xl bg-slate-900 border border-slate-700/60 rounded-2xl shadow-2xl shadow-black/80 overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Header */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-800 bg-slate-900/90">
          <Search className="w-5 h-5 text-indigo-400 mr-3 shrink-0" />
          <input
            autoFocus
            type="text"
            placeholder="Type a command, job title, or feature... (Esc to close)"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Escape') setIsCommandPaletteOpen(false);
            }}
            className="flex-1 bg-transparent text-slate-100 placeholder-slate-400 text-sm focus:outline-none"
          />
          <button
            onClick={() => setIsCommandPaletteOpen(false)}
            className="text-slate-400 hover:text-slate-200 p-1 rounded-md"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2 space-y-1">
          {filteredNav.length > 0 && (
            <div className="px-2 py-1 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Navigation & Tools
            </div>
          )}
          {filteredNav.map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.view}
                onClick={() => navigateTo(item.view)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left hover:bg-slate-800/80 text-slate-200 transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500/20">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-100">{item.label}</p>
                  <p className="text-xs text-slate-400 truncate">{item.desc}</p>
                </div>
                <span className="text-xs text-slate-500 font-mono">Jump</span>
              </button>
            );
          })}

          {filteredJobs.length > 0 && (
            <>
              <div className="px-2 pt-3 pb-1 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Matching Job Listings
              </div>
              {filteredJobs.slice(0, 4).map(job => (
                <div
                  key={job.id}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-slate-800/80 transition-colors"
                >
                  <div
                    onClick={() => {
                      setSelectedJobId(job.id);
                      setCurrentView('job-detail');
                      setIsCommandPaletteOpen(false);
                    }}
                    className="flex-1 cursor-pointer"
                  >
                    <p className="text-sm font-medium text-slate-100">{job.title}</p>
                    <p className="text-xs text-slate-400">{job.company} • {job.location}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                      {job.matchScore}% Match
                    </span>
                    <button
                      onClick={() => {
                        startApplicationForJob(job.id);
                        setIsCommandPaletteOpen(false);
                      }}
                      className="px-2.5 py-1 text-xs font-medium bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              ))}
            </>
          )}

          {filteredNav.length === 0 && filteredJobs.length === 0 && (
            <div className="py-8 text-center text-sm text-slate-400">
              No matching commands or jobs found. Try typing &ldquo;resume&rdquo;, &ldquo;developer&rdquo;, or &ldquo;settings&rdquo;.
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 border-t border-slate-800 bg-slate-900/60 flex items-center justify-between text-xs text-slate-400">
          <span>Navigate with mouse or arrow keys</span>
          <span><kbd className="px-1.5 py-0.5 bg-slate-800 rounded border border-slate-700 font-mono text-[10px]">ESC</kbd> to close</span>
        </div>
      </div>
    </div>
  );
};
