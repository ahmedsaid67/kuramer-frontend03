import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Typography } from '@mui/material';
import TabPanel from '../../../compenent/TabPanel';
import styles from '../../../styles/Personeller.module.css';
import axios from 'axios';
import { useRouter } from 'next/router';
import PersonellerCardOge from '../../../compenent/PersonellerCardOge';
import Head from 'next/head';
import BaslikGorsel from '../../../compenent/BaslikGorsel';
import { API_ROUTES } from '../../../utils/constants';

const convertToUrlFriendly = (text) => {
  if (text && typeof text === 'string') {
    const turkishCharacters = { 'ç': 'c', 'ğ': 'g', 'ı': 'i', 'ö': 'o', 'ş': 's', 'ü': 'u' };
    const cleanedText = text.trim().toLowerCase();
    const urlFriendlyText = Array.from(cleanedText).map(char => turkishCharacters[char] || char).join('');
    return urlFriendlyText.replace(/\s+/g, '-');
  }
  return '';
};

function Personeller() {
  const [kategoriler, setKategoriler] = useState([]);
  const [activeTab, setActiveTab] = useState('');
  const [personeller, setPersoneller] = useState([]);
  const [orientation, setOrientation] = useState('vertical');
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const [isScrolTab, setIsScrolTab] = useState(false);
  const [variant, setVariant] = useState('fullWidth');
  const [visible, setVisible] = useState(12);
  


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(API_ROUTES.PERSONEL_TURU_ACTIVE);
        setKategoriler(response.data);

        // İlk aktif tab'ı URL'den veya ilk kategoriden ayarlama
        const initialTab = router.query.tab ? convertToUrlFriendly(router.query.tab) : convertToUrlFriendly(response.data[0]?.name);
        setActiveTab(initialTab);
      } catch (error) {
        console.error('Kategoriler yüklenirken hata:', error);
      }
    };

    fetchCategories();
  }, []); // Bu useEffect yalnızca bileşen yüklendiğinde çalışır

  // Aktif tab veya kategoriler değiştiğinde personellerı fetch etme
  useEffect(() => {
    const fetchBooks = async (kategoriId) => {
      try {
        const kitapResponse = await axios.get(API_ROUTES.PERSONELLER_KATEGORI_FILTER_PAGINATIONSUZ.replace("seciliKategori", kategoriId));
        setPersoneller(kitapResponse.data.results);
      } catch (error) {
        console.error('personeller yüklenirken hata:', error);
      }
    };

    if (activeTab && kategoriler.length > 0) {
      const selectedKategori = kategoriler.find(k => convertToUrlFriendly(k.name) === activeTab);
      if (selectedKategori) {
        fetchBooks(selectedKategori.id);
      }
      
    }
  }, [activeTab, kategoriler]);

  useEffect(() => {
    const handleResize = () => {
      setOrientation(window.innerWidth <= 1100 ? 'horizontal' : 'vertical');
      setIsMobile(window.innerWidth <= 480);

      const checkIsScrollTab = () => typeof window !== "undefined" && window.innerWidth <= 1100;
  
      setIsScrolTab(checkIsScrollTab());
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleTabChange = (event, newValue) => {
    router.push(`/kurumsal/personeller?tab=${newValue}`, undefined, { shallow: true });
    setActiveTab(newValue);

    const selectedCategoryId = kategoriler.find(kategori => convertToUrlFriendly(kategori.name) === newValue)?.id;
    if (selectedCategoryId) {
      axios.get(API_ROUTES.PERSONELLER_KATEGORI_FILTER_PAGINATIONSUZ.replace("seciliKategori",selectedCategoryId))
        .then(response => {
          setPersoneller(response.data.results);
        })
        .catch(error => console.error('personeller yüklenirken hata:', error));
    }
  };



  useEffect(() => {
    const calculateTabWidths = () => {
      const containerWidth = window.innerWidth; 
      const maxTabWidth = 200; 
      const minTabWidth = 100;
      const tabPadding = 30; 
    
      let tabWidth = Math.max(containerWidth / kategoriler.length - tabPadding, minTabWidth);
      

      if (tabWidth > maxTabWidth) {
        tabWidth = maxTabWidth;
      }
      

      const totalTabsWidth = kategoriler.length * (tabWidth + tabPadding);
  


      if (totalTabsWidth > containerWidth) {
        setVariant('scrollable');
      } else {
        setVariant('fullWidth');
      }
    };
  
    calculateTabWidths();
    window.addEventListener('resize', calculateTabWidths);
  
    return () => {
      window.removeEventListener('resize', calculateTabWidths);
    };
  }, [kategoriler]); 


  return (
    <>
      <Head>
        <title>personeller | Kuramer</title>
      </Head>

      <BaslikGorsel metin={"Personeller"} />

      <div className={styles.mainContainer}>
        <div className={styles.leftContainer}>
          <Tabs
            orientation={orientation}
            variant={isScrolTab ? variant : "standard"}
            scrollButtons={isScrolTab ? "auto" : false}
            value={activeTab}
            onChange={handleTabChange}
            className={styles.verticalTabs}
            aria-label="Vertical tabs example"
            centered={!isScrolTab}
          >
            {kategoriler.map(kategori => (
              <Tab  className={styles.tab} key={kategori.id} label={<Typography  component="span" className={styles.tabLabel}>{kategori.name}</Typography>} value={convertToUrlFriendly(kategori.name)} />
            ))}
          </Tabs>
        </div>

        <div className={styles.rightContainer}>
          <div className={styles.verticalTabsContent}>
            {kategoriler.map(kategori => (
              <TabPanel key={kategori.id} value={activeTab} index={convertToUrlFriendly(kategori.name)}>
                <h2>{kategori.name}</h2>
                <div className={styles.cardContainer}>
                    {personeller.slice(0, visible).map((yayin, index) => (
                    <PersonellerCardOge key={index} yayin={yayin} />
                    ))}
                </div>
              </TabPanel>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Personeller;