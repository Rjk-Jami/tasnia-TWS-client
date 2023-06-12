import { Swiper, SwiperSlide } from "swiper/react";
import React, { useRef, useState } from "react";
import { Scrollbar } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/scrollbar";
import "./style.css"
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import { Fade, Zoom } from "react-awesome-reveal";

const Banner = () => {

    const { data: yogas = [] } = useQuery({
        queryKey: ["yoga"], queryFn: async () => {
            const res = await axios.get("https://tasnia-yoga-and-meditation-school-server.vercel.app/yoga");
            console.log()
            return res.data;
        }
    });

    console.log(yogas)


    return (
        <div className="">
            <div className=" ">
                <Swiper
                    scrollbar={{
                        hide: true,
                    }}
                    modules={[Scrollbar]}
                    className="mySwiper "
                >
    {
        yogas.map((yoga, index) =>
            <SwiperSlide key={index}>
                <div className="hero min-h-screen bg-cover bg-center" style={{ backgroundImage: `url("${yoga.image}")` }}>
                    <div className="hero-overlay bg-opacity-60"></div>
                    <div className="hero-content text-center text-neutral-content">
                        <div className="max-w-xl">
                            <Fade><h1 className=" text-3xl md:text-5xl font-bold">{yoga?.name}</h1></Fade>
                            <Zoom><p className="">{yoga?.details}</p></Zoom>
                            <button className="animate__rubberBand animate__animated btn btn-warning disabled"><FaAngleDoubleLeft></FaAngleDoubleLeft> Step : {index + 1}<FaAngleDoubleRight /></button>
                        </div>
                    </div>
                </div>

            </SwiperSlide>
        )
                    }


                </Swiper>
            </div>
           

        </div>
    )
}

export default Banner
