import React from 'react';
import {
  TrendingUp,
  Sparkles,
  Award,
  BookOpen,
  ArrowUpRight,
  Code2,
  CheckCircle2,
  Lightbulb
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CareerInsightsView: React.FC = () => {
  const { careerInsights, userProfile } = useApp();

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-150">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-400" />
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
            AI Career &amp; Skill Insights
          </h1>
        </div>
        <p className="text-sm text-slate-400 mt-1">
          Real-time market demand analysis, skill gap discovery, and targeted portfolio recommendations.
        </p>
      </div>

      {/* Top In-Demand Market Skills */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-100">High-Growth Market Skills</h2>
            <p className="text-xs text-slate-400">Skills surging across verified software engineering postings this quarter</p>
          </div>
          <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
            Q3 Market Feed
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {(careerInsights?.topInDemandSkills || [
            { skill: 'Next.js App Router', demandGrowth: '+48% YoY', category: 'Frontend' },
            { skill: 'TypeScript Strict', demandGrowth: '+36% YoY', category: 'Language' },
            { skill: 'Tailwind CSS / UI Components', demandGrowth: '+32% YoY', category: 'Styling' },
            { skill: 'PostgreSQL & Drizzle ORM', demandGrowth: '+29% YoY', category: 'Database' }
          ]).map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-slate-950 border border-slate-850 space-y-2 hover:border-indigo-500/40 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                  {item.category}
                </span>
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-0.5">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  {item.demandGrowth}
                </span>
              </div>
              <h3 className="text-sm font-bold text-slate-100">{item.skill}</h3>
              <p className="text-[11px] text-slate-400">High hiring manager preference</p>
            </div>
          ))}
        </div>
      </div>

      {/* Grid: Skill Gaps & Recommended Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Identified Skill Gaps */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-amber-400">
            <Award className="w-5 h-5" />
            <h2 className="text-base font-bold text-slate-100">Identified Skill Opportunities</h2>
          </div>
          <p className="text-xs text-slate-400">
            Adding these verified skills to your portfolio would increase your average match score to 96%:
          </p>

          <div className="space-y-3">
            {(careerInsights?.identifiedSkillGaps || [
              { skill: 'GraphQL / Apollo Client', frequencyInTargetRoles: 40, recommendation: 'Build 1 full-stack GraphQL query & mutation service.' },
              { skill: 'Docker Containerization', frequencyInTargetRoles: 35, recommendation: 'Containerize your web frontend & PostgreSQL service.' },
              { skill: 'Vitest / Playwright End-to-End', frequencyInTargetRoles: 30, recommendation: 'Add automated E2E tests to your portfolio project.' }
            ]).map((gap, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-950 border border-slate-850 space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-200">{gap.skill}</span>
                  <span className="text-[11px] text-amber-400 font-semibold font-mono">
                    Found in {gap.frequencyInTargetRoles}% of target roles
                  </span>
                </div>
                <p className="text-xs text-slate-400">{gap.recommendation}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Portfolio Projects */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-indigo-400">
            <BookOpen className="w-5 h-5" />
            <h2 className="text-base font-bold text-slate-100">Recommended Portfolio Boosters</h2>
          </div>
          <p className="text-xs text-slate-400">
            Targeted open-source projects designed to demonstrate key requirements:
          </p>

          <div className="space-y-3">
            {(careerInsights?.recommendedProjects || [
              {
                title: 'High-Throughput React Data Grid',
                skillsLearned: ['React', 'TypeScript', 'Virtualization', 'Web Workers'],
                estimatedHours: 8,
                rationale: 'Proves frontend performance optimization capability for senior engineering screeners.'
              },
              {
                title: 'Full-Stack OAuth & Microservice Proxy',
                skillsLearned: ['Node.js', 'PostgreSQL', 'Docker', 'JWT'],
                estimatedHours: 12,
                rationale: 'Demonstrates end-to-end backend architecture and database modeling.'
              }
            ]).map((proj, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-950 border border-slate-850 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-slate-100">{proj.title}</h3>
                  <span className="text-[11px] text-indigo-400 font-mono">~{proj.estimatedHours} hrs</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">{proj.rationale}</p>
                <div className="flex flex-wrap gap-1 pt-1">
                  {proj.skillsLearned.map((s: string) => (
                    <span key={s} className="px-2 py-0.5 bg-slate-900 text-indigo-300 rounded text-[10px] font-medium border border-slate-800">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Actionable Resume Improvement Tips */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center gap-2 text-emerald-400">
          <Lightbulb className="w-5 h-5" />
          <h2 className="text-base font-bold text-slate-100">Actionable Resume Improvement Points</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
          {(careerInsights?.actionableImprovements || [
            'Quantify component latency reductions with real percentage figures on your primary role.',
            'Group technical skills into Frontend, Backend, and Tooling categories for faster recruiter parsing.',
            'Include direct live demonstration URLs next to GitHub repositories.',
            'Highlight unit test coverage percentages on your full-stack projects.'
          ]).map((tip, idx) => (
            <div key={idx} className="p-3.5 rounded-2xl bg-slate-950 border border-slate-850 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span className="leading-relaxed">{tip}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
