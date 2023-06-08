import React from 'react';
import "./style.css"
import { Parallax } from 'react-parallax';
const PageTitle = ({title}) => {
    const styles = {
        fontFamily: "sans-serif",
        textAlign: "center"
      };
      const insideStyles = {
       
        padding: 20,
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)"
      };
      const image1 = "https://i.ibb.co/2W7Xn3Z/group-young-sporty-people-sitting-lotus-pose-close.jpg"
    return (
        <div className="">
<Parallax  bgImage={image1}  strength={500}>
      <div className='bg-gray-700 bg-opacity-50 object-center	' style={{ height: 400 }}>
        <div  style={insideStyles}>
            <h2 className='font-mono text-4xl text-center md:text-7xl font-extrabold text-white'>{title}</h2>
        </div>
      </div>
    </Parallax>
   
    
   



        </div>
    );
};

export default PageTitle;