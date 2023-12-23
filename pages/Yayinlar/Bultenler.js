// Brosurler.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button} from '@mui/material';
import Image from 'next/image';
import CardOge from '../../compenent/CardOge'
import styles from '../../styles/Bultenler.module.css';


function Bultenler() {
    const [bultenler, setBultenler] = useState([]); // Değişken adını güncelle
    const [visibleBultenler, setVisibleBultenler] = useState(12); // Değişken adını güncelle
  
    useEffect(() => {
      const getData = async () => {
        try {
          const response = await axios.get('http://127.0.0.1:8000/api/appname/bultenler/get_active/');
          setBultenler(response.data.results); // Değişken adını güncelle
        } catch (error) {
          console.error('Hata oluştu:', error);
        }
      };
  
      getData();
    }, []);
  
    const handleDownloadPDF = (pdfData) => {
      window.open(pdfData.url, '_blank');
    };
  
    const showMoreBultenler = () => {
      setVisibleBultenler(visibleBultenler + 9); // Değişken adını güncelle
    };
  
    return (
      <>
        <div className={styles.bannerImage}>
          <h1>Bultenler</h1> {/* Başlık adını güncelle */}
          <Image src="/başlıkgörseli.jpg" alt="Logo" layout="fill" />
        </div>
  
        <div className={styles.cardContainer}>
          {bultenler.slice(0, visibleBultenler).map((bulten, index) => ( // Değişken adını güncelle
            <CardOge key={index} yayin={bulten} handleDownloadPDF={handleDownloadPDF} /> // Değişken adını güncelle
          ))}
        </div>
  
        {visibleBultenler < bultenler.length && (
          <div className={styles.showMoreButtonContainer}>
            <Button variant="contained" onClick={showMoreBultenler}>
              Devamını Gör
            </Button>
          </div>
        )}
      </>
    );
  }
  
  export default Bultenler;
  