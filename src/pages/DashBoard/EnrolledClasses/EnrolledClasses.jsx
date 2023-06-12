import React from 'react';
import { Helmet } from 'react-helmet-async';
import useAuth from '../../../components/hooks/useAuth';
import useAxiosSecure from '../../../components/hooks/useAxiosSecure';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import TitleStyle from '../../../components/TitleStyle/TitleStyle';

const EnrolledClasses = () => {
    const { user } = useAuth()
    const [axiosSecure] = useAxiosSecure()
    const location = useLocation();
    const {  data: enrolledClass = [], refetch,} = useQuery(['classes', user?.email], async () => {
        const res = await axiosSecure.get(`/enrolledClass/${user?.email}`);
        return res.data;
    });
    return (<>
        <Helmet>
                <title>Tasnia YMS | Enrolled Classes</title>
            </Helmet>
            <TitleStyle first={"Enrolled"} second={"Classes"}></TitleStyle>

            <div className="overflow-x-auto w-full">
                <table className="table w-full text-center" >
                    {/* head */}
                    <thead>

                        <tr className=' animate__animated animate__fadeIn'>
                            <th></th>
                            <th>Image</th>
                            <th className='text-left'>Name</th>
                            <th>Price</th>
                            
                            
                        </tr>

                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {enrolledClass.map((selectedClass, index) => (
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
                               
                                
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        
        </>
    );
};

export default EnrolledClasses;