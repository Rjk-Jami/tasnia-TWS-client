import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FaTrashAlt } from 'react-icons/fa';
import useAuth from '../../../components/hooks/useAuth';
import useAxiosSecure from '../../../components/hooks/useAxiosSecure';
import { Link, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Button, Fade } from '@mui/material';
import Swal from 'sweetalert2';
import { FcFullTrash, FcMoneyTransfer } from 'react-icons/fc';
import useSelectedClasses from '../../../components/hooks/useSelectedClasses';
import TitleStyle from '../../../components/TitleStyle/TitleStyle';

const SelectedClasses = () => {
    const { user } = useAuth()
    const [axiosSecure] = useAxiosSecure()
    const location = useLocation();
    const [selectedClasses,refetch  ] = useSelectedClasses()
    console.log(selectedClasses)
    const handleDelete = (selectedClass) => {

        axiosSecure.delete(`/selectedClasses/${selectedClass._id}`)
            .then(res => {
                if (res.data.deletedCount) {
                    refetch()
                    Swal.fire({
                        position: 'top',
                        icon: 'success',
                        title: `Deleted`,
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            })

    }

    const handlePay = (item)=>{


    }

    return (
        <div>

            <Helmet>
                <title>Tasnia YMS | Selected Classes</title>
            </Helmet>
            <TitleStyle first={"Selected"} second={"Classes"}></TitleStyle>
            <div className="overflow-x-auto w-full">
                <table className="table w-full text-center" >
                    {/* head */}
                    <thead>

                        <tr className=' animate__animated animate__fadeIn'>
                            <th></th>
                            <th>Image</th>
                            <th className='text-left'>Name</th>
                            <th>Price</th>
                            <th>Seats</th>
                            <th>Change Role</th>
                            <th>Action</th>
                        </tr>

                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {selectedClasses.map((selectedClass, index) => (
                            <tr key={selectedClass._id} className='border-none  animate__animated animate__backInDown'>
                                <th>{index + 1}</th>
                                <td>
                                    <div className="avatar">
                                        <div className="mask mask-hexagon-2 w-16 h-16">
                                            <img src={selectedClass?.image} alt="" />
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className='text-left'>
                                        <div className="font-semibold ">{selectedClass.name}</div>
                                        <div className="font-thin text-xs">Instructor :{selectedClass?.instructorName}</div>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <div className="font-normal">{selectedClass?.price}</div>
                                    </div>
                                </td>
                                <td>
                                    {
                                        selectedClass?.seats !== 0 ? <div className=" text-success font-bold">Available</div> : 0
                                    }
                                </td>
                                <th>
                                    <Link to={`/dashboard/payment/${selectedClass._id}`}><Button  variant="contained" color="warning">
                                       <span> Pay</span> <FcMoneyTransfer></FcMoneyTransfer>
                                    </Button></Link>
                                </th>
                                <th>
                                    <button onClick={() => handleDelete(selectedClass)} className="  ">
                                        <FcFullTrash className='text-3xl animate__animated animate__rollIn'></FcFullTrash>
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

export default SelectedClasses;