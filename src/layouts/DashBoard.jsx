import React from 'react';
import { FaHome } from 'react-icons/fa';
import { NavLink, Outlet } from 'react-router-dom';
import Navbar from '../pages/shared/Navbar/Navbar';
import useAdmin from '../components/hooks/useAdmin';
import useInstructor from '../components/hooks/useInstructor';
import { FcAddDatabase, FcBusinessman, FcDataRecovery, FcHome, FcOk, FcServices, FcSettings,  } from "react-icons/fc";
import Footer from '../pages/shared/Footer/Footer';

const DashBoard = () => {
  const [isAdmin, isAdminLoading] = useAdmin();
  const [isInstructor, isInstructorLoading] = useInstructor();

  return (
    <>
      <Navbar />
      <div className="drawer  lg:drawer-open ">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col  justify-center overflow-auto">
          <label htmlFor="my-drawer-2" className=" lg:hidden  text-center btn w-1/3 mx-auto">
            Dashboard Menu
          </label>
          <Outlet />
        </div>
        
        <div className="drawer-side ">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
            {isAdmin ? (
              <>
                <li>
                  <NavLink to="/dashboard/home">
                    <FcHome className="text-3xl text-neutral" />
                    Admin Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/manageUsers">
                    <FcSettings className="text-3xl text-neutral" />
                    Manage User
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/manageClasses">
                    <FcBusinessman className="text-3xl text-neutral" />
                    Manage Classes
                  </NavLink>
                </li>
              </>
            ) : isInstructor ? (
              <>
                <li>
                  <NavLink to="/dashboard/home">
                  <FcHome className="text-3xl text-neutral" />
                    Instructor Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/addAClass">
                    <FcAddDatabase className="text-3xl text-neutral" />
                    Add a Class
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/myClasses">
                    <FcServices className="text-3xl text-neutral" />
                    My Classes
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink to="/dashboard/home">
                  <FcHome className="text-3xl text-neutral" />
                    User Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/selectedClasses">
                    <FcDataRecovery className="text-3xl text-neutral" />
                    My Selected Classes
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/enrolledClasses">
                    <FcOk className="text-3xl text-neutral" />
                    My Enrolled Classes
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default DashBoard;
