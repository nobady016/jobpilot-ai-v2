import React, { useState } from 'react';
import {
  Bell,
  Search,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Globe
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Header: React.FC = () => {
  const {
    userProfile,
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    setIsCommandPaletteOpen,
    setCurrentView,
    currentView
  } = useApp();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="h-16 border-b border-slate-800 bg-slate-900/80 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30">
      {/* Left: Search Bar Trigger */}
      <div className="flex items-center gap-3 flex-1 max-w-md">
        <button
          onClick={() => setIsCommandPaletteOpen(true)}
          className="w-full flex items-center justify-between px-3.5 py-2 bg-slate-950/60 hover:bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-400 hover:text-slate-200 transition-all shadow-inner group"
        >
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-indigo-400 group-hover:text-indigo-300" />
            <span className="truncate">Search jobs, tailored resumes, commands...</span>
          </div>
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono bg-slate-800 border border-slate-700 text-slate-300 rounded">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Right: Actions, Notifications, User */}
      <div className="flex items-center gap-3">
        {/* Landing preview toggle */}
        {currentView !== 'landing' && (
          <button
            onClick={() => setCurrentView('landing')}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 rounded-lg transition-colors"
          >
            <Globe className="w-3.5 h-3.5 text-indigo-400" />
            <span>Landing Page</span>
          </button>
        )}

        {/* Truthful Guarantee badge */}
        <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-lg text-xs font-medium">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Truthful AI Active</span>
        </div>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className="relative p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl border border-transparent hover:border-slate-700 transition-all"
            aria-label="View notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-500 rounded-full ring-2 ring-slate-900" />
            )}
          </button>

          {isNotifOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl shadow-black/80 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-slate-900/90">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-slate-100">Notifications</span>
                  {unreadCount > 0 && (
                    <span className="text-xs bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-1.5 py-0.5 rounded-full font-medium">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllNotificationsRead}
                    className="text-xs text-indigo-400 hover:text-indigo-300"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-slate-800/60 p-1">
                {notifications.length === 0 ? (
                  <div className="p-6 text-center text-xs text-slate-400">
                    No new notifications
                  </div>
                ) : (
                  notifications.map(n => (
                    <div
                      key={n.id}
                      onClick={() => {
                        markNotificationRead(n.id);
                        if (n.link?.includes('recruiter') || n.title.toLowerCase().includes('reply') || n.title.toLowerCase().includes('recruiter')) {
                          setCurrentView('recruiter-inbox');
                          setIsNotifOpen(false);
                        } else if (n.link?.includes('applications')) {
                          setCurrentView('applications-tracker');
                          setIsNotifOpen(false);
                        }
                      }}
                      className={`p-3 rounded-xl cursor-pointer transition-colors ${
                        n.read ? 'hover:bg-slate-800/40 opacity-75' : 'bg-slate-800/50 hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-xs font-semibold text-slate-200">{n.title}</p>
                        {!n.read && (
                          <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full shrink-0 mt-1" />
                        )}
                      </div>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">{n.message}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Pill */}
        <div
          onClick={() => setCurrentView('settings')}
          className="flex items-center gap-2.5 pl-2 pr-3 py-1 bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 rounded-xl cursor-pointer transition-all"
        >
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-indigo-600 to-indigo-400 flex items-center justify-center font-bold text-white text-xs shadow-sm">
            {userProfile?.name?.charAt(0) || 'A'}
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-semibold text-slate-200 leading-tight">
              {userProfile?.name || 'Alex Mercer'}
            </p>
            <p className="text-[10px] text-slate-400">Pro Plan</p>
          </div>
        </div>
      </div>
    </header>
  );
};
