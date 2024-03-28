import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import { API_ROUTES } from '../utils/constants';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from '../styles/SurguluBanner.module.css';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';

const NextArrow = ({ onClick, show }) => (
  <div
    className={`${styles.rightArrow} ${show ? styles.show : ''}`}
    onClick={onClick}
  >
    <FaArrowRight />
  </div>
);

const PrevArrow = ({ onClick, show }) => (
  <div
    className={`${styles.leftArrow} ${show ? styles.show : ''}`}
    onClick={onClick}
  >
    <FaArrowLeft />
  </div>
);

const SurguluBanner = () => {
  const [slides, setSlides] = useState([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_ROUTES.SLIDERS_ACTIVE);
        setSlides(response.data.sort((a, b) => a.order - b.order));
        await preloadImages(response.data); // Görüntülerin ön yüklemesi
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Görüntülerin ön yüklemesini ve yüklenme durumunu kontrol etme
  const preloadImages = async (slides) => {
    const promises = slides.map((slide) =>
      new Promise((resolve, reject) => {
        const img = new Image();
        img.src = slide.img;
        img.onload = resolve;
        img.onerror = reject;
      })
    );
    await Promise.all(promises);
    setImagesLoaded(true); // Tüm görüntüler yüklendiğinde state'i güncelle
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow show={imagesLoaded} />,
    prevArrow: <PrevArrow show={imagesLoaded} />,
  };

  return (
    <div>
      {slides.length === 0 ? (
        <div className={styles.placeholder}></div>
      ) : (
        <div className={styles.sliderContainer}>
          <Slider {...settings}>
            {slides.map((slide, index) => (
              <div key={index}>
                <img
                  style={{ width: '100%', height: '100%', backgroundRepeat: 'no-repeat' }}
                  src={slide.img}
                  alt={`Slide ${index + 1}`}
                />
              </div>
            ))}
          </Slider>
        </div>
      )}
    </div>
  );
};

export default SurguluBanner;















