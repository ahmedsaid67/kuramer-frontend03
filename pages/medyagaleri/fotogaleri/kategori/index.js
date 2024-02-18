// Kategori.js
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import { API_ROUTES } from '../../../../utils/constants';
import styles from '../../../../styles/FotoGaleriKategori.module.css';

export default function Kategori() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get(API_ROUTES.FOTO_GALERI_KATEGORI_ACTIVE)
      .then(response => {
        setItems(response.data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <>
    <div className={styles.bannerImage}>
        <div className={styles.titleContainer}>
          <h1>Fotoğraf Galerisi</h1>
        </div>
        <Image src="/baslikgorseli.jpg" alt="Logo" layout="fill" />
    </div>

    <div className={styles.kategoriContainer}>
      {items.map((item, index) => (
        <div key={item.id} className={styles.card}>
          <Link href={`/medyagaleri/fotogaleri/kategori/${item.slug}`}>
              <Image
                src={item.kapak_fotografi}
                alt={item.baslik}
                width={300}
                height={200}
                className={styles.cardImage}
              />
          </Link>
          <Link href={`/medyagaleri/fotogaleri/kategori/${item.slug}`}>
            <div className={styles.cardText}>{item.baslik}</div>
          </Link>
          {(index + 1) % 2 === 0 && <br />} {/* Satırda iki kategori için bir satır boşluğu ekleyin */}
        </div>
      ))}
    </div>
    </>
  );
}