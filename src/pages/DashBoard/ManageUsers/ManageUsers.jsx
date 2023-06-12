import React from 'react';
import useAxiosSecure from '../../../components/hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { FaTrashAlt, FaUserCog, FaUserFriends } from 'react-icons/fa';
import axios from 'axios';
import Swal from 'sweetalert2';
import TitleStyle from '../../../components/TitleStyle/TitleStyle';

const ManageUsers = () => {
  const [axiosSecure] = useAxiosSecure();
  const { data: users = [ ], refetch } = useQuery({
    queryKey:['users'], 
    queryFn: async () => {
    const res = await axiosSecure.get('/users');
    return res.data;  
  }
    
  });
  console.log(users);

  const handleDelete = (user) => {
    // Handle delete logic here
    console.log('delete');
  };

  const handleMakeAdmin = async (id) => {
    axios.patch(`https://tasnia-yoga-and-meditation-school-server.vercel.app/users/admin/${id}`)
        .then(res=>{
            if(res.data.modifiedCount){
                refetch()
                Swal.fire({
                    position: 'top',
                    icon: 'success',
                    title: `Make Admin`,
                    showConfirmButton: false,
                    timer: 1500
                  })
            }
        })
    
     
     
  }
  

  const handleMakeInstructor = async (id) => {
        axios.patch(`https://tasnia-yoga-and-meditation-school-server.vercel.app/users/instructor/${id}`)
        .then(res=>{
            if(res.data.modifiedCount){
                refetch()
                Swal.fire({
                    position: 'top',
                    icon: 'success',
                    title: `Make instructor`,
                    showConfirmButton: false,
                    timer: 1500
                  })
            }
        })
  };

  return (
    <div>
      <Helmet>
        <title>Tasnia YMS | Manage Users</title>
      </Helmet>
      <TitleStyle first={"Manage"} second={"Users"}></TitleStyle>
      <div>
        <p className=" font-semibold badge badge-lg bg-warning">Total Users: {users.length}</p>
      </div>
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              {/* <th>Image</th> */}
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Change Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {users && users.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>
                  <div>
                    <div className="font-semibold">{user.name}</div>
                  </div>
                </td>
                <td>
                  <div>
                    <div className="font-normal">{user.email}</div>
                  </div>
                </td>
                <td>
                <div className=" text-success font-bold">{user.role}</div> 
                </td>
                <th>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleMakeInstructor(user._id)}
                      className="btn btn-xs"
                      disabled={user.role === 'instructor'}
                    >
                      Instructor
                    </button>
                    <button
                      onClick={() => handleMakeAdmin(user._id)}
                      className="btn btn-xs"
                      disabled={user.role === 'admin' }
                    >
                      Admin
                    </button>
                  </div>
                </th>
                <th>
                  <button onClick={() => handleDelete(user)} className="btn btn-error">
                    <FaTrashAlt className="text-xl text-white" />
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
