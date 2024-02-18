import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Typography } from '@mui/material';
import TabPanel from '../../../compenent/TabPanel';
import styles from '../../../styles/Kitaplar.module.css';
import axios from 'axios';
import { useRouter } from 'next/router';
import KitapCard from '../../../compenent/KitapCard';
import KitapCardMobile from '../../../compenent/KitapCardMobile';
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

function Kitaplar() {
  const [kategoriler, setKategoriler] = useState([]);
  const [activeTab, setActiveTab] = useState('');
  const [kitaplar, setKitaplar] = useState([]);
  const [orientation, setOrientation] = useState('vertical');
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const [isScrolTab, setIsScrolTab] = useState(false);
  const [variant, setVariant] = useState('fullWidth');
  


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(API_ROUTES.KITAP_KATEGORI_ACTIVE);
        setKategoriler(response.data);

        // İlk aktif tab'ı URL'den veya ilk kategoriden ayarlama
        const initialTab = router.query.tab ? convertToUrlFriendly(router.query.tab) : convertToUrlFriendly(response.data[0]?.baslik);
        setActiveTab(initialTab);
      } catch (error) {
        console.error('Kategoriler yüklenirken hata:', error);
      }
    };

    fetchCategories();
  }, []); // Bu useEffect yalnızca bileşen yüklendiğinde çalışır

  // Aktif tab veya kategoriler değiştiğinde kitapları fetch etme
  useEffect(() => {
    const fetchBooks = async (kategoriId) => {
      try {
        const kitapResponse = await axios.get(API_ROUTES.KITAPLAR_KATEGORI_FILTER_PAGINATIONSUZ.replace("seciliKategori", kategoriId));
        setKitaplar(kitapResponse.data.results);
      } catch (error) {
        console.error('Kitaplar yüklenirken hata:', error);
      }
    };

    if (activeTab && kategoriler.length > 0) {
      const selectedKategori = kategoriler.find(k => convertToUrlFriendly(k.baslik) === activeTab);
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
    router.push(`/Yayinlar/Kitaplar?tab=${newValue}`, undefined, { shallow: true });
    setActiveTab(newValue);

    const selectedCategoryId = kategoriler.find(kategori => convertToUrlFriendly(kategori.baslik) === newValue)?.id;
    if (selectedCategoryId) {
      axios.get(API_ROUTES.KITAPLAR_KATEGORI_FILTER_PAGINATIONSUZ.replace("seciliKategori",selectedCategoryId))
        .then(response => {
          setKitaplar(response.data.results);
        })
        .catch(error => console.error('Kitaplar yüklenirken hata:', error));
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
        <title>Kitaplar | Kuramer</title>
      </Head>

      <BaslikGorsel metin={"Kitaplar"} />

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
              <Tab  className={styles.tab} key={kategori.id} label={<Typography  component="span" className={styles.tabLabel}>{kategori.baslik}</Typography>} value={convertToUrlFriendly(kategori.baslik)} />
            ))}
          </Tabs>
        </div>

        <div className={styles.rightContainer}>
          <div className={styles.verticalTabsContent}>
            {kategoriler.map(kategori => (
              <TabPanel key={kategori.id} value={activeTab} index={convertToUrlFriendly(kategori.baslik)}>
                <h2>{kategori.baslik}</h2>
                <div className={styles.cardContainer}>
                  {isMobile
                    ? kitaplar.map((kitap, index) => (
                        <KitapCardMobile key={index} kitap={kitap} />
                      ))
                    : kitaplar.map((kitap, index) => (
                        <KitapCard key={index} kitap={kitap} />
                      ))
                  }
                </div>
              </TabPanel>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Kitaplar;