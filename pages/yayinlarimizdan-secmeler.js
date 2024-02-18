// Brosurler.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';
import Image from 'next/image';
import CardOge from '../compenent/CardOge'
import styles from '../styles/YayinlarimizdanSecmeler.module.css';
import Head from 'next/head';
import BaslikGorsel from '../compenent/BaslikGorsel';
import { API_ROUTES } from '../utils/constants';

function YayinlarimizdanSecmeler() {
  const [secmeYayinlar, setSecmeYayinlar] = useState([]);
  const [visibleSecmeYayinlar, setVisibleSecmeYayinlar] = useState(12);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(API_ROUTES.YAYINLARIMIZDAN_SECMELER_ACTIVE);
        setSecmeYayinlar(response.data.results);
      } catch (error) {
        console.error('Hata oluştu:', error);
      }
    };

    getData();
  }, []);

  const handleDownloadPDF = (pdfData) => {
    window.open(pdfData.url, '_blank');
  };

  const showMoreSecmeYayinlar = () => {
    setVisibleSecmeYayinlar(visibleSecmeYayinlar + 9);
  };

  return (
    <>
     <Head>
      <title>Yayinlarimizdan Secmeler | Kuramer</title>
     </Head>

     <BaslikGorsel metin={"Yayınlarımızdan Seçmeler"} />
     

      <div className={styles.textContainer}>
        <p className={styles.paragraph}>
          <strong>KURAMER</strong> olarak bugüne kadar farklı formatlarda gerçekleştirdiğimiz ilmî yayın ve faaliyetlerle düşünce ve inanç dünyamızı ilgilendiren temel konuların etraflıca ve ilmi çerçevede tartışıldığı bir platform oluşturmaya gayret ettik.
        </p>
        <p className={styles.paragraph}>
          Bu defa, daha önce gerçekleştirdiğimiz çok sayıda ilmî toplantı (konferans, çalıştay, sempozyum) ve yayınlanmış 50’nin üzerindeki eserimizle oluşan zengin birikim ve katkıdan toplumumuzun daha geniş kesimlerini, bilhassa gençlerimizi haberdar etmek üzere yeni bir çaba içerisine girmiş bulunuyoruz.
        </p>
        <p className={styles.paragraph}>
          Bu çerçevede yayınlarımızdan hazırladığımız bazı seçme metinleri daha özlü ve kolay okunabilir formatta okuyucularımızın erişimine sunmuş bulunuyoruz.
        </p>
      </div>

      <div className={styles.cardContainer}>
        {secmeYayinlar.slice(0, visibleSecmeYayinlar).map((yayin, index) => (
          <CardOge key={index} yayin={yayin} handleDownloadPDF={handleDownloadPDF} />
        ))}
      </div>

      {visibleSecmeYayinlar < secmeYayinlar.length && (
        <div className={styles.showMoreButtonContainer}>
          <Button variant="contained" onClick={showMoreSecmeYayinlar}>
            Devamını Gör
          </Button>
        </div>
      )}
    </>
  );
}

export default YayinlarimizdanSecmeler;