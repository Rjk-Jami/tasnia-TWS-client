import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../components/hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../components/hooks/useAuth';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import TitleStyle from '../../../components/TitleStyle/TitleStyle';

const ManageClasses = () => {
    const [updateItem, setUpdateItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); 
    const { user } = useAuth()
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const [axiosSecure] = useAxiosSecure();
    const { data: classes = [], refetch } = useQuery({
        queryKey: ['classes'],


        queryFn: async () => {
            const res = await axiosSecure.get(`/manageClasses`)
            return res.data;
        }
    })
    console.log(classes)
   
    useEffect(() => {
        const handleKeyPress = (event) => {
          if (event.key === 'Escape') {
            setIsModalOpen(false); // Close the modal on "Esc" key press
          }
        };
    
        window.addEventListener('keydown', handleKeyPress);
    
        return () => {
          window.removeEventListener('keydown', handleKeyPress);
        };
      }, []);

    const handleClassApprove = (item) => {

        axiosSecure.patch(`/classes/approve/${item._id}`)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch()
                    Swal.fire({
                        position: 'top',
                        icon: 'success',
                        title: `class approve `,
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })

    }

    const handleClassDenied = (item) => {
        axiosSecure.patch(`/classes/denied/${item._id}`)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch()
                    Swal.fire({
                        position: 'top',
                        icon: 'success',
                        title: `class denied`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
    }
    const sendFeedback = (item) => {
        setUpdateItem(item);
        setIsModalOpen(true); // Open the modal
      };
      const onSubmitUpdate = (data) => {
        console.log(data);
        
        axiosSecure.patch(`/classes/feedback/${updateItem?._id}`, data)
          .then((res) => {
            if (res.data.modifiedCount) {
              refetch();
    
              Swal.fire({
                position: 'top',
                icon: 'success',
                title: `Feedback Send!`,
                showConfirmButton: false,
                timer: 1500,
              });
    
              setIsModalOpen(false); // Close the modal after successful update
            }
          });
      };
      

    return (
        <>
        <div className='overflow-x-auto w-full'>
            <Helmet>
                <title>Tasnia YMS | Manage Classes</title>
            </Helmet>
            <TitleStyle first={"Manage"} second={"Classes"}></TitleStyle>
            <div className="overflow-x-auto w-full  ">
                <table className="table  text-center ">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Quantity</th>
                            <th  className='p-0'>Total Enrolled Students</th>
                            <th>Status</th>
                            <th>Action</th>

                        </tr>
                    </thead>
                    <tbody className=''>
                        {/* row 1 */}
                        {classes.map((item, index) => (
                            <tr key={item?._id}>
                                <th><span className='text-xs'>{index + 1}</span></th>
                                <td>
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={item?.image} alt="" />
                                        </div>
                                    </div>
                                </td>
                                <td className=' text-left'>
                                    <p className='flex gap-2 text-xs'><span className='font-semibold'>Name: </span>{item?.name}</p>
                                    <br />
                                    <p className='flex gap-2 text-xs'><span className='font-semibold'>Instructor Name: </span> {item?.InstructorName}</p>
                                    <br />
                                    <p className='flex gap-2 text-xs'><span className='font-semibold'>Instructor Email: </span>{item?.InstructorEmail}</p>
                                </td>
                                <th  className='px-0'><span className="text-xs font-thin">Price: {item?.price}</span><br />
                                    <span className="text-xs font-thin">Available seats: {item?.seats}</span>
                                </th>
                                <th className='p-0'> <span className='text-xs'>{item?.TotalEnrolled}</span></th>
                                <td>
                                    <div className="join join-vertical lg:join-horizontal">
                                        {item.status === 'pending' && <button className="mx-0 btn join-item btn-xs btn-secondary">pending</button>}
                                        {item.status === 'approve' && <button className="mx-0 btn join-item btn-xs btn-success">approve</button>}
                                        {item.status === 'denied' && <button className= "mx-0 btn join-item btn-xs btn-error">denied</button>}
                                    </div>
                                </td>
                                <td >
                                    <div className="join mx-0 join-vertical lg:join-horizontal">

                                        <button onClick={() => handleClassApprove(item)} className="btn join-item btn-xs btn-success text-xs" disabled={item.status === 'approve' || item.status === 'denied'}>approve</button>
 
                                        <button onClick={() => handleClassDenied(item)} className="btn join-item btn-xs btn-error text-xs" disabled={item.status === 'approve' || item.status === 'denied'}>denied</button>
                                        <button onClick={() => sendFeedback(item)} className="btn join-item btn-xs btn-warning " >send feedback</button>
                                    </div>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    <dialog id="my_modal_4" className={`modal ${isModalOpen ? 'modal-open' : ''} modal-middle`}>
    <form onSubmit={handleSubmit(onSubmitUpdate)}>
      <div className="  mx-3 w-80">
          {/* name */}
          <div className="form-control  ">
            <label className="label">
              <span className="label-text font-semibold text-lg">Class name*</span>
            </label>
            <input type="text" placeholder="Feedback" className="input input-bordered w-full "  {...register("feedback", { required: true, maxLength: 80 })} />
            {errors.feedback && <span className='text-red-600'>This field is required</span>}
          </div>
      </div>
      <div className=" text-left mx-3 my-3">
        <button type="submit" className="btn btn-secondary md:w-1/4 w-1/2" >Send</button>
      </div>
    </form>
  </dialog>
  </>
    );
};

export default ManageClasses;