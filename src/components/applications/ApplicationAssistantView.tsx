import React, { useState } from 'react';
import {
  Send,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  FileText,
  User,
  Sliders,
  Check,
  ArrowRight,
  ArrowLeft,
  Lock,
  Eye
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { api } from '../../services/apiClient';

interface DetectedQuestion {
  id: string;
  question: string;
  category: string;
  aiSuggestedAnswer: string;
  userAnswer: string;
  status: 'suggested' | 'approved' | 'edited' | 'rejected';
  reasoning: string;
}

export const ApplicationAssistantView: React.FC = () => {
  const {
    selectedJob,
    userProfile,
    resumes,
    setCurrentView,
    addToast
  } = useApp();

  const [selectedResumeId, setSelectedResumeId] = useState<string>(resumes[0]?.id || 'res_001');

  // Contact fields mapped from profile
  const [formFields, setFormFields] = useState({
    firstName: userProfile?.name?.split(' ')[0] || 'Alex',
    lastName: userProfile?.name?.split(' ')[1] || 'Mercer',
    email: userProfile?.email || 'alex.mercer@example.com',
    phone: userProfile?.phone || '+1 (555) 234-8901',
    linkedin: userProfile?.linkedinUrl || 'https://linkedin.com/in/alex-mercer-tech',
    portfolio: userProfile?.portfolioUrl || 'https://alexmercer.dev',
    authorizedInUS: 'Yes',
    requiresSponsorship: 'No',
    desiredSalary: '$115,000/yr',
    availableDate: '2 Weeks Notice'
  });

  // Custom detected questions for the selected job
  const [questions, setQuestions] = useState<DetectedQuestion[]>([
    {
      id: 'q1',
      question: 'Why are you interested in joining our engineering organization?',
      category: 'motivation',
      aiSuggestedAnswer: `I have followed ${selectedJob?.company || 'your team'}'s engineering work closely. My background architecting React component design systems and optimizing web performance directly complements your product roadmap.`,
      userAnswer: `I have followed ${selectedJob?.company || 'your team'}'s engineering work closely. My background architecting React component design systems and optimizing web performance directly complements your product roadmap.`,
      status: 'suggested',
      reasoning: 'Grounded in your real profile experience at Apex Cloud Solutions.'
    },
    {
      id: 'q2',
      question: 'Describe a challenging technical obstacle you solved recently.',
      category: 'technical',
      aiSuggestedAnswer: 'At Apex Cloud Solutions, I resolved critical UI render bottlenecks by restructuring React state management and implementing memoized virtual lists, which reduced latency by 35% across 50k+ daily users.',
      userAnswer: 'At Apex Cloud Solutions, I resolved critical UI render bottlenecks by restructuring React state management and implementing memoized virtual lists, which reduced latency by 35% across 50k+ daily users.',
      status: 'suggested',
      reasoning: 'Grounded in verified experience bullet metrics.'
    },
    {
      id: 'q3',
      question: 'Are you legally authorized to work in the country of employment?',
      category: 'work_authorization',
      aiSuggestedAnswer: 'Yes, I am a US Citizen and authorized to work without sponsorship.',
      userAnswer: 'Yes, I am a US Citizen and authorized to work without sponsorship.',
      status: 'suggested',
      reasoning: 'Mapped directly from verified profile preferences.'
    }
  ]);

  const [captchaAcknowledged, setCaptchaAcknowledged] = useState(true);
  const [dataAccuracyConfirmed, setDataAccuracyConfirmed] = useState(true);

  const handleApproveAnswer = (id: string) => {
    setQuestions(prev =>
      prev.map(q => (q.id === id ? { ...q, status: 'approved' } : q))
    );
    addToast('success', 'Answer Approved', 'Question marked ready for submission.');
  };

  const handleRejectAnswer = (id: string) => {
    setQuestions(prev =>
      prev.map(q => (q.id === id ? { ...q, status: 'rejected', userAnswer: '' } : q))
    );
    addToast('info', 'Answer Rejected', 'You can type your own answer manually.');
  };

  const handleUpdateAnswer = (id: string, text: string) => {
    setQuestions(prev =>
      prev.map(q => (q.id === id ? { ...q, userAnswer: text, status: 'edited' } : q))
    );
  };

  const handleProceedToReview = () => {
    if (!dataAccuracyConfirmed) {
      addToast('error', 'Confirmation Required', 'Please confirm that your answers and contact info are accurate.');
      return;
    }
    setCurrentView('application-review');
  };

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-150">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Send className="w-5 h-5 text-indigo-400" />
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
              Assisted Application Form
            </h1>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Applying to <span className="text-slate-200 font-semibold">{selectedJob?.title}</span> at <span className="text-slate-200 font-semibold">{selectedJob?.company}</span> ({selectedJob?.source} portal).
          </p>
        </div>

        <button
          onClick={() => setCurrentView('job-detail')}
          className="px-4 py-2 bg-slate-900 hover:bg-slate-850 text-slate-300 rounded-xl text-xs font-semibold border border-slate-800 self-start sm:self-auto flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Job Details</span>
        </button>
      </div>

      {/* Safety Banner */}
      <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-300 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-indigo-200">Ethical Automation Policy</span>
          <p className="text-slate-300 mt-0.5 leading-relaxed">
            JobPilot AI never submits applications automatically in secret. All candidate fields and custom answers are presented for your explicit review and authorization.
          </p>
        </div>
      </div>

      {/* Step 1: Standard Mapped Fields */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-indigo-400" />
            <h2 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
              1. Candidate Contact Information
            </h2>
          </div>
          <span className="text-xs text-emerald-400 font-medium">Mapped from profile</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">First Name</label>
            <input
              type="text"
              value={formFields.firstName}
              onChange={e => setFormFields({ ...formFields, firstName: e.target.value })}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Last Name</label>
            <input
              type="text"
              value={formFields.lastName}
              onChange={e => setFormFields({ ...formFields, lastName: e.target.value })}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Email Address</label>
            <input
              type="email"
              value={formFields.email}
              onChange={e => setFormFields({ ...formFields, email: e.target.value })}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Phone Number</label>
            <input
              type="text"
              value={formFields.phone}
              onChange={e => setFormFields({ ...formFields, phone: e.target.value })}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">LinkedIn URL</label>
            <input
              type="url"
              value={formFields.linkedin}
              onChange={e => setFormFields({ ...formFields, linkedin: e.target.value })}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Portfolio / Website</label>
            <input
              type="url"
              value={formFields.portfolio}
              onChange={e => setFormFields({ ...formFields, portfolio: e.target.value })}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100"
            />
          </div>
        </div>
      </div>

      {/* Step 2: Resume Version Attachment */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-indigo-400" />
            <h2 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
              2. Attached Resume Document
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {resumes.map(r => (
            <div
              key={r.id}
              onClick={() => setSelectedResumeId(r.id)}
              className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                selectedResumeId === r.id
                  ? 'bg-indigo-600/15 border-indigo-500/50 shadow-md'
                  : 'bg-slate-950 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <FileText className={`w-5 h-5 ${selectedResumeId === r.id ? 'text-indigo-400' : 'text-slate-500'}`} />
                <div>
                  <p className="text-xs font-bold text-slate-200">{r.title}</p>
                  <p className="text-[11px] text-slate-400">
                    {r.isMaster ? 'Master Profile' : `Tailored for ${r.targetJobTitle || 'Job'}`}
                  </p>
                </div>
              </div>
              {selectedResumeId === r.id && <Check className="w-4 h-4 text-emerald-400" />}
            </div>
          ))}
        </div>
      </div>

      {/* Step 3: Application Specific Questions with Grounded AI Suggestions */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <h2 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
              3. Employer Questions &amp; Grounded AI Suggestions
            </h2>
          </div>
          <span className="text-xs text-indigo-300 font-medium">3 Detected Questions</span>
        </div>

        <div className="space-y-4">
          {questions.map((q, idx) => (
            <div
              key={q.id}
              className="p-4 rounded-2xl bg-slate-950 border border-slate-850 space-y-3"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="text-xs font-bold text-slate-200">
                  {idx + 1}. {q.question}
                </span>
                <span className="text-[10px] uppercase font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20 shrink-0">
                  {q.category}
                </span>
              </div>

              <textarea
                rows={3}
                value={q.userAnswer}
                onChange={e => handleUpdateAnswer(q.id, e.target.value)}
                className="w-full p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200 leading-relaxed focus:outline-none focus:border-indigo-500"
              />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1 text-xs">
                <span className="text-[11px] text-slate-400 italic">
                  💡 AI Reasoning: {q.reasoning}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleRejectAnswer(q.id)}
                    className="px-3 py-1 bg-slate-900 hover:bg-slate-850 text-slate-400 rounded-lg text-xs"
                  >
                    Clear / Reject
                  </button>
                  <button
                    type="button"
                    onClick={() => handleApproveAnswer(q.id)}
                    className="px-3.5 py-1 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 rounded-lg text-xs font-semibold flex items-center gap-1"
                  >
                    <Check className="w-3 h-3" />
                    <span>Approve Answer</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Step 4: Verification & Human Sign-off */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
        <h2 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
          4. Security &amp; Verification Checks
        </h2>

        <div className="space-y-3 text-xs">
          <label className="p-3.5 rounded-2xl bg-slate-950 border border-slate-850 flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={dataAccuracyConfirmed}
              onChange={e => setDataAccuracyConfirmed(e.target.checked)}
              className="w-4 h-4 rounded text-indigo-600 bg-slate-900 border-slate-700 mt-0.5"
            />
            <div>
              <span className="font-semibold text-slate-200">
                I verify that all contact details and responses are truthful and accurate.
              </span>
              <p className="text-slate-400 text-[11px] mt-0.5">
                Compliant with applicant verification standards.
              </p>
            </div>
          </label>

          <label className="p-3.5 rounded-2xl bg-slate-950 border border-slate-850 flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={captchaAcknowledged}
              onChange={e => setCaptchaAcknowledged(e.target.checked)}
              className="w-4 h-4 rounded text-indigo-600 bg-slate-900 border-slate-700 mt-0.5"
            />
            <div>
              <span className="font-semibold text-slate-200">
                Acknowledge security checkpoints (CAPTCHA / 2FA handled by human applicant).
              </span>
              <p className="text-slate-400 text-[11px] mt-0.5">
                JobPilot AI respects site terms and will not bypass security protections.
              </p>
            </div>
          </label>
        </div>

        <div className="pt-4 flex justify-end">
          <button
            onClick={handleProceedToReview}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-semibold shadow-lg shadow-indigo-600/25 transition-all flex items-center gap-2"
          >
            <span>Proceed to Final Review</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
