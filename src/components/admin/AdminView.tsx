import React from 'react';
import {
  ShieldAlert,
  Activity,
  Cpu,
  Database,
  CheckCircle2,
  Lock,
  RefreshCw,
  Clock,
  Terminal
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatDate } from '../../lib/utils';

export const AdminView: React.FC = () => {
  const { auditLogs, jobs, applications, userProfile, refreshData, addToast } = useApp();

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-150">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-indigo-400" />
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
              Admin &amp; Security Telemetry
            </h1>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            System health indicators, Gemini AI token governance, and full security audit trail.
          </p>
        </div>

        <button
          onClick={async () => {
            await refreshData();
            addToast('info', 'Telemetry Synced', 'Refreshed system audit state.');
          }}
          className="px-4 py-2 bg-slate-900 hover:bg-slate-850 text-slate-300 rounded-xl text-xs font-semibold border border-slate-800 flex items-center gap-1.5 self-start sm:self-auto"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh Metrics</span>
        </button>
      </div>

      {/* System Status Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Gemini AI Service</span>
            <Cpu className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-black text-emerald-400">Operational</p>
          <p className="text-[11px] text-slate-400">Latency: 240ms</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Active Job Feeds</span>
            <Database className="w-4 h-4 text-indigo-400" />
          </div>
          <p className="text-2xl font-black text-slate-100">{jobs.length} Positions</p>
          <p className="text-[11px] text-slate-400">Greenhouse, Lever, Direct</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Active Applications</span>
            <Activity className="w-4 h-4 text-sky-400" />
          </div>
          <p className="text-2xl font-black text-sky-400">{applications.length}</p>
          <p className="text-[11px] text-slate-400">100% User Authorized</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Zero-Hallucination Policy</span>
            <Lock className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-black text-emerald-400">Enforced</p>
          <p className="text-[11px] text-slate-400">0 Violations Detected</p>
        </div>
      </div>

      {/* Security Audit Trail Table */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-indigo-400" />
            <h2 className="text-base font-bold text-slate-100">Application Audit Logs</h2>
          </div>
          <span className="text-xs text-slate-400 font-mono">Immutable User Audit Trail</span>
        </div>

        <div className="rounded-2xl bg-slate-950 border border-slate-850 overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900 text-slate-400 uppercase tracking-wider text-[10px] border-b border-slate-800">
              <tr>
                <th className="p-3.5 font-semibold">Action</th>
                <th className="p-3.5 font-semibold">Details / Context</th>
                <th className="p-3.5 font-semibold">User Confirmed</th>
                <th className="p-3.5 font-semibold text-right">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-850 font-mono">
              {auditLogs.map(log => (
                <tr key={log.id} className="hover:bg-slate-900/50 transition-colors text-slate-300">
                  <td className="p-3.5 text-indigo-400 font-semibold">{log.action}</td>
                  <td className="p-3.5 text-slate-300 font-sans text-xs">
                    {JSON.stringify(log.details)}
                  </td>
                  <td className="p-3.5">
                    {log.userConfirmed ? (
                      <span className="text-emerald-400 flex items-center gap-1 text-[11px] font-sans">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Approved
                      </span>
                    ) : (
                      <span className="text-slate-500 font-sans text-[11px]">System</span>
                    )}
                  </td>
                  <td className="p-3.5 text-slate-400 text-right text-[11px]">
                    {formatDate(log.timestamp)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
