export type RemoteType = 'remote' | 'hybrid' | 'on-site';
export type JobType = 'full-time' | 'part-time' | 'contract' | 'internship';
export type ExperienceLevel = 'entry' | 'junior' | 'mid' | 'senior' | 'lead' | 'executive';

export interface EducationItem {
  id: string;
  institution?: string;
  school?: string;
  degree: string;
  fieldOfStudy?: string;
  field?: string;
  startDate?: string;
  endDate?: string;
  graduationDate?: string;
  gpa?: string;
  location?: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  position?: string;
  title?: string;
  location?: string;
  startDate: string;
  endDate?: string;
  isCurrent?: boolean;
  bulletPoints?: string[];
  bullets?: string[];
}

export interface ProjectItem {
  id: string;
  name?: string;
  title?: string;
  description: string;
  technologies?: string[];
  skills?: string[];
  link?: string;
  role?: string;
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  country: string;
  linkedinUrl: string;
  githubUrl: string;
  portfolioUrl: string;
  summary: string;
  targetJobTitles?: string[];
  skills: string[];
  education: EducationItem[];
  experience: ExperienceItem[];
  projects: ProjectItem[];
  certifications?: CertificationItem[];
  languages?: string[];
  workAuthorization?: string;
  requireSponsorship?: boolean;
  preferredSalaryMin?: number;
  currency?: string;
}

export interface JobPreferences {
  desiredJobTitles?: string[];
  jobTypes?: JobType[];
  locations?: string[];
  remotePreference?: RemoteType[];
  minimumSalary?: number;
  currency?: string;
  preferredIndustries?: string[];
  experienceLevel?: ExperienceLevel;
  autoSaveStrongMatches?: boolean;
  autoTailorResume?: boolean;
  autoGenerateCoverLetter?: boolean;
  requireApprovalBeforeApply?: boolean;
  defaultResumeTemplate?: 'modern' | 'ats' | 'classic' | 'minimal';
  // Autonomous Background Auto-Apply Engine Settings
  autoApplyEnabled?: boolean;
  autoApplyDailyTarget?: number; // e.g. 10 to 15 per day
  autoApplyMinMatchScore?: number; // e.g. 85%
  autoApplyPreferredPortals?: string[]; // ['greenhouse', 'lever', 'linkedin', 'direct']
  autoApplyNotifyEmail?: boolean;
  autoApplyHumanToneOnly?: boolean;
  lastAutonomousRun?: string;
  todayAppliedCount?: number;
}

export interface AutonomousApplyLog {
  id: string;
  timestamp: string;
  jobId: string;
  jobTitle: string;
  company: string;
  portal: string;
  matchScore: number;
  status: 'applied' | 'tailored_ready' | 'skipped_low_match' | 'skipped_duplicate';
  tailoredResumeTitle: string;
  coverLetterGenerated: boolean;
  humanToneScore: number;
  reason: string;
}

