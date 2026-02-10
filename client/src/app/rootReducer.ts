import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import jobReducer from '../features/jobs/jobSlice';

// Placeholder reducers - replace with actual slice reducers
// import userReducer from '../features/user/userSlice';

const rootReducer = combineReducers({
    auth: authReducer,
    jobs: jobReducer,
    // user: userReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
