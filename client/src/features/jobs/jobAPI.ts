import axios from 'axios';
import type { Job, JobFilters } from './jobTypes';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add token to requests
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

interface GetJobsResponse {
    jobs: Job[];
    currentPage: number;
    totalPages: number;
    totalJobs: number;
}

interface GetJobByIdResponse {
    job: Job;
}

export const jobAPI = {
    /**
     * Get all jobs with optional filters and pagination
     */
    getJobs: async (
        filters?: JobFilters,
        page: number = 1,
        limit: number = 10
    ): Promise<GetJobsResponse> => {
        try {
            const response = await apiClient.get<GetJobsResponse>('/jobs', {
                params: {
                    ...filters,
                    page,
                    limit,
                },
            });
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Failed to fetch jobs');
        }
    },

    /**
     * Get a single job by ID
     */
    getJobById: async (jobId: string): Promise<GetJobByIdResponse> => {
        try {
            const response = await apiClient.get<GetJobByIdResponse>(`/jobs/${jobId}`);
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Failed to fetch job details');
        }
    },

    /**
     * Create a new job (recruiter only)
     */
    createJob: async (jobData: Omit<Job, 'id' | 'createdAt' | 'updatedAt'>) => {
        try {
            const response = await apiClient.post('/jobs', jobData);
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Failed to create job');
        }
    },

    /**
     * Update a job (recruiter only)
     */
    updateJob: async (jobId: string, jobData: Partial<Job>) => {
        try {
            const response = await apiClient.put(`/jobs/${jobId}`, jobData);
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Failed to update job');
        }
    },

    /**
     * Delete a job (recruiter only)
     */
    deleteJob: async (jobId: string): Promise<void> => {
        try {
            await apiClient.delete(`/jobs/${jobId}`);
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Failed to delete job');
        }
    },
};
