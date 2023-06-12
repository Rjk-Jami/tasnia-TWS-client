import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import useAuth from '../../../components/hooks/useAuth';
import useAxiosSecure from '../../../components/hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const CheckOutFrom = ({selectedClass}) => {
   const {_id,price,name,instructorName,image,email,classID} = selectedClass || {}
   console.log(selectedClass)
    //react-stripe
    const stripe = useStripe();
    const elements = useElements();
    
    // user
    const { user } = useAuth()
    const [axiosSecure] = useAxiosSecure()
    const [processing, setProcessing] = useState(false)
    const [transactionId, setTransactionId] = useState('')
    const [clientSecret, setClientSecret] = useState('')
    const [cardError, setCardError] = useState('')
    useEffect(() => {
        if(price >0 ){
            axiosSecure.post('/create-tasnia-payment-intent', { price })
            .then(res => {
                console.log("res.data---------", res.data)
                console.log("res.data.clientSecret",res.data.clientSecret)
                setClientSecret(res.data.clientSecret)
            })
        }
    }, [price, axiosSecure])
    console.log(clientSecret)

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return console.log("error 1")
        }
        const card = elements.getElement(CardElement)
        if (card === null) {
            return console.log("error 2")
        }
        console.log(card , 'card')
        const { error } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })
        // Use your card Element with other Stripe.js APIs

        if (error) {
            console.log('[error]---------------', error);
            setCardError(error.message);
        } else {
            setCardError('')
            
        }
        setProcessing(true)
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: user?.displayName || 'anonymous',
                        email: user?.email || 'anonymous',
                    },
                },
            },
        );
        if (confirmError) {
            console.log(confirmError)
        }
        
        setProcessing(false)
        if (paymentIntent.status === "succeeded"){
            setTransactionId(paymentIntent.id)
            //save payment to server
            const payment  ={
                email: user?.email,
                transactionId : paymentIntent.id ,
                price,
                data: new Date(),
                status: 'pending',
                instructorName,
                classID: classID,
                selectedClass : _id
        }
        console.log(payment)

        axiosSecure.post('/payments', {payment, selectedClass})
        .then(res=>{
            if(res.data.insertedResult.insertedId){
                Swal.fire({
                    position: 'top-end      ',
                    icon: 'success',
                    title: 'Payment Success',
                    showConfirmButton: false,
                    timer: 1500
                  })
        }
    })
    }
}

    return (
        <>
        <form onSubmit={handleSubmit} className='w-10/12 mx-auto my-5'>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <div className="flex justify-center mt-5">
                <button className=' btn btn-outline btn-primary btn-wide' type="submit" disabled={!stripe || !clientSecret || processing}>
                    Pay
                </button>
            </div>
        </form>
        <div className=" text-center my-3">
            {cardError && <p className='text-red-600'>{cardError}</p>}
            {
                transactionId && <p className='text-success'>Transaction complete! with TransactionId : {transactionId}</p>
            }
        </div>
        
    </>
    );
};

export default CheckOutFrom;