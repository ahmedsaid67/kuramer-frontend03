import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Typography } from '@mui/material';
import TabPanel from '../../../compenent/TabPanel';
import styles from '../../../styles/Mushaflar.module.css';
import axios from 'axios';
import { useRouter } from 'next/router';
import CardOge from '../../../compenent/CardOge';
import Head from 'next/head';
import {API_ROUTES} from "../../../utils/constants"
import BaslikGorsel from '../../../compenent/BaslikGorsel';

const convertToUrlFriendly = (text) => {
  if (text && typeof text === 'string') {
    const turkishCharacters = { 'ç': 'c', 'ğ': 'g', 'ı': 'i', 'ö': 'o', 'ş': 's', 'ü': 'u' };
    const cleanedText = text.trim().toLowerCase();
    const urlFriendlyText = Array.from(cleanedText).map(char => turkishCharacters[char] || char).join('');
    return urlFriendlyText.replace(/\s+/g, '-');
  }
  return '';
};

function Mushaflar() {
  const [kategoriler, setKategoriler] = useState([]);
  const [activeTab, setActiveTab] = useState('');
  const [mushaflar, setMushaflar] = useState([]);
  const [visible, setVisible] = useState(12);
  const [orientation, setOrientation] = useState('vertical');
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const [isScrolTab, setIsScrolTab] = useState(false);
  const [variant, setVariant] = useState('fullWidth');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(API_ROUTES.MUSHAF_KATEGORI_ACTIVE);
        const fetchedKategoriler = response.data;
        setKategoriler(fetchedKategoriler);

        // İlk aktif tab'ı ayarla
        const tabFromUrl = convertToUrlFriendly(router.query.tab);
        const initialTab = fetchedKategoriler.find(k => convertToUrlFriendly(k.baslik) === tabFromUrl) ? tabFromUrl : convertToUrlFriendly(fetchedKategoriler[0]?.baslik);
        setActiveTab(initialTab);
      } catch (error) {
        console.error('Kategoriler yüklenirken hata:', error);
      }
    };

    fetchCategories();
  }, [router.query.tab]); // router.query.tab değiştiğinde useEffect tekrar çalışır

  useEffect(() => {
    const fetchBooks = async () => {
      if (!activeTab || kategoriler.length === 0) return;

      const selectedKategori = kategoriler.find(k => convertToUrlFriendly(k.baslik) === activeTab);
      if (!selectedKategori) return;

      try {
        const kitapResponse = await axios.get(API_ROUTES.MUSHAFLAR_KATEGORI_FILTER_PAGINATIONSUZ.replace("seciliKategori", selectedKategori.id));
        setMushaflar(kitapResponse.data.results);
      } catch (error) {
        console.error('Mushaflar yüklenirken hata:', error);
      }
    };

    fetchBooks();
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
    router.push(`/kuran-i-kerim/mushaflar?tab=${newValue}`, undefined, { shallow: true });
    setActiveTab(newValue);

    const selectedCategoryId = kategoriler.find(kategori => convertToUrlFriendly(kategori.baslik) === newValue)?.id;
    if (selectedCategoryId) {
      axios.get(API_ROUTES.MUSHAFLAR_KATEGORI_FILTER_PAGINATIONSUZ.replace("seciliKategori",selectedCategoryId))
        .then(response => {
          setMushaflar(response.data.results);
        })
        .catch(error => console.error('Mushaflar yüklenirken hata:', error));
    }
  };

  const handleDownloadPDF = (pdfData) => {
    window.open(pdfData.url, '_blank');
  };


  useEffect(() => {
    const calculateTabWidths = () => {
      const containerWidth = window.innerWidth; 
      const maxTabWidth = 200; 
      const minTabWidth = 100;
      const tabPadding = 40; 
 
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
        <title>Mushaflar | Kuramer</title>
      </Head>

      <BaslikGorsel metin={"Mushaflar"} />

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
              <Tab className={styles.tab} key={kategori.id} label={<Typography component="span" className={styles.tabLabel}>{kategori.baslik}</Typography>} value={convertToUrlFriendly(kategori.baslik)} />
            ))}
          </Tabs>
        </div>

        <div className={styles.rightContainer}>
          <div className={styles.verticalTabsContent}>
            {kategoriler.map(kategori => (
              <TabPanel key={kategori.id} value={activeTab} index={convertToUrlFriendly(kategori.baslik)}>
                <h2>{kategori.baslik}</h2>
                <div className={styles.cardContainer}>
                    {mushaflar.slice(0, visible).map((yayin, index) => (
                    <CardOge key={index} yayin={yayin} handleDownloadPDF={handleDownloadPDF} />
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

export default Mushaflar;