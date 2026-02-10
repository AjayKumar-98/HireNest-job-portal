import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setError, setUser, setToken } from '../features/auth/authSlice';
import { authAPI } from '../features/auth/authAPI';
import type { UserRole } from '../features/auth/authTypes';
import type { AppDispatch, RootState } from '../app/store';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'candidate' as UserRole,
    });
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { loading, error } = useSelector((state: RootState) => state.auth);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        dispatch({ type: 'auth/setLoading', payload: true } as any);
        dispatch(setError(''));

        try {
            const response = await authAPI.signup(formData);

            // Extract user and token from response
            const userData = response.data?.user || response.user;
            const token = response.data?.token || response.token;

            if (!userData || !token) {
                throw new Error('Invalid response from server');
            }

            // Convert user to proper format
            const user = {
                id: userData.id || userData._id || '',
                email: userData.email,
                name: userData.name,
                role: userData.role,
            };

            // Store user and token in Redux
            dispatch(setUser(user));
            dispatch(setToken(token));

            // Show success message
            setSuccessMessage('Successfully signed up! Redirecting...');

            // Redirect to home after 2 seconds
            setTimeout(() => {
                navigate('/');
            }, 2000);
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || error.message || 'Signup failed';
            dispatch(setError(errorMessage));
        } finally {
            dispatch({ type: 'auth/setLoading', payload: false } as any);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="w-full max-w-md bg-white rounded-lg shadow p-8">
                <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

                {successMessage && (
                    <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
                        {successMessage}
                    </div>
                )}

                {error && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Role</label>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="candidate">Candidate</option>
                            <option value="recruiter">Recruiter</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400"
                    >
                        {loading ? 'Signing up...' : 'Sign Up'}
                    </button>
                </form>

                <p className="mt-4 text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <button
                        onClick={() => navigate('/login')}
                        className="text-blue-600 hover:underline"
                    >
                        Login
                    </button>
                </p>
            </div>
        </div>
    );
};


export default Signup;
