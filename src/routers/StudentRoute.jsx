import React from 'react';
import useAuth from '../components/hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';
import useStudent from '../components/hooks/useStudent';

const StudentRoute = ({children}) => {
    const {user, loading} = useAuth()
const  [isStudent, isStudentLoading] =useStudent()
        const location = useLocation();
    
        if(loading || isStudentLoading){
            return <progress className="progress w-full"></progress>
        }
        if(user && isStudent){
            return children
        }
        return <Navigate to="/" state={{ from: location }} replace />;
    
};

export default StudentRoute;