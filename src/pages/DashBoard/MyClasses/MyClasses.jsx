import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FaRegSun } from 'react-icons/fa';

const MyClasses = () => {
    return (
        <div>
            <Helmet>
                <title>Tasnia YMS | My Classes</title>
            </Helmet>
            <div className="overflow-x-auto w-full ">
                <table className="table w-full text-center">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>

                            </th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Total Enrolled Students</th>
                            <th>Status</th>
                            <th>Feedback</th>

                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className=''>
                        {/* row 1 */}
                        <tr>
                            <th>
                                {'1'}
                            </th>
                            <td>

                                <div className="avatar">
                                    <div className="mask mask-squircle w-12 h-12">
                                        <img src="/tailwind-css-component-profile-2@56w.png" alt="Avatar Tailwind CSS Component" />
                                    </div>
                                </div>


                            </td>
                            <td>
                                {'name'}
                                <br />
                                <span className="badge badge-ghost badge-sm">Available seats: {'seats'}</span>
                            </td>
                            <th>
                                {'0'}
                            </th>
                            <td>
                                <div className="join join-vertical lg:join-horizontal">
                                    <button className="btn join-item btn-xs btn-secondary">pending</button>
                                    <button className="btn join-item btn-xs btn-success">approve</button>
                                    <button className="btn join-item btn-xs btn-error">denied</button>
                                </div>
                            </td>
                            <th>
                                {'0'}
                            </th>

                            <th>
                                <button className="btn btn-warning btn-xs"><FaRegSun></FaRegSun></button>
                            </th>
                        </tr>

                    </tbody>



                </table>
            </div>
        </div>
    );
};

export default MyClasses;