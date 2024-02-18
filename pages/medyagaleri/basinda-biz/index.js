
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Tab, Tabs, Typography} from '@mui/material';
import TabPanel from '../../../compenent/TabPanel';
import styles from '../../../styles/TemelKonularKavram.module.css';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { API_ROUTES } from '../../../utils/constants';
import BaslikGorsel from '../../../compenent/BaslikGorsel';
import BasindaBizCardOge from '../../../compenent/BasindaBizCardOge';

function Index() {
  const [yaziliBasin, setYaziliBasin] = useState([]);
  const [visible, setVisible] = useState(12);
  const [gorselBasin, setGorselBasin] = useState([]);
  const [activeTab, setActiveTab] = useState('basinda-biz');
  const router = useRouter();
  const [orientation, setOrientation] = useState('vertical'); // Default olarak 'vertical'

  useEffect(() => {
    const getData = async () => {
      try {
        const response1 = await axios.get(API_ROUTES.YAZILI_BASIN_ACTIVE);
        setYaziliBasin(response1.data.results);
        const response2 = await axios.get(API_ROUTES.GORSEL_BASIN_ACTIVE);
        setGorselBasin(response2.data.results);
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
      setActiveTab('basinda-biz');
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
    router.push(`/medyagaleri/basinda-biz?tab=${newValue}`, undefined, { shallow: true });
  };


  

  return (
    <>
      <Head>
        <title>Basında Biz | Kuramer</title>
      </Head>

      <BaslikGorsel metin={"Basında Biz"} />

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
          <Tab
            className={styles.tab}
            label={
              <Typography className={styles.tabLabel}>
                Basında Biz
              </Typography>
            }
            value="basinda-biz"
          />
          <Tab
            className={styles.tab}
            label={
              <Typography className={styles.tabLabel}>
                Yazılı Basın
              </Typography>
            }
            value="yazili-basin"
          />
          <Tab
            className={styles.tab}
            label={
              <Typography className={styles.tabLabel}>
                Görsel Basın
              </Typography>
            }
            value="gorsel-basin"
          />
        </Tabs>
        </div>

        <div className={styles.rightContainer}>
          <div className={styles.verticalTabsContent}>
            <TabPanel value={activeTab} index="basinda-biz">
              <h2>Basında Biz</h2>
              <p>
              Kur'an Araştırma Merkezi, Kur'an'ın anlaşılması ve yorumlanmasına katkıda bulunmak amacıyla
               akademik çalışmalar yürüten bir kuruluştur. Merkezimiz, alanında uzman akademisyenlerin makalelerini, 
               kapsamlı araştırmalarını ve kitaplarını yayınlamaktadır. "Basında Biz" sayfamızda, merkezimizin 
               çalışmalarının ulusal ve uluslararası basında nasıl yer bulduğuna dair örnekler ve medyanın merkezimize 
               olan ilgisini yansıtan haberler sunulmaktadır. Bu sayfa, kurumumuzun araştırma ve yayın faaliyetlerinin geniş 
               kitlelere ulaştığının ve konuyla ilgili kamuoyu farkındalığının artırılmasına katkı sağladığının bir göstergesidir.
              </p>
              
            </TabPanel>

            <TabPanel value={activeTab} index="yazili-basin">
              <h2>Yazılı Basın</h2>
              <div className={styles.cardContainer}>
                {yaziliBasin.slice(0, visible).map((yayin, index) => (
                  <BasindaBizCardOge key={index} yayin={yayin}/>
                ))}
              </div>
            </TabPanel>

            <TabPanel value={activeTab} index="gorsel-basin">
              <h2>Görsel Basın</h2>
              <div className={styles.cardContainer}>
                {gorselBasin.slice(0, visible).map((yayin, index) => (
                  <BasindaBizCardOge key={index} yayin={yayin}/>
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