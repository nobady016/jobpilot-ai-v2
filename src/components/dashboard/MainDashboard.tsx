import React from 'react';
import {
  Briefcase,
  Calendar,
  Bookmark,
  Sparkles,
  TrendingUp,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  Zap,
  Check,
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { useApp } from '../../context/AppContext';
import { formatSalary, getScoreColor, formatDate } from '../../lib/utils';

export const MainDashboard: React.FC = () => {
  const {
    userProfile,
    dashboardStats,
    jobs,
    applications,
    reminders,
    toggleReminder,
    setCurrentView,
    setSelectedJobId,
    startApplicationForJob,
    toggleSaveJob,
    careerInsights
  } = useApp();

  const activityData = [
    { week: 'W1', applied: 1, responses: 0, interviews: 0 },
    { week: 'W2', applied: 3, responses: 1, interviews: 0 },
    { week: 'W3', applied: 5, responses: 3, interviews: 1 },
    { week: 'W4', applied: 4, responses: 3, interviews: 1 }
  ];

  const strongMatches = jobs.filter(j => j.matchScore >= 85).slice(0, 3);
  const activeReminders = reminders.filter(r => !r.completed);

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-200">
      {/* Header Greeting & Fast Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
            Good morning, {userProfile?.name?.split(' ')[0] || 'Alex'}
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Here&apos;s what&apos;s happening with your job search on JobPilot AI.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setCurrentView('jobs')}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all flex items-center gap-1.5"
          >
            <Zap className="w-3.5 h-3.5 fill-white" />
            <span>Discover Jobs</span>
          </button>
          <button
            onClick={() => setCurrentView('resume-tailor')}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-850 text-slate-200 border border-slate-800 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Tailor Resume</span>
          </button>
        </div>
      </div>

      {/* Top Statistics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Total Applied</span>
            <Briefcase className="w-4 h-4 text-indigo-400" />
          </div>
          <p className="text-2xl font-black text-slate-100">{dashboardStats?.totalApplications || applications.length}</p>
          <p className="text-[11px] text-emerald-400 font-medium">Active in pipeline</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Interviews</span>
            <Calendar className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-black text-emerald-400">{dashboardStats?.interviewsCount || 1}</p>
          <p className="text-[11px] text-slate-400">1 scheduled next week</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Saved Jobs</span>
            <Bookmark className="w-4 h-4 text-sky-400" />
          </div>
          <p className="text-2xl font-black text-slate-100">{dashboardStats?.savedJobsCount || 3}</p>
          <p className="text-[11px] text-slate-400">Ready to prepare</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Strong Matches</span>
            <Sparkles className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-2xl font-black text-amber-400">{dashboardStats?.strongMatchesCount || 4}</p>
          <p className="text-[11px] text-slate-400">&gt;85% compatibility</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1 col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Response Rate</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-black text-emerald-400">{dashboardStats?.responseRate || 75}%</p>
          <p className="text-[11px] text-emerald-400 font-medium">Above industry avg (12%)</p>
        </div>
      </div>

      {/* Main Grid: Recommended Jobs & Application Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recommended Jobs (2 Columns) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <h2 className="text-base font-bold text-slate-100">Recommended For You</h2>
            </div>
            <button
              onClick={() => setCurrentView('jobs')}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1"
            >
              <span>View all ({jobs.length})</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {strongMatches.map(job => {
              const scoreStyle = getScoreColor(job.matchScore);
              return (
                <div
                  key={job.id}
                  className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/90 hover:border-indigo-500/40 transition-all space-y-3 group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20 uppercase tracking-wide">
                          {job.source}
                        </span>
                        <span className="text-xs text-slate-400 capitalize">{job.remoteType} • {job.employmentType}</span>
                      </div>
                      <h3
                        onClick={() => {
                          setSelectedJobId(job.id);
                          setCurrentView('job-detail');
                        }}
                        className="text-base font-bold text-slate-100 hover:text-indigo-400 cursor-pointer mt-1"
                      >
                        {job.title}
                      </h3>
                      <p className="text-xs text-slate-400">{job.company} • {job.location}</p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className={`inline-block text-xs font-bold px-2.5 py-1 rounded-xl border ${scoreStyle.badge}`}>
                        {job.matchScore}% Match
                      </span>
                      <p className="text-xs text-slate-400 mt-1 font-mono">
                        {formatSalary(job.salaryMin, job.salaryMax, job.currency)}
                      </p>
                    </div>
                  </div>

                  {/* Why you're a good match */}
                  <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs text-slate-300">
                    <span className="text-indigo-400 font-semibold">Why you match: </span>
                    {job.id === 'job_001' && 'Your React, TypeScript, and UI component architecture aligns directly with requirements.'}
                    {job.id === 'job_002' && 'Deep overlap with Node.js, PostgreSQL schema design, and microservice APIs.'}
                    {job.id === 'job_005' && 'Exceeds all junior qualifications with production experience and CS foundational degree.'}
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <div className="flex flex-wrap gap-1.5">
                      {job.requiredSkills.slice(0, 3).map(skill => (
                        <span key={skill} className="text-[11px] px-2 py-0.5 bg-slate-800 text-slate-300 rounded-md border border-slate-700/60">
                          {skill}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleSaveJob(job.id)}
                        className={`p-2 rounded-xl border text-xs font-medium transition-colors ${
                          job.isSaved
                            ? 'bg-sky-500/20 text-sky-300 border-sky-500/40'
                            : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
                        }`}
                        aria-label="Bookmark Job"
                      >
                        <Bookmark className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedJobId(job.id);
                          setCurrentView('job-detail');
                        }}
                        className="px-3 py-1.5 bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-semibold rounded-xl transition-colors"
                      >
                        View Job
                      </button>
                      <button
                        onClick={() => startApplicationForJob(job.id)}
                        className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl shadow-md shadow-indigo-600/20 transition-all"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Upcoming Reminders & Career Insight */}
        <div className="space-y-6">
          {/* Upcoming Events / Reminders */}
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-indigo-400" />
                <h3 className="text-sm font-bold text-slate-100">Upcoming Reminders</h3>
              </div>
              <button
                onClick={() => setCurrentView('reminders')}
                className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold"
              >
                View all
              </button>
            </div>

            <div className="space-y-2.5">
              {activeReminders.length === 0 ? (
                <p className="text-xs text-slate-400 py-3">All reminders completed!</p>
              ) : (
                activeReminders.slice(0, 3).map(rem => (
                  <div
                    key={rem.id}
                    className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3 transition-colors"
                  >
                    <button
                      onClick={() => toggleReminder(rem.id)}
                      className="w-4 h-4 rounded-md border border-slate-700 hover:border-emerald-500 flex items-center justify-center text-emerald-400 mt-0.5"
                    >
                      {rem.completed && <Check className="w-3 h-3" />}
                    </button>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-slate-200 truncate">{rem.title}</p>
                      <p className="text-[11px] text-slate-400">{rem.company}</p>
                      <span className="inline-block text-[10px] text-indigo-400 font-mono mt-1">
                        Due: {formatDate(rem.dueDate)}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* AI Career Insight Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-950/40 via-slate-900 to-slate-900 border border-indigo-500/30 space-y-3">
            <div className="flex items-center gap-2 text-indigo-400">
              <Sparkles className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">AI Career Intelligence</span>
            </div>
            <h4 className="text-sm font-bold text-slate-100">
              Response Rate is Highest for Full-Stack React Roles
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              &ldquo;Your current dataset shows a 75% response rate when applying to roles requiring TypeScript + React. Consider targeting 2 more mid-level frontend postings this week.&rdquo;
            </p>
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">Grounded in user analytics</span>
              <button
                onClick={() => setCurrentView('career-insights')}
                className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
              >
                <span>Insights</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Truthful Guarantee Card */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-200">Zero-Hallucination Safe Mode</span>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Every suggested answer and tailored resume bullet is 100% grounded in your verified experience.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Application Activity Chart */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-100">Application Velocity &amp; Responses</h3>
            <p className="text-xs text-slate-400">Applications submitted vs positive employer responses over the past 4 weeks</p>
          </div>
          <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
            3 Active Responses
          </span>
        </div>

        <div className="h-60 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={activityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorApplied" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="colorResp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="week" stroke="#64748b" fontSize={12} tickLine={false} />
              <YAxis stroke="#64748b" fontSize={12} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderColor: '#334155',
                  borderRadius: '12px',
                  fontSize: '12px',
                  color: '#f8fafc'
                }}
              />
              <Area type="monotone" dataKey="applied" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorApplied)" name="Applied" />
              <Area type="monotone" dataKey="responses" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorResp)" name="Responses" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
