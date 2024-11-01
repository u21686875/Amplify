import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../AuthContext/authContext';

class PrivateRoute extends React.Component {
    render() {
        const { user, isLoading, location, children } = this.props;

        // Show loading state while checking session
        if (isLoading) {
            return (
                <div className="flex items-center justify-center h-screen">
                    <div className="animate-spin rounded-full h-8 w-8 border-2 border-green-500"></div>
                </div>
            );
        }

        if (!user) {
            // Redirect to auth page if not logged in
            return <Navigate to="/auth" state={{ from: location }} replace />;
        }

        return children;
    }
}

// Wrapper function to use hooks with class component
function PrivateRouteWithHooks({ children }) {
    const { user, isLoading } = useAuth();
    const location = useLocation();

    return (
        <PrivateRoute
            user={user}
            isLoading={isLoading}
            location={location}
        >
            {children}
        </PrivateRoute>
    );
}

export default PrivateRouteWithHooks;