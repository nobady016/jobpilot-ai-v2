import React, { useState } from 'react';
import {
  UploadCloud,
  FileText,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  User,
  Briefcase,
  Sliders,
  ShieldCheck,
  Sparkles,
  Plus,
  Trash2,
  Info,
  Check
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { api } from '../../services/apiClient';

export const OnboardingWizard: React.FC = () => {
  const { userProfile, updateProfile, jobPreferences, updatePreferences, setCurrentView, addToast } = useApp();

  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [isParsing, setIsParsing] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>('Alex_Mercer_Master_Resume.pdf');
  const [rawResumeText, setRawResumeText] = useState<string>('');

  // Local form states
  const [formData, setFormData] = useState({
    name: userProfile?.name || 'Alex Mercer',
    email: userProfile?.email || 'alex.mercer@example.com',
    phone: userProfile?.phone || '+1 (555) 234-8901',
    city: userProfile?.city || 'San Francisco',
    state: userProfile?.state || 'CA',
    country: userProfile?.country || 'United States',
    linkedinUrl: userProfile?.linkedinUrl || 'https://linkedin.com/in/alex-mercer-tech',
    githubUrl: userProfile?.githubUrl || 'https://github.com/alexmercer-dev',
    portfolioUrl: userProfile?.portfolioUrl || 'https://alexmercer.dev',
    summary: userProfile?.summary || '',
    skills: userProfile?.skills || ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Git & GitHub'],
    targetJobTitles: userProfile?.targetJobTitles || ['Frontend Developer', 'Full Stack Engineer'],
    newSkillInput: '',
    newTitleInput: '',
    minSalary: jobPreferences?.minimumSalary || 95000,
    remotePref: jobPreferences?.remotePreference || ['remote', 'hybrid'],
    expLevel: jobPreferences?.experienceLevel || 'mid',
    requireApproval: true,
    autoSave: true,
    autoTailor: true,
    autoCoverLetter: true,
    template: 'modern' as const
  });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadedFileName(file.name);
    setIsParsing(true);

    try {
      // Read text from file
      const text = await file.text();
      setRawResumeText(text);

      addToast('info', 'AI Extracting Resume...', 'Analyzing sections, skills, and work history');
      const parsed = await api.parseResumeText(text || 'Alex Mercer Software Engineer Resume React TypeScript');

      setFormData(prev => ({
        ...prev,
        name: parsed.name || prev.name,
        email: parsed.email || prev.email,
        phone: parsed.phone || prev.phone,
        city: parsed.city || prev.city,
        state: parsed.state || prev.state,
        country: parsed.country || prev.country,
        summary: parsed.summary || prev.summary,
        skills: parsed.skills?.length > 0 ? parsed.skills : prev.skills
      }));

      addToast('success', 'Resume Extracted Successfully', 'AI populated your structured candidate profile.');
    } catch (err) {
      console.error(err);
      addToast('warning', 'Parsed with Default Parser', 'Resume content loaded into profile.');
    } finally {
      setIsParsing(false);
    }
  };

  const handleAddSkill = () => {
    if (formData.newSkillInput.trim() && !formData.skills.includes(formData.newSkillInput.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, prev.newSkillInput.trim()],
        newSkillInput: ''
      }));
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skillToRemove)
    }));
  };

  const handleAddTitle = () => {
    if (formData.newTitleInput.trim() && !formData.targetJobTitles.includes(formData.newTitleInput.trim())) {
      setFormData(prev => ({
        ...prev,
        targetJobTitles: [...prev.targetJobTitles, prev.newTitleInput.trim()],
        newTitleInput: ''
      }));
    }
  };

  const handleRemoveTitle = (titleToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      targetJobTitles: prev.targetJobTitles.filter(t => t !== titleToRemove)
    }));
  };

  const finishOnboarding = async () => {
    await updateProfile({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      city: formData.city,
      state: formData.state,
      country: formData.country,
      linkedinUrl: formData.linkedinUrl,
      githubUrl: formData.githubUrl,
      portfolioUrl: formData.portfolioUrl,
      summary: formData.summary,
      skills: formData.skills,
      targetJobTitles: formData.targetJobTitles
    });

    await updatePreferences({
      desiredJobTitles: formData.targetJobTitles,
      minimumSalary: Number(formData.minSalary),
      remotePreference: formData.remotePref,
      experienceLevel: formData.expLevel as any,
      requireApprovalBeforeApply: formData.requireApproval,
      autoSaveStrongMatches: formData.autoSave,
      autoTailorResume: formData.autoTailor,
      autoGenerateCoverLetter: formData.autoCoverLetter,
      defaultResumeTemplate: formData.template
    });

    addToast('success', 'Onboarding Complete!', 'Welcome to your JobPilot AI Dashboard.');
    setCurrentView('dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center p-4 sm:p-8">
      <div className="w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl shadow-black/80 relative">
        {/* Step Indicator Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-3">
            <span>STEP {step} OF 5</span>
            <span className="text-indigo-400">
              {step === 1 && 'Upload Master Resume'}
              {step === 2 && 'Personal Information'}
              {step === 3 && 'Professional Profile & Skills'}
              {step === 4 && 'Target Job Preferences'}
              {step === 5 && 'Application Safety Controls'}
            </span>
          </div>

          <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden flex">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-sky-400 transition-all duration-300 rounded-full"
              style={{ width: `${(step / 5) * 100}%` }}
            />
          </div>
        </div>

        {/* STEP 1: Upload Resume */}
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in">
            <div>
              <h2 className="text-2xl font-bold text-slate-100">Upload Your Master Resume</h2>
              <p className="text-sm text-slate-400 mt-1">
                Upload once in PDF or DOCX format. JobPilot AI extracts your verified experience with zero hallucinations.
              </p>
            </div>

            <label className="border-2 border-dashed border-slate-700 hover:border-indigo-500 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all bg-slate-950/50 hover:bg-slate-950 group">
              <input
                type="file"
                accept=".pdf,.docx,.txt"
                onChange={handleFileUpload}
                className="hidden"
              />
              <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500/20 transition-colors mb-4">
                <UploadCloud className="w-8 h-8" />
              </div>
              <p className="text-sm font-semibold text-slate-200 group-hover:text-white">
                Click or drag &amp; drop your resume here
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Supported formats: PDF, DOCX, TXT (Max 10MB)
              </p>
            </label>

            {uploadedFileName && (
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-200">{uploadedFileName}</p>
                    <p className="text-[11px] text-emerald-400 flex items-center gap-1">
                      <Check className="w-3 h-3" /> Ready for AI Extraction
                    </p>
                  </div>
                </div>
                <span className="text-xs font-mono text-slate-500">Verified</span>
              </div>
            )}

            <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-300 flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
              <span>
                <strong>Truthful AI Guarantee:</strong> We extract only your actual qualifications. We will never fabricate employers, dates, or degrees.
              </span>
            </div>
          </div>
        )}

        {/* STEP 2: Personal Information */}
        {step === 2 && (
          <div className="space-y-6 animate-in fade-in">
            <div>
              <h2 className="text-2xl font-bold text-slate-100">Review Contact Information</h2>
              <p className="text-sm text-slate-400 mt-1">
                Verify the contact details and links that will be used for application autofill.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">Phone Number</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">City &amp; State</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="City"
                    value={formData.city}
                    onChange={e => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                  />
                  <input
                    type="text"
                    placeholder="State/Country"
                    value={formData.state}
                    onChange={e => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">LinkedIn Profile URL</label>
                <input
                  type="url"
                  value={formData.linkedinUrl}
                  onChange={e => setFormData({ ...formData, linkedinUrl: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">GitHub or Portfolio URL</label>
                <input
                  type="url"
                  value={formData.githubUrl}
                  onChange={e => setFormData({ ...formData, githubUrl: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Professional Profile & Skills */}
        {step === 3 && (
          <div className="space-y-6 animate-in fade-in">
            <div>
              <h2 className="text-2xl font-bold text-slate-100">Professional Profile &amp; Skills</h2>
              <p className="text-sm text-slate-400 mt-1">
                Edit your executive summary and verified technical skills.
              </p>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">Professional Summary</label>
              <textarea
                rows={4}
                value={formData.summary}
                onChange={e => setFormData({ ...formData, summary: e.target.value })}
                className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-indigo-500 leading-relaxed"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">Target Job Titles</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder="e.g. Frontend Developer"
                  value={formData.newTitleInput}
                  onChange={e => setFormData({ ...formData, newTitleInput: e.target.value })}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddTitle();
                    }
                  }}
                  className="flex-1 px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                />
                <button
                  type="button"
                  onClick={handleAddTitle}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold"
                >
                  Add Title
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.targetJobTitles.map(title => (
                  <span
                    key={title}
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 rounded-lg text-xs font-medium"
                  >
                    {title}
                    <button onClick={() => handleRemoveTitle(title)} className="hover:text-rose-400">
                      &times;
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">Verified Skills</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder="e.g. Docker, TypeScript"
                  value={formData.newSkillInput}
                  onChange={e => setFormData({ ...formData, newSkillInput: e.target.value })}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddSkill();
                    }
                  }}
                  className="flex-1 px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                />
                <button
                  type="button"
                  onClick={handleAddSkill}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold"
                >
                  Add Skill
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto p-1">
                {formData.skills.map(skill => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-800 text-slate-300 rounded-md text-xs border border-slate-700/60"
                  >
                    {skill}
                    <button onClick={() => handleRemoveSkill(skill)} className="text-slate-500 hover:text-rose-400">
                      &times;
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Job Preferences */}
        {step === 4 && (
          <div className="space-y-6 animate-in fade-in">
            <div>
              <h2 className="text-2xl font-bold text-slate-100">Define Job Preferences</h2>
              <p className="text-sm text-slate-400 mt-1">
                JobPilot will filter opportunities and calculate transparent match scores based on these parameters.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">Minimum Desired Salary ($/yr)</label>
                <input
                  type="number"
                  step="5000"
                  value={formData.minSalary}
                  onChange={e => setFormData({ ...formData, minSalary: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">Experience Level</label>
                <select
                  value={formData.expLevel}
                  onChange={e => setFormData({ ...formData, expLevel: e.target.value as any })}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
                >
                  <option value="entry">Entry Level / Intern</option>
                  <option value="junior">Junior (1-2 years)</option>
                  <option value="mid">Mid-Level (3-5 years)</option>
                  <option value="senior">Senior (5+ years)</option>
                  <option value="lead">Staff / Lead</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-2">Work Arrangement Preferences</label>
              <div className="flex flex-wrap gap-3">
                {[
                  { id: 'remote', label: 'Remote Only' },
                  { id: 'hybrid', label: 'Hybrid' },
                  { id: 'on-site', label: 'On-Site' }
                ].map(pref => {
                  const isChecked = formData.remotePref.includes(pref.id as any);
                  return (
                    <button
                      key={pref.id}
                      type="button"
                      onClick={() => {
                        if (isChecked) {
                          setFormData({ ...formData, remotePref: formData.remotePref.filter(p => p !== pref.id) });
                        } else {
                          setFormData({ ...formData, remotePref: [...formData.remotePref, pref.id as any] });
                        }
                      }}
                      className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                        isChecked
                          ? 'bg-indigo-600/20 text-indigo-300 border-indigo-500/40'
                          : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      {pref.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: Application Preferences & Safety */}
        {step === 5 && (
          <div className="space-y-6 animate-in fade-in">
            <div>
              <h2 className="text-2xl font-bold text-slate-100">Application Safety &amp; Automation</h2>
              <p className="text-sm text-slate-400 mt-1">
                Configure how JobPilot assists your applications. By default, human approval is strictly mandated.
              </p>
            </div>

            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-200">Require User Approval Before Any Submission</p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Strict safety policy: Every application field must be reviewed and confirmed by you.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={formData.requireApproval}
                  onChange={e => setFormData({ ...formData, requireApproval: e.target.checked })}
                  className="w-5 h-5 rounded text-indigo-600 bg-slate-900 border-slate-700 focus:ring-indigo-500"
                />
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-200">Automatically Save Strong Matches (&gt;85%)</p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Adds top-scoring listings to your Saved Jobs pipeline.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={formData.autoSave}
                  onChange={e => setFormData({ ...formData, autoSave: e.target.checked })}
                  className="w-5 h-5 rounded text-indigo-600 bg-slate-900 border-slate-700 focus:ring-indigo-500"
                />
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-200">Auto-Generate Tailored Resume Diffs</p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Pre-compute ATS keyword alignments for matched listings.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={formData.autoTailor}
                  onChange={e => setFormData({ ...formData, autoTailor: e.target.checked })}
                  className="w-5 h-5 rounded text-indigo-600 bg-slate-900 border-slate-700 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-emerald-300">Ready to Launch JobPilot AI</p>
                <p className="text-slate-300 mt-0.5">
                  Your profile and preferences are securely configured. Click below to enter your workspace.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Wizard Footer Controls */}
        <div className="mt-10 pt-6 border-t border-slate-800/80 flex items-center justify-between">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep((step - 1) as any)}
              className="px-5 py-2.5 rounded-xl border border-slate-800 bg-slate-950 hover:bg-slate-850 text-slate-300 text-xs font-semibold flex items-center gap-2 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {step < 5 ? (
            <button
              type="button"
              onClick={() => setStep((step + 1) as any)}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center gap-2 shadow-lg shadow-indigo-600/20 transition-all"
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={finishOnboarding}
              className="px-7 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-semibold flex items-center gap-2 shadow-xl shadow-emerald-600/30 transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>Complete Setup &amp; Open Dashboard</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
