import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/Pupup.module.css';
import { API_ROUTES } from '../utils/constants';

const Popup = ({ onClose }) => {
  const [image, setImage] = useState('');

  useEffect(() => {
    axios.get(API_ROUTES.PUPUP_ACTIVE)
      .then(response => {
        const activePopup = response.data.find(popup => popup.durum && !popup.is_removed);
        if (activePopup) {
          setImage(activePopup.img);
        }
      })
      .catch(error => console.error('Popup image fetch error:', error));
  }, []);

  if (!image) return null;

  return (
    <div className={styles.popupContainer}>
      <div className={styles.popupContent}>
        <img src={image} alt="Popup" className={styles.popupImage} />
        <button onClick={onClose} className={styles.closeButton}>×</button>
      </div>
    </div>
  );
};

export default Popup;