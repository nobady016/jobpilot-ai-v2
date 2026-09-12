import express, { Request, Response } from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { db } from './server/storage';
import { AIJobServices } from './server/aiServices';
import { jobProviderManager } from './server/jobProviders';
import { autoApplyEngine } from './server/autoApplyEngine';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true }));

  // ==========================================
  // API ROUTES
  // ==========================================

  // Health check
  app.get('/api/health', (req: Request, res: Response) => {
    res.json({ status: 'ok', service: 'JobPilot AI Server', timestamp: new Date().toISOString() });
  });

  // User Profile
  app.get('/api/profile', (req: Request, res: Response) => {
    res.json(db.getProfile());
  });

  app.put('/api/profile', (req: Request, res: Response) => {
    try {
      const updated = db.updateProfile(req.body);
      res.json(updated);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  });

  // Job Preferences
  app.get('/api/preferences', (req: Request, res: Response) => {
    res.json(db.getPreferences());
  });

  app.put('/api/preferences', (req: Request, res: Response) => {
    try {
      const updated = db.updatePreferences(req.body);
      res.json(updated);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  });

  // Resumes
  app.get('/api/resumes', (req: Request, res: Response) => {
    res.json(db.getResumes());
  });

  app.post('/api/resumes', (req: Request, res: Response) => {
    try {
      const newResume = db.addResume(req.body);
      res.status(201).json(newResume);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  });

  app.get('/api/resumes/:id', (req: Request, res: Response) => {
    const resume = db.getResumeById(req.params.id);
    if (!resume) return res.status(404).json({ error: 'Resume not found' });
    res.json(resume);
  });

  app.put('/api/resumes/:id', (req: Request, res: Response) => {
    const updated = db.updateResume(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'Resume not found' });
    res.json(updated);
  });

  app.delete('/api/resumes/:id', (req: Request, res: Response) => {
    const success = db.deleteResume(req.params.id);
    res.json({ success });
  });

  // AI Resume Parse
  app.post('/api/resume/parse', async (req: Request, res: Response) => {
    try {
      const { text } = req.body;
      if (!text || typeof text !== 'string') {
        return res.status(400).json({ error: 'Resume text is required' });
      }
      const parsed = await AIJobServices.parseResumeText(text);
      res.json(parsed);
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'Failed to parse resume' });
    }
  });

  // AI Resume Tailor
  app.post('/api/resume/tailor', async (req: Request, res: Response) => {
    try {
      const { jobId, customJob } = req.body;
      const userProfile = db.getProfile();
      let targetJob = customJob;

      if (!targetJob && jobId) {
        targetJob = db.getJobById(jobId);
      }

      if (!targetJob) {
        return res.status(404).json({ error: 'Job not found for tailoring' });
      }

      const tailoredResult = await AIJobServices.tailorResume(userProfile, targetJob);
      res.json(tailoredResult);
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'Failed to tailor resume' });
    }
  });

  // AI Cover Letter Generate
  app.post('/api/cover-letter/generate', async (req: Request, res: Response) => {
    try {
      const { jobId, tone = 'professional', customJob } = req.body;
      const userProfile = db.getProfile();
      let targetJob = customJob;

      if (!targetJob && jobId) {
        targetJob = db.getJobById(jobId);
      }

      if (!targetJob) {
        return res.status(404).json({ error: 'Job not found' });
      }

      const content = await AIJobServices.generateCoverLetter(userProfile, targetJob, tone);
      res.json({
        id: `cov_${Date.now()}`,
        jobId: targetJob.id,
        jobTitle: targetJob.title,
        company: targetJob.company,
        tone,
        content,
        createdAt: new Date().toISOString()
      });
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'Failed to generate cover letter' });
    }
  });

  // Jobs
  app.get('/api/jobs', async (req: Request, res: Response) => {
    const { query, location, remoteOnly, minSalary, experienceLevel, source } = req.query;
    const allJobs = db.getJobs();
    const filtered = await jobProviderManager.aggregateSearch(
      {
        query: query ? String(query) : undefined,
        location: location ? String(location) : undefined,
        remoteOnly: remoteOnly === 'true',
        minSalary: minSalary ? Number(minSalary) : undefined,
        experienceLevel: experienceLevel ? String(experienceLevel) : undefined,
        source: source ? String(source) : undefined
      },
      allJobs
    );

    const savedIds = db.getSavedJobIds();
    const enriched = filtered.map(job => {
      const cached = db.getCachedAnalysis(job.id);
      return {
        ...job,
        isSaved: savedIds.includes(job.id),
        matchScore: cached ? cached.matchScore : 85
      };
    });

    res.json(enriched);
  });

  app.get('/api/jobs/:id', (req: Request, res: Response) => {
    const job = db.getJobById(req.params.id);
    if (!job) return res.status(404).json({ error: 'Job not found' });
    const cachedAnalysis = db.getCachedAnalysis(job.id);
    const savedIds = db.getSavedJobIds();
    res.json({
      ...job,
      isSaved: savedIds.includes(job.id),
      analysis: cachedAnalysis || null
    });
  });

  // AI Job Match Analysis
  app.post('/api/jobs/:id/analyze', async (req: Request, res: Response) => {
    try {
      const job = db.getJobById(req.params.id);
      if (!job) return res.status(404).json({ error: 'Job not found' });

      const profile = db.getProfile();
      const analysis = await AIJobServices.analyzeJobMatch(
        {
          title: job.title,
          company: job.company,
          description: job.description,
          requiredSkills: job.requiredSkills,
          preferredSkills: job.preferredSkills,
          requirements: job.requirements,
          location: job.location
        },
        {
          skills: profile.skills,
          summary: profile.summary,
          experience: profile.experience,
          education: profile.education,
          city: profile.city,
          state: profile.state,
          targetJobTitles: profile.targetJobTitles
        }
      );

      db.setCachedAnalysis(job.id, analysis);
      res.json(analysis);
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'Failed to analyze job match' });
    }
  });

  // Save/Unsave Job
  app.post('/api/jobs/:id/save', (req: Request, res: Response) => {
    const isSaved = db.toggleSaveJob(req.params.id);
    res.json({ isSaved });
  });

  // Duplicate Check
  app.post('/api/application/check-duplicate', (req: Request, res: Response) => {
    const { jobId, company, title } = req.body;
    const result = db.checkDuplicateApplication(jobId, company, title);
    res.json(result);
  });

  // AI Application Question Suggestion
  app.post('/api/application/suggest-answers', async (req: Request, res: Response) => {
    try {
      const { question, category = 'general', jobId } = req.body;
      const profile = db.getProfile();
      const job = db.getJobById(jobId) || { title: 'Target Role', company: 'Target Company' };

      const suggestion = await AIJobServices.suggestQuestionAnswer(question, category, profile, job);
      res.json(suggestion);
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'Failed to suggest answer' });
    }
  });

  // Applications CRUD
  app.get('/api/applications', (req: Request, res: Response) => {
    res.json(db.getApplications());
  });

  app.post('/api/applications', (req: Request, res: Response) => {
    try {
      const created = db.createApplication(req.body);
      res.status(201).json(created);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  });

  app.get('/api/applications/:id', (req: Request, res: Response) => {
    const appRecord = db.getApplicationById(req.params.id);
    if (!appRecord) return res.status(404).json({ error: 'Application not found' });
    res.json(appRecord);
  });

  app.put('/api/applications/:id', (req: Request, res: Response) => {
    const updated = db.updateApplication(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'Application not found' });
    res.json(updated);
  });

  app.patch('/api/applications/:id/status', (req: Request, res: Response) => {
    const { status, note } = req.body;
    const updated = db.updateApplicationStatus(req.params.id, status, note);
    if (!updated) return res.status(404).json({ error: 'Application not found' });
    res.json(updated);
  });

  app.delete('/api/applications/:id', (req: Request, res: Response) => {
    const success = db.deleteApplication(req.params.id);
    res.json({ success });
  });

  // Reminders
  app.get('/api/reminders', (req: Request, res: Response) => {
    res.json(db.getReminders());
  });

  app.post('/api/reminders', (req: Request, res: Response) => {
    const created = db.addReminder(req.body);
    res.status(201).json(created);
  });

  app.patch('/api/reminders/:id/toggle', (req: Request, res: Response) => {
    const completed = db.toggleReminderComplete(req.params.id);
    res.json({ completed });
  });

  // Notifications
  app.get('/api/notifications', (req: Request, res: Response) => {
    res.json(db.getNotifications());
  });

  app.patch('/api/notifications/:id/read', (req: Request, res: Response) => {
    const success = db.markNotificationRead(req.params.id);
    res.json({ success });
  });

  app.post('/api/notifications/read-all', (req: Request, res: Response) => {
    db.markAllNotificationsRead();
    res.json({ success: true });
  });

  // Career Insights
  app.get('/api/insights', (req: Request, res: Response) => {
    res.json(db.getCareerInsight());
  });

  // Audit Logs
  app.get('/api/audit-logs', (req: Request, res: Response) => {
    res.json(db.getAuditLogs());
  });

  // Dashboard Stats
  app.get('/api/dashboard/stats', (req: Request, res: Response) => {
    res.json(db.getDashboardStats());
  });

  // Autonomous Auto-Apply Engine Routes
  app.get('/api/auto-apply/status', (req: Request, res: Response) => {
    const prefs = db.getPreferences();
    const logs = autoApplyEngine.getLogs();
    res.json({
      enabled: prefs.autoApplyEnabled ?? true,
      dailyTarget: prefs.autoApplyDailyTarget ?? 12,
      minMatchScore: prefs.autoApplyMinMatchScore ?? 85,
      preferredPortals: prefs.autoApplyPreferredPortals ?? ['greenhouse', 'lever', 'linkedin', 'direct'],
      lastAutonomousRun: prefs.lastAutonomousRun || new Date().toISOString(),
      todayAppliedCount: prefs.todayAppliedCount ?? 12,
      logs
    });
  });

  app.post('/api/auto-apply/run-batch', async (req: Request, res: Response) => {
    try {
      const { count } = req.body;
      const result = await autoApplyEngine.runAutonomousDailyBatch(count ? Number(count) : undefined);
      res.json(result);
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'Auto-Apply batch run failed' });
    }
  });

  // Export Data (JSON)
  app.post('/api/export-data', (req: Request, res: Response) => {
    const exportPayload = {
      exportedAt: new Date().toISOString(),
      profile: db.getProfile(),
      preferences: db.getPreferences(),
      resumes: db.getResumes(),
      applications: db.getApplications(),
      reminders: db.getReminders(),
      savedJobs: db.getSavedJobIds(),
      recruiterMessages: db.getRecruiterMessages(),
      auditLogs: db.getAuditLogs()
    };
    db.addAuditLog('export_data', 'Exported all user data in JSON format.', 'info');
    res.json(exportPayload);
  });

  // ==========================================
  // RECRUITER INBOUND REPLIES & EMAIL FORWARDING
  // ==========================================
  app.get('/api/recruiter-messages', (req: Request, res: Response) => {
    res.json(db.getRecruiterMessages());
  });

  app.post('/api/recruiter-messages/:id/read', (req: Request, res: Response) => {
    const ok = db.markRecruiterMessageRead(req.params.id);
    res.json({ success: ok });
  });

  app.post('/api/recruiter-messages/:id/reply', (req: Request, res: Response) => {
    const { replyText } = req.body;
    if (!replyText) return res.status(400).json({ error: 'Reply text is required' });
    const updated = db.replyToRecruiterMessage(req.params.id, replyText);
    if (!updated) return res.status(404).json({ error: 'Message not found' });
    res.json(updated);
  });

  app.post('/api/recruiter-messages/:id/resend-forward', (req: Request, res: Response) => {
    const { targetEmail } = req.body;
    const result = db.resendForwardRecruiterMessage(req.params.id, targetEmail);
    if (!result) return res.status(404).json({ error: 'Message not found' });
    res.json(result);
  });

  // Simulator to trigger realistic inbound company reply with auto-forward to user email
  app.post('/api/recruiter-messages/simulate-inbound', (req: Request, res: Response) => {
    const { companyName, messageType = 'interview_invite', customSubject, customBody } = req.body;
    const apps = db.getApplications();
    const targetApp = (companyName ? apps.find(a => a.company?.toLowerCase().includes(companyName.toLowerCase())) : null) || apps[0] || {
      id: 'app_sim_01',
      jobId: 'job_001',
      company: 'Linear Dynamics',
      jobTitle: 'Frontend UI Systems Engineer'
    };

    const comp = companyName || targetApp.company || 'Linear Dynamics';
    const title = targetApp.jobTitle || 'Frontend Engineer';
    const userProfile = db.getProfile();
    const destEmail = db.getPreferences().forwardDestinationEmail || userProfile.email || 'user@example.com';

    let subject = customSubject || `Interview Invitation: ${title} at ${comp}`;
    let snippet = `Hi ${userProfile.name}, our engineering team reviewed your recent application and would love to invite you for a 30-minute technical interview...`;
    let body = customBody || `Hi ${userProfile.name},

Thank you for your application for the ${title} position at ${comp}. 

Our team was very impressed by your background in React, TypeScript, and high-performance frontend architecture. We would love to arrange a 30-minute introductory video interview with our Senior Engineering Manager this week.

Please share your availability for a call over the next few days, or let us know if you have any questions!

Best regards,
Talent Acquisition Team
${comp}
careers@${comp.toLowerCase().replace(/\s+/g, '')}.io`;

    let type: any = messageType;
    let sentiment: any = 'positive';

    if (messageType === 'assessment_link') {
      subject = `Technical Assessment Link - ${title} (${comp})`;
      snippet = `Hi ${userProfile.name}, please complete the 45-minute coding assessment on HackerRank...`;
      body = `Hi ${userProfile.name},

Following your application for ${title} at ${comp}, please find below your unique link to complete our asynchronous technical assessment:

Assessment Link: https://assessment.${comp.toLowerCase().replace(/\s+/g, '')}.io/invite/alex98124

Please complete this within 5 business days.

Warm regards,
Recruiting Team at ${comp}`;
    } else if (messageType === 'screening_call') {
      subject = `Phone Screen Request: ${title} - ${comp}`;
      snippet = `Hi ${userProfile.name}, I'm the recruiter for the ${title} position. Let's set up a quick 15-minute call...`;
      body = `Hi ${userProfile.name},

I'd love to schedule a quick 15-minute recruiter phone screen to discuss your background and what you're looking for next.

Looking forward to connecting!

Best,
Recruiting Team at ${comp}`;
    }

    const createdMsg = db.addRecruiterMessage({
      applicationId: targetApp.id,
      jobId: targetApp.jobId,
      company: comp,
      jobTitle: title,
      senderName: `${comp} Talent Acquisition`,
      senderRole: 'Senior Recruiter',
      senderEmail: `recruiting@${comp.toLowerCase().replace(/\s+/g, '')}.io`,
      subject,
      snippet,
      body,
      messageType: type,
      sentiment,
      suggestedReply: {
        subject: `Re: ${subject}`,
        body: `Hi ${comp} Team,\n\nThank you for reaching out! I would be delighted to connect. I am available Wednesday between 10:00 AM - 3:00 PM PST or Thursday afternoon. Looking forward to speaking soon.\n\nBest regards,\n${userProfile.name}`,
        tone: 'professional'
      }
    });

    res.json({
      message: 'Inbound recruiter reply simulated and instantly forwarded to user email',
      forwardedTo: destEmail,
      data: createdMsg
    });
  });

  // Reset Demo
  app.post('/api/reset-demo', (req: Request, res: Response) => {
    db.resetToDemo();
    res.json({ success: true, message: 'Reset database to demo seed data.' });
  });

  // ==========================================
  // VITE MIDDLEWARE SETUP
  // ==========================================
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true, host: '0.0.0.0', port: 3000 },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`JobPilot AI Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
});
