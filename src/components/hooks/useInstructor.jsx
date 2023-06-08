import React from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useInstructor = () => {
    const { user, loading } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const { data: isInstructor, isLoading: isInstructorLoading } = useQuery(
        ["isInstructor", user?.email],
        async () => {
          const res = await axiosSecure.get(`/users/instructor/${user?.email}`);
          return res.data.admin;
        },
        {
          enabled: !!user?.email && !!localStorage.getItem("access-token") && !loading,
        }
      );
    
      return [isInstructor, isInstructorLoading];
};

export default useInstructor;