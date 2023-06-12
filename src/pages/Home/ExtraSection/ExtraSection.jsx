import React, { useState } from 'react';
import { Fade, Slide } from 'react-awesome-reveal';
import Swal from 'sweetalert2';

const ExtraSection = () => {

    const [email, setEmail] = useState('');

    const handleEmailChange = (event) => {
      setEmail(event.target.value);
    };
  
    const handleSubscribe = () => {
      
      Swal.fire({
        position: 'top',
        icon: 'success',
        title: 'subscribe',
        showConfirmButton: false,
        timer: 1500
    })
    };
  
    const isEmailValid = email.trim() !== '';




    return (
        <>
           <div className=" my-7">
           <div className=" flex flex-row justify-center items-center gap-6">
                <Fade>
                <div className="card w-96 bg-base-100 shadow-xl image-full">
                    <figure><img src="https://i.ibb.co/FBP1bhn/photo-1549576490-b0b4831ef60a-ixlib-rb-4-1.jpg" alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">Join Now !</h2>
                        <p className='font-normal text-md'>Online meditation fee: <span className='font-bold'>500</span> Taka per hour</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">Book now</button>
                        </div>
                    </div>
                </div>
                </Fade>
                
                <div className="">
                <Slide><h2 className='text-lg font-mono w-2/3 my-2'>Subscribe for free! We will contract you as soon as possible</h2></Slide>
                    <Fade>
                    <div className="join ">
                        
                        <input
            className="input input-bordered join-item"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
          />
                            <button
            onClick={handleSubscribe}
            className="btn join-item rounded-r-full"
            disabled={!isEmailValid}>Subscribe
            </button>
                        </div>
                    </Fade>
                </div>
            </div>

           </div>
        
        </>
    );
};

export default ExtraSection;