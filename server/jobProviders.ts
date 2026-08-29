import { JobListing } from '../src/types';

export interface JobSearchFilters {
  query?: string;
  location?: string;
  remoteOnly?: boolean;
  minSalary?: number;
  experienceLevel?: string;
  source?: string;
}

export interface JobSourceProvider {
  sourceName: string;
  isAutomationSupported: boolean;
  searchJobs(filters: JobSearchFilters, allJobs: JobListing[]): Promise<JobListing[]>;
  getJobDetails(jobId: string, allJobs: JobListing[]): Promise<JobListing | null>;
  getApplicationUrl(job: JobListing): string;
}

export class GreenhouseJobProvider implements JobSourceProvider {
  sourceName = 'greenhouse';
  isAutomationSupported = true;

  async searchJobs(filters: JobSearchFilters, allJobs: JobListing[]): Promise<JobListing[]> {
    return allJobs.filter(j => j.source === 'greenhouse');
  }

  async getJobDetails(jobId: string, allJobs: JobListing[]): Promise<JobListing | null> {
    return allJobs.find(j => j.id === jobId && j.source === 'greenhouse') || null;
  }

  getApplicationUrl(job: JobListing): string {
    return job.applicationUrl;
  }
}

export class LeverJobProvider implements JobSourceProvider {
  sourceName = 'lever';
  isAutomationSupported = true;

  async searchJobs(filters: JobSearchFilters, allJobs: JobListing[]): Promise<JobListing[]> {
    return allJobs.filter(j => j.source === 'lever');
  }

  async getJobDetails(jobId: string, allJobs: JobListing[]): Promise<JobListing | null> {
    return allJobs.find(j => j.id === jobId && j.source === 'lever') || null;
  }

  getApplicationUrl(job: JobListing): string {
    return job.applicationUrl;
  }
}

export class WorkdayJobProvider implements JobSourceProvider {
  sourceName = 'workday';
  isAutomationSupported = false; // Workday uses assisted application mode with security checkpoints

  async searchJobs(filters: JobSearchFilters, allJobs: JobListing[]): Promise<JobListing[]> {
    return allJobs.filter(j => j.source === 'workday');
  }

  async getJobDetails(jobId: string, allJobs: JobListing[]): Promise<JobListing | null> {
    return allJobs.find(j => j.id === jobId && j.source === 'workday') || null;
  }

  getApplicationUrl(job: JobListing): string {
    return job.applicationUrl;
  }
}

export class DirectJobProvider implements JobSourceProvider {
  sourceName = 'direct';
  isAutomationSupported = true;

  async searchJobs(filters: JobSearchFilters, allJobs: JobListing[]): Promise<JobListing[]> {
    return allJobs.filter(j => j.source === 'direct');
  }

  async getJobDetails(jobId: string, allJobs: JobListing[]): Promise<JobListing | null> {
    return allJobs.find(j => j.id === jobId && j.source === 'direct') || null;
  }

  getApplicationUrl(job: JobListing): string {
    return job.applicationUrl;
  }
}

export class JobProviderManager {
  private providers: Map<string, JobSourceProvider> = new Map();

  constructor() {
    this.registerProvider(new GreenhouseJobProvider());
    this.registerProvider(new LeverJobProvider());
    this.registerProvider(new WorkdayJobProvider());
    this.registerProvider(new DirectJobProvider());
  }

  registerProvider(provider: JobSourceProvider) {
    this.providers.set(provider.sourceName, provider);
  }

  getProvider(sourceName: string): JobSourceProvider | undefined {
    return this.providers.get(sourceName);
  }

  async aggregateSearch(filters: JobSearchFilters, allJobs: JobListing[]): Promise<JobListing[]> {
    let results = [...allJobs];

    if (filters.query) {
      const q = filters.query.toLowerCase();
      results = results.filter(
        j =>
          j.title.toLowerCase().includes(q) ||
          j.company.toLowerCase().includes(q) ||
          j.requiredSkills.some(s => s.toLowerCase().includes(q)) ||
          j.description.toLowerCase().includes(q)
      );
    }

    if (filters.location) {
      const loc = filters.location.toLowerCase();
      results = results.filter(j => j.location.toLowerCase().includes(loc));
    }

    if (filters.remoteOnly) {
      results = results.filter(j => j.remoteType === 'remote');
    }

    if (filters.minSalary) {
      results = results.filter(j => (j.salaryMin || 0) >= (filters.minSalary || 0));
    }

    if (filters.experienceLevel && filters.experienceLevel !== 'all') {
      results = results.filter(j => j.experienceLevel === filters.experienceLevel);
    }

    if (filters.source && filters.source !== 'all') {
      results = results.filter(j => j.source === filters.source);
    }

    return results;
  }
}

export const jobProviderManager = new JobProviderManager();
