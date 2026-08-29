import {
  UserProfile,
  JobPreferences,
  JobListing,
  ResumeVersion,
  ApplicationRecord,
  ReminderItem,
  NotificationItem,
  CareerInsight,
  AuditLog,
  AIJobAnalysis,
  TailoredResumeResult,
  CoverLetter,
  ApplicationStatus
} from '../types';

export const api = {
  // Profile
  getProfile: async (): Promise<UserProfile> => {
    const res = await fetch('/api/profile');
    if (!res.ok) throw new Error('Failed to fetch profile');
    return res.json();
  },

  updateProfile: async (data: Partial<UserProfile>): Promise<UserProfile> => {
    const res = await fetch('/api/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update profile');
    return res.json();
  },

  // Preferences
  getPreferences: async (): Promise<JobPreferences> => {
    const res = await fetch('/api/preferences');
    if (!res.ok) throw new Error('Failed to fetch preferences');
    return res.json();
  },

  updatePreferences: async (data: Partial<JobPreferences>): Promise<JobPreferences> => {
    const res = await fetch('/api/preferences', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update preferences');
    return res.json();
  },

  // Resumes
  getResumes: async (): Promise<ResumeVersion[]> => {
    const res = await fetch('/api/resumes');
    if (!res.ok) throw new Error('Failed to fetch resumes');
    return res.json();
  },

  saveResume: async (resume: Partial<ResumeVersion>): Promise<ResumeVersion> => {
    const res = await fetch('/api/resumes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(resume),
    });
    if (!res.ok) throw new Error('Failed to save resume');
    return res.json();
  },

  updateResume: async (id: string, updates: Partial<ResumeVersion>): Promise<ResumeVersion> => {
    const res = await fetch(`/api/resumes/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    if (!res.ok) throw new Error('Failed to update resume');
    return res.json();
  },

  deleteResume: async (id: string): Promise<boolean> => {
    const res = await fetch(`/api/resumes/${id}`, { method: 'DELETE' });
    return res.ok;
  },

  parseResumeText: async (text: string): Promise<any> => {
    const res = await fetch('/api/resume/parse', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });
    if (!res.ok) throw new Error('Failed to parse resume');
    return res.json();
  },

  tailorResume: async (jobId?: string, customJob?: any): Promise<TailoredResumeResult> => {
    const res = await fetch('/api/resume/tailor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jobId, customJob }),
    });
    if (!res.ok) throw new Error('Failed to tailor resume');
    return res.json();
  },

  generateCoverLetter: async (
    jobId?: string,
    tone: 'professional' | 'formal' | 'concise' | 'enthusiastic' = 'professional',
    customJob?: any
  ): Promise<CoverLetter> => {
    const res = await fetch('/api/cover-letter/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jobId, tone, customJob }),
    });
    if (!res.ok) throw new Error('Failed to generate cover letter');
    return res.json();
  },

  // Jobs
  getJobs: async (params?: Record<string, any>): Promise<(JobListing & { isSaved: boolean; matchScore: number })[]> => {
    const query = new URLSearchParams(params || {}).toString();
    const res = await fetch(`/api/jobs${query ? `?${query}` : ''}`);
    if (!res.ok) throw new Error('Failed to fetch jobs');
    return res.json();
  },

  getJobById: async (id: string): Promise<JobListing & { isSaved: boolean; analysis: AIJobAnalysis | null }> => {
    const res = await fetch(`/api/jobs/${id}`);
    if (!res.ok) throw new Error('Job not found');
    return res.json();
  },

  analyzeJob: async (jobId: string): Promise<AIJobAnalysis> => {
    const res = await fetch(`/api/jobs/${jobId}/analyze`, { method: 'POST' });
    if (!res.ok) throw new Error('Failed to analyze job');
    return res.json();
  },

  toggleSaveJob: async (jobId: string): Promise<{ isSaved: boolean }> => {
    const res = await fetch(`/api/jobs/${jobId}/save`, { method: 'POST' });
    if (!res.ok) throw new Error('Failed to save job');
    return res.json();
  },

  checkDuplicate: async (jobId: string, company: string, title: string): Promise<{ isDuplicate: boolean; existingApp?: ApplicationRecord }> => {
    const res = await fetch('/api/application/check-duplicate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jobId, company, title }),
    });
    if (!res.ok) throw new Error('Failed to check duplicates');
    return res.json();
  },

  suggestQuestionAnswer: async (question: string, category: string, jobId?: string): Promise<{ suggestedAnswer: string; confidence: string; requiresManualReview: boolean; reasoning: string }> => {
    const res = await fetch('/api/application/suggest-answers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, category, jobId }),
    });
    if (!res.ok) throw new Error('Failed to suggest answer');
    return res.json();
  },

  // Applications
  getApplications: async (): Promise<ApplicationRecord[]> => {
    const res = await fetch('/api/applications');
    if (!res.ok) throw new Error('Failed to fetch applications');
    return res.json();
  },

  createApplication: async (appData: any): Promise<ApplicationRecord> => {
    const res = await fetch('/api/applications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(appData),
    });
    if (!res.ok) throw new Error('Failed to create application');
    return res.json();
  },

  updateApplicationStatus: async (id: string, status: ApplicationStatus, note?: string): Promise<ApplicationRecord> => {
    const res = await fetch(`/api/applications/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, note }),
    });
    if (!res.ok) throw new Error('Failed to update application status');
    return res.json();
  },

  updateApplication: async (id: string, updates: Partial<ApplicationRecord>): Promise<ApplicationRecord> => {
    const res = await fetch(`/api/applications/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    if (!res.ok) throw new Error('Failed to update application');
    return res.json();
  },

  deleteApplication: async (id: string): Promise<boolean> => {
    const res = await fetch(`/api/applications/${id}`, { method: 'DELETE' });
    return res.ok;
  },

  // Reminders & Notifications
  getReminders: async (): Promise<ReminderItem[]> => {
    const res = await fetch('/api/reminders');
    return res.json();
  },

  addReminder: async (rem: Omit<ReminderItem, 'id'>): Promise<ReminderItem> => {
    const res = await fetch('/api/reminders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(rem),
    });
    return res.json();
  },

  toggleReminder: async (id: string): Promise<{ completed: boolean }> => {
    const res = await fetch(`/api/reminders/${id}/toggle`, { method: 'PATCH' });
    return res.json();
  },

  getNotifications: async (): Promise<NotificationItem[]> => {
    const res = await fetch('/api/notifications');
    return res.json();
  },

  markNotificationRead: async (id: string): Promise<void> => {
    await fetch(`/api/notifications/${id}/read`, { method: 'PATCH' });
  },

  markAllNotificationsRead: async (): Promise<void> => {
    await fetch('/api/notifications/read-all', { method: 'POST' });
  },

  // Insights & Stats
  getCareerInsights: async (): Promise<CareerInsight> => {
    const res = await fetch('/api/insights');
    return res.json();
  },

  getDashboardStats: async (): Promise<any> => {
    const res = await fetch('/api/dashboard/stats');
    return res.json();
  },

  getAuditLogs: async (): Promise<AuditLog[]> => {
    const res = await fetch('/api/audit-logs');
    return res.json();
  },

  exportData: async (): Promise<any> => {
    const res = await fetch('/api/export-data', { method: 'POST' });
    return res.json();
  },

  resetDemo: async (): Promise<void> => {
    await fetch('/api/reset-demo', { method: 'POST' });
  }
};
