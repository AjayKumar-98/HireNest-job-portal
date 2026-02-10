export type JobType = 'full-time' | 'part-time' | 'contract' | 'freelance' | 'internship';

export interface Job {
    id: string;
    title: string;
    company: string;
    location: string;
    experience: string; // e.g., "2-3 years", "Entry level"
    salary: {
        min: number;
        max: number;
        currency: string; // e.g., "USD", "INR"
    };
    skills: string[];
    jobType: JobType;
    description?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface JobFilters {
    title?: string;
    company?: string;
    location?: string;
    jobType?: JobType;
    minSalary?: number;
    maxSalary?: number;
    skills?: string[];
}

export interface JobListState {
    jobs: Job[];
    filteredJobs: Job[];
    loading: boolean;
    error: string | null;
    filters: JobFilters;
    currentPage: number;
    totalPages: number;
    totalJobs: number;
}

export interface JobDetailState {
    job: Job | null;
    loading: boolean;
    error: string | null;
}
