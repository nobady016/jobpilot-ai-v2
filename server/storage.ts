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
  ApplicationStatus
} from '../src/types';
import {
  INITIAL_USER_PROFILE,
  INITIAL_JOB_PREFERENCES,
  INITIAL_RESUME_VERSIONS,
  INITIAL_JOBS,
  INITIAL_APPLICATIONS,
  INITIAL_REMINDERS,
  INITIAL_NOTIFICATIONS,
  INITIAL_CAREER_INSIGHT,
  INITIAL_AUDIT_LOGS,
  PRECOMPUTED_ANALYSES
} from '../src/data/seedData';

class StorageDatabase {
  private userProfile: UserProfile = { ...INITIAL_USER_PROFILE };
  private jobPreferences: JobPreferences = { ...INITIAL_JOB_PREFERENCES };
  private resumes: ResumeVersion[] = [...INITIAL_RESUME_VERSIONS];
  private jobs: JobListing[] = [...INITIAL_JOBS];
  private applications: ApplicationRecord[] = [...INITIAL_APPLICATIONS];
  private reminders: ReminderItem[] = [...INITIAL_REMINDERS];
  private notifications: NotificationItem[] = [...INITIAL_NOTIFICATIONS];
  private careerInsight: CareerInsight = { ...INITIAL_CAREER_INSIGHT };
  private auditLogs: AuditLog[] = [...INITIAL_AUDIT_LOGS];
  private analysesCache: Map<string, AIJobAnalysis> = new Map(Object.entries(PRECOMPUTED_ANALYSES));
  private savedJobIds: Set<string> = new Set(['job_001', 'job_002', 'job_005']);

  // Profile Methods
  getProfile(): UserProfile {
    return this.userProfile;
  }

  updateProfile(updates: Partial<UserProfile>): UserProfile {
    this.userProfile = { ...this.userProfile, ...updates };
    this.addAuditLog('ai_generation', 'Updated master candidate profile information.', 'success');
    return this.userProfile;
  }

  // Preferences
  getPreferences(): JobPreferences {
    return this.jobPreferences;
  }

  updatePreferences(updates: Partial<JobPreferences>): JobPreferences {
    this.jobPreferences = { ...this.jobPreferences, ...updates };
    return this.jobPreferences;
  }

  // Resumes
  getResumes(): ResumeVersion[] {
    return this.resumes;
  }

  getResumeById(id: string): ResumeVersion | undefined {
    return this.resumes.find(r => r.id === id);
  }

  addResume(resume: ResumeVersion): ResumeVersion {
    this.resumes.unshift(resume);
    this.addAuditLog('resume_upload', `Created resume version: ${resume.title}`, 'success');
    return resume;
  }

  updateResume(id: string, updates: Partial<ResumeVersion>): ResumeVersion | null {
    const idx = this.resumes.findIndex(r => r.id === id);
    if (idx === -1) return null;
    this.resumes[idx] = { ...this.resumes[idx], ...updates, updatedAt: new Date().toISOString() };
    return this.resumes[idx];
  }

  deleteResume(id: string): boolean {
    const initialLen = this.resumes.length;
    this.resumes = this.resumes.filter(r => r.id !== id);
    return this.resumes.length < initialLen;
  }

  // Jobs
  getJobs(): JobListing[] {
    return this.jobs;
  }

  getJobById(id: string): JobListing | undefined {
    return this.jobs.find(j => j.id === id);
  }

  addJob(job: JobListing): JobListing {
    this.jobs.unshift(job);
    return job;
  }

  // Saved Jobs
  getSavedJobIds(): string[] {
    return Array.from(this.savedJobIds);
  }

  toggleSaveJob(jobId: string): boolean {
    if (this.savedJobIds.has(jobId)) {
      this.savedJobIds.delete(jobId);
      return false;
    } else {
      this.savedJobIds.add(jobId);
      return true;
    }
  }

  // Analyses Cache
  getCachedAnalysis(jobId: string): AIJobAnalysis | undefined {
    return this.analysesCache.get(jobId);
  }

  setCachedAnalysis(jobId: string, analysis: AIJobAnalysis) {
    this.analysesCache.set(jobId, analysis);
  }

  // Applications
  getApplications(): ApplicationRecord[] {
    return this.applications;
  }

  getApplicationById(id: string): ApplicationRecord | undefined {
    return this.applications.find(a => a.id === id);
  }

  checkDuplicateApplication(jobId: string, company: string, title: string): { isDuplicate: boolean; existingApp?: ApplicationRecord } {
    const existing = this.applications.find(
      a => a.jobId === jobId || ((a.company || a.job?.company || '').toLowerCase() === company.toLowerCase() && (a.jobTitle || a.job?.title || '').toLowerCase() === title.toLowerCase())
    );
    return { isDuplicate: !!existing, existingApp: existing };
  }

