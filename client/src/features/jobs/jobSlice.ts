import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Job, JobListState } from './jobTypes';

const initialState: JobListState = {
    jobs: [],
    filteredJobs: [],
    loading: false,
    error: null,
    filters: {},
    currentPage: 1,
    totalPages: 0,
    totalJobs: 0,
};

const jobSlice = createSlice({
    name: 'jobs',
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
        setJobs: (state, action: PayloadAction<Job[]>) => {
            state.jobs = action.payload;
            state.filteredJobs = action.payload;
        },
        setFilteredJobs: (state, action: PayloadAction<Job[]>) => {
            state.filteredJobs = action.payload;
        },
        addJob: (state, action: PayloadAction<Job>) => {
            state.jobs.push(action.payload);
            state.filteredJobs.push(action.payload);
            state.totalJobs += 1;
        },
        updateJob: (state, action: PayloadAction<Job>) => {
            const index = state.jobs.findIndex((job) => job.id === action.payload.id);
            if (index !== -1) {
                state.jobs[index] = action.payload;
                // Update filtered jobs as well
                const filteredIndex = state.filteredJobs.findIndex(
                    (job) => job.id === action.payload.id
                );
                if (filteredIndex !== -1) {
                    state.filteredJobs[filteredIndex] = action.payload;
                }
            }
        },
        removeJob: (state, action: PayloadAction<string>) => {
            state.jobs = state.jobs.filter((job) => job.id !== action.payload);
            state.filteredJobs = state.filteredJobs.filter((job) => job.id !== action.payload);
            state.totalJobs -= 1;
        },
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        },
        setPagination: (
            state,
            action: PayloadAction<{ currentPage: number; totalPages: number; totalJobs: number }>
        ) => {
            state.currentPage = action.payload.currentPage;
            state.totalPages = action.payload.totalPages;
            state.totalJobs = action.payload.totalJobs;
        },
        clearError: (state) => {
            state.error = null;
        },
    },
});

export const {
    setLoading,
    setError,
    setJobs,
    setFilteredJobs,
    addJob,
    updateJob,
    removeJob,
    setCurrentPage,
    setPagination,
    clearError,
} = jobSlice.actions;

export default jobSlice.reducer;
