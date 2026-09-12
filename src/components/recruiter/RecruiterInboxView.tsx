import React, { useState, useEffect } from 'react';
import {
  Mail,
  Send,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Clock,
  Building2,
  Forward,
  RotateCcw,
  Zap,
  Calendar,
  MessageSquare,
  ShieldCheck,
  Check,
  ArrowRight,
  ExternalLink,
  Bot
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { RecruiterMessage } from '../../types';

export const RecruiterInboxView: React.FC = () => {
  const {
    recruiterMessages,
    userProfile,
    jobPreferences,
    updatePreferences,
    markRecruiterMessageRead,
    replyToRecruiterMessage,
    resendForwardRecruiterMessage,
    simulateRecruiterReply,
    addToast
  } = useApp();

  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(
    recruiterMessages.length > 0 ? recruiterMessages[0].id : null
  );
  const [replyDraft, setReplyDraft] = useState<string>('');
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [targetForwardEmail, setTargetForwardEmail] = useState<string>(
    jobPreferences?.forwardDestinationEmail || userProfile?.email || 'alex.mercer@example.com'
  );
  const [isSavingEmail, setIsSavingEmail] = useState<boolean>(false);

  const selectedMessage: RecruiterMessage | undefined = recruiterMessages.find(
    m => m.id === selectedMessageId
  ) || recruiterMessages[0];

  useEffect(() => {
    if (selectedMessage) {
      if (selectedMessage.candidateReplied && selectedMessage.candidateReplyText) {
        setReplyDraft(selectedMessage.candidateReplyText);
      } else if (selectedMessage.suggestedReply?.body) {
        setReplyDraft(selectedMessage.suggestedReply.body);
      }
    }
  }, [selectedMessage?.id]);

  const unreadCount = recruiterMessages.filter(m => !m.read).length;

  const handleSelectMessage = (msg: RecruiterMessage) => {
    setSelectedMessageId(msg.id);
    if (!msg.read) {
      markRecruiterMessageRead(msg.id);
    }
    if (msg.suggestedReply && !msg.candidateReplied) {
      setReplyDraft(msg.suggestedReply.body);
    } else if (msg.candidateReplyText) {
      setReplyDraft(msg.candidateReplyText);
    } else {
      setReplyDraft('');
    }
  };

  const handleSendReply = async () => {
    if (!selectedMessage) return;
    if (!replyDraft.trim()) {
      addToast('warning', 'Empty Reply', 'Please write a message before sending.');
      return;
    }
    await replyToRecruiterMessage(selectedMessage.id, replyDraft);
  };

  const handleSaveForwardEmail = async () => {
    setIsSavingEmail(true);
    try {
      await updatePreferences({
        forwardDestinationEmail: targetForwardEmail,
        instantEmailAlertOnRecruiterReply: true
      });
      addToast('success', 'Forwarding Target Saved', `All incoming company replies will be sent to ${targetForwardEmail}`);
    } finally {
      setIsSavingEmail(false);
    }
  };

  const handleTriggerSimulation = async (type: 'interview_invite' | 'assessment_link' | 'screening_call', compName: string) => {
    setIsSimulating(true);
    try {
      await simulateRecruiterReply({
        companyName: compName,
        messageType: type
      });
    } finally {
      setIsSimulating(false);
    }
  };

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-150">
      {/* Header & Forwarding Configuration Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 p-6 rounded-3xl border border-indigo-500/20 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
                <Mail className="w-5 h-5" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
                Recruiter Replies &amp; Forwarding Hub
              </h1>
              {unreadCount > 0 && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-500 text-white shadow-sm shadow-indigo-500/50 animate-pulse">
                  {unreadCount} New
                </span>
              )}
            </div>
            <p className="text-sm text-slate-400 mt-1">
              Real-time inbound responses from applied companies. Every recruiter reply is instantly delivered to your personal email with human-crafted response drafts.
            </p>
          </div>

          {/* Quick Simulation Trigger */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => handleTriggerSimulation('interview_invite', 'Anthropic Labs')}
              disabled={isSimulating}
              className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white text-xs font-semibold rounded-xl transition-all shadow-md shadow-indigo-600/20 flex items-center gap-1.5 disabled:opacity-50"
            >
              <Zap className="w-3.5 h-3.5 fill-white" />
              <span>Simulate Recruiter Reply</span>
            </button>
          </div>
        </div>

        {/* Email Forwarding Destination Card */}
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <Forward className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-200">Auto-Forward Destination:</span>
                <span className="font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-semibold">
                  {jobPreferences?.forwardDestinationEmail || userProfile?.email || 'alex.mercer@example.com'}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400">
                  <CheckCircle2 className="w-3 h-3" /> Active &amp; Verified
                </span>
              </div>
              <p className="text-slate-400 text-[11px] mt-0.5">
                Whenever any company replies to your applications, the full thread and assessment links are sent directly here immediately.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="email"
              value={targetForwardEmail}
              onChange={e => setTargetForwardEmail(e.target.value)}
              placeholder="Change forwarding email..."
              className="px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-slate-200 text-xs focus:outline-none focus:border-indigo-500 w-52"
            />
            <button
              onClick={handleSaveForwardEmail}
              disabled={isSavingEmail}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg border border-slate-700 transition-colors"
            >
              Update Target
            </button>
          </div>
        </div>
      </div>

      {/* Main Content: Split Master-Detail Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Messages List (4 cols) */}
        <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-lg">
          <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Inbound Messages ({recruiterMessages.length})
            </span>
            <span className="text-[11px] text-slate-400">Auto-Sorted by Recency</span>
          </div>

          <div className="divide-y divide-slate-800/60 max-h-[600px] overflow-y-auto">
            {recruiterMessages.length === 0 ? (
              <div className="p-10 text-center space-y-2">
                <MessageSquare className="w-8 h-8 text-slate-600 mx-auto" />
                <p className="text-sm font-medium text-slate-400">No recruiter replies yet</p>
                <p className="text-xs text-slate-400">Click &quot;Simulate Recruiter Reply&quot; above to test the auto-forward pipeline.</p>
              </div>
            ) : (
              recruiterMessages.map(msg => {
                const isSelected = selectedMessage?.id === msg.id;
                return (
                  <button
                    key={msg.id}
                    onClick={() => handleSelectMessage(msg)}
                    className={`w-full text-left p-4 transition-all hover:bg-slate-800/40 relative ${
                      isSelected ? 'bg-indigo-600/10 border-l-4 border-indigo-500' : ''
                    } ${!msg.read ? 'bg-indigo-950/20' : ''}`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-xs text-slate-300">
                          {msg.company.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-100 flex items-center gap-1.5">
                            {msg.company}
                            {!msg.read && (
                              <span className="w-2 h-2 rounded-full bg-indigo-500 inline-block" />
                            )}
                          </p>
                          <p className="text-[11px] text-slate-400 truncate max-w-[140px]">{msg.senderName}</p>
                        </div>
                      </div>

                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold border ${
                        msg.messageType === 'interview_invite'
                          ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20'
                          : msg.messageType === 'assessment_link'
                          ? 'bg-sky-500/10 text-sky-300 border-sky-500/20'
                          : 'bg-amber-500/10 text-amber-300 border-amber-500/20'
                      }`}>
                        {msg.messageType === 'interview_invite' ? 'Interview' : msg.messageType === 'assessment_link' ? 'Assessment' : 'Phone Screen'}
                      </span>
                    </div>

                    <p className="text-xs font-medium text-slate-200 mt-2.5 truncate">
                      {msg.subject}
                    </p>
                    <p className="text-[11px] text-slate-400 line-clamp-2 mt-0.5">
                      {msg.snippet}
                    </p>

                    <div className="mt-2.5 flex items-center justify-between text-[10px] text-slate-400">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        {new Date(msg.receivedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </span>
                      {msg.candidateReplied && (
                        <span className="text-emerald-400 font-medium flex items-center gap-0.5">
                          <Check className="w-3 h-3" /> Replied
                        </span>
                      )}
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Detailed Email & Instant Reply Composer (8 cols) */}
        {selectedMessage ? (
          <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
            {/* Top Bar: Company & Forward Delivery Confirmation */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-slate-100">{selectedMessage.subject}</h2>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Forwarded
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                  <span className="font-semibold text-slate-300">{selectedMessage.senderName}</span>
                  <span>&bull;</span>
                  <span>{selectedMessage.senderRole}</span>
                  <span>&bull;</span>
                  <span className="font-mono text-indigo-400">{selectedMessage.senderEmail}</span>
                </div>
              </div>

              {/* Forward Re-send & Direct Gmail button */}
              <div className="flex items-center gap-2 shrink-0 self-start sm:self-center">
                <a
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(targetForwardEmail)}&su=${encodeURIComponent(`[Recruiter Reply] ${selectedMessage.subject}`)}&body=${encodeURIComponent(`From: ${selectedMessage.senderName} <${selectedMessage.senderEmail}>\nCompany: ${selectedMessage.company}\nDate: ${new Date(selectedMessage.receivedAt).toLocaleString()}\n\nMessage:\n${selectedMessage.body}\n\n---\nSuggested Human Response:\n${selectedMessage.suggestedReply?.body || ''}`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl transition-all shadow-md shadow-indigo-600/20 flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open in Gmail</span>
                </a>

                <button
                  onClick={() => resendForwardRecruiterMessage(selectedMessage.id, targetForwardEmail)}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 transition-colors flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Re-send Forward</span>
                </button>
              </div>
            </div>

            {/* Inbound Email Body Display */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-850 space-y-3 font-sans text-xs text-slate-300 leading-relaxed whitespace-pre-line">
              <div className="text-[11px] text-slate-400 font-mono pb-2 border-b border-slate-850 flex items-center justify-between">
                <span>Delivered to: <strong className="text-slate-200">{selectedMessage.forwardedToUserEmail || targetForwardEmail}</strong></span>
                <span>{new Date(selectedMessage.receivedAt).toLocaleString()}</span>
              </div>
              <div>
                {selectedMessage.body}
              </div>
            </div>

            {/* Candidate Previous Response (if already replied) */}
            {selectedMessage.candidateReplied && selectedMessage.candidateReplyText && (
              <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-emerald-300 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Your Sent Response
                  </span>
                  <span className="text-[11px] text-slate-400">
                    {selectedMessage.candidateRepliedAt ? new Date(selectedMessage.candidateRepliedAt).toLocaleString() : 'Recently'}
                  </span>
                </div>
                <p className="text-xs text-slate-200 whitespace-pre-line leading-relaxed pl-2 border-l-2 border-emerald-500/50">
                  {selectedMessage.candidateReplyText}
                </p>
              </div>
            )}

            {/* AI Human-Tone Reply Composer */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-indigo-500/20 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wide">
                    Human-Tone Reply Composer (0% AI Slop)
                  </h3>
                </div>
                {selectedMessage.suggestedReply && (
                  <button
                    onClick={() => setReplyDraft(selectedMessage.suggestedReply!.body)}
                    className="text-xs text-indigo-400 hover:text-indigo-300 font-medium"
                  >
                    Reset to AI Suggestion
                  </button>
                )}
              </div>

              <textarea
                rows={5}
                value={replyDraft}
                onChange={e => setReplyDraft(e.target.value)}
                placeholder="Type your response to the recruiter or tweak the AI suggested draft..."
                className="w-full p-3.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-100 leading-relaxed focus:outline-none focus:border-indigo-500 transition-colors"
              />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[11px] text-slate-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Tone: Direct, warm, professional, and confident</span>
                </div>

                <button
                  onClick={handleSendReply}
                  className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-500/20 transition-all flex items-center gap-2 active:scale-95"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Response to Recruiter</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center text-slate-400">
            Select a recruiter message to view the forwarded email content and reply.
          </div>
        )}
      </div>
    </div>
  );
};
