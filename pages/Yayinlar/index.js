// TemelKonuKavramlar.js
import React, { useState, useEffect } from 'react';
import { Button, Tab, Tabs, Typography } from '@mui/material';
import BaslikGorsel from '../../compenent/BaslikGorsel';
import TabPanel from '../../compenent/TabPanel';
import styles from '../../styles/TemelKonularKavram.module.css';
import { useRouter } from 'next/router';
import axios from 'axios';
import CardOge from '../../compenent/CardOge';
import Head from 'next/head';
import { API_ROUTES } from '../../utils/constants';

function Index() {
  const [bultenler, setBultenler] = useState([]); // Değişken adını güncelle
  const [brosurler, setBrosurler] = useState([]);
  const [visible, setVisible] = useState(12);
  const [activeTab, setActiveTab] = useState('kuramerBultenler');
  const router = useRouter();
  const [orientation, setOrientation] = useState('vertical'); // Default olarak 'vertical'

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await axios.get(API_ROUTES.BULTENLER_ACTIVE);
        setBultenler(response1.data.results); // Değişken adını güncelle
        const response2 = await axios.get(API_ROUTES.BROSURLER_ACTIVE);
        setBrosurler(response2.data.results);

      } catch (error) {
        console.error('Hata oluştu:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (router.query.tab) {
      setActiveTab(router.query.tab);
    } else {
      setActiveTab('kuramerBultenler');
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
    // Yönlendirme işlemini burada düzenleyin
    if (newValue === 'kitaplar') {
      router.push('/Yayinlar/Kitaplar');
    } else {
      const newUrl = `/Yayinlar?tab=${newValue}`;
      router.push(newUrl, undefined, { shallow: true });
    }
  };

  const handleDownloadPDF = (pdfData) => {
    window.open(pdfData.url, '_blank');
  };

  return (
    <>
      <Head>
        <title>Yayınlar | Kuramer</title>
      </Head>

      <BaslikGorsel metin={"Yayınlar"} />


      <div className={styles.mainContainer}>
        <div className={styles.leftContainer}>
        <Tabs
          orientation={orientation}
          variant="fullWidth"
          value={activeTab}
          onChange={handleTabChange}
          className={styles.verticalTabs}
          aria-label="Vertical tabs example"
          centered
        >
          <Tab className={styles.tab}
            label={
              <Typography className={styles.tabLabel}>
                KURAMER Bültenler
              </Typography>
            }
            value="kuramerBultenler"
          />
          <Tab className={styles.tab}
            label={
              <Typography className={styles.tabLabel}>
                KURAMER Broşürler
              </Typography>
            }
            value="kuramerBrosurler"
          />
          <Tab className={styles.tab}
            label={
              <Typography className={styles.tabLabel}>
                Kitaplar
              </Typography>
            }
            value="kitaplar"
          />
        </Tabs>

        </div>

        <div className={styles.rightContainer}>
          <div className={styles.verticalTabsContent}>
            <TabPanel value={activeTab} index="kuramerBultenler">
              <h2>Bültenler</h2>
              <div className={styles.cardContainer}>
                {bultenler.slice(0, visible).map((yayin, index) => (
                  <CardOge key={index} yayin={yayin} handleDownloadPDF={handleDownloadPDF} />
                ))}
              </div>
            </TabPanel>


            <TabPanel value={activeTab} index="kuramerBrosurler">
              <h2>Broşürler</h2>
              <div className={styles.cardContainer}>
                {brosurler.slice(0, visible).map((yayin, index) => (
                  <CardOge key={index} yayin={yayin} handleDownloadPDF={handleDownloadPDF} />
                ))}
              </div>
            </TabPanel>

            <TabPanel value={activeTab} index="kitaplar">
            </TabPanel>
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;