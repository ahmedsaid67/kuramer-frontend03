import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from '../styles/ModalPhoto.module.css';
import {Carousel} from "react-responsive-carousel";

const ModalPhoto = ({ isModalOpen, closeModal, images, selectedImageIndex, setSelectedImageIndex }) => {
  const [carouselIndex, setCarouselIndex] = useState(selectedImageIndex);

  useEffect(() => {
    setCarouselIndex(selectedImageIndex);
  }, [selectedImageIndex]);

  const handleSelectImage = (index) => {
    setSelectedImageIndex(index);
    setCarouselIndex(index);
  };

  const handleArrowClick = (direction) => {
    const newIndex = (carouselIndex + direction + images.length) % images.length;
    setCarouselIndex(newIndex);
    setSelectedImageIndex(newIndex);
  };

  if (!isModalOpen) {
    return null;
  }

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>Fotoğraf Galerisi</h2>
          <button type="button" className={styles.closeButton} onClick={closeModal}>
            &times;
          </button>
        </div>
        <div className={styles.modalBody}>
          <div className={styles.carouselContainer}>
            <Carousel
              selectedItem={carouselIndex}
              onChange={setCarouselIndex}
              showArrows={true}
              showStatus={false}
              infiniteLoop={true}
              autoPlay={false}
              renderArrowPrev={(onClickHandler, hasPrev, label) => (
                <button
                  type="button"
                  className={styles.carouselArrow + ' ' + styles.leftArrow}
                  onClick={onClickHandler}
                  disabled={!hasPrev}
                  aria-label={label}
                  aria-hidden={!hasPrev}
                >
                  <i className="fas fa-chevron-left"></i>
                </button>
              )}
              renderArrowNext={(onClickHandler, hasNext, label) => (
                <button
                  type="button"
                  className={styles.carouselArrow + ' ' + styles.rightArrow}
                  onClick={onClickHandler}
                  disabled={!hasNext}
                  aria-label={label}
                  aria-hidden={!hasNext}
                >
                  <i className="fas fa-chevron-right"></i>
                </button>
              )}
            >
              {images.map((image, index) => (
                <div key={index}>
                  <img src={image} alt={`Album Image ${index + 1}`} />
                </div>
              ))}
            </Carousel>
          </div>
          <div className={styles.thumbnailsContainer}>
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Album Image ${index + 1}`}
                width={75}
                height={50}
                className={styles.thumbnailImage}
                onClick={() => handleSelectImage(index)}
                style={index === carouselIndex ? { borderColor: 'red', borderWidth: '2px' } : {}}
                aria-label={`Thumbnail image ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalPhoto;