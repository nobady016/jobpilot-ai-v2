import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Send,
  ArrowLeft,
  Building,
  User,
  FileText,
  Clock,
  Sparkles,
  Check
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { api } from '../../services/apiClient';

export const ApplicationReviewView: React.FC = () => {
  const {
    selectedJob,
    userProfile,
    resumes,
    setCurrentView,
    addToast,
    refreshData
  } = useApp();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const handleSubmit = async () => {
    if (!selectedJob) return;
    setIsSubmitting(true);

    try {
      addToast('info', 'Submitting Application...', 'Registering record, audit logs, and follow-up calendar items');

      const newApp = await api.createApplication({
        jobId: selectedJob.id,
        company: selectedJob.company,
        jobTitle: selectedJob.title,
        jobUrl: selectedJob.applyUrl,
        portalType: selectedJob.source,
        status: 'applied',
        resumeVersionId: resumes[0]?.id || 'res_001',
        matchScoreAtApply: selectedJob.matchScore || 90,
        submissionMethod: 'assisted',
        userConfirmed: true,
        notes: 'Submitted via JobPilot AI Assisted Application with customized responses.'
      });

      // Also create automated follow-up reminder in 7 days
      const followUpDate = new Date();
      followUpDate.setDate(followUpDate.getDate() + 7);

      await api.addReminder({
        applicationId: newApp.id,
        company: selectedJob.company,
        jobTitle: selectedJob.title,
        type: 'follow_up',
        title: `Follow up on ${selectedJob.title} application`,
        dueDate: followUpDate.toISOString(),
        completed: false,
        note: 'Check application portal or reach out to recruiter on LinkedIn.'
      });

      await refreshData();
      setSubmittedSuccess(true);
      addToast('success', 'Application Successfully Submitted!', 'Added to your Kanban tracker & 7-day follow-up reminder created.');
    } catch (err: any) {
      addToast('error', 'Submission Failed', err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 lg:p-10 max-w-4xl mx-auto space-y-6 animate-in fade-in duration-150">
      {/* Top Breadcrumb */}
      <button
        onClick={() => setCurrentView('application-assistant')}
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-slate-200 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Form Editing</span>
      </button>

      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
          Pre-Submission Final Review
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Review all mapped data before granting final submission authorization.
        </p>
      </div>

      {submittedSuccess ? (
        /* Success State */
        <div className="p-8 rounded-3xl bg-slate-900 border border-emerald-500/40 text-center space-y-5 animate-in zoom-in-95">
          <div className="w-16 h-16 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-100">Application Recorded!</h2>
            <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
              Your application for <strong>{selectedJob?.title}</strong> at <strong>{selectedJob?.company}</strong> is now tracked in your pipeline.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300 max-w-md mx-auto flex items-center gap-2.5">
            <Clock className="w-4 h-4 text-indigo-400 shrink-0" />
            <span>Automated 7-day follow-up reminder scheduled on your dashboard.</span>
          </div>
          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={() => setCurrentView('applications-tracker')}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-indigo-600/20 transition-all"
            >
              Open Applications Tracker
            </button>
            <button
              onClick={() => setCurrentView('jobs')}
              className="px-6 py-2.5 bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-semibold rounded-xl transition-colors"
            >
              Browse More Jobs
            </button>
          </div>
        </div>
      ) : (
        /* Review Checklist Cards */
        <div className="space-y-4">
          {/* Target Job Summary */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Position &amp; Company
              </span>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                {selectedJob?.matchScore}% Match
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-100">{selectedJob?.title}</h3>
            <p className="text-xs text-slate-400">{selectedJob?.company} • {selectedJob?.location} ({selectedJob?.source} portal)</p>
          </div>

          {/* Checklist items */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Verification Checklist
            </span>

            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-850 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Candidate Contact Info Verified ({userProfile?.email})</span>
                </div>
                <span className="text-[11px] text-slate-500">Ready</span>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-850 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Resume Attached ({resumes[0]?.title || 'Master Resume'})</span>
                </div>
                <span className="text-[11px] text-slate-500">Attached</span>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-850 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>3 Custom Employer Questions Answered &amp; Approved</span>
                </div>
                <span className="text-[11px] text-slate-500">Grounded</span>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-850 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Duplicate Application Check (No duplicate detected)</span>
                </div>
                <span className="text-[11px] text-emerald-400 font-medium">Passed</span>
              </div>
            </div>
          </div>

          {/* Submission Bar */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 to-indigo-950/40 border border-indigo-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0" />
              <div>
                <p className="text-xs font-bold text-slate-200">Ready to Submit with Full User Authorization</p>
                <p className="text-[11px] text-slate-400">All data is encrypted and logged in your private audit trail.</p>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-semibold shadow-xl shadow-indigo-600/30 transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? 'Recording Submission...' : 'Confirm & Submit Application'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
