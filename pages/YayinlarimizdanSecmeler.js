// Brosurler.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';
import Image from 'next/image';
import CardOge from '../compenent/CardOge'
import styles from '../styles/YayinlarimizdanSecmeler.module.css';

function YayinlarimizdanSecmeler() {
  const [secmeYayinlar, setSecmeYayinlar] = useState([]);
  const [visibleSecmeYayinlar, setVisibleSecmeYayinlar] = useState(12);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/appname/yayinlarimizdansecmeler/get_active/');
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
     <div className={styles.bannerImage}>
      <div className={styles.titleContainer}>
        <h1>Yayınlarımızdan Seçmeler</h1>
        <h2>
          KURAMER olarak bugüne kadar farklı formatlarda gerçekleştirdiğimiz ilmî yayın ve faaliyetlerle düşünce ve inanç dünyamızı ilgilendiren temel konuların etraflıca ve ilmi çerçevede tartışıldığı bir platform oluşturmaya gayret ettik.
        </h2>
        <h3>
          Bu defa, daha önce gerçekleştirdiğimiz çok sayıda ilmî toplantı (konferans, çalıştay, sempozyum) ve yayınlanmış 50’nin üzerindeki eserimizle oluşan zengin birikim ve katkıdan toplumumuzun daha geniş kesimlerini, bilhassa gençlerimizi haberdar etmek üzere yeni bir çaba içerisine girmiş bulunuyoruz.
        </h3>
        <h4>
          Bu çerçevede yayınlarımızdan hazırladığımız bazı seçme metinleri daha özlü ve kolay okunabilir formatta okuyucularımızın erişimine sunmuş bulunuyoruz.
        </h4>
      </div>
      <Image src="/baslikgorseli.jpg" alt="Logo" layout="fill" />
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