  createApplication(record: Omit<ApplicationRecord, 'id' | 'createdAt' | 'updatedAt' | 'history'>): ApplicationRecord {
    const id = `app_${Date.now()}`;
    const newRecord: ApplicationRecord = {
      ...record,
      id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      history: [
        {
          status: record.status,
          timestamp: new Date().toISOString(),
          note: `Application created in ${record.status} state.`
        }
      ]
    };
    this.applications.unshift(newRecord);
    this.addAuditLog('application_started', `Initiated application for ${record.jobTitle || record.job?.title || 'Job'} at ${record.company || record.job?.company || 'Company'}`, 'info');
    return newRecord;
  }

  updateApplicationStatus(id: string, status: ApplicationStatus, note?: string): ApplicationRecord | null {
    const app = this.applications.find(a => a.id === id);
    if (!app) return null;
    app.status = status;
    app.updatedAt = new Date().toISOString();
    if (!app.history) app.history = [];
    app.history.push({
      status,
      timestamp: new Date().toISOString(),
      note: note || `Status transitioned to ${status}`
    });
    this.addAuditLog('application_submitted', `Application for ${app.jobTitle || app.job?.title || 'Job'} status updated to ${status}`, 'success');
    return app;
  }

  updateApplication(id: string, updates: Partial<ApplicationRecord>): ApplicationRecord | null {
    const idx = this.applications.findIndex(a => a.id === id);
    if (idx === -1) return null;
    this.applications[idx] = { ...this.applications[idx], ...updates, updatedAt: new Date().toISOString() };
    return this.applications[idx];
  }

  deleteApplication(id: string): boolean {
    const initialLen = this.applications.length;
    this.applications = this.applications.filter(a => a.id !== id);
    return this.applications.length < initialLen;
  }

  // Reminders
  getReminders(): ReminderItem[] {
    return this.reminders;
  }

  addReminder(reminder: Omit<ReminderItem, 'id'>): ReminderItem {
    const newRem: ReminderItem = { ...reminder, id: `rem_${Date.now()}` };
    this.reminders.push(newRem);
    return newRem;
  }

  toggleReminderComplete(id: string): boolean {
    const rem = this.reminders.find(r => r.id === id);
    if (!rem) return false;
    rem.completed = !rem.completed;
    return rem.completed;
  }

  // Notifications
  getNotifications(): NotificationItem[] {
    return this.notifications;
  }

  markNotificationRead(id: string): boolean {
    const n = this.notifications.find(item => item.id === id);
    if (!n) return false;
    n.read = true;
    return true;
  }

  markAllNotificationsRead(): void {
    this.notifications.forEach(n => (n.read = true));
  }

  // Career Insights
  getCareerInsight(): CareerInsight {
    return this.careerInsight;
  }

  // Audit Logs
  getAuditLogs(): AuditLog[] {
    return this.auditLogs;
  }

  addAuditLog(event: AuditLog['event'], description: string, status: AuditLog['status'] = 'info') {
    const log: AuditLog = {
      id: `log_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toISOString(),
      event,
      description,
      status
    };
    this.auditLogs.unshift(log);
    if (this.auditLogs.length > 50) this.auditLogs.pop();
  }

  // Telemetry stats
  getDashboardStats() {
    const totalApps = this.applications.length;
    const interviews = this.applications.filter(a => a.status === 'interview').length;
    const offers = this.applications.filter(a => a.status === 'offer').length;
    const assessments = this.applications.filter(a => a.status === 'assessment').length;
    const activeApplied = this.applications.filter(a => ['applied', 'assessment', 'interview'].includes(a.status)).length;
    const savedJobsCount = this.savedJobIds.size;
    const strongMatchesCount = this.jobs.filter(j => {
      const a = this.analysesCache.get(j.id);
      return a ? a.matchScore >= 85 : false;
    }).length;

    const responseRate = totalApps > 0 ? Math.round(((interviews + assessments + offers) / totalApps) * 100) : 0;
    const interviewRate = totalApps > 0 ? Math.round((interviews / totalApps) * 100) : 0;

    return {
      totalApplications: totalApps,
      activeApplications: activeApplied,
      interviewsCount: interviews,
      offersCount: offers,
      savedJobsCount,
      strongMatchesCount,
      responseRate,
      interviewRate,
      averageMatchScore: 88,
      verifiedTruthScore: 100
    };
  }

  // Reset demo data
  resetToDemo() {
    this.userProfile = { ...INITIAL_USER_PROFILE };
    this.jobPreferences = { ...INITIAL_JOB_PREFERENCES };
    this.resumes = [...INITIAL_RESUME_VERSIONS];
    this.jobs = [...INITIAL_JOBS];
    this.applications = [...INITIAL_APPLICATIONS];
    this.reminders = [...INITIAL_REMINDERS];
    this.notifications = [...INITIAL_NOTIFICATIONS];
    this.careerInsight = { ...INITIAL_CAREER_INSIGHT };
    this.auditLogs = [...INITIAL_AUDIT_LOGS];
    this.savedJobIds = new Set(['job_001', 'job_002', 'job_005']);
  }
}

export const db = new StorageDatabase();
