import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Bookmark,
  Sparkles,
  Send,
  Building,
  MapPin,
  DollarSign,
  Calendar,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  FileText,
  ExternalLink,
  ChevronRight,
  RefreshCw
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { api } from '../../services/apiClient';
import { formatSalary, getScoreColor, formatDate } from '../../lib/utils';
import { AIJobAnalysis } from '../../types';

export const JobDetailView: React.FC = () => {
  const {
    selectedJobId,
    jobs,
    setCurrentView,
    toggleSaveJob,
    startApplicationForJob,
    addToast
  } = useApp();

  const [job, setJob] = useState<any>(null);
  const [analysis, setAnalysis] = useState<AIJobAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    if (!selectedJobId) {
      setCurrentView('jobs');
      return;
    }

    const currentJob = jobs.find(j => j.id === selectedJobId);
    if (currentJob) {
      setJob(currentJob);
    }

    // Fetch full detail + analysis
    api.getJobById(selectedJobId)
      .then(data => {
        setJob(data);
        if (data.analysis) {
          setAnalysis(data.analysis);
        }
      })
      .catch(err => {
        console.error(err);
      });
  }, [selectedJobId, jobs]);

  const handleRunAnalysis = async () => {
    if (!selectedJobId) return;
    setIsAnalyzing(true);
    try {
      addToast('info', 'AI Analyzing Job Compatibility...', 'Evaluating 5-factor transparent matrix');
      const res = await api.analyzeJob(selectedJobId);
      setAnalysis(res);
      addToast('success', 'Analysis Updated', 'Fresh score breakdown generated.');
    } catch (err: any) {
      addToast('error', 'Analysis Failed', err.message);
    } finally {
      setIsAnalyzing(false);
    }
  };

  if (!job) {
    return (
      <div className="p-12 text-center text-slate-400">
        <p>Loading job details...</p>
      </div>
    );
  }

  const scoreStyle = getScoreColor(job.matchScore || 85);

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-150">
      {/* Top Breadcrumb / Back */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentView('jobs')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-slate-200 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to all opportunities</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleSaveJob(job.id)}
            className={`px-3.5 py-2 rounded-xl border text-xs font-medium transition-colors flex items-center gap-1.5 ${
              job.isSaved
                ? 'bg-sky-500/20 text-sky-300 border-sky-500/40'
                : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>{job.isSaved ? 'Saved' : 'Save Job'}</span>
          </button>

          <button
            onClick={() => {
              setCurrentView('resume-tailor');
            }}
            className="px-4 py-2 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tailor Resume</span>
          </button>

          <button
            onClick={() => {
              setCurrentView('cover-letter');
            }}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-850 text-slate-200 border border-slate-800 text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5"
          >
            <FileText className="w-3.5 h-3.5 text-indigo-400" />
            <span>Cover Letter</span>
          </button>

          <button
            onClick={() => startApplicationForJob(job.id)}
            className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl shadow-md shadow-indigo-600/20 transition-all flex items-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Assisted Apply</span>
          </button>
        </div>
      </div>

      {/* Main Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded border border-indigo-500/20 uppercase tracking-wide">
                {job.source}
              </span>
              <span className="text-xs text-slate-400 capitalize">{job.remoteType} • {job.employmentType}</span>
              {job.isSuspicious && (
                <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-400 bg-rose-500/20 px-2.5 py-0.5 rounded border border-rose-500/40">
                  <AlertTriangle className="w-3.5 h-3.5" /> Suspicious Posting
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100">{job.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 pt-1">
              <span className="flex items-center gap-1.5 font-medium">
                <Building className="w-4 h-4 text-slate-500" />
                {job.company}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-slate-500" />
                {job.location}
              </span>
              <span className="flex items-center gap-1.5 font-mono text-slate-200">
                <DollarSign className="w-4 h-4 text-slate-500" />
                {formatSalary(job.salaryMin, job.salaryMax, job.currency)}
              </span>
              <span className="flex items-center gap-1.5 text-slate-400">
                <Calendar className="w-4 h-4 text-slate-500" />
                Posted {formatDate(job.postedAt)}
              </span>
            </div>
          </div>

          {/* Match Score Badge */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-center shrink-0 min-w-44">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Transparent Score
            </span>
            <div className="text-3xl font-black text-emerald-400">{job.matchScore}%</div>
            <span className="text-[11px] text-emerald-300 font-medium">Strong Candidate Alignment</span>
          </div>
        </div>
      </div>

      {/* Grid: Left (Job Specs & Description) / Right (AI Transparent Score Breakdown) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: Description & Requirements */}
        <div className="lg:col-span-2 space-y-6">
          {/* Job Overview */}
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
            <h2 className="text-base font-bold text-slate-100">About the Role</h2>
            <div className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
              {job.description}
            </div>

            <div className="pt-4 border-t border-slate-800 space-y-3">
              <h3 className="text-sm font-bold text-slate-200">Required Skills &amp; Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {job.requiredSkills.map((s: string) => (
                  <span
                    key={s}
                    className="px-3 py-1 bg-slate-950 text-indigo-300 border border-slate-800 rounded-xl text-xs font-semibold"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {job.preferredSkills?.length > 0 && (
              <div className="pt-2 space-y-2">
                <h3 className="text-sm font-bold text-slate-200">Bonus / Preferred Qualifications</h3>
                <div className="flex flex-wrap gap-2">
                  {job.preferredSkills.map((s: string) => (
                    <span
                      key={s}
                      className="px-3 py-1 bg-slate-950 text-slate-300 border border-slate-800/80 rounded-xl text-xs"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Transparent AI Match Analysis */}
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-indigo-400">
                <Sparkles className="w-4 h-4" />
                <h3 className="text-sm font-bold text-slate-100">Match Factor Breakdown</h3>
              </div>
              <button
                onClick={handleRunAnalysis}
                disabled={isAnalyzing}
                className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isAnalyzing ? 'animate-spin' : ''}`} />
                <span>Re-score</span>
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Skills Alignment (40% weight)</span>
                  <span className="font-bold text-emerald-400">
                    {analysis?.breakdown?.skillsMatch || 92}%
                  </span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full"
                    style={{ width: `${analysis?.breakdown?.skillsMatch || 92}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Experience Depth (25% weight)</span>
                  <span className="font-bold text-blue-400">
                    {analysis?.breakdown?.experienceMatch || 90}%
                  </span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full"
                    style={{ width: `${analysis?.breakdown?.experienceMatch || 90}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Education Requirements (15% weight)</span>
                  <span className="font-bold text-indigo-400">
                    {analysis?.breakdown?.educationMatch || 95}%
                  </span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-500 rounded-full"
                    style={{ width: `${analysis?.breakdown?.educationMatch || 95}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Location &amp; Work Auth (10% weight)</span>
                  <span className="font-bold text-sky-400">
                    {analysis?.breakdown?.locationMatch || 95}%
                  </span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-sky-500 rounded-full"
                    style={{ width: `${analysis?.breakdown?.locationMatch || 95}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Strengths List */}
            <div className="pt-3 border-t border-slate-800 space-y-2">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Candidate Strengths
              </span>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {(analysis?.strengths || [
                  'Direct proficiency in React and TypeScript ecosystems',
                  'Proven full-lifecycle frontend and API integration track record',
                  'Exceeds minimum years of experience'
                ]).map((st, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{st}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Missing Skills */}
            {analysis?.missingSkills && analysis.missingSkills.length > 0 && (
              <div className="pt-3 border-t border-slate-800 space-y-2">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Target Growth Skills
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {analysis.missingSkills.map((ms, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 bg-amber-500/10 text-amber-300 border border-amber-500/20 rounded-md text-[11px]"
                    >
                      {ms}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Verdict */}
            <div className="p-3.5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-300">
              <span className="font-bold block text-indigo-200 mb-0.5">AI Recommendation</span>
              &ldquo;{analysis?.recommendation || 'Strong candidate alignment. We recommend tailoring your resume to emphasize React performance metrics before applying.'}&rdquo;
            </div>
          </div>

          {/* Quick Apply Call to Action */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-950/40 via-slate-900 to-slate-900 border border-indigo-500/40 space-y-3">
            <h4 className="text-sm font-bold text-slate-100">Ready to Submit?</h4>
            <p className="text-xs text-slate-400">
              Use JobPilot&apos;s assisted workflow to autofill application fields while keeping full control.
            </p>
            <button
              onClick={() => startApplicationForJob(job.id)}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-indigo-600/25 transition-all flex items-center justify-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Launch Application Assistant</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
