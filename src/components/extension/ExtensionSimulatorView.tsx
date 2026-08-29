import React, { useState } from 'react';
import {
  Laptop,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  ExternalLink,
  Check,
  Send,
  Zap,
  RefreshCw,
  Eye,
  UserCheck,
  MessageSquareQuote,
  Sliders
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { api } from '../../services/apiClient';

export const ExtensionSimulatorView: React.FC = () => {
  const { userProfile, selectedJob, addToast, setCurrentView } = useApp();

  const [autofilled, setAutofilled] = useState(false);
  const [activePortal, setActivePortal] = useState<'greenhouse' | 'lever' | 'workday'>('greenhouse');
  
  // Interactive Question Answering & Humanizer State
  const [activeQuestion, setActiveQuestion] = useState('What makes you excited about this role?');
  const [customQuestionInput, setCustomQuestionInput] = useState('');
  const [customAnswer, setCustomAnswer] = useState(
    'In my recent work at Apex Cloud Solutions, I focused heavily on React UI architecture and scalable REST services. The problems your team is working on at Apex Cloud align directly with what I enjoy building every day.'
  );
  const [toneStyle, setToneStyle] = useState<'natural' | 'conversational' | 'concise' | 'confident'>('natural');
  const [isGeneratingAnswer, setIsGeneratingAnswer] = useState(false);

  const predefinedQuestions = [
    'What makes you excited about this role?',
    'Why are you looking to leave your current position?',
    'Describe a challenging technical problem you solved recently.',
    'What are your compensation expectations?',
    'What is your experience with React & TypeScript architecture?'
  ];

  const handleAutofill = () => {
    setAutofilled(true);
    addToast('success', 'Form Fields Autofilled!', 'Candidate contact and 100% human-tailored answers populated safely.');
  };

  const handleGenerateHumanAnswer = async (questionToAsk: string) => {
    setIsGeneratingAnswer(true);
    try {
      addToast('info', 'Generating Human Answer...', 'Crafting a 100% natural, recruiter-approved answer without AI clichés.');
      const res = await api.suggestQuestionAnswer(questionToAsk, 'application_question', selectedJob?.id);
      setCustomAnswer(res.suggestedAnswer);
      setAutofilled(true);
      addToast('success', 'Human Answer Ready', 'Sounding natural and authentic, ready for review.');
    } catch (err: any) {
      addToast('error', 'Generation Error', err.message || 'Failed to generate answer');
    } finally {
      setIsGeneratingAnswer(false);
    }
  };

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-150">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Laptop className="w-5 h-5 text-indigo-400" />
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
              Browser Extension Simulator
            </h1>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Assists with real-time autofill and generates 100% human-sounding responses that pass recruiter screens.
          </p>
        </div>

        {/* Portal switcher */}
        <div className="flex p-1 bg-slate-900 border border-slate-800 rounded-xl">
          {(['greenhouse', 'lever', 'workday'] as const).map(p => (
            <button
              key={p}
              onClick={() => {
                setActivePortal(p);
                setAutofilled(false);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                activePortal === p ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Simulated Browser Frame */}
      <div className="rounded-3xl border border-slate-700 bg-slate-950 overflow-hidden shadow-2xl">
        {/* Browser Top Nav / URL Bar */}
        <div className="px-4 py-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
          </div>

          <div className="flex-1 max-w-xl bg-slate-950 px-4 py-1.5 rounded-xl border border-slate-800 text-xs text-slate-400 font-mono flex items-center gap-2">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span className="truncate">
              https://boards.{activePortal}.io/apexcloud/jobs/4920194?gh_jid=4920194
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 flex items-center gap-1">
              <UserCheck className="w-3 h-3" />
              <span>Human Tone Active</span>
            </span>
          </div>
        </div>

        {/* Browser Window Body: Portal Form (Left 60%) + JobPilot Side Overlay (Right 40%) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[520px]">
          {/* Left: Simulated ATS Form */}
          <div className="lg:col-span-7 p-6 sm:p-8 bg-slate-950 space-y-5 border-r border-slate-850">
            <div className="border-b border-slate-800 pb-4 flex items-start justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  {activePortal.toUpperCase()} APPLICATION PORTAL
                </span>
                <h3 className="text-xl font-bold text-slate-100 mt-1">
                  Senior Frontend Engineer — Apex Cloud Solutions
                </h3>
                <p className="text-xs text-slate-400">San Francisco, CA (Hybrid) • Full-Time</p>
              </div>
              <span className="text-[11px] font-medium text-slate-400 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
                Job ID: #4920194
              </span>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-300 block mb-1 font-semibold">First Name *</label>
                  <input
                    type="text"
                    readOnly
                    value={autofilled ? (userProfile?.name?.split(' ')[0] || 'Alex') : ''}
                    placeholder="Enter first name"
                    className={`w-full px-3 py-2 bg-slate-900 border rounded-xl text-slate-200 transition-all ${
                      autofilled ? 'border-emerald-500/50 bg-emerald-950/10' : 'border-slate-850'
                    }`}
                  />
                </div>
                <div>
                  <label className="text-slate-300 block mb-1 font-semibold">Last Name *</label>
                  <input
                    type="text"
                    readOnly
                    value={autofilled ? (userProfile?.name?.split(' ')[1] || 'Mercer') : ''}
                    placeholder="Enter last name"
                    className={`w-full px-3 py-2 bg-slate-900 border rounded-xl text-slate-200 transition-all ${
                      autofilled ? 'border-emerald-500/50 bg-emerald-950/10' : 'border-slate-850'
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-300 block mb-1 font-semibold">Email *</label>
                  <input
                    type="email"
                    readOnly
                    value={autofilled ? (userProfile?.email || 'alex.mercer@example.com') : ''}
                    placeholder="name@email.com"
                    className={`w-full px-3 py-2 bg-slate-900 border rounded-xl text-slate-200 transition-all ${
                      autofilled ? 'border-emerald-500/50 bg-emerald-950/10' : 'border-slate-850'
                    }`}
                  />
                </div>
                <div>
                  <label className="text-slate-300 block mb-1 font-semibold">Phone *</label>
                  <input
                    type="text"
                    readOnly
                    value={autofilled ? (userProfile?.phone || '+1 (555) 234-8901') : ''}
                    placeholder="+1 (555) 000-0000"
                    className={`w-full px-3 py-2 bg-slate-900 border rounded-xl text-slate-200 transition-all ${
                      autofilled ? 'border-emerald-500/50 bg-emerald-950/10' : 'border-slate-850'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 block mb-1 font-semibold">LinkedIn Profile URL</label>
                <input
                  type="url"
                  readOnly
                  value={autofilled ? (userProfile?.linkedinUrl || 'https://linkedin.com/in/alex-mercer') : ''}
                  placeholder="https://linkedin.com/in/..."
                  className={`w-full px-3 py-2 bg-slate-900 border rounded-xl text-slate-200 transition-all ${
                    autofilled ? 'border-emerald-500/50 bg-emerald-950/10' : 'border-slate-850'
                  }`}
                />
              </div>

              {/* Employer / Recruiter Question Field */}
              <div className="pt-2 border-t border-slate-850">
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-slate-200 font-semibold flex items-center gap-1.5">
                    <span>Question: {activeQuestion}</span>
                  </label>
                  <span className="text-[10px] text-emerald-400 font-mono bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    Human Voice Mode
                  </span>
                </div>
                <textarea
                  rows={4}
                  value={autofilled ? customAnswer : ''}
                  onChange={e => setCustomAnswer(e.target.value)}
                  placeholder="Click 'Generate Human Answer' or 'Autofill Application' on the right panel to test..."
                  className={`w-full p-3 bg-slate-900 border rounded-xl text-slate-100 leading-relaxed text-xs transition-all ${
                    autofilled ? 'border-emerald-500/50 bg-emerald-950/10' : 'border-slate-850'
                  }`}
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  💡 Crafted in natural 1st-person conversational English — free of AI buzzwords.
                </p>
              </div>
            </div>
          </div>

          {/* Right: JobPilot Overlay Assistant Panel */}
          <div className="lg:col-span-5 p-5 bg-slate-900/95 space-y-4 flex flex-col justify-between border-l border-slate-800">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <div className="flex items-center gap-1.5">
                  <div className="w-6 h-6 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-xs">
                    <Zap className="w-3.5 h-3.5 fill-white" />
                  </div>
                  <span className="text-xs font-bold text-slate-100">JobPilot Smart Assistant</span>
                </div>
                <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-mono">
                  Natural Tone 100%
                </span>
              </div>

              {/* Action: Autofill */}
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-850 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-200">One-Click Autofill</span>
                  <span className="text-[10px] text-slate-400">All fields</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Instantly populates your profile and generates a human-toned answer for the portal.
                </p>
                <button
                  onClick={handleAutofill}
                  className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{autofilled ? 'Fields Filled ✓' : 'Autofill Application'}</span>
                </button>
              </div>

              {/* Interactive Human Question Answer Tester */}
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-850 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                    <MessageSquareQuote className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Human Answer Assistant</span>
                  </span>
                  <span className="text-[10px] text-indigo-300 font-mono">Anti-AI</span>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] text-slate-400 block font-medium">Select or enter question:</label>
                  <select
                    value={activeQuestion}
                    onChange={e => {
                      setActiveQuestion(e.target.value);
                      handleGenerateHumanAnswer(e.target.value);
                    }}
                    className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                  >
                    {predefinedQuestions.map((q, idx) => (
                      <option key={idx} value={q}>
                        {q}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Custom Question input */}
                <div className="flex gap-1.5">
                  <input
                    type="text"
                    placeholder="Or type custom recruiter question..."
                    value={customQuestionInput}
                    onChange={e => setCustomQuestionInput(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter' && customQuestionInput.trim()) {
                        setActiveQuestion(customQuestionInput.trim());
                        handleGenerateHumanAnswer(customQuestionInput.trim());
                        setCustomQuestionInput('');
                      }
                    }}
                    className="flex-1 px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                  <button
                    disabled={isGeneratingAnswer || !customQuestionInput.trim()}
                    onClick={() => {
                      if (customQuestionInput.trim()) {
                        setActiveQuestion(customQuestionInput.trim());
                        handleGenerateHumanAnswer(customQuestionInput.trim());
                        setCustomQuestionInput('');
                      }
                    }}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-200 rounded-xl text-xs font-semibold"
                  >
                    Ask
                  </button>
                </div>

                <button
                  onClick={() => handleGenerateHumanAnswer(activeQuestion)}
                  disabled={isGeneratingAnswer}
                  className="w-full py-2 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isGeneratingAnswer ? 'animate-spin' : ''}`} />
                  <span>{isGeneratingAnswer ? 'Formulating Real Answer...' : 'Regenerate Natural Answer'}</span>
                </button>
              </div>

              {/* Safety notice */}
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-850 text-xs text-slate-400 space-y-1.5">
                <div className="flex items-center gap-1.5 text-emerald-400 font-semibold text-[11px]">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Human Recruiter Tested</span>
                </div>
                <p className="text-[10px] text-slate-400 leading-relaxed">
                  Answers use natural phrasing, direct 1st-person perspective, and 0% generic AI fluff so recruiters see you as a genuine candidate.
                </p>
              </div>
            </div>

            <button
              onClick={() => setCurrentView('applications-tracker')}
              className="w-full py-2.5 bg-slate-800 hover:bg-slate-750 text-slate-200 rounded-xl text-xs font-semibold border border-slate-700 transition-colors flex items-center justify-center gap-1.5 mt-2"
            >
              <span>Sync to JobPilot Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

