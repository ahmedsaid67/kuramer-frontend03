import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import { API_ROUTES } from "../utils/constants";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import styles from '../styles/SurguluBanner.module.css';
import Link from 'next/link';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa'; 

const NextArrow = ({ onClick }) => (
  <div className={`${styles.rightArrow}`} onClick={onClick}>
    <FaArrowRight />
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div className={`${styles.leftArrow}`} onClick={onClick}>
    <FaArrowLeft />
  </div>
);


const SurguluBanner = () => {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_ROUTES.SLIDERS_ACTIVE);
        const sortedMenuItems = response.data.sort((a, b) => a.order - b.order);
        setSlides(sortedMenuItems);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); 

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div>
    {slides.length === 0 ? (
       <div className={styles.placeholder}>
       </div>
    ) : (
      <div className={styles.sliderContainer}> {/* Bu div Slider'ı sarmalıyor */}
        <Slider {...settings}>
          {slides.map((slide, index) => (
            <div key={index}>
              <Link href={slide.url}>
              <img style={{width:"100%",height:"100%", backgroundRepeat:"no-repeat"}} src={slide.img} alt={`Slide ${index + 1}`} />
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    )}
  </div>
  );
}

export default SurguluBanner;















