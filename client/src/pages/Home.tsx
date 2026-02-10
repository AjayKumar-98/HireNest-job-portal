import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../app/store';

const Home = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);
    const [searchQuery, setSearchQuery] = useState('');
    const [locationQuery, setLocationQuery] = useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (searchQuery) params.append('search', searchQuery);
        if (locationQuery) params.append('location', locationQuery);
        navigate(`/jobs?${params.toString()}`);
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12 md:py-20">
                <div className="max-w-6xl mx-auto px-4 md:px-8">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">HireNest</h1>
                        <p className="text-lg md:text-xl text-blue-100">
                            Find your dream job or hire top talent
                        </p>
                    </div>

                    {/* Search Form */}
                    <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
                        <div className="flex flex-col md:flex-row gap-3">
                            <input
                                type="text"
                                placeholder="Job title, keyword..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                            <input
                                type="text"
                                placeholder="City, location..."
                                value={locationQuery}
                                onChange={(e) => setLocationQuery(e.target.value)}
                                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                            <button
                                type="submit"
                                className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition"
                            >
                                Search
                            </button>
                        </div>
                    </form>
                </div>
            </section>

            {/* Quick Stats */}
            <section className="py-12 bg-gray-50">
                <div className="max-w-6xl mx-auto px-4 md:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-blue-600 mb-2">10K+</div>
                            <p className="text-gray-600">Active Jobs</p>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-blue-600 mb-2">5K+</div>
                            <p className="text-gray-600">Companies</p>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-blue-600 mb-2">50K+</div>
                            <p className="text-gray-600">Job Seekers</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action Sections */}
            <section className="py-16">
                <div className="max-w-6xl mx-auto px-4 md:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* For Job Seekers */}
                        <div className="bg-blue-50 rounded-lg p-8 border border-blue-200">
                            <h2 className="text-2xl font-bold text-gray-900 mb-3">For Job Seekers</h2>
                            <p className="text-gray-700 mb-6">
                                Explore thousands of job opportunities and find your perfect match.
                            </p>
                            <button
                                onClick={() => navigate('/jobs')}
                                className="w-full px-4 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                            >
                                Browse Jobs
                            </button>
                        </div>

                        {/* For Recruiters */}
                        <div className="bg-green-50 rounded-lg p-8 border border-green-200">
                            <h2 className="text-2xl font-bold text-gray-900 mb-3">For Recruiters</h2>
                            <p className="text-gray-700 mb-6">
                                Post jobs and hire the best talent for your company.
                            </p>
                            <button
                                onClick={() => navigate(isAuthenticated ? '/post-job' : '/signup')}
                                className="w-full px-4 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
                            >
                                Post a Job
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Authentication Prompt */}
            {!isAuthenticated && (
                <section className="bg-gray-900 text-white py-12">
                    <div className="max-w-6xl mx-auto px-4 md:px-8 text-center">
                        <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
                        <p className="text-gray-300 mb-8">
                            Join thousands of job seekers and employers on HireNest
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={() => navigate('/login')}
                                className="px-6 py-3 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition"
                            >
                                Login
                            </button>
                            <button
                                onClick={() => navigate('/signup')}
                                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                            >
                                Sign Up
                            </button>
                        </div>
                    </div>
                </section>
            )}

            {/* Footer */}
            <footer className="bg-gray-800 text-gray-400 py-8">
                <div className="max-w-6xl mx-auto px-4 md:px-8 text-center">
                    <p>&copy; 2026 HireNest. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Home;
