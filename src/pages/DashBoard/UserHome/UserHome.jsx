import React from 'react';
import TitleStyle from '../../../components/TitleStyle/TitleStyle';
import { Helmet } from 'react-helmet-async';
import useAuth from '../../../components/hooks/useAuth';
import useAxiosSecure from '../../../components/hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const UserHome = () => {
   
    const {user, loading} = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const {data: userm = [], refetch} = useQuery({
        queryKey: ['userm' , user?.email],
        

        queryFn: async()=>{
            const res = await axiosSecure.get(`/user/${user?.email}`)
            return res.data;
        }
    })
    console.log(userm)

    return (
        <div>
            <Helmet>
                <title>Tasnia YMS | Dashboard Home</title>
            </Helmet>
            <TitleStyle first={"DashBoard"} second={"Home"}></TitleStyle>
            <div className="hero  ">
                <div className="hero-content flex-col lg:flex-row">
                    <img src={user?.photoURL} className="max-w-sm rounded-lg shadow-2xl" />
                    <div>
                        <h1 className="text-5xl font-bold">{user?.displayName}</h1>
                        <p className="py-6">Role : {userm?.role}</p>
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserHome;