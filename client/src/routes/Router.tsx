import { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { allRoutes } from './routeConfig';

const Router = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
                <Routes>
                    {allRoutes.map((route) => (
                        <Route
                            key={route.path}
                            path={route.path}
                            element={<route.element />}
                        />
                    ))}
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
};

export default Router;
