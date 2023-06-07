import React from 'react';
import { Helmet } from 'react-helmet-async';
import PageTitle from '../../components/PageTitle/PageTitle';

const Classes = () => {
    return (
        <div>
            <Helmet>
                <title>Tasnia YMS | Classes</title>
            </Helmet> 
            <PageTitle title={"Classes"}></PageTitle>

        </div>
    );
};

export default Classes;