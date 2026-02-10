import { lazy } from 'react';

// Lazy load page components
const Home = lazy(() => import('../pages/Home'));
const Login = lazy(() => import('../pages/Login'));
const Signup = lazy(() => import('../pages/Signup'));

export const publicRoutes = [
    {
        path: '/',
        element: Home,
        label: 'Home',
    },
    {
        path: '/login',
        element: Login,
        label: 'Login',
    },
    {
        path: '/signup',
        element: Signup,
        label: 'Signup',
    },
];

export const allRoutes = [...publicRoutes];
