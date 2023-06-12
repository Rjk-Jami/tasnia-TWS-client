import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import useSelectedClasses from '../../../components/hooks/useSelectedClasses';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckOutFrom from '../ChekOutFrom/ChekOutFrom';
import TitleStyle from '../../../components/TitleStyle/TitleStyle';

//stripe key
const stripePromise = loadStripe(import.meta.env.VITE_Publishable_key);

const Payment = () => {
    const { id } = useParams();

    const [selectedClasses, refetch] = useSelectedClasses()
    const selectedClass = selectedClasses.find(cls => cls?._id === id);
    console.log(selectedClass)



    return (
        <div>
            <Helmet>
                <title>Tasnia YMS | Payment</title>
            </Helmet>
            <TitleStyle first={""} second={"Payment"}></TitleStyle>

            <Elements stripe={stripePromise}>
                <CheckOutFrom selectedClass={selectedClass}  ></CheckOutFrom>
            </Elements>
        </div>
    );
};

export default Payment;