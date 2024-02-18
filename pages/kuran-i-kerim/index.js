// TemelKonuKavramlar.js
import React, { useState, useEffect } from 'react';
import { Button, Tab, Tabs, Typography } from '@mui/material';
import TabPanel from '../../compenent/TabPanel';
import styles from '../../styles/TemelKonularKavram.module.css';
import { useRouter } from 'next/router';
import axios from 'axios';
import CardOge from '../../compenent/CardOge';
import Head from 'next/head';
import BaslikGorsel from "../../compenent/BaslikGorsel";
import { API_ROUTES } from '../../utils/constants';

function Index() {
  const [mushafFarklari,setMushafFarklari] = useState([]); // Değişken adını güncelle
  const [visible, setVisible] = useState(12);
  const [activeTab, setActiveTab] = useState('kuran-i-kerim');
  const router = useRouter();
  const [orientation, setOrientation] = useState('vertical'); // Default olarak 'vertical'

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await axios.get(API_ROUTES.MUSHAF_FARKLARI_ACTIVE);
        setMushafFarklari(response1.data.results); // Değişken adını güncelle
       

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
      setActiveTab('kuran-i-kerim');
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
    if (newValue === 'mushaflar') {
      router.push('/kuran-i-kerim/mushaflar');
    } else {
      const newUrl = `/kuran-i-kerim?tab=${newValue}`;
      router.push(newUrl, undefined, { shallow: true });
    }
  };

  const handleDownloadPDF = (pdfData) => {
    window.open(pdfData.url, '_blank');
  };

  return (
    <>
      <Head>
        <title>Kuran-ı Kerim | Kuramer</title>
      </Head>

      <BaslikGorsel metin={"Kuran-ı Kerim"} />


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
                Kuran-ı Kerim
              </Typography>
            }
            value="kuran-i-kerim"
          />
          <Tab className={styles.tab}
            label={
              <Typography className={styles.tabLabel}>
                Mushaflar
              </Typography>
            }
            value="mushaflar"
          />
          <Tab className={styles.tab}
            label={
              <Typography className={styles.tabLabel}>
                Mushaf Farkları
              </Typography>
            }
            value="mushaf-farklari"
          />
        </Tabs>

        </div>

        <div className={styles.rightContainer}>
          <div className={styles.verticalTabsContent}>
            <TabPanel value={activeTab} index="kuran-i-kerim">
              <h2>Kuran-ı Kerim</h2>
              <p>
                Bu sayfada, Kuran'ın çeşitli mushaf örneklerini bulabilir ve onların benzersiz özelliklerini keşfedebilirsiniz. 
                Her bir mushaf, kendi tarihi ve kültürel önemi içinde ele alınmıştır. Amacımız, Kuran'ın çeşitliliğini ve zenginliğini, 
                mümkün olan en basit ve erişilebilir şekilde sizlere sunmaktır.
                Mushaflarımız, Kuran'ın muhafazası ve aktarım süreçlerine genel bir giriş niteliğindedir. 
                Bu nüshalar, farklı dönemlerden ve coğrafyalardan seçilmiş olup, Kuran'ın evrenselliğini ve zaman içindeki sürekliliğini yansıtmaktadır.
                Sayfamız, Kuran'ın derinliklerine dalmak isteyen herkes için bir başlangıç noktası olarak hizmet eder. 
                Burada, Kuran'ın tarihine ve onun çeşitli yönlerine ilişkin temel bilgileri bulabilirsiniz.
              </p>
            
            </TabPanel>


            <TabPanel value={activeTab} index="mushaflar">
            </TabPanel>

            <TabPanel value={activeTab} index="mushaf-farklari">
              <h2>Mushaf Farklari</h2>
              <div className={styles.cardContainer}>
                {mushafFarklari.slice(0, visible).map((yayin, index) => (
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