import React from 'react';
import { Helmet } from 'react-helmet-async';
import useAuth from '../../../components/hooks/useAuth';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../../components/hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import TitleStyle from '../../../components/TitleStyle/TitleStyle';

const AddAClass = () => {
    const { user } = useAuth()
    const [axiosSecure] = useAxiosSecure()

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = data => {
        // console.log(data)
        const { image, price, seats, name } = data
        const newClass = {
            name,
            image,
            price: parseFloat(price),
            seats: parseFloat(seats),

        }
        newClass.InstructorName = user?.displayName;
        newClass.InstructorEmail = user?.email;
        newClass.status = 'pending'
        newClass.TotalEnrolled = 0;
        newClass.TotalEnrolled = parseFloat(newClass.TotalEnrolled)
        console.log(newClass)
        axiosSecure.post('/classes', newClass)
            .then(res => {
                if (res.data.insertedId) {
                    reset();
                    Swal.fire({
                        position: 'top',
                        icon: 'success',
                        title: 'class added successfully',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })

    }

    return (
        <div>
            <Helmet>
                <title>Tasnia YMS | Add a Class</title>
            </Helmet>
            <TitleStyle first={"Add a"} second={"Class"}></TitleStyle>
            <div className=" w-2/3 mx-auto">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className=" grid grid-cols-2 gap-3 mx-3">
                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text font-semibold text-lg">Class name*</span>
                            </label>
                            <input type="text" placeholder="First name" className="input input-bordered w-full "  {...register("name", { required: true, maxLength: 80 })} />
                            {errors.name && <span className='text-red-600'>This field is required</span>}

                        </div>
                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text font-semibold text-lg">Class Image*</span>
                            </label>
                            <input type="text" placeholder="Image URL" className="input input-bordered w-full "  {...register("image", { required: true, })} />
                            {errors.image && <span className='text-red-600'>This field is required</span>}

                        </div>
                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text font-semibold text-lg">Available Seats*</span>
                            </label>
                            <input type="text" placeholder="Available seats" className="input input-bordered w-full "  {...register("seats", { required: true, pattern: /^[0-9]*$/, })} />
                            {errors.seats && <span className='text-red-600'>This field is required</span>}
                            {errors.seats?.type === "pattern" && <span className='text-red-600'>This field is required a number</span>}
                        </div>
                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text font-semibold text-lg">Price*</span>
                            </label>
                            <input type="text" placeholder="Price" className="input input-bordered w-full "  {...register("price", { required: true, pattern: /^[0-9]*$/, })} />
                            {errors.price && <span className='text-red-600'>This field is required</span>}
                            {errors.price?.type === "pattern" && <span className='text-red-600'>This field is required a number</span>}

                        </div>
                    </div>
                    <div className=" text-center my-3">
                        <input type="submit" className="btn btn-secondary md:w-1/4 w-1/2" value="Add Class" />


                    </div>

                </form>
            </div>



        </div>
    );
};

export default AddAClass;