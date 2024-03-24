// Kategori.js
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import { API_ROUTES } from '../../../../utils/constants';
import styles from '../../../../styles/FotoGaleriKategori.module.css';
import BaslikGorsel from '../../../../compenent/BaslikGorsel';
import { CircularProgress } from '@mui/material'; 
import Head from 'next/head';


export default function Kategori() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(API_ROUTES.VIDEO_GALERI_KATEGORI_ACTIVE)
      .then(response => {
        setItems(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError('Veriler yüklenirken beklenmeyen bir sorun oluştu. Lütfen daha sonra tekrar deneyin.');
        setIsLoading(false);
      });
  }, []);

  return (
    <>
     <BaslikGorsel metin={"Video Galeri Kategorisi"} />

     <Head>
        <title>Video Galeri Kategorisi | Kuramer</title>
        <link rel="icon" href="/kuramerlogo.png" />
      </Head>




    <div className={styles.kategoriContainer}>
      {isLoading ? (
        <div className={styles.loader}>
          <CircularProgress />
        </div>
      ) : error ? (
        <div className={styles.errorMessage}>
          {error}
        </div>
      ) : items.length > 0 ? (
        items.map((item, index) => (
          <div key={item.id} className={styles.card}>
            <Link href={`/medyagaleri/videogaleri/kategori/${item.slug}`}>
                <Image
                  src={item.kapak_fotografi}
                  alt={item.baslik}
                  width={266}
                  height={150}
                  loading="lazy"
                />
            </Link>
            <Link href={`/medyagaleri/videogaleri/kategori/${item.slug}`}>
              <div className={styles.cardText}>{item.baslik}</div>
            </Link>
            {(index + 1) % 2 === 0 && <br />} 
          </div>
        ))
      ) : (
        <div className={styles.noDataMessage}>
          Kayıtlı veri bulunmamaktadır.
        </div>
      )}
    </div>

    </>
  );
}


