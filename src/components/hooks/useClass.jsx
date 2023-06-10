import React from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useClass = () => {
   
    const {user, loading} = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const {data: classes = [], refetch} = useQuery({
        queryKey: ['classes' , user?.email],
        

        queryFn: async()=>{
            const res = await axiosSecure.get(`/classes?email=${user?.email}`)
            return res.data;
        }
    })
    return [classes, refetch];
};

export default useClass;