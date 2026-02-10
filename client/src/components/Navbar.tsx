import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../app/store';
import { logout } from '../features/auth/authSlice';

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        dispatch(logout());
        setIsMenuOpen(false);
        navigate('/');
    };

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-4 md:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center">
                        <span className="text-2xl font-bold text-blue-600">HireNest</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link to="/" className="text-gray-700 hover:text-blue-600 transition">
                            Home
                        </Link>
                        <Link to="/jobs" className="text-gray-700 hover:text-blue-600 transition">
                            Jobs
                        </Link>

                        {isAuthenticated ? (
                            <div className="flex items-center gap-4 border-l border-gray-200 pl-8">
                                <div className="text-sm">
                                    <p className="text-gray-700 font-medium">{user?.name}</p>
                                    <p className="text-gray-500 text-xs capitalize">{user?.role}</p>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-4 border-l border-gray-200 pl-8">
                                <Link
                                    to="/login"
                                    className="text-gray-700 hover:text-blue-600 transition font-medium"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/signup"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden flex flex-col gap-1.5"
                    >
                        <span className={`h-0.5 w-6 bg-gray-900 transition ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                        <span className={`h-0.5 w-6 bg-gray-900 transition ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                        <span className={`h-0.5 w-6 bg-gray-900 transition ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden pb-4 border-t border-gray-200">
                        <Link
                            to="/"
                            onClick={() => setIsMenuOpen(false)}
                            className="block py-2 text-gray-700 hover:text-blue-600 transition"
                        >
                            Home
                        </Link>
                        <Link
                            to="/jobs"
                            onClick={() => setIsMenuOpen(false)}
                            className="block py-2 text-gray-700 hover:text-blue-600 transition"
                        >
                            Jobs
                        </Link>

                        {isAuthenticated ? (
                            <>
                                <div className="py-2 border-t border-gray-200 mt-2">
                                    <p className="text-gray-700 font-medium">{user?.name}</p>
                                    <p className="text-gray-500 text-sm capitalize">{user?.role}</p>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="w-full mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="block py-2 text-gray-700 hover:text-blue-600 transition border-t border-gray-200 mt-2"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/signup"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="block w-full mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-center"
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
