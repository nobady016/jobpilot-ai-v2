import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { ToastContainer } from './components/layout/ToastContainer';
import { CommandPalette } from './components/layout/CommandPalette';

import { LandingPage } from './components/landing/LandingPage';
import { OnboardingWizard } from './components/onboarding/OnboardingWizard';
import { MainDashboard } from './components/dashboard/MainDashboard';
import { JobsExplorer } from './components/jobs/JobsExplorer';
import { JobDetailView } from './components/jobs/JobDetailView';
import { ResumeTailorView } from './components/resume/ResumeTailorView';
import { ResumeBuilderView } from './components/resume/ResumeBuilderView';
import { CoverLetterView } from './components/cover-letter/CoverLetterView';
import { ApplicationAssistantView } from './components/applications/ApplicationAssistantView';
import { ApplicationReviewView } from './components/applications/ApplicationReviewView';
import { ApplicationsTrackerView } from './components/applications/ApplicationsTrackerView';
import { AnalyticsView } from './components/analytics/AnalyticsView';
import { CareerInsightsView } from './components/insights/CareerInsightsView';
import { RemindersView } from './components/reminders/RemindersView';
import { ExtensionSimulatorView } from './components/extension/ExtensionSimulatorView';
import { AdminView } from './components/admin/AdminView';
import { SettingsView } from './components/settings/SettingsView';

const MainLayout: React.FC = () => {
  const { currentView, isLoading } = useApp();

  if (currentView === 'landing') {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
        <LandingPage />
        <ToastContainer />
      </div>
    );
  }

  if (currentView === 'onboarding') {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
        <OnboardingWizard />
        <ToastContainer />
      </div>
    );
  }

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <MainDashboard />;
      case 'jobs':
        return <JobsExplorer />;
      case 'job-detail':
        return <JobDetailView />;
      case 'resume-tailor':
        return <ResumeTailorView />;
      case 'resume-builder':
        return <ResumeBuilderView />;
      case 'cover-letter':
        return <CoverLetterView />;
      case 'application-assistant':
        return <ApplicationAssistantView />;
      case 'application-review':
        return <ApplicationReviewView />;
      case 'applications-tracker':
        return <ApplicationsTrackerView />;
      case 'analytics':
        return <AnalyticsView />;
      case 'insights':
        return <CareerInsightsView />;
      case 'reminders':
        return <RemindersView />;
      case 'extension-simulator':
        return <ExtensionSimulatorView />;
      case 'admin':
        return <AdminView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <MainDashboard />;
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header />

        <main className="flex-1 overflow-y-auto pb-12">
          {renderView()}
        </main>
      </div>

      <CommandPalette />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
