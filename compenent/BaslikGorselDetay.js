import React, { useState, useEffect } from 'react';
import styles from '../styles/TemelKonularKavram.module.css';
import { API_ROUTES } from '../utils/constants';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link'; // Link komponentini import ediyoruz

function BaslikGorselDetay({ metin, link }) {
  const [image, setImage] = useState('');

  useEffect(() => {
    axios.get(API_ROUTES.BASLIK_GORSEL_ACTIVE)
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
    <div className={styles.bannerImage}>
      <div className={styles.backArrow}>
        <Link href={link}>
            <Image className={styles.arrowContainer} src="/arrow-left.png" alt="Geri" width={50} height={50} priority />
        </Link>
      </div>
      <div className={styles.titleContainer}>
        <h1>{metin}</h1>
      </div>
      <Image src={image} alt="Logo" fill sizes="100vw" priority />
    </div>
  );
}

export default BaslikGorselDetay;
