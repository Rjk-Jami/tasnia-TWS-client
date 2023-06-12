import React from 'react';
import { Helmet } from 'react-helmet-async';
import Banner from '../Banner/Banner';
import PopularClasses from '../PopularClasses/PopularClasses';

const Home = () => {

    
    return (
        <div>
           <Helmet>
                <title>Tasnia YMS | Home</title>
            </Helmet> 
            <Banner></Banner>
            <PopularClasses></PopularClasses>
        </div>
    );
};

export default Home;