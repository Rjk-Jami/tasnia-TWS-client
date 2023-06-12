import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../components/hooks/useAuth';
import axios from 'axios';
import Swal from 'sweetalert2';

const SignUp = () => {
    const navigate = useNavigate();
    const location = useLocation();
    // console.log(location)
    const from = location.state?.from?.pathname || "/";
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
    const { user, createUser, updateUserProfile } = useAuth()
    const [error, setError] = useState('')  


    const onSubmit = data => {
        console.log(data)
        createUser(data.email, data.password)
        .then(result => {
            const loggedUser = result.user
            console.log(loggedUser)

            updateUserProfile(data.name, data.photo)
            .then(res=>{
                    axios.post('https://tasnia-yoga-and-meditation-school-server.vercel.app/users',{name: data.name, email:data.email, photo:data.photo, gender:data.gender,
                    address:data.address, phoneNumber:data.phoneNumber })
                    .then(res=> {
                        console.log(res.data)
                        if(res.data.insertedId){
                            reset();
                            Swal.fire({
                                position: 'top',
                                icon: 'success',
                                title: 'Successfully create a account',
                                showConfirmButton: false,
                                timer: 1500
                                
                            })
                            navigate(from, { replace: true });
                        }
                      
                    })
                

            }

            )
            .catch(error=>{
                console.log(error.message)
                setError(error.message)
            })
            setError("")
        })
        .catch(error => {
            console.log(error)
            setError(error.message)
        }) 
    }
    const password = watch("password");

    return (
        <div>
            <Helmet>
                <title>Tasnia YMS | SignUp</title>
            </Helmet>
            <div className="hero min-h-screen bg-base-200 ">
                <div className="hero-content  flex flex-col lg:flex-row gap-3 my-16">
                    <div className="text-center  hidden   lg:block ">
        <img src="https://i.ibb.co/z6DfrLQ/registration-form-template-with-flat-design-23-2147974758.jpg" className="w-2/3 mx-auto rounded-xl" alt="" />
    </div>
    <div className="card flex-shrink-0 w-2/3 shadow-2xl bg-base-100">
        <div className="card-body">
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1 className="text-5xl font-bold">Sign Up!</h1>
                {/* name and photo */}
                <div className=" flex  gap-3">
                    <div className="form-control w-1/2">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input placeholder="Name" className="input input-bordered" type='name' {...register("name", { required: true })} />
                        {errors.name && <span className='text-red-600'>This field is required</span>}
                    </div>
                    <div className="form-control w-1/2">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input placeholder="email" className="input input-bordered" type='email' {...register("email", { required: true })} />
                    {errors.email && <span className='text-red-600'>This field is required</span>}
                </div>
                    
                </div>
                <div className="flex gap-3">
                <div className="form-control w-1/2">
                    <label className="label">
                        <span className="label-text">Gender</span>
                    </label>
                    <select className="select select-bordered" {...register("gender", { required: true })}>
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                    {errors.gender && <span className="text-red-600">This field is required</span>}
                </div> 
                <div className="form-control  w-1/2">
                    <label className="label">
                        <span className="label-text">Phone Number</span>
                    </label>
                    <input placeholder="Phone Number" className="input input-bordered" type="tel" {...register("phoneNumber", { required: true })} />
                    {errors.phoneNumber && <span className="text-red-600">This field is required</span>}
                </div>
                </div>
                {/* photo address */}
                <div className="flex gap-3">
                <div className="form-control w-1/2">
                        <label className="label">
                            <span className="label-text">Photo URL</span>
                        </label>
                        <input placeholder="Photo URL" className="input input-bordered" type='photo' {...register("photo", { required: true })} />
                        {errors.name && <span className='text-red-600'>This field is required</span>}
                    </div>
                    <div className="form-control w-1/2">
                        <label className="label">
                            <span className="label-text">Address</span>
                        </label>
                        <input placeholder="Address" className="input input-bordered" type='address' {...register("address", { required: true })} />
                        {errors.name && <span className='text-red-600'>This field is required</span>}
                    </div>
                </div>
                {/* password */}
                <div className=" flex gap-3">
                    <div className="form-control w-1/2">
                        <label className="label">
                            <span className="label-text ">Password</span>
                        </label>
                        <input placeholder="Password" className="input input-bordered" type="password" {...register("password", { required: true, minLength: 6, maxLength: 20, pattern: /(?=.*[A-Z])(?=.*[!@#$&*]).{6}/ })} />
                        {errors.password && <span className="text-red-600">This field is required</span>}
                        {errors.password?.type === "minLength" && <span className="text-red-600">Password must be at least 6 characters</span>}
                        {errors.password?.type === "maxLength" && <span className="text-red-600">Password should not exceed 20 characters</span>}
                        {errors.password?.type === "pattern" && <span className="text-red-600">Password must contain at least one uppercase letter and one special character</span>}
                    </div>
                    <div className="form-control w-1/2">
                        <label className="label">
                            <span className="label-text">Confirm Password</span>
                        </label>
                        <input placeholder="Confirm Password" className="input input-bordered" type="password" {...register("confirmPassword", { required: true, validate: value => value === password })} />
                        {errors.confirmPassword && <span className="text-red-600">Passwords do not match</span>}
                    </div>
                </div>

                <div className="form-control mt-6">
                    <input className="btn btn-primary" type="submit" value="Login" />
                </div>
                {
                    error && <p>{error}</p>
                }
                <div className="text-center my-3">
                    <p className='text-sm'>Already registered? <Link to="/login"><span className='font-bold text-yellow-500'>Go to log in</span></Link></p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;