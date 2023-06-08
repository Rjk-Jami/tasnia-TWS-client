import React from 'react';
import useAuth from '../components/hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoutes = ({children}) => {
    const {user, loading} = useAuth()
    const location = useLocation();

    if(loading){
        return <progress className="progress w-full"></progress>
    }
    if(user){
        return children
    }
    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoutes;