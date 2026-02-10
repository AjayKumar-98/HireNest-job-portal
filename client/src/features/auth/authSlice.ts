import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { AuthState, User } from './authTypes';

const initialState: AuthState = {
    user: null,
    token: localStorage.getItem('authToken') || null,
    loading: false,
    error: null,
    isAuthenticated: !!localStorage.getItem('authToken'),
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.error = null;
            localStorage.removeItem('authToken');
        },
        clearError: (state) => {
            state.error = null;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
            localStorage.setItem('authToken', action.payload);
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
    },
});

export const { logout, clearError, setLoading, setUser, setToken, setError } = authSlice.actions;
export default authSlice.reducer;