export interface ResumeVersion {
  id: string;
  userId?: string;
  title: string;
  targetRole?: string;
  targetJobTitle?: string;
  template?: 'modern' | 'ats' | 'classic' | 'minimal';
  summary: string;
  skills: string[];
  experience: ExperienceItem[];
  education: EducationItem[];
  projects: ProjectItem[];
  certifications?: CertificationItem[];
  isMaster?: boolean;
  isTailored?: boolean;
  tailoredForJobId?: string;
  tailoredForCompany?: string;
  atsScore?: number;
  truthfulGuarantee?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface JobListing {
  id: string;
  source: 'direct' | 'linkedin' | 'indeed' | 'greenhouse' | 'lever' | 'workday' | 'remoteco' | string;
  externalJobId?: string;
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  remoteType?: RemoteType;
  employmentType?: JobType;
  salaryMin?: number;
  salaryMax?: number;
  salary?: string;
  currency?: string;
  experienceLevel?: ExperienceLevel;
  requiredSkills: string[];
  preferredSkills?: string[];
  description: string;
  responsibilities?: string[];
  requirements?: string[];
  applicationUrl?: string;
  applyUrl?: string;
  postedAt?: string;
  isSuspicious?: boolean;
  suspiciousReason?: string;
  featured?: boolean;
  department?: string;
  matchScore?: number;
  analysis?: AIJobAnalysis;
}

export interface ScoreBreakdown {
  skillsScore: number; // weight: 40%
  experienceScore: number; // weight: 25%
  educationScore: number; // weight: 15%
  locationScore: number; // weight: 10%
  preferenceScore: number; // weight: 10%
}

export interface AIJobAnalysis {
  jobId: string;
  matchScore: number; // 0-100
  scoreBreakdown?: ScoreBreakdown;
  strengths?: string[];
  missingSkills?: string[];
  experienceMatch?: boolean;
  educationMatch?: boolean;
  recommendation?: 'Strong match' | 'Good match' | 'Moderate match' | 'Low match';
  summaryReason?: string;
  suggestedBulletPoints?: string[];
  keyKeywords?: string[];
}

export interface TailoredResumeResult {
  jobId: string;
  matchScore?: number;
  originalSummary: string;
  tailoredSummary: string;
  originalSkills: string[];
  tailoredSkills: string[];
  originalBullets: { experienceId: string; bullets: string[] }[];
  tailoredBullets: { experienceId: string; bullets: string[]; modifications: string[] }[];
  highlightedDifferences: {
    section: string;
    description: string;
    type: 'emphasis' | 'reordered' | 'ats_keyword' | 'reworded';
  }[];
  truthfulAuditNote: string;
  atsScoreProjected: number;
}

export interface CoverLetter {
  id: string;
  jobId?: string;
  jobTitle?: string;
  company?: string;
  tone?: 'professional' | 'formal' | 'concise' | 'enthusiastic';
  content?: string;
  body?: string;
  createdAt?: string;
}

export type ApplicationStatus =
  | 'saved'
  | 'preparing'
  | 'applied'
  | 'assessment'
  | 'interview'
  | 'offer'
  | 'rejected'
  | 'withdrawn';

export interface ApplicationAnswer {
  id: string;
  question: string;
  category: 'personal' | 'education' | 'experience' | 'skills' | 'work_auth' | 'availability' | 'salary' | 'free_text' | 'yes_no' | 'motivation' | 'technical';
  suggestedAnswer: string;
  userAnswer: string;
  status: 'suggested' | 'approved' | 'edited' | 'rejected';
  requiresManualReview?: boolean;
}

export interface ApplicationRecord {
  id: string;
  userId?: string;
  jobId?: string;
  job?: JobListing;
  company?: string;
  jobTitle?: string;
  jobUrl?: string;
  portalType?: string;
  resumeVersionId?: string;
  resumeTitle?: string;
  coverLetterId?: string;
  status: ApplicationStatus;
  appliedAt?: string;
  appliedDate?: string;
  matchScoreAtApply?: number;
  matchScore?: number;
  submissionMethod?: string;
  userConfirmed?: boolean;
  notes?: string;
  interviewDate?: string;
  followUpDate?: string;
  applicationAnswers?: ApplicationAnswer[];
  verifiedByUser?: boolean;
  history?: {
    status: ApplicationStatus;
    timestamp: string;
    note?: string;
  }[];
  createdAt?: string;
  updatedAt?: string;
}

export interface ReminderItem {
  id: string;
  type: 'interview' | 'follow_up' | 'deadline' | 'assessment' | 'prep';
  title: string;
  company: string;
  jobTitle?: string;
  dueDate: string;
  completed: boolean;
  applicationId?: string;
  note?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'match' | 'application' | 'reminder' | 'ai' | 'security';
  timestamp: string;
  read: boolean;
  link?: string;
}

export interface CareerInsight {
  topInDemandSkills?: { skill: string; demandGrowth: string; category?: string; userHas?: boolean }[];
  identifiedSkillGaps?: { skill: string; frequencyInTargetRoles: number; recommendation: string }[];
  skillGaps?: { skill: string; frequency: number; recommendation: string }[];
  strongestJobCategories?: { category: string; matchRate: number; applicationSuccessRate: number }[];
  recommendedProjects?: { title: string; skillsLearned?: string[]; targetSkills?: string[]; estimatedHours?: number; estimatedTime?: string; rationale: string }[];
  actionableImprovements?: string[];
  resumeImprovements?: string[];
}

export interface AuditLog {
  id: string;
  timestamp: string;
  action?: string;
  event?: string;
  details?: any;
  userConfirmed?: boolean;
  description?: string;
  ipAddress?: string;
  status?: 'success' | 'warning' | 'info';
}
