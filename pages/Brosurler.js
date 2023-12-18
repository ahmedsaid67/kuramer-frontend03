// Brosurler.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button} from '@mui/material';
import Image from 'next/image';
import CardOge from '../compenent/CardOge'
import styles from '../styles/Brosurler.module.css';


function Brosurler() {
  const [brosurler, setBrosurler] = useState([]);
  const [visibleBrosurler, setVisibleBrosurler] = useState(9);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/appname/brosurler/get_active/');
        setBrosurler(response.data.results);
      } catch (error) {
        console.error('Hata oluştu:', error);
      }
    };

    getData();
  }, []);

  const handleDownloadPDF = (pdfData) => {
    window.open(pdfData.url, '_blank');
  };

  const showMoreBrosurler = () => {
    setVisibleBrosurler(visibleBrosurler + 9);
  };

  return (
    <>
      <div className={styles.bannerImage}>
        <h1>Brosurler</h1>
        <Image src="/başlıkgörseli.jpg" alt="Logo" layout="fill" />
      </div>

      <div className={styles.cardContainer}>
        {brosurler.slice(0, visibleBrosurler).map((brosur, index) => (
          <CardOge key={index} brosur={brosur} handleDownloadPDF={handleDownloadPDF} />
        ))}
      </div>

      {visibleBrosurler < brosurler.length && (
        <div className={styles.showMoreButtonContainer}>
          <Button variant="contained" onClick={showMoreBrosurler}>
            Devamını Gör
          </Button>
        </div>
      )}
    </>
  );
}

export default Brosurler;
