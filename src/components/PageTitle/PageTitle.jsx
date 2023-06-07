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
      const image1 = "https://i.ibb.co/FBP1bhn/photo-1549576490-b0b4831ef60a-ixlib-rb-4-1.jpghttps://i.ibb.co/PzLP4Y7/photo-1549576490-b0b4831ef60a-ixlib-rb-4-2.jpg"
    return (
        <div className="">
<Parallax  bgImage={image1}  strength={500}>
      <div className='bg-gray-700 bg-opacity-50 object-center	' style={{ height: 400 }}>
        <div  style={insideStyles}>
            <h2 className='font-mono text-7xl font-extrabold text-white'>{title}</h2>
        </div>
      </div>
    </Parallax>
   
    
   



        </div>
    );
};

export default PageTitle;