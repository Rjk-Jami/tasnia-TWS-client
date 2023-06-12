import React from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

const useSelectedClasses = () => {
    const { user } = useAuth()
    const [axiosSecure] = useAxiosSecure()
    const location = useLocation();
    const {  data: selectedClasses = [], refetch,} = useQuery(['users', user?.email], async () => {
        const res = await axiosSecure.get(`/selectedClasses/${user?.email}`);
        return res.data;
    });
    return [selectedClasses,refetch  ]
};

export default useSelectedClasses;