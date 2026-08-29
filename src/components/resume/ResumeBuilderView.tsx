import React, { useState } from 'react';
import {
  FileText,
  Download,
  Printer,
  Copy,
  Plus,
  Trash2,
  Sparkles,
  Layout,
  Check,
  Building,
  GraduationCap,
  FolderGit2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { api } from '../../services/apiClient';

export const ResumeBuilderView: React.FC = () => {
  const { userProfile, updateProfile, resumes, addToast } = useApp();

  const [activeTemplate, setActiveTemplate] = useState<'modern' | 'ats' | 'classic' | 'minimal'>('modern');
  const [activeTab, setActiveTab] = useState<'preview' | 'edit'>('preview');
  const [selectedResumeId, setSelectedResumeId] = useState<string>('res_001');

  const [formData, setFormData] = useState({
    name: userProfile?.name || 'Alex Mercer',
    email: userProfile?.email || 'alex.mercer@example.com',
    phone: userProfile?.phone || '+1 (555) 234-8901',
    city: userProfile?.city || 'San Francisco',
    state: userProfile?.state || 'CA',
    linkedinUrl: userProfile?.linkedinUrl || 'https://linkedin.com/in/alex-mercer-tech',
    githubUrl: userProfile?.githubUrl || 'https://github.com/alexmercer-dev',
    portfolioUrl: userProfile?.portfolioUrl || 'https://alexmercer.dev',
    summary: userProfile?.summary || 'Results-driven software engineer specializing in modern web applications, React, TypeScript, and high-throughput backend services.',
    skills: userProfile?.skills || ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Next.js', 'Git & GitHub', 'REST APIs', 'Docker', 'Jest & Vitest'],
    experience: userProfile?.experience || [],
    education: userProfile?.education || [],
    projects: userProfile?.projects || []
  });

  const handlePrint = () => {
    window.print();
  };

  const handleSaveProfile = async () => {
    try {
      await updateProfile({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        city: formData.city,
        state: formData.state,
        summary: formData.summary,
        skills: formData.skills,
        experience: formData.experience,
        education: formData.education,
        projects: formData.projects
      });
      addToast('success', 'Resume Profile Saved', 'All updates synced to your master candidate record.');
    } catch (err: any) {
      addToast('error', 'Save Failed', err.message);
    }
  };

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-150">
      {/* Top Header & Template Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-400" />
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
              Resume Builder &amp; PDF Studio
            </h1>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Format, customize, and export clean, ATS-compliant resumes with instant PDF generation.
          </p>
        </div>

        {/* Template Selectors */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center p-1 bg-slate-900 border border-slate-800 rounded-xl">
            {(['modern', 'ats', 'classic', 'minimal'] as const).map(tmpl => (
              <button
                key={tmpl}
                onClick={() => setActiveTemplate(tmpl)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                  activeTemplate === tmpl
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {tmpl}
              </button>
            ))}
          </div>

          <button
            onClick={() => setActiveTab(activeTab === 'preview' ? 'edit' : 'preview')}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-850 text-slate-200 border border-slate-800 rounded-xl text-xs font-semibold transition-colors"
          >
            {activeTab === 'preview' ? 'Edit Content' : 'View Preview'}
          </button>

          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all flex items-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Download PDF</span>
          </button>
        </div>
      </div>

      {activeTab === 'edit' ? (
        /* Edit Tab */
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-base font-bold text-slate-100">Edit Resume Content</h2>
            <button
              onClick={handleSaveProfile}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold"
            >
              Save Changes
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Phone</label>
              <input
                type="text"
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Professional Summary</label>
            <textarea
              rows={3}
              value={formData.summary}
              onChange={e => setFormData({ ...formData, summary: e.target.value })}
              className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 leading-relaxed"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Skills (comma-separated)</label>
            <input
              type="text"
              value={formData.skills.join(', ')}
              onChange={e =>
                setFormData({
                  ...formData,
                  skills: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                })
              }
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100"
            />
          </div>
        </div>
      ) : (
        /* Live Document Preview Container (Styled per template) */
        <div className="flex justify-center">
          <div
            id="resume-document"
            className={`w-full max-w-4xl p-8 sm:p-12 shadow-2xl transition-all ${
              activeTemplate === 'modern'
                ? 'bg-white text-slate-900 rounded-2xl border-t-8 border-indigo-600 font-sans'
                : activeTemplate === 'ats'
                ? 'bg-white text-slate-900 rounded-none border border-slate-300 font-mono text-xs'
                : activeTemplate === 'classic'
                ? 'bg-[#faf8f5] text-slate-900 rounded-xl border border-amber-200 font-serif'
                : 'bg-white text-slate-800 rounded-2xl border border-slate-200 font-sans'
            }`}
          >
            {/* Header / Contact */}
            <div className={`pb-6 border-b ${activeTemplate === 'classic' ? 'border-slate-400 text-center' : 'border-slate-200'}`}>
              <h1 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${activeTemplate === 'modern' ? 'text-indigo-900' : 'text-slate-900'}`}>
                {formData.name}
              </h1>
              <p className="text-xs text-slate-600 mt-1 font-medium flex flex-wrap items-center gap-3">
                <span>{formData.email}</span>
                <span>•</span>
                <span>{formData.phone}</span>
                <span>•</span>
                <span>{formData.city}, {formData.state}</span>
                {formData.linkedinUrl && (
                  <>
                    <span>•</span>
                    <span className="text-indigo-600">{formData.linkedinUrl}</span>
                  </>
                )}
              </p>
            </div>

            {/* Summary */}
            <div className="py-5 border-b border-slate-200">
              <h2 className={`text-xs font-bold uppercase tracking-wider mb-2 ${activeTemplate === 'modern' ? 'text-indigo-700' : 'text-slate-800'}`}>
                Professional Summary
              </h2>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {formData.summary}
              </p>
            </div>

            {/* Technical Skills */}
            <div className="py-5 border-b border-slate-200">
              <h2 className={`text-xs font-bold uppercase tracking-wider mb-2 ${activeTemplate === 'modern' ? 'text-indigo-700' : 'text-slate-800'}`}>
                Technical Competencies
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {formData.skills.map(skill => (
                  <span
                    key={skill}
                    className={`text-xs px-2.5 py-0.5 rounded ${
                      activeTemplate === 'modern'
                        ? 'bg-indigo-50 text-indigo-900 border border-indigo-200 font-medium'
                        : 'bg-slate-100 text-slate-800 border border-slate-200'
                    }`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div className="py-5 border-b border-slate-200 space-y-4">
              <h2 className={`text-xs font-bold uppercase tracking-wider ${activeTemplate === 'modern' ? 'text-indigo-700' : 'text-slate-800'}`}>
                Professional Experience
              </h2>
              {formData.experience.map(exp => (
                <div key={exp.id} className="space-y-1.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs sm:text-sm">
                    <span className="font-bold text-slate-900">{exp.title} — <span className="font-semibold text-slate-700">{exp.company}</span></span>
                    <span className="text-xs text-slate-500 font-medium">{exp.startDate} – {exp.endDate || 'Present'} | {exp.location}</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-xs text-slate-700 leading-relaxed">
                    {exp.bullets.map((bullet, idx) => (
                      <li key={idx}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Education & Projects */}
            <div className="py-5 space-y-4">
              <h2 className={`text-xs font-bold uppercase tracking-wider ${activeTemplate === 'modern' ? 'text-indigo-700' : 'text-slate-800'}`}>
                Education &amp; Credentials
              </h2>
              {formData.education.map(edu => (
                <div key={edu.id} className="flex justify-between text-xs sm:text-sm text-slate-800">
                  <div>
                    <span className="font-bold">{edu.degree} in {edu.field}</span>
                    <span className="text-slate-600 block text-xs">{edu.school}</span>
                  </div>
                  <span className="text-xs text-slate-500 font-medium">{edu.graduationDate}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
