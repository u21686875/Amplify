// PrivateRoute.js
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../AuthContext/authContext';

class PrivateRoute extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { user, location, children } = this.props;

        if (!user) {
            // Redirect to splash page if not logged in, but save the attempted URL
            return <Navigate to="/" state={{ from: location }} replace />;
        }

        return children;
    }
}

// Wrapper function to use hooks with class component
function PrivateRouteWithHooks({ children }) {
    const { user } = useAuth();
    const location = useLocation();

    return <PrivateRoute user={user} location={location}>{children}</PrivateRoute>;
}

export default PrivateRouteWithHooks;