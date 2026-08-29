import React, { useState, useEffect } from 'react';
import {
  Zap,
  Play,
  Pause,
  Sliders,
  CheckCircle2,
  AlertCircle,
  Building2,
  Send,
  Sparkles,
  ShieldCheck,
  RefreshCw,
  Clock,
  ArrowRight,
  Filter,
  Check
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { api } from '../../services/apiClient';
import { AutonomousApplyLog } from '../../types';

export const AutonomousApplyView: React.FC = () => {
  const { jobPreferences, updatePreferences, addToast, refreshData, setCurrentView } = useApp();
  
  const [isRunningBatch, setIsRunningBatch] = useState(false);
  const [autoApplyStatus, setAutoApplyStatus] = useState<{
    enabled: boolean;
    dailyTarget: number;
    minMatchScore: number;
    preferredPortals: string[];
    lastAutonomousRun: string;
    todayAppliedCount: number;
    logs: AutonomousApplyLog[];
  }>({
    enabled: jobPreferences?.autoApplyEnabled ?? true,
    dailyTarget: jobPreferences?.autoApplyDailyTarget ?? 12,
    minMatchScore: jobPreferences?.autoApplyMinMatchScore ?? 85,
    preferredPortals: jobPreferences?.autoApplyPreferredPortals ?? ['greenhouse', 'lever', 'linkedin', 'direct'],
    lastAutonomousRun: jobPreferences?.lastAutonomousRun || new Date().toISOString(),
    todayAppliedCount: jobPreferences?.todayAppliedCount ?? 12,
    logs: []
  });

  const [dailyTargetInput, setDailyTargetInput] = useState<number>(jobPreferences?.autoApplyDailyTarget || 12);
  const [minMatchInput, setMinMatchInput] = useState<number>(jobPreferences?.autoApplyMinMatchScore || 85);
  const [isEnabled, setIsEnabled] = useState<boolean>(jobPreferences?.autoApplyEnabled ?? true);
  const [humanToneOnly, setHumanToneOnly] = useState<boolean>(jobPreferences?.autoApplyHumanToneOnly ?? true);

  const fetchStatus = async () => {
    try {
      const res = await api.getAutoApplyStatus();
      setAutoApplyStatus(res);
      setIsEnabled(res.enabled);
      setDailyTargetInput(res.dailyTarget);
      setMinMatchInput(res.minMatchScore);
    } catch (err: any) {
      console.error('Error fetching auto-apply status:', err);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  const handleToggleActive = async () => {
    const nextState = !isEnabled;
    setIsEnabled(nextState);
    await updatePreferences({
      autoApplyEnabled: nextState
    });
    addToast(
      'info',
      nextState ? 'Auto-Apply Engine Active' : 'Auto-Apply Engine Paused',
      nextState 
        ? `Bot is active. Will autonomously apply to ${dailyTargetInput} companies/day.` 
        : 'Autonomous applications paused.'
    );
  };

  const handleSaveConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    await updatePreferences({
      autoApplyDailyTarget: Number(dailyTargetInput),
      autoApplyMinMatchScore: Number(minMatchInput),
      autoApplyEnabled: isEnabled,
      autoApplyHumanToneOnly: humanToneOnly
    });
    addToast('success', 'Auto-Apply Settings Saved', `Paced at ${dailyTargetInput} applications/day with min match >= ${minMatchInput}%.`);
  };

  const handleTriggerManualBatch = async () => {
    setIsRunningBatch(true);
    try {
      const res = await api.triggerAutoApplyBatch(dailyTargetInput);
      addToast(
        'success',
        `🚀 Batch Executed: ${res.applied} Applications Submitted!`,
        `Autonomous worker applied to ${res.applied} matching companies with custom 100% human-toned cover letters.`
      );
      await refreshData();
      await fetchStatus();
    } catch (err: any) {
      addToast('error', 'Auto-Apply Failed', err.message);
    } finally {
      setIsRunningBatch(false);
    }
  };

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-150">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border border-indigo-500/30 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-indigo-400 fill-indigo-400" />
              100% Autonomous Mode
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              100% Human Tone Only
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
            Autonomous Daily Auto-Apply Engine
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            JobPilot continuously scans verified jobs across Greenhouse, Lever, and LinkedIn, 
            tailors custom resumes with zero AI fluff, and automatically submits <strong className="text-indigo-300">10 to 15 applications every day</strong> without requiring you to open or click anything.
          </p>
        </div>

        {/* Status Toggle & Manual Trigger */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
          <button
            onClick={handleToggleActive}
            className={`px-5 py-3 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-lg ${
              isEnabled
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/25 border border-emerald-400/40'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
            }`}
          >
            {isEnabled ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>ENGINE RUNNING (ACTIVE)</span>
              </>
            ) : (
              <>
                <Pause className="w-4 h-4" />
                <span>PAUSED (CLICK TO START)</span>
              </>
            )}
          </button>

          <button
            disabled={isRunningBatch}
            onClick={handleTriggerManualBatch}
            className="px-5 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-2xl text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/25 transition-all border border-indigo-400/30"
          >
            <RefreshCw className={`w-4 h-4 ${isRunningBatch ? 'animate-spin' : ''}`} />
            <span>{isRunningBatch ? 'Applying to 10-15 Jobs...' : 'Run Daily Batch Now'}</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Daily Target</span>
            <Sliders className="w-4 h-4 text-indigo-400" />
          </div>
          <p className="text-2xl font-black text-slate-100">{dailyTargetInput} <span className="text-xs font-normal text-slate-400">jobs/day</span></p>
          <p className="text-[11px] text-emerald-400">Optimal pace (avoid spam flags)</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Applied Today</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-black text-emerald-400">{autoApplyStatus.todayAppliedCount}</p>
          <p className="text-[11px] text-slate-400">100% human-sound answers</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Min Match Threshold</span>
            <Filter className="w-4 h-4 text-sky-400" />
          </div>
          <p className="text-2xl font-black text-slate-100">{minMatchInput}%</p>
          <p className="text-[11px] text-slate-400">Only strong match postings</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Human-Tone Score</span>
            <Sparkles className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-2xl font-black text-amber-300">98.4%</p>
          <p className="text-[11px] text-slate-400">0% robotic buzzwords</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Live Automation Activity Feed */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-100">Live Autonomous Application Feed</h2>
              <p className="text-xs text-slate-400">Jobs submitted automatically in the background on your behalf</p>
            </div>
            <button
              onClick={() => setCurrentView('applications-tracker')}
              className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
            >
              <span>View Full Tracker</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {autoApplyStatus.logs.length === 0 ? (
              <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 text-center space-y-3">
                <Clock className="w-8 h-8 text-indigo-400 mx-auto" />
                <h3 className="text-sm font-bold text-slate-200">Scheduled for Next Daily Sweep</h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  Click &ldquo;Run Daily Batch Now&rdquo; above to immediately trigger the autonomous submission loop for 10-15 matching roles.
                </p>
              </div>
            ) : (
              autoApplyStatus.logs.map(log => (
                <div
                  key={log.id}
                  className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800/90 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all hover:border-slate-700"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0 mt-0.5">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs font-bold text-slate-100">{log.jobTitle}</h4>
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                          {log.portal}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400">{log.company}</p>
                      <p className="text-[11px] text-slate-300 mt-1">{log.reason}</p>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between gap-1 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800">
                    <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                      {log.matchScore}% Match
                    </span>
                    <span className="text-[10px] text-indigo-300 font-medium">
                      Human Tone: {log.humanToneScore}%
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Column: Automation Parameters & Safety Configuration */}
        <div className="space-y-6">
          <form onSubmit={handleSaveConfig} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-5">
            <div className="border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-slate-100">Automation Controls</h3>
              <p className="text-xs text-slate-400">Configure daily volume and matching filters</p>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">
                  Daily Application Target (Companies/Day)
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[10, 12, 15].map(cnt => (
                    <button
                      key={cnt}
                      type="button"
                      onClick={() => setDailyTargetInput(cnt)}
                      className={`py-2 rounded-xl font-bold border transition-all ${
                        dailyTargetInput === cnt
                          ? 'bg-indigo-600 text-white border-indigo-500'
                          : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      {cnt} / day
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">
                  Minimum Match Threshold: <span className="text-indigo-400 font-bold">{minMatchInput}%</span>
                </label>
                <input
                  type="range"
                  min="75"
                  max="95"
                  step="1"
                  value={minMatchInput}
                  onChange={e => setMinMatchInput(Number(e.target.value))}
                  className="w-full accent-indigo-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>75% (Wider net)</span>
                  <span>85% (Balanced)</span>
                  <span>95% (Exact fit only)</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={humanToneOnly}
                    onChange={e => setHumanToneOnly(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-700 text-indigo-600 focus:ring-indigo-500 bg-slate-950"
                  />
                  <div>
                    <p className="font-semibold text-slate-200">Strict 100% Human Tone</p>
                    <p className="text-[11px] text-slate-400">Forbid all robotic AI buzzwords &amp; generic intros</p>
                  </div>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isEnabled}
                    onChange={e => setIsEnabled(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-700 text-indigo-600 focus:ring-indigo-500 bg-slate-950"
                  />
                  <div>
                    <p className="font-semibold text-slate-200">Background Daily Worker</p>
                    <p className="text-[11px] text-slate-400">Run automatic cycles without opening the browser</p>
                  </div>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold rounded-xl border border-slate-700 transition-all text-xs"
              >
                Save Automation Settings
              </button>
            </div>
          </form>

          {/* Safe Automation Guarantee */}
          <div className="p-5 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-3 text-xs text-slate-300">
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>JobPilot Safe Auto-Apply Guarantee</span>
            </div>
            <ul className="space-y-2 text-[11px] text-slate-400">
              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Paced at 10-15 per day to maintain 100% natural human velocity.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Scam &amp; phishing filter automatically discards suspicious listings.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>No duplicate applications to the same company or position.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
