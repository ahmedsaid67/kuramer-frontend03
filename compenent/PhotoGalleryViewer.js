import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from '../styles/PhotoGalleryViewer.module.css';

const PhotoGalleryViewer = ({ images, onClose }) => {
  if (!images || images.length === 0) return <div>Resim mevcut değil</div>;

  const [imageIndex, setImageIndex] = useState(0);
  const [thumbnailsOrder, setThumbnailsOrder] = useState(images.map((_, index) => index));
  const [visibleThumbnails, setVisibleThumbnails] = useState(0);
  const [thumbnailWidth, setThumbnailWidth] = useState(window.innerWidth < 600 ? 78 : 130);
  
  useEffect(() => {
    const updateVisibleThumbnails = () => {
      const thumbnailContainerWidth = document.querySelector('.' + styles.thumbnailContainer)?.offsetWidth || 0;
      const visibleThumbs = Math.floor(thumbnailContainerWidth / thumbnailWidth);
      setVisibleThumbnails(visibleThumbs);

    };

    const handleResize = () => {
      setThumbnailWidth(window.innerWidth < 600 ? 78 : 127.5);
      updateVisibleThumbnails();

      
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // İlk render'da çalıştır

    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('resize', handleResize);
      document.body.style.overflow = 'auto';
    };
  }, [thumbnailWidth]);

  const goToPrevious = () => {
    setImageIndex((prevIndex) => prevIndex === 0 ? images.length - 1 : prevIndex - 1);
    const currentThumbnailIndex = thumbnailsOrder.indexOf(imageIndex);

    if (images.length > visibleThumbnails && (currentThumbnailIndex === 0 || imageIndex === 0)) {
      updateThumbnailsOrderForPrevious();
    }
  };

  const goToNext = () => {
    setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    const currentThumbnailIndex = thumbnailsOrder.indexOf(imageIndex);

    if (images.length > visibleThumbnails && (currentThumbnailIndex === visibleThumbnails - 1 || imageIndex === images.length - 1)) {
      updateThumbnailsOrderForNext();
    }
  };

  const updateThumbnailsOrderForNext = () => {
    setThumbnailsOrder(prevOrder => [...prevOrder.slice(1), prevOrder[0]]);
  };

  const updateThumbnailsOrderForPrevious = () => {
    setThumbnailsOrder(prevOrder => [prevOrder[prevOrder.length - 1], ...prevOrder.slice(0, prevOrder.length - 1)]);
  };

  const selectThumbnail = (index) => {
    setImageIndex(index);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.viewer}>
      <div className={styles.mainImageContainer}>
        <img
          src={images[imageIndex].image}
          alt={`Gallery image ${imageIndex + 1}`}
          height="100%"
          width="auto"
          className={styles.cardImage} 
        />
      </div>

        <button className={styles.close} onClick={onClose} aria-label="Close gallery">&times;</button>
        <div className={styles.controls}>
          <button className={styles.prev} onClick={goToPrevious} aria-label="Previous image">&#10094;</button>
          <button className={styles.next} onClick={goToNext} aria-label="Next image">&#10095;</button>
        </div>
        <div className={styles.thumbnailContainer}>
          <div className={styles.thumbnails}>
            {thumbnailsOrder.map((orderIndex, index) => (
              <div key={images[orderIndex].id || index} className={`${styles.thumbnail} ${imageIndex === orderIndex ? styles.thumbnailSelected : ''}`} onClick={() => selectThumbnail(orderIndex)}>
                <Image
                  src={images[orderIndex].image}
                  alt={`Thumbnail ${orderIndex + 1}`}
                  fill
                  priority={orderIndex === 0} // Priority loading for the first image or important images
                  sizes="(max-width: 100px) 100vw, 100px"
                  style={{ objectFit: 'cover' }}
                />

              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoGalleryViewer;













