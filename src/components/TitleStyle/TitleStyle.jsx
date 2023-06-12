import React from 'react';
import { Fade } from 'react-awesome-reveal';

const TitleStyle = ({first, second}) => {
   return <Fade>
           <div className=" my-8 py-2 w-1/2 mx-auto rounded-full" data-theme="retro">
                <h2 className="text-3xl md:text-5xl font-extrabold text-neutral font-serif text-center my-2">{first} <span className='text-warning'>{second}</span></h2>
            </div>
           </Fade>
};

export default TitleStyle;