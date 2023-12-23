// TemelKonuKavramlar.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Tab, Tabs } from '@mui/material';
import Image from 'next/image';
import CardOge from '../../compenent/CardOge';
import TabPanel from '../../compenent/TabPanel';
import styles from '../../styles/TemelKonularKavram.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';

function Index() {
  const [temelKonular, setTemelKonular] = useState([]);
  const [temelKavramlar, setTemelKavramlar] = useState([]);
  const [visible, setVisible] = useState(12);
  const [activeTab, setActiveTab] = useState('temelKonuVeKavramlar');
  const router = useRouter();
  const [orientation, setOrientation] = useState('vertical'); // Default olarak 'vertical'

  useEffect(() => {
    const getData = async () => {
      try {
        const response1 = await axios.get('http://127.0.0.1:8000/api/appname/temelkonular/get_active/');
        setTemelKonular(response1.data.results);
        const response2 = await axios.get('http://127.0.0.1:8000/api/appname/temelkavramlar/get_active/');
        setTemelKavramlar(response2.data.results);
      } catch (error) {
        console.error('Hata oluştu:', error);
      }
    };

    getData();
  }, []);

  useEffect(() => {
    if (router.query.tab) {
      setActiveTab(router.query.tab);
    } else {
      setActiveTab('temelKonuVeKavramlar');
    }

    // Ekran genişliğine bağlı olarak orientation'ı ayarla
    const handleResize = () => {
      if (window.innerWidth <= 1100) {
        setOrientation('horizontal');
      } else {
        setOrientation('vertical');
      }
    };

    // Sayfa yüklendiğinde ve pencere boyutu değiştiğinde kontrol et
    handleResize();
    window.addEventListener('resize', handleResize);

    // Temizlik fonksiyonu, event listener'ı kaldırır
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [router.query.tab]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    router.push(`/TemelKonuKavram?tab=${newValue}`, undefined, { shallow: true });
  };

  const handleDownloadPDF = (pdfData) => {
    window.open(pdfData.url, '_blank');
  };

  const showMore = () => {
    setVisible(visible + 9);
  };

  return (
    <>
      <div className={styles.bannerImage}>
        <div className={styles.titleContainer}>
          <h1>Temel Konu ve Kavramlar</h1>
        </div>
        <Image src="/başlıkgörseli.jpg" alt="Logo" layout="fill" />
      </div>

      {visible < temelKonular.length && (
        <div className={styles.showMoreButtonContainer}>
          <Button variant="contained" onClick={showMore}>
            Devamını Gör
          </Button>
        </div>
      )}

      <div className={styles.mainContainer}>
        <div className={styles.leftContainer}>
          <Tabs
            orientation={orientation}
            variant="scrollable"
            value={activeTab}
            onChange={handleTabChange}
            className={styles.verticalTabs}
            aria-label="Vertical tabs example"
          >
            <Tab label="Temel Konu ve Kavramlar" className={styles.tabLabel} value="temelKonuVeKavramlar" />
            <Tab label="Temel Konular" className={styles.tabLabel} value="temelKonular" />
            <Tab label="Temel Kavramlar" className={styles.tabLabel} value="temelKavramlar" />
          </Tabs>
        </div>

        <div className={styles.rightContainer}>
          <div className={styles.verticalTabsContent}>
            <TabPanel value={activeTab} index="temelKonuVeKavramlar">
              <h2>Temel Konu ve Kavramlar</h2>
              {/* İlgili içerikleri burada göster */}
            </TabPanel>

            <TabPanel value={activeTab} index="temelKonular">
              <h2>Temel Konular</h2>
              <div className={styles.cardContainer}>
                {temelKonular.slice(0, visible).map((yayin, index) => (
                  <CardOge key={index} yayin={yayin} handleDownloadPDF={handleDownloadPDF} />
                ))}
              </div>
            </TabPanel>

            <TabPanel value={activeTab} index="temelKavramlar">
              <h2>Temel Kavramlar</h2>
              <div className={styles.cardContainer}>
                {temelKavramlar.slice(0, visible).map((yayin, index) => (
                  <CardOge key={index} yayin={yayin} handleDownloadPDF={handleDownloadPDF} />
                ))}
              </div>
            </TabPanel>
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;
