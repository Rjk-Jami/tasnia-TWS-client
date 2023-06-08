import React from 'react';
import useAxiosSecure from '../../../components/hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const ManageUsers = () => {
    const [axiosSecure] = useAxiosSecure()
    const { data: users = [], refetch } = useQuery(['users'], async () => {
        const  res = await axiosSecure.get("/users")
        return res.data;
    })
    console.log(users)
    return (
        <div>
            
        </div>
    );
};

export default ManageUsers;