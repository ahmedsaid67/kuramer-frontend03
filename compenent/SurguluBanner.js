import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from '../styles/SurguluBanner.module.css';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { API_ROUTES } from "../utils/constants";

const SurguluBanner = () => {
  const [slides, setSlides] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

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

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <>
      {slides.length === 0 ? (
        <div className={styles.placeholder}>
        </div>
      ) : (
        <div className={styles.slider}>
          <div>
            <div onClick={goToPrevious} className={styles.leftArrow}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </div>
            <div onClick={goToNext} className={styles.rightArrow}>
              <FontAwesomeIcon icon={faChevronRight} />
            </div>
          </div>
          <Link href={slides[currentIndex]?.url}>
            <img
              src={slides[currentIndex]?.img}
              alt={`Slide ${currentIndex + 1}`}
              className={styles.slide}
            />
          </Link>
          <div className={styles.dotsContainer}>
            {slides.map((slide, slideIndex) => (
              <div
                className={styles.dot}
                key={slideIndex}
                onClick={() => goToSlide(slideIndex)}
              >
                ●
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default SurguluBanner;













