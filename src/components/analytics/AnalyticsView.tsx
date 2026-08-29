import React from 'react';
import {
  TrendingUp,
  Briefcase,
  CheckCircle2,
  Calendar,
  Sparkles,
  PieChart,
  BarChart3,
  Award,
  Zap
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';
import { useApp } from '../../context/AppContext';

export const AnalyticsView: React.FC = () => {
  const { applications, jobs, dashboardStats } = useApp();

  const funnelData = [
    { stage: 'Saved Jobs', count: 3 },
    { stage: 'Preparing', count: 1 },
    { stage: 'Applied', count: 4 },
    { stage: 'Interview', count: 1 },
    { stage: 'Offer', count: 0 }
  ];

  const scoreCorrelationData = [
    { scoreRange: '60-70%', apps: 1, responses: 0 },
    { scoreRange: '70-80%', apps: 2, responses: 1 },
    { scoreRange: '80-90%', apps: 4, responses: 3 },
    { scoreRange: '90-100%', apps: 3, responses: 3 }
  ];

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-150">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-indigo-400" />
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
            Search Analytics &amp; Metrics
          </h1>
        </div>
        <p className="text-sm text-slate-400 mt-1">
          Track conversion funnels, interview velocity, and match score correlations.
        </p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Total Applications</span>
            <Briefcase className="w-4 h-4 text-indigo-400" />
          </div>
          <p className="text-3xl font-black text-slate-100">{applications.length}</p>
          <p className="text-[11px] text-emerald-400 font-medium">+2 this week</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Employer Response Rate</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-3xl font-black text-emerald-400">{dashboardStats?.responseRate || 75}%</p>
          <p className="text-[11px] text-slate-400">3 of 4 applications responded</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Interview Conversion</span>
            <Calendar className="w-4 h-4 text-sky-400" />
          </div>
          <p className="text-3xl font-black text-sky-400">25%</p>
          <p className="text-[11px] text-slate-400">1 active scheduled</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Average Match Score</span>
            <Sparkles className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-3xl font-black text-amber-400">89%</p>
          <p className="text-[11px] text-slate-400">Top-tier alignment</p>
        </div>
      </div>

      {/* Grid: Conversion Funnel & Score Correlation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Conversion Funnel */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-100">Application Pipeline Funnel</h3>
              <p className="text-xs text-slate-400">Volume across application stages</p>
            </div>
            <BarChart3 className="w-4 h-4 text-indigo-400" />
          </div>

          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={funnelData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="stage" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '12px',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="count" fill="#6366f1" radius={[6, 6, 0, 0]} name="Count" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Score vs Response Correlation */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-100">Score vs. Positive Response</h3>
              <p className="text-xs text-slate-400">Higher match scores correlate with faster responses</p>
            </div>
            <Award className="w-4 h-4 text-emerald-400" />
          </div>

          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={scoreCorrelationData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="scoreRange" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '12px',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="apps" fill="#475569" radius={[4, 4, 0, 0]} name="Applications" />
                <Bar dataKey="responses" fill="#10b981" radius={[4, 4, 0, 0]} name="Positive Responses" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* AI Diagnostic Summary Card */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-950/40 via-slate-900 to-slate-900 border border-indigo-500/30 space-y-3">
        <div className="flex items-center gap-2 text-indigo-400">
          <Zap className="w-4 h-4" />
          <span className="text-xs font-bold uppercase tracking-wider">AI Data Diagnosis</span>
        </div>
        <h4 className="text-sm font-bold text-slate-100">
          Tailored Applications Outperform Standard Submissions by 240%
        </h4>
        <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
          Based on your telemetry, applications submitted with custom-tailored keywords for React, TypeScript, and component architecture achieved a 100% response rate within 5 business days, compared to lower response rates on generic full-stack roles.
        </p>
      </div>
    </div>
  );
};
