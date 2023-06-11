import React from 'react';
import useAuth from '../components/hooks/useAuth';
import useInstructor from '../components/hooks/useInstructor';
import { Navigate, useLocation } from 'react-router-dom';

const InstructorRoutes = ({children}) => {
   
        const {user, loading} = useAuth()
        const [isInstructor, isInstructorLoading] = useInstructor()
        const location = useLocation();
    
        if(loading || isInstructorLoading){
            return <progress className="progress w-full"></progress>
        }
        if(user && isInstructor){
            return children
        }
        return <Navigate to="/" state={{ from: location }} replace />;
    
};

export default InstructorRoutes;