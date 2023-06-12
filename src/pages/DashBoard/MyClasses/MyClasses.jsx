import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { FaRegSun } from 'react-icons/fa';
import useClass from '../../../components/hooks/useclass';
import useAxiosSecure from '../../../components/hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import TitleStyle from '../../../components/TitleStyle/TitleStyle';

const MyClasses = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const [classes, refetch] = useClass();
  console.log(classes);
  const [axiosSecure] = useAxiosSecure();
  const [updateItem, setUpdateItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State variable for modal visibility

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
  const handleUpdate = (item) => {
    setUpdateItem(item);
    setIsModalOpen(true); // Open the modal
  };

  const onSubmitUpdate = (data) => {
    data.seats = parseFloat(data.seats)
    data.price = parseFloat(data.price)
    
    console.log(data);

    axiosSecure.patch(`/updateClass/${updateItem?._id}`, data)
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();

          Swal.fire({
            position: 'top',
            icon: 'success',
            title: `updated`,
            showConfirmButton: false,
            timer: 1500,
          });

          setIsModalOpen(false); // Close the modal after successful update
        }
      });
  };
  return (
    <>
      <div>
        <Helmet>
          <title>Tasnia YMS | My Classes</title>
        </Helmet>
        <TitleStyle first={"My"} second={"Classes"}></TitleStyle>
        <div className="overflow-x-auto   ">
          <table className="table  text-center">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Total Enrolled Students</th>
                <th>Status</th>
                <th>Feedback</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className=''>
              {/* row 1 */}
              {classes.map((item, index) => (
                <tr key={item?._id}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={item?.image} alt="" />
                      </div>
                    </div>
                  </td>
                  <td className='text-left'>
                    {item?.name}
                    <br />
                    <span className="badge badge-ghost badge-sm ">Available seats: {item?.seats}</span>
                  </td>
                  <th>{item?.price}</th>
                  <th>{item?.TotalEnrolled}</th>
                  <td>
                    <div className="join join-vertical lg:join-horizontal">
                      {item.status === 'pending' && <button className="btn join-item btn-xs btn-secondary">pending</button>}
                      {item.status === 'approve' && <button className="btn join-item btn-xs btn-success">approve</button>}
                      {item.status === 'denied' && <button className="btn join-item btn-xs btn-error">denied</button>}
                    </div>
                  </td>
                  <th>{item?.status === 'denied' && <div>{item.feedback}</div>}</th>
                  <th>
                    <button onClick={() => handleUpdate(item)} className="btn btn-warning btn-xs"><FaRegSun></FaRegSun></button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <dialog id="my_modal_4" className={`modal ${isModalOpen ? 'modal-open' : ''} modal-middle`}>
          <form onSubmit={handleSubmit(onSubmitUpdate)}>
            <div className=" grid lg:grid-cols-4 grid-cols-1 gap-3 mx-3 w-full">
              <div className=" col-span-2">
                {/* name */}
                <div className="form-control w-full ">
                  <label className="label">
                    <span className="label-text font-semibold text-lg">Class name*</span>
                  </label>
                  <input defaultValue={updateItem?.name} type="text" placeholder="First name" className="input input-bordered w-full "  {...register("name", { required: true, maxLength: 80 })} />
                  {errors.name && <span className='text-red-600'>This field is required</span>}
                </div>
                {/* image */}
                <div className="form-control w-full ">
                  <label className="label">
                    <span className="label-text font-semibold text-lg">Class Image*</span>
                  </label>
                  <input defaultValue={updateItem?.image} type="text" placeholder="Image URL" className="input input-bordered w-full "  {...register("image", { required: true, })} />
                  {errors.image && <span className='text-red-600'>This field is required</span>}
                </div>
              </div>

              <div className="">
                <div className="form-control w-full ">
                  <label className="label">
                    <span className="label-text font-semibold text-lg">Available Seats*</span>
                  </label>
                  <input defaultValue={updateItem?.seats} type="text" placeholder="Available seats" className="input input-bordered w-full "  {...register("seats", { required: true, pattern: /^[0-9]*$/, })} />
                  {errors.seats && <span className='text-red-600'>This field is required</span>}
                  {errors.seats?.type === "pattern" && <span className='text-red-600'>This field is required a number</span>}
                </div>
                <div className="form-control w-full ">
                  <label className="label">
                    <span className="label-text font-semibold text-lg">Price*</span>
                  </label>
                  <input defaultValue={updateItem?.price} type="text" placeholder="Price" className="input input-bordered w-full "  {...register("price", { required: true, pattern: /^[0-9]*$/, })} />
                  {errors.price && <span className='text-red-600'>This field is required</span>}
                  {errors.price?.type === "pattern" && <span className='text-red-600'>This field is required a number</span>}
                </div>
              </div>
            </div>
            <div className=" text-left mx-3 my-3">
              <button type="submit" className="btn btn-secondary md:w-1/4 w-1/2" >Update</button>
            </div>
          </form>
        </dialog>
      
    </>
  );
};

export default MyClasses;
