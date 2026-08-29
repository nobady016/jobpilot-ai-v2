import React, { useState } from 'react';
import {
  Search,
  SlidersHorizontal,
  Bookmark,
  Sparkles,
  Briefcase,
  DollarSign,
  MapPin,
  AlertTriangle,
  Send,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatSalary, getScoreColor } from '../../lib/utils';
import { JobListing } from '../../types';

export const JobsExplorer: React.FC = () => {
  const {
    jobs,
    toggleSaveJob,
    setSelectedJobId,
    setCurrentView,
    startApplicationForJob
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterRemote, setFilterRemote] = useState<string>('all');
  const [filterExp, setFilterExp] = useState<string>('all');
  const [filterMinSalary, setFilterMinSalary] = useState<number>(0);
  const [onlySaved, setOnlySaved] = useState(false);
  const [sortBy, setSortBy] = useState<'match' | 'salary' | 'recent'>('match');
  const [showSuspiciousWarning, setShowSuspiciousWarning] = useState(true);

  // Filter jobs
  let filtered = jobs.filter(j => {
    const matchSearch =
      j.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      j.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      j.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      j.requiredSkills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchRemote =
      filterRemote === 'all' || j.remoteType === filterRemote;

    const matchExp =
      filterExp === 'all' || j.experienceLevel === filterExp;

    const matchSalary =
      filterMinSalary === 0 || (j.salaryMin && j.salaryMin >= filterMinSalary);

    const matchSaved = !onlySaved || j.isSaved;

    return matchSearch && matchRemote && matchExp && matchSalary && matchSaved;
  });

  // Sort
  filtered.sort((a, b) => {
    if (sortBy === 'match') return b.matchScore - a.matchScore;
    if (sortBy === 'salary') return (b.salaryMax || 0) - (a.salaryMax || 0);
    if (sortBy === 'recent') return new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime();
    return 0;
  });

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-150">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
            Discover Opportunities
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Browse verified job postings scored by transparent AI matching algorithms.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setOnlySaved(!onlySaved)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-colors flex items-center gap-1.5 ${
              onlySaved
                ? 'bg-sky-500/20 text-sky-300 border-sky-500/40'
                : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Saved Only ({jobs.filter(j => j.isSaved).length})</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search by job title, skill (e.g. React, TypeScript), or company..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={filterRemote}
              onChange={e => setFilterRemote(e.target.value)}
              className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
            >
              <option value="all">Workplace: All</option>
              <option value="remote">Remote</option>
              <option value="hybrid">Hybrid</option>
              <option value="on-site">On-Site</option>
            </select>

            <select
              value={filterExp}
              onChange={e => setFilterExp(e.target.value)}
              className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
            >
              <option value="all">Experience: All</option>
              <option value="junior">Junior</option>
              <option value="mid">Mid-Level</option>
              <option value="senior">Senior</option>
            </select>

            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
            >
              <option value="match">Sort: Highest Match</option>
              <option value="salary">Sort: Highest Salary</option>
              <option value="recent">Sort: Most Recent</option>
            </select>
          </div>
        </div>
      </div>

      {/* Listing Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-400 px-1">
          <span>Showing {filtered.length} positions</span>
          <span className="text-emerald-400 font-medium">Scored with 5-Factor AI Match Matrix</span>
        </div>

        {filtered.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-slate-900/40 border border-slate-800 space-y-3">
            <Briefcase className="w-8 h-8 text-slate-600 mx-auto" />
            <p className="text-sm font-semibold text-slate-300">No jobs match your current filters</p>
            <p className="text-xs text-slate-500">Try clearing your search term or broadening your salary filter.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setFilterRemote('all');
                setFilterExp('all');
                setFilterMinSalary(0);
                setOnlySaved(false);
              }}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filtered.map(job => {
            const scoreStyle = getScoreColor(job.matchScore);
            return (
              <div
                key={job.id}
                id={`job-card-${job.id}`}
                className={`p-6 rounded-3xl bg-slate-900/80 border transition-all space-y-4 ${
                  job.isSuspicious
                    ? 'border-rose-500/40 bg-rose-950/10'
                    : 'border-slate-800/90 hover:border-indigo-500/40'
                }`}
              >
                {/* Top Row: Info + Match badge */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="space-y-1 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20 uppercase tracking-wide">
                        {job.source}
                      </span>
                      <span className="text-xs text-slate-400 capitalize">{job.remoteType} • {job.employmentType}</span>
                      {job.isSuspicious && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-400 bg-rose-500/20 px-2 py-0.5 rounded border border-rose-500/40">
                          <AlertTriangle className="w-3 h-3" /> Suspicious Listing Warning
                        </span>
                      )}
                    </div>

                    <h2
                      onClick={() => {
                        setSelectedJobId(job.id);
                        setCurrentView('job-detail');
                      }}
                      className="text-lg font-bold text-slate-100 hover:text-indigo-400 cursor-pointer pt-1"
                    >
                      {job.title}
                    </h2>
                    <p className="text-xs text-slate-400 flex items-center gap-2">
                      <span>{job.company}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-500" />
                        {job.location}
                      </span>
                    </p>
                  </div>

                  <div className="text-left sm:text-right shrink-0">
                    <div className="flex sm:flex-col items-center sm:items-end gap-2">
                      <span className={`inline-block text-xs font-bold px-3 py-1 rounded-xl border ${scoreStyle.badge}`}>
                        {job.matchScore}% Match
                      </span>
                      <span className="text-xs text-slate-300 font-mono">
                        {formatSalary(job.salaryMin, job.salaryMax, job.currency)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Description snippet */}
                <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                  {job.description}
                </p>

                {/* Suspicious listing explanation if flagged */}
                {job.isSuspicious && (
                  <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-300">
                    <strong>AI Safety Flag:</strong> {job.suspiciousReason || 'Unrealistic salary range and vague company contact.'}
                  </div>
                )}

                {/* Skills tags and Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-slate-800/80">
                  <div className="flex flex-wrap gap-1.5">
                    {job.requiredSkills.map(skill => (
                      <span
                        key={skill}
                        className="text-[11px] px-2.5 py-0.5 bg-slate-950 text-slate-300 rounded-lg border border-slate-800"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <button
                      onClick={() => toggleSaveJob(job.id)}
                      className={`p-2.5 rounded-xl border text-xs font-medium transition-colors ${
                        job.isSaved
                          ? 'bg-sky-500/20 text-sky-300 border-sky-500/40'
                          : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                      }`}
                      aria-label="Save Job"
                    >
                      <Bookmark className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => {
                        setSelectedJobId(job.id);
                        setCurrentView('job-detail');
                      }}
                      className="px-4 py-2 bg-slate-950 hover:bg-slate-850 text-slate-200 text-xs font-semibold rounded-xl border border-slate-800 transition-colors"
                    >
                      View Details
                    </button>

                    <button
                      onClick={() => {
                        setSelectedJobId(job.id);
                        setCurrentView('resume-tailor');
                      }}
                      className="px-4 py-2 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-xs font-semibold rounded-xl transition-colors flex items-center gap-1"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Tailor</span>
                    </button>

                    <button
                      onClick={() => startApplicationForJob(job.id)}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl shadow-md shadow-indigo-600/20 transition-all flex items-center gap-1"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Apply</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
