import { useSelector } from 'react-redux';
import type { RootState } from '../app/store';
import type { User } from '../features/auth/authTypes';

interface UseAuthReturn {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
}

const useAuth = (): UseAuthReturn => {
    const auth = useSelector((state: RootState) => state.auth);

    return {
        user: auth.user,
        token: auth.token,
        isAuthenticated: auth.isAuthenticated,
        loading: auth.loading,
        error: auth.error,
    };
};

export default useAuth;
