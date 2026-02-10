// User role type
export type UserRole = 'candidate' | 'recruiter';

// User type
export interface User {
    id: string;
    email: string;
    name: string;
    role: UserRole;
    createdAt?: string;
    updatedAt?: string;
}

// Auth request/response types
export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    user: User;
    token: string;
}

export interface SignupRequest {
    email: string;
    password: string;
    name: string;
    role: UserRole;
}

export interface SignupResponse {
    user: User;
    token: string;
}

// Auth state type
export interface AuthState {
    user: User | null;
    token: string | null;
    loading: boolean;
    error: string | null;
    isAuthenticated: boolean;
}
