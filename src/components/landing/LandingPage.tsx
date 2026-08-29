import React, { useState } from 'react';
import {
  Zap,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  FileText,
  Briefcase,
  TrendingUp,
  Lock,
  ChevronDown,
  Layers,
  Search,
  Check,
  HelpCircle,
  Eye,
  Sliders,
  Send,
  Laptop
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const LandingPage: React.FC = () => {
  const { setCurrentView } = useApp();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeTab, setActiveTab] = useState<'match' | 'tailor' | 'assist'>('match');

  const faqs = [
    {
      q: 'How does JobPilot AI guarantee truthful resumes?',
      a: 'Unlike generic AI bots that invent fake jobs and skills to force higher keyword matches, JobPilot AI uses strict constraint architecture. It only rewording, highlights, and reorders verified experiences from your master profile. It is mathematically forbidden from adding non-existent employers, unearned degrees, or fabricated skills.'
    },
    {
      q: 'Does JobPilot AI bypass CAPTCHA, OTP, or website security?',
      a: 'Never. We respect website terms, robots.txt, and authentication protections. JobPilot AI maps standard form fields and suggests grounded answers, but pauses to let you complete security verifications (CAPTCHA, 2FA, OTP) and review every field before confirming final submission.'
    },
    {
      q: 'How is the transparent match score calculated?',
      a: 'We use a weighted multi-factor scoring model: Skills Match (40%), Experience Depth (25%), Education Requirements (15%), Location & Work Authorization (10%), and Role Preferences (10%). You can inspect the full breakdown for every job.'
    },
    {
      q: 'Can I export my data or delete my account anytime?',
      a: 'Yes. You own 100% of your data. We provide one-click full JSON data export and permanent account deletion compliant with GDPR and CCPA privacy standards.'
    },
    {
      q: 'Which job boards and portals are supported?',
      a: 'We support Greenhouse, Lever, Workday, LinkedIn, Indeed, and direct employer career portals through our provider architecture and assisted browser workflow.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Navigation */}
      <nav className="h-20 border-b border-slate-850 bg-slate-950/80 backdrop-blur-md px-6 lg:px-12 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentView('dashboard')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-sky-400 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25">
            <Zap className="w-5 h-5 fill-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl text-slate-100 tracking-tight">JobPilot</span>
              <span className="text-xs font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20 uppercase tracking-wider">
                AI
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">Production Career Assistant</p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
          <a href="#security" className="hover:text-white transition-colors">Safety & Security</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentView('dashboard')}
            className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
          >
            Sign In
          </button>
          <button
            onClick={() => setCurrentView('onboarding')}
            className="px-5 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-lg shadow-indigo-600/25 transition-all flex items-center gap-1.5"
          >
            <span>Get Started</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-6 lg:px-12 max-w-7xl mx-auto text-center relative overflow-hidden">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold mb-8 animate-in fade-in slide-in-from-top-4">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>Next-Gen Job Application Assistant & Tracker</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-100 max-w-4xl mx-auto leading-[1.12]">
          Your AI Job Search, <br />
          <span className="bg-gradient-to-r from-indigo-400 via-sky-300 to-emerald-400 bg-clip-text text-transparent">
            On Autopilot.
          </span>
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Upload your resume once, discover transparently matched opportunities, personalize ATS-friendly applications with zero hallucinations, and keep your entire career search organized.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => setCurrentView('onboarding')}
            className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-2xl shadow-xl shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 text-base group"
          >
            <span>Get Started Free</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() => setCurrentView('dashboard')}
            className="w-full sm:w-auto px-8 py-4 bg-slate-900 hover:bg-slate-850 text-slate-200 border border-slate-800 font-semibold rounded-2xl transition-all flex items-center justify-center gap-2 text-base"
          >
            <Eye className="w-5 h-5 text-indigo-400" />
            <span>See Live Dashboard Demo</span>
          </button>
        </div>

        {/* Trust Badges */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Zero Fake Claims Guarantee</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-indigo-400" />
            <span>User Approval Always Required</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Lock className="w-4 h-4 text-sky-400" />
            <span>Private Encrypted Storage</span>
          </div>
        </div>

        {/* Dashboard Preview Visual */}
        <div className="mt-14 relative rounded-3xl border border-slate-800 bg-slate-900/60 p-3 sm:p-5 shadow-2xl shadow-black/80 backdrop-blur-sm overflow-hidden text-left">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 mb-4 px-2">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="text-xs font-mono text-slate-500 ml-2">JobPilot AI • Live Workspace Preview</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                91% Match Identified
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Column 1: Match breakdown card */}
            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800/80 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Transparent AI Score</span>
                <span className="text-2xl font-black text-emerald-400">91%</span>
              </div>
              <div className="space-y-2 text-xs">
                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>Skills Match (40% wt)</span>
                    <span className="font-semibold text-emerald-400">92%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full w-[92%]" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>Experience Depth (25% wt)</span>
                    <span className="font-semibold text-blue-400">90%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full w-[90%]" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>Education (15% wt)</span>
                    <span className="font-semibold text-indigo-400">95%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 rounded-full w-[95%]" />
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-400 pt-2 border-t border-slate-800/80">
                &ldquo;Strong alignment with React &amp; TypeScript requirements from Apex Cloud Solutions.&rdquo;
              </p>
            </div>

            {/* Column 2: Recommended Job card */}
            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800/80 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20 uppercase">
                    Greenhouse Portal
                  </span>
                  <h4 className="text-base font-bold text-slate-100 mt-1.5">Frontend Developer</h4>
                  <p className="text-xs text-slate-400">Starlight Tech Inc. • San Francisco (Hybrid)</p>
                </div>
                <span className="text-xs font-semibold text-slate-300 bg-slate-800 px-2 py-1 rounded-lg">
                  $110k–$135k
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {['React', 'TypeScript', 'Tailwind CSS', 'REST APIs'].map(skill => (
                  <span key={skill} className="text-[11px] px-2 py-0.5 bg-slate-800/90 text-slate-300 rounded-md border border-slate-700/50">
                    {skill}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={() => setCurrentView('resume-tailor')}
                  className="flex-1 py-2 text-xs font-semibold bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 rounded-xl transition-colors text-center"
                >
                  Tailor Resume
                </button>
                <button
                  onClick={() => setCurrentView('application-assistant')}
                  className="flex-1 py-2 text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition-colors text-center"
                >
                  Assisted Apply
                </button>
              </div>
            </div>

            {/* Column 3: Safety & Human Review Check */}
            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800/80 space-y-3">
              <div className="flex items-center gap-2 text-indigo-400">
                <ShieldCheck className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-wider">Application Assistant Checklist</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2 text-slate-200">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Resume verified (0 invented metrics)</span>
                </div>
                <div className="flex items-center gap-2 text-slate-200">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Contact info &amp; work authorization mapped</span>
                </div>
                <div className="flex items-center gap-2 text-slate-200">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Duplicate application checked (None found)</span>
                </div>
                <div className="flex items-center gap-2 text-amber-300 bg-amber-500/10 p-2 rounded-lg border border-amber-500/20">
                  <Sliders className="w-4 h-4 shrink-0" />
                  <span>Ready for final review before submission</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-20 border-t border-slate-850 px-6 lg:px-12 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-2">Step-by-Step Workflow</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-100">
            How JobPilot AI Streamlines Your Entire Search
          </h3>
          <p className="text-slate-400 mt-3 text-sm sm:text-base">
            From initial resume parsing to interview scheduling, every step is automated safely with transparent human control.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              step: '01',
              title: 'Upload & Parse',
              desc: 'Upload your PDF or DOCX resume. JobPilot extracts your verified skills, experience, and certifications without changing your facts.',
              icon: FileText
            },
            {
              step: '02',
              title: 'Transparent Match',
              desc: 'Our 5-pillar mathematical scoring engine highlights genuine skill alignments, keyword overlaps, and potential growth gaps.',
              icon: Search
            },
            {
              step: '03',
              title: 'Truthful Tailoring',
              desc: 'Generate tailored resumes and cover letters optimized for ATS readability. Zero invented facts or hallucinated credentials.',
              icon: Sparkles
            },
            {
              step: '04',
              title: 'Assisted Apply & Track',
              desc: 'Autofill application portals, answer custom questions, acknowledge security checkpoints, and track interviews on your Kanban board.',
              icon: Briefcase
            }
          ].map(item => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-indigo-500/40 transition-all space-y-4 group"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500/20 transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-2xl font-black text-slate-700 group-hover:text-indigo-400/50 transition-colors font-mono">
                    {item.step}
                  </span>
                </div>
                <h4 className="text-lg font-bold text-slate-100">{item.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Features Section with interactive switcher */}
      <section id="features" className="py-20 border-t border-slate-850 px-6 lg:px-12 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-2">Core Capabilities</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-100">
            Engineered for Serious Job Seekers
          </h3>
        </div>

        <div className="flex justify-center gap-2 mb-10 overflow-x-auto pb-2">
          {[
            { id: 'match', label: 'AI Match Engine', icon: Search },
            { id: 'tailor', label: 'Truthful Tailor', icon: Sparkles },
            { id: 'assist', label: 'Application Assistant', icon: Laptop }
          ].map(tab => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/25'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800">
          {activeTab === 'match' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <span className="text-xs font-bold text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-md border border-indigo-500/20 uppercase">
                  Transparent 5-Pillar Model
                </span>
                <h4 className="text-2xl font-bold text-slate-100">
                  No Black-Box Guesswork. Know Exactly Why You Match.
                </h4>
                <p className="text-sm text-slate-400 leading-relaxed">
                  JobPilot breaks every position down into mathematical match factors: Skills (40%), Experience (25%), Education (15%), Location (10%), and Preferences (10%). See candidate strengths and identified growth skills immediately.
                </p>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Calculates genuine skills overlap with target tech stacks</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Highlights keyword density for ATS pass rates</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Suspicious Job Listing Filter flags fraudulent postings</span>
                  </li>
                </ul>
              </div>
              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-850 space-y-3 font-mono text-xs">
                <div className="text-slate-500 pb-2 border-b border-slate-800">
                  // Transparent Match Matrix Output
                </div>
                <div className="flex justify-between text-slate-200">
                  <span>Skills [React, TypeScript, Tailwind]</span>
                  <span className="text-emerald-400 font-bold">92%</span>
                </div>
                <div className="flex justify-between text-slate-200">
                  <span>Experience [3.5 yrs Software Engineer]</span>
                  <span className="text-emerald-400 font-bold">90%</span>
                </div>
                <div className="flex justify-between text-slate-200">
                  <span>Education [B.S. Computer Science]</span>
                  <span className="text-indigo-400 font-bold">95%</span>
                </div>
                <div className="flex justify-between text-slate-200">
                  <span>Recommendation</span>
                  <span className="text-emerald-300 font-bold">&ldquo;Strong match&rdquo;</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'tailor' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <span className="text-xs font-bold text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-md border border-indigo-500/20 uppercase">
                  Zero Hallucinations
                </span>
                <h4 className="text-2xl font-bold text-slate-100">
                  Truthful Resume &amp; Cover Letter Tailoring
                </h4>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Tailors your real experiences to highlight the most relevant achievements for each job. Side-by-side visual diff shows exactly what was emphasized, reordered, or reworded.
                </p>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Never claims a skill or company not in your master profile</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Four clean resume templates (Modern, ATS, Classic, Minimal)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Instant PDF download &amp; clipboard export</span>
                  </li>
                </ul>
              </div>
              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-850 space-y-3 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <span className="text-slate-400 font-bold">ORIGINAL</span>
                  <span className="text-indigo-400 font-bold">TAILORED (ATS OPTIMIZED)</span>
                </div>
                <p className="text-slate-400 line-through">
                  Built frontend components in React and helped backend teams with databases.
                </p>
                <p className="text-slate-100 bg-indigo-500/10 p-2.5 rounded-lg border border-indigo-500/30">
                  Engineered reusable frontend UI libraries in React and TypeScript, boosting developer feature velocity by 28% and integrating authenticated REST endpoints with PostgreSQL.
                </p>
                <span className="inline-block text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  ✓ Verified: Uses real Apex Cloud Solutions track record
                </span>
              </div>
            </div>
          )}

          {activeTab === 'assist' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <span className="text-xs font-bold text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-md border border-indigo-500/20 uppercase">
                  Safe Form Automation
                </span>
                <h4 className="text-2xl font-bold text-slate-100">
                  Assisted Form Filling With Complete Control
                </h4>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Eliminates tedious repetitive typing. JobPilot maps candidate fields to Greenhouse, Lever, and Workday portals. Custom questions receive AI grounded suggestions with [Use Answer] [Edit] [Reject] controls.
                </p>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Full pre-submission review checklist</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>User solves CAPTCHA / 2FA manually (Safe by design)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Kanban drag-and-drop status tracker &amp; interview reminders</span>
                  </li>
                </ul>
              </div>
              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-850 space-y-3 text-xs">
                <div className="text-slate-300 font-semibold">Detected Question: &ldquo;Are you authorized to work in the US without sponsorship?&rdquo;</div>
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex justify-between text-slate-400">
                    <span>AI Suggested Answer</span>
                    <span className="text-emerald-400 font-medium">Profile Grounded</span>
                  </div>
                  <p className="text-slate-100">Yes, I am a US citizen / authorized to work without restrictions.</p>
                  <div className="flex gap-2 pt-1">
                    <span className="px-2 py-1 bg-indigo-600 text-white rounded text-[11px] font-semibold">Use Answer</span>
                    <span className="px-2 py-1 bg-slate-800 text-slate-300 rounded text-[11px]">Edit</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Security & Integrity Banner */}
      <section id="security" className="py-16 border-t border-slate-850 px-6 lg:px-12 max-w-7xl mx-auto w-full">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/40 border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-4">
              <ShieldCheck className="w-4 h-4" />
              <span>Ethical AI &amp; Privacy First</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-100">
              Your Career Data Remains Strictly Yours.
            </h3>
            <p className="mt-3 text-slate-400 text-sm leading-relaxed">
              We never sell your resume or personal details to recruiters or third parties. We do not use your private resumes to train foundation models. Every prompt is isolated and protected by strict injection guardrails.
            </p>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-medium text-slate-300">
              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                <span className="text-indigo-400 font-bold block mb-1">Encrypted Storage</span>
                Private user-owned data isolation with Row Level Security.
              </div>
              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                <span className="text-emerald-400 font-bold block mb-1">Zero Bot Bypass</span>
                Complies with all website security, OTP, and anti-bot policies.
              </div>
              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                <span className="text-sky-400 font-bold block mb-1">Full Data Portability</span>
                One-click complete JSON export &amp; permanent account deletion.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 border-t border-slate-850 px-6 lg:px-12 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-2">Transparent Pricing</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-100">
            Simple Plans for Every Stage of Your Search
          </h3>
          <p className="text-slate-400 mt-3 text-sm sm:text-base">
            Start free, upgrade when you want limitless AI tailoring and real-time portal form assistance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Tier */}
          <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="text-xl font-bold text-slate-100">Starter Free</h4>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300">
                  Free Forever
                </span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black text-slate-100">$0</span>
                <span className="text-xs text-slate-400">/ month</span>
              </div>
              <p className="text-xs text-slate-400">Essential tools to get your job search organized.</p>
              <ul className="space-y-3 text-xs text-slate-300 pt-4 border-t border-slate-800">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Resume upload &amp; parsing (1 master resume)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>10 AI Job Match analyses per month</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Kanban application tracking board</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Basic interview &amp; follow-up reminders</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => setCurrentView('onboarding')}
              className="w-full py-3 bg-slate-800 hover:bg-slate-750 text-slate-200 font-semibold rounded-xl text-sm transition-colors"
            >
              Get Started Free
            </button>
          </div>

          {/* Pro Tier */}
          <div className="p-8 rounded-3xl bg-gradient-to-b from-indigo-950/40 via-slate-900 to-slate-900 border-2 border-indigo-500/50 shadow-xl shadow-indigo-500/10 space-y-6 flex flex-col justify-between relative">
            <div className="absolute -top-3 right-6 px-3 py-0.5 bg-indigo-600 text-white text-[11px] font-bold uppercase tracking-wider rounded-full shadow-md">
              Most Popular
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="text-xl font-bold text-slate-100">JobPilot Pro</h4>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Full Autopilot
                </span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black text-slate-100">$19</span>
                <span className="text-xs text-slate-400">/ month</span>
              </div>
              <p className="text-xs text-slate-400">Everything you need to apply at 5x speed with maximum quality.</p>
              <ul className="space-y-3 text-xs text-slate-200 pt-4 border-t border-slate-800">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span><strong>Unlimited</strong> AI Job Match scoring &amp; breakdowns</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span><strong>Unlimited</strong> Truthful Resume tailoring &amp; ATS diffs</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Personalized Cover Letter Generator (4 tones)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Browser Application Assistant &amp; Autofill</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>AI Career Insights &amp; Market Skill Gap Analysis</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => setCurrentView('onboarding')}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-sm shadow-lg shadow-indigo-600/30 transition-all"
            >
              Start 14-Day Free Pro Trial
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section id="faq" className="py-20 border-t border-slate-850 px-6 lg:px-12 max-w-4xl mx-auto w-full">
        <div className="text-center mb-12">
          <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-2">Got Questions?</h2>
          <h3 className="text-3xl font-extrabold text-slate-100">Frequently Asked Questions</h3>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="border border-slate-800 rounded-2xl bg-slate-900/50 overflow-hidden transition-colors"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-5 text-left flex items-center justify-between font-semibold text-sm text-slate-200 hover:text-white"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openFaq === idx ? 'rotate-180 text-indigo-400' : ''}`} />
              </button>
              {openFaq === idx && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-slate-850 pt-3 animate-in fade-in">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 border-t border-slate-850 px-6 lg:px-12 text-center bg-gradient-to-b from-slate-950 to-indigo-950/30">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-100">
            Ready to Take the Tedium Out of Job Applications?
          </h2>
          <p className="text-slate-400 text-base max-w-xl mx-auto">
            Join thousands of professionals applying with higher precision, ATS confidence, and total transparency.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => setCurrentView('onboarding')}
              className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-2xl shadow-xl shadow-indigo-600/30 transition-all flex items-center gap-2 text-base"
            >
              <span>Get Started Free Today</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-10 px-6 lg:px-12 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">
              <Zap className="w-4 h-4 fill-white" />
            </div>
            <div>
              <span className="font-bold text-slate-200">JobPilot AI</span>
              <span className="text-slate-400 block">AI-Powered Job Application Assistant</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <button onClick={() => setCurrentView('dashboard')} className="hover:text-slate-200">Live Dashboard</button>
            <button onClick={() => setCurrentView('jobs')} className="hover:text-slate-200">Job Explorer</button>
            <button onClick={() => setCurrentView('resume-tailor')} className="hover:text-slate-200">Resume Tailor</button>
            <button onClick={() => setCurrentView('settings')} className="hover:text-slate-200">Privacy &amp; Security</button>
          </div>

          <div className="text-slate-400">
            &copy; 2026 JobPilot AI. All rights reserved. Zero Hallucinations Policy.
          </div>
        </div>
      </footer>
    </div>
  );
};
