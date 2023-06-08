import React, { useEffect, useState } from 'react';
import { FaHome } from 'react-icons/fa';
import { NavLink, Outlet } from 'react-router-dom';
import Navbar from '../pages/shared/Navbar/Navbar';
import useAdmin from '../components/hooks/useAdmin';

const DashBoard = () => {
    const [isAdmin, isAdminLoading] = useAdmin()
    
    // const admin = true;
        // Reload the page when the component mounts
   
    if (isAdminLoading) {
        
        return <p>Loading...</p>;
    }
    return (
        <>
            <Navbar></Navbar>
            <div className="drawer drawer-end lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center justify-center">
                  
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden my-4">Menu</label>
                    <Outlet></Outlet>
                </div>
                <div className="drawer-side ">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
                        {
                            isAdmin ?
                                <>
                                    <li><NavLink to='/dashboard/adminhome'><FaHome className="text-3xl text-neutral"></FaHome>Admin Home</NavLink></li>
                                    <li><NavLink to='/dashboard/manageUsers'><FaHome className="text-3xl text-neutral"></FaHome>Manage User</NavLink></li>
                                    <li><NavLink to='/dashboard/manageClasses'><FaHome className="text-3xl text-neutral"></FaHome>Manage Classes</NavLink></li>
                                    
                                </>
                                :
                                <>
                                <li><NavLink to='/dashboard/userhome'><FaHome className="text-3xl text-neutral"></FaHome>User Home</NavLink></li>
                                <li><NavLink to='/dashboard/selectedClasses'><FaHome className="text-3xl text-neutral"></FaHome>My Selected Classes</NavLink></li>
                                <li><NavLink to='/dashboard/enrolledClasses'><FaHome className="text-3xl text-neutral"></FaHome>My Enrolled Classes</NavLink></li>


                                </>
                        }
                    </ul>

                </div>
            </div>

        </>
    );
};

export default DashBoard;
