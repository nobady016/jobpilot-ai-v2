import React, { createContext, useContext, useState, useEffect } from 'react';
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
import { api } from '../services/apiClient';

export type AppView =
  | 'landing'
  | 'onboarding'
  | 'dashboard'
  | 'jobs'
  | 'job-detail'
  | 'resume-tailor'
  | 'resume-builder'
  | 'cover-letter'
  | 'application-assistant'
  | 'application-review'
  | 'applications-tracker'
  | 'analytics'
  | 'career-insights'
  | 'reminders'
  | 'extension-simulator'
  | 'admin'
  | 'settings';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message?: string;
}

interface AppContextType {
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  userProfile: UserProfile | null;
  jobPreferences: JobPreferences | null;
  resumes: ResumeVersion[];
  jobs: (JobListing & { isSaved: boolean; matchScore: number })[];
  applications: ApplicationRecord[];
  reminders: ReminderItem[];
  notifications: NotificationItem[];
  careerInsights: CareerInsight | null;
  auditLogs: AuditLog[];
  dashboardStats: any;
  loading: boolean;
  selectedJobId: string | null;
  setSelectedJobId: (id: string | null) => void;
  selectedJob: (JobListing & { isSaved?: boolean; matchScore?: number; analysis?: AIJobAnalysis | null }) | null;
  activeTailoredResume: TailoredResumeResult | null;
  setActiveTailoredResume: (res: TailoredResumeResult | null) => void;
  activeCoverLetter: CoverLetter | null;
  setActiveCoverLetter: (letter: CoverLetter | null) => void;
  isCommandPaletteOpen: boolean;
  setIsCommandPaletteOpen: (open: boolean) => void;
  toasts: ToastMessage[];
  addToast: (type: ToastMessage['type'], title: string, message?: string) => void;
  removeToast: (id: string) => void;
  refreshData: () => Promise<void>;
  updateProfile: (profile: Partial<UserProfile>) => Promise<void>;
  updatePreferences: (prefs: Partial<JobPreferences>) => Promise<void>;
  toggleSaveJob: (jobId: string) => Promise<void>;
  updateAppStatus: (appId: string, status: ApplicationStatus, note?: string) => Promise<void>;
  startApplicationForJob: (jobId: string) => Promise<void>;
  toggleReminder: (remId: string) => Promise<void>;
  markNotificationRead: (notifId: string) => Promise<void>;
  markAllNotificationsRead: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<AppView>('dashboard');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [jobPreferences, setJobPreferences] = useState<JobPreferences | null>(null);
  const [resumes, setResumes] = useState<ResumeVersion[]>([]);
  const [jobs, setJobs] = useState<(JobListing & { isSaved: boolean; matchScore: number })[]>([]);
  const [applications, setApplications] = useState<ApplicationRecord[]>([]);
  const [reminders, setReminders] = useState<ReminderItem[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [careerInsights, setCareerInsights] = useState<CareerInsight | null>(null);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [dashboardStats, setDashboardStats] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const [selectedJobId, setSelectedJobId] = useState<string | null>('job_001');
  const [activeTailoredResume, setActiveTailoredResume] = useState<TailoredResumeResult | null>(null);
  const [activeCoverLetter, setActiveCoverLetter] = useState<CoverLetter | null>(null);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: ToastMessage['type'], title: string, message?: string) => {
    const id = `toast_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    setToasts(prev => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const refreshData = async () => {
    try {
      setLoading(true);
      const [
        profile,
        prefs,
        resList,
        jobsList,
        appsList,
        remsList,
        notifsList,
        insights,
        stats,
        logs
      ] = await Promise.all([
        api.getProfile(),
        api.getPreferences(),
        api.getResumes(),
        api.getJobs(),
        api.getApplications(),
        api.getReminders(),
        api.getNotifications(),
        api.getCareerInsights(),
        api.getDashboardStats(),
        api.getAuditLogs()
      ]);

      setUserProfile(profile);
      setJobPreferences(prefs);
      setResumes(resList);
      setJobs(jobsList);
      setApplications(appsList);
      setReminders(remsList);
      setNotifications(notifsList);
      setCareerInsights(insights);
      setDashboardStats(stats);
      setAuditLogs(logs);
    } catch (err) {
      console.error('Failed to load JobPilot AI data:', err);
      addToast('error', 'Connection Error', 'Could not refresh data from server');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  // Keyboard shortcut for Command Palette (Cmd/Ctrl + K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const updateProfile = async (updates: Partial<UserProfile>) => {
    try {
      const updated = await api.updateProfile(updates);
      setUserProfile(updated);
      addToast('success', 'Profile Updated', 'Your candidate profile was saved securely.');
    } catch (err: any) {
      addToast('error', 'Update Failed', err.message);
    }
  };

  const updatePreferences = async (updates: Partial<JobPreferences>) => {
    try {
      const updated = await api.updatePreferences(updates);
      setJobPreferences(updated);
      addToast('success', 'Preferences Saved', 'Job search filters and automation settings updated.');
    } catch (err: any) {
      addToast('error', 'Update Failed', err.message);
    }
  };

  const toggleSaveJob = async (jobId: string) => {
    try {
      const res = await api.toggleSaveJob(jobId);
      setJobs(prev =>
        prev.map(j => (j.id === jobId ? { ...j, isSaved: res.isSaved } : j))
      );
      addToast(
        'info',
        res.isSaved ? 'Job Saved' : 'Job Removed',
        res.isSaved ? 'Added to your saved opportunities.' : 'Removed from saved jobs.'
      );
    } catch (err: any) {
      addToast('error', 'Action Failed', err.message);
    }
  };

  const updateAppStatus = async (appId: string, status: ApplicationStatus, note?: string) => {
    try {
      const updated = await api.updateApplicationStatus(appId, status, note);
      setApplications(prev => prev.map(a => (a.id === appId ? updated : a)));
      const stats = await api.getDashboardStats();
      setDashboardStats(stats);
      addToast('success', 'Status Updated', `Application moved to ${status.toUpperCase()}.`);
    } catch (err: any) {
      addToast('error', 'Status Update Failed', err.message);
    }
  };

  const startApplicationForJob = async (jobId: string) => {
    setSelectedJobId(jobId);
    const targetJob = jobs.find(j => j.id === jobId);
    if (targetJob) {
      // Check duplicate
      const dup = await api.checkDuplicate(jobId, targetJob.company, targetJob.title);
      if (dup.isDuplicate) {
        addToast('warning', 'Existing Application Detected', `You already have an application in status '${dup.existingApp?.status}'.`);
      }
    }
    setCurrentView('application-assistant');
  };

  const toggleReminder = async (remId: string) => {
    try {
      const res = await api.toggleReminder(remId);
      setReminders(prev =>
        prev.map(r => (r.id === remId ? { ...r, completed: res.completed } : r))
      );
    } catch (err: any) {
      addToast('error', 'Reminder Error', err.message);
    }
  };

  const markNotificationRead = async (notifId: string) => {
    await api.markNotificationRead(notifId);
    setNotifications(prev =>
      prev.map(n => (n.id === notifId ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsRead = async () => {
    await api.markAllNotificationsRead();
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    addToast('info', 'All notifications marked as read');
  };

  const selectedJob = selectedJobId ? jobs.find(j => j.id === selectedJobId) || null : null;

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        userProfile,
        jobPreferences,
        resumes,
        jobs,
        applications,
        reminders,
        notifications,
        careerInsights,
        auditLogs,
        dashboardStats,
        loading,
        selectedJobId,
        setSelectedJobId,
        selectedJob,
        activeTailoredResume,
        setActiveTailoredResume,
        activeCoverLetter,
        setActiveCoverLetter,
        isCommandPaletteOpen,
        setIsCommandPaletteOpen,
        toasts,
        addToast,
        removeToast,
        refreshData,
        updateProfile,
        updatePreferences,
        toggleSaveJob,
        updateAppStatus,
        startApplicationForJob,
        toggleReminder,
        markNotificationRead,
        markAllNotificationsRead,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
