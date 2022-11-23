import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import './Carrousel.css'
import descuento from '../../assests/Carrousel/descuento.jpg'
import cuotas from '../../assests/Carrousel/cuotas.jpg'
import envio from '../../assests/Carrousel/envio.jpg'
import { Autoplay, Pagination, Navigation } from "swiper";

export default function Carrousel() {

    return (
        <>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <img
                        className="object-fill w-full h-full"
                        src={descuento}
                        alt="image slide 1"
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        className="object-fill w-full h-full"
                        src={cuotas}
                        alt="image slide 2"
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        className="object-fill w-full h-full"
                        src={envio}
                        alt="image slide 3"
                    />
                </SwiperSlide>
            </Swiper>
            
            
        </>
    );
};  
