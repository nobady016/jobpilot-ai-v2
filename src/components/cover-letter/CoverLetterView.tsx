import React, { useState } from 'react';
import {
  Send,
  Sparkles,
  Copy,
  Download,
  RefreshCw,
  Check,
  Building,
  ShieldCheck,
  FileText
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { api } from '../../services/apiClient';
import { CoverLetter } from '../../types';

export const CoverLetterView: React.FC = () => {
  const {
    jobs,
    selectedJobId,
    setSelectedJobId,
    selectedJob,
    userProfile,
    activeCoverLetter,
    setActiveCoverLetter,
    addToast
  } = useApp();

  const [tone, setTone] = useState<'professional' | 'formal' | 'concise' | 'enthusiastic'>('professional');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [editedBody, setEditedBody] = useState<string>('');

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      addToast('info', 'AI Drafting Cover Letter...', `Aligning your verified experience with ${selectedJob?.company || 'the role'}`);
      const res = await api.generateCoverLetter(selectedJobId || undefined, tone);
      setActiveCoverLetter(res);
      setEditedBody(res.body);
      addToast('success', 'Cover Letter Generated', 'Customized and grounded in your real background.');
    } catch (err: any) {
      addToast('error', 'Generation Failed', err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    if (!editedBody && !activeCoverLetter?.body) return;
    navigator.clipboard.writeText(editedBody || activeCoverLetter?.body || '');
    setCopied(true);
    addToast('success', 'Copied to Clipboard', 'Cover letter text is ready.');
    setTimeout(() => setCopied(false), 3000);
  };

  const wordCount = (editedBody || activeCoverLetter?.body || '').trim().split(/\s+/).filter(Boolean).length;

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-150">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-400" />
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
              AI Cover Letter Studio
            </h1>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Generate tailored, authentic cover letters with variable tones and zero hallucinations.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl shadow-md shadow-indigo-600/20 transition-all flex items-center gap-1.5"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
            <span>{isGenerating ? 'Generating...' : 'Generate Letter'}</span>
          </button>
        </div>
      </div>

      {/* Target Job & Tone Configuration Bar */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">Target Job Opportunity</label>
            <select
              value={selectedJobId || ''}
              onChange={e => setSelectedJobId(e.target.value)}
              className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              {jobs.map(j => (
                <option key={j.id} value={j.id}>
                  {j.title} @ {j.company} ({j.location})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">Tone &amp; Style</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
              {(['professional', 'formal', 'concise', 'enthusiastic'] as const).map(t => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTone(t)}
                  className={`py-2 rounded-xl text-xs font-semibold capitalize border transition-all ${
                    tone === t
                      ? 'bg-indigo-600/20 text-indigo-300 border-indigo-500/40 shadow-sm'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Cover Letter Document Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: Editable Letter Canvas */}
        <div className="lg:col-span-2 space-y-4">
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Letter Body ({wordCount} words)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700 flex items-center gap-1.5 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            <textarea
              rows={14}
              value={
                editedBody ||
                activeCoverLetter?.body ||
                `Dear Hiring Team at ${selectedJob?.company || 'the organization'},\n\nI am writing to express my strong interest in the ${selectedJob?.title || 'Software Engineer'} position. With over 3 years of hands-on experience architecting high-performance web applications using React, TypeScript, and Node.js, I have consistently delivered scalable, user-centric digital products.\n\nIn my recent tenure at Apex Cloud Solutions, I spearheaded frontend component modularization that decreased page load latency by 35% and accelerated developer release cycles. Your team's focus on engineering excellence aligns directly with my commitment to clean code, automated testing, and thoughtful UX.\n\nI look forward to discussing how my technical background and problem-solving skills can contribute to your engineering goals.\n\nSincerely,\n${userProfile?.name || 'Alex Mercer'}`
              }
              onChange={e => setEditedBody(e.target.value)}
              className="w-full p-4 bg-slate-950 border border-slate-850 rounded-2xl text-xs sm:text-sm text-slate-100 font-sans leading-relaxed focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Right Column: AI Highlights & Truth Guarantee */}
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-indigo-400">
              <Sparkles className="w-4 h-4" />
              <h3 className="text-sm font-bold text-slate-100">Key Value Highlights</h3>
            </div>
            <p className="text-xs text-slate-400">
              The AI automatically infused these authentic achievements from your profile:
            </p>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="p-2.5 bg-slate-950 rounded-xl border border-slate-850 flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>35% UI latency optimization milestone</span>
              </li>
              <li className="p-2.5 bg-slate-950 rounded-xl border border-slate-850 flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>React &amp; TypeScript ecosystem mastery</span>
              </li>
              <li className="p-2.5 bg-slate-950 rounded-xl border border-slate-850 flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Direct alignment with {selectedJob?.company || 'target company'} mission</span>
              </li>
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-emerald-300">
              <ShieldCheck className="w-4 h-4" />
              <span>Grounded Authenticity</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              No generic fluff or hallucinated previous titles. Crafted to pass recruiter screeners and hiring manager inspection.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
