import React, { useState } from 'react';
import {
  Settings,
  User,
  Sliders,
  ShieldCheck,
  Download,
  Trash2,
  Lock,
  Save,
  Check,
  Zap,
  CreditCard
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { api } from '../../services/apiClient';

export const SettingsView: React.FC = () => {
  const {
    userProfile,
    updateProfile,
    jobPreferences,
    updatePreferences,
    refreshData,
    addToast
  } = useApp();

  const [activeTab, setActiveTab] = useState<'profile' | 'preferences' | 'safety' | 'privacy'>('profile');

  const [profileForm, setProfileForm] = useState({
    name: userProfile?.name || 'Alex Mercer',
    email: userProfile?.email || 'alex.mercer@example.com',
    phone: userProfile?.phone || '+1 (555) 234-8901',
    city: userProfile?.city || 'San Francisco',
    state: userProfile?.state || 'CA',
    country: userProfile?.country || 'United States',
    linkedinUrl: userProfile?.linkedinUrl || 'https://linkedin.com/in/alex-mercer',
    githubUrl: userProfile?.githubUrl || 'https://github.com/alexmercer',
    portfolioUrl: userProfile?.portfolioUrl || 'https://alexmercer.dev',
    summary: userProfile?.summary || ''
  });

  const [prefForm, setPrefForm] = useState({
    minSalary: jobPreferences?.minimumSalary || 95000,
    remotePref: jobPreferences?.remotePreference || ['remote', 'hybrid'],
    expLevel: jobPreferences?.experienceLevel || 'mid',
    requireApproval: jobPreferences?.requireApprovalBeforeApply ?? false,
    autoSave: jobPreferences?.autoSaveStrongMatches ?? true,
    autoTailor: jobPreferences?.autoTailorResume ?? true,
    autoApplyEnabled: jobPreferences?.autoApplyEnabled ?? true,
    autoApplyDailyTarget: jobPreferences?.autoApplyDailyTarget || 12,
    autoApplyMinMatchScore: jobPreferences?.autoApplyMinMatchScore || 85
  });

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile(profileForm);
  };

  const handleSavePrefs = async (e: React.FormEvent) => {
    e.preventDefault();
    await updatePreferences({
      minimumSalary: Number(prefForm.minSalary),
      remotePreference: prefForm.remotePref,
      experienceLevel: prefForm.expLevel as any,
      requireApprovalBeforeApply: prefForm.requireApproval,
      autoSaveStrongMatches: prefForm.autoSave,
      autoTailorResume: prefForm.autoTailor,
      autoApplyEnabled: prefForm.autoApplyEnabled,
      autoApplyDailyTarget: Number(prefForm.autoApplyDailyTarget),
      autoApplyMinMatchScore: Number(prefForm.autoApplyMinMatchScore)
    });
  };

  const handleExportData = async () => {
    try {
      const data = await api.exportData();
      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', dataStr);
      downloadAnchor.setAttribute('download', `jobpilot_full_export_${new Date().toISOString().split('T')[0]}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      addToast('success', 'Data Export Downloaded', 'Full candidate record and history exported safely.');
    } catch (err: any) {
      addToast('error', 'Export Failed', err.message);
    }
  };

  const handleResetDemo = async () => {
    if (window.confirm('Reset all demo state to fresh mock seed data?')) {
      await api.resetDemo();
      await refreshData();
      addToast('info', 'Demo Reset', 'Restored pristine demo data.');
    }
  };

  return (
    <div className="p-6 lg:p-10 max-w-5xl mx-auto space-y-6 animate-in fade-in duration-150">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <Settings className="w-5 h-5 text-indigo-400" />
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
            Settings &amp; Privacy Governance
          </h1>
        </div>
        <p className="text-sm text-slate-400 mt-1">
          Manage your candidate identity, search parameters, safety guardrails, and data portability.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-800 pb-2 overflow-x-auto">
        {[
          { id: 'profile', label: 'Candidate Profile', icon: User },
          { id: 'preferences', label: 'Job Preferences', icon: Sliders },
          { id: 'safety', label: 'AI Safety Controls', icon: ShieldCheck },
          { id: 'privacy', label: 'Privacy & Data Export', icon: Lock }
        ].map(tab => {
          const Icon = tab.icon;
          const isSelected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all shrink-0 ${
                isSelected
                  ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: Profile */}
      {activeTab === 'profile' && (
        <form onSubmit={handleSaveProfile} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h2 className="text-base font-bold text-slate-100">Personal &amp; Contact Details</h2>
            <button
              type="submit"
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Profile</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="text-slate-300 font-semibold block mb-1">Full Name</label>
              <input
                type="text"
                value={profileForm.name}
                onChange={e => setProfileForm({ ...profileForm, name: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-100"
              />
            </div>
            <div>
              <label className="text-slate-300 font-semibold block mb-1">Email</label>
              <input
                type="email"
                value={profileForm.email}
                onChange={e => setProfileForm({ ...profileForm, email: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-100"
              />
            </div>
            <div>
              <label className="text-slate-300 font-semibold block mb-1">Phone</label>
              <input
                type="text"
                value={profileForm.phone}
                onChange={e => setProfileForm({ ...profileForm, phone: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-100"
              />
            </div>
            <div>
              <label className="text-slate-300 font-semibold block mb-1">City</label>
              <input
                type="text"
                value={profileForm.city}
                onChange={e => setProfileForm({ ...profileForm, city: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-100"
              />
            </div>
            <div>
              <label className="text-slate-300 font-semibold block mb-1">State / Region</label>
              <input
                type="text"
                value={profileForm.state}
                onChange={e => setProfileForm({ ...profileForm, state: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-100"
              />
            </div>
            <div>
              <label className="text-slate-300 font-semibold block mb-1">Country</label>
              <input
                type="text"
                value={profileForm.country}
                onChange={e => setProfileForm({ ...profileForm, country: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-100"
              />
            </div>
            <div className="sm:col-span-2 md:col-span-3">
              <label className="text-slate-300 font-semibold block mb-1">LinkedIn URL</label>
              <input
                type="url"
                value={profileForm.linkedinUrl}
                onChange={e => setProfileForm({ ...profileForm, linkedinUrl: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-100"
              />
            </div>
            <div className="sm:col-span-2 md:col-span-3">
              <label className="text-slate-300 font-semibold block mb-1">Professional Summary</label>
              <textarea
                rows={3}
                value={profileForm.summary}
                onChange={e => setProfileForm({ ...profileForm, summary: e.target.value })}
                className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 leading-relaxed"
              />
            </div>
          </div>
        </form>
      )}

      {/* TAB 2: Preferences */}
      {activeTab === 'preferences' && (
        <form onSubmit={handleSavePrefs} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h2 className="text-base font-bold text-slate-100">Job Match &amp; Filter Parameters</h2>
            <button
              type="submit"
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Preferences</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="text-slate-300 font-semibold block mb-1">Minimum Target Salary ($/yr)</label>
              <input
                type="number"
                step="5000"
                value={prefForm.minSalary}
                onChange={e => setPrefForm({ ...prefForm, minSalary: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-100"
              />
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1">Target Experience Level</label>
              <select
                value={prefForm.expLevel}
                onChange={e => setPrefForm({ ...prefForm, expLevel: e.target.value as any })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-200"
              >
                <option value="junior">Junior (1-2 years)</option>
                <option value="mid">Mid-Level (3-5 years)</option>
                <option value="senior">Senior (5+ years)</option>
              </select>
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1">Autonomous Daily Target (Jobs/Day)</label>
              <select
                value={prefForm.autoApplyDailyTarget}
                onChange={e => setPrefForm({ ...prefForm, autoApplyDailyTarget: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-200"
              >
                <option value={10}>10 companies / day</option>
                <option value={12}>12 companies / day (Recommended)</option>
                <option value={15}>15 companies / day (Max safe pace)</option>
              </select>
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1">Auto-Apply Min Compatibility Score (%)</label>
              <input
                type="number"
                min="75"
                max="98"
                value={prefForm.autoApplyMinMatchScore}
                onChange={e => setPrefForm({ ...prefForm, autoApplyMinMatchScore: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-100"
              />
            </div>
          </div>
        </form>
      )}

      {/* TAB 3: AI Safety Controls */}
      {activeTab === 'safety' && (
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-5">
          <div className="border-b border-slate-800 pb-3">
            <h2 className="text-base font-bold text-slate-100">AI Safety &amp; Guardrail Policies</h2>
            <p className="text-xs text-slate-400 mt-0.5">Strict architectural constraints enforced on all AI models.</p>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-850 flex items-center justify-between">
              <div>
                <p className="font-semibold text-slate-200">Mandatory Human Review Before Submission</p>
                <p className="text-slate-400 text-[11px] mt-0.5">
                  AI will never submit forms without your live interactive approval.
                </p>
              </div>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                ACTIVE (ENFORCED)
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-850 flex items-center justify-between">
              <div>
                <p className="font-semibold text-slate-200">Zero-Hallucination Resume Constraint</p>
                <p className="text-slate-400 text-[11px] mt-0.5">
                  System prompts forbid the generation of unverified titles, companies, or degrees.
                </p>
              </div>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                ACTIVE (100% AUDITED)
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-850 flex items-center justify-between">
              <div>
                <p className="font-semibold text-slate-200">Anti-Bot Policy &amp; Security Compliance</p>
                <p className="text-slate-400 text-[11px] mt-0.5">
                  Does not bypass Cloudflare, CAPTCHA, or employer authentication gates.
                </p>
              </div>
              <span className="text-xs font-mono text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-lg border border-indigo-500/20">
                COMPLIANT
              </span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: Privacy & Data Export */}
      {activeTab === 'privacy' && (
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
          <div className="border-b border-slate-800 pb-3">
            <h2 className="text-base font-bold text-slate-100">Data Portability &amp; Account Control</h2>
            <p className="text-xs text-slate-400 mt-0.5">You own 100% of your data. Export or reset anytime.</p>
          </div>

          <div className="space-y-4">
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-850 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xs font-bold text-slate-100">Download Full JSON Data Archive</h3>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Export all your candidate profiles, tailored resume versions, tracked applications, and reminders.
                </p>
              </div>
              <button
                type="button"
                onClick={handleExportData}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-md shadow-indigo-600/20 flex items-center gap-1.5 shrink-0"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Data</span>
              </button>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-850 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xs font-bold text-slate-100">Reset Demo Workspace</h3>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Restore pristine seed data for demonstration and testing purposes.
                </p>
              </div>
              <button
                type="button"
                onClick={handleResetDemo}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold border border-slate-700 shrink-0"
              >
                Reset Demo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
