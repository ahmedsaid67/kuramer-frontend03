import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Typography, Pagination } from '@mui/material';
import TabPanel from '../../../compenent/TabPanel';
import styles from '../../../styles/Mushaflar.module.css';
import axios from 'axios';
import { useRouter } from 'next/router';
import CardOge from '../../../compenent/CardOge';
import Head from 'next/head';
import {API_ROUTES} from "../../../utils/constants"
import BaslikGorselDetay from '../../../compenent/BaslikGorselDetay';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress'; 

const convertToUrlFriendly = (text) => {
  if (text && typeof text === 'string') {
    // Öncelikle metinden tek tırnak işaretlerini çıkar
    const textWithoutApostrophes = text.replace(/'/g, '');
    // Türkçe karakterler ve URL dostu hale getirme kuralları
    const turkishCharacters = { 'ç': 'c', 'ğ': 'g', 'ı': 'i', 'ö': 'o', 'ş': 's', 'ü': 'u' };
    const cleanedText = textWithoutApostrophes.trim().toLowerCase();
    const urlFriendlyText = Array.from(cleanedText).map(char => turkishCharacters[char] || char).join('');
    // Boşlukları '-' ile değiştir
    return urlFriendlyText.replace(/\s+/g, '-');
  }
  return '';
};


function Mushaflar() {
  const [kategoriler, setKategoriler] = useState([]);
  const [activeTab, setActiveTab] = useState('');
  const [mushaflar, setMushaflar] = useState([]);
  const [orientation, setOrientation] = useState('vertical');
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const [isScrolTab, setIsScrolTab] = useState(false);
  const [variant, setVariant] = useState('fullWidth');

  const [categoriesError, setCategoriesError] = useState(null)
  const [categoriesLoading,setCategoriesLoading] = useState(true)
  const [totalPages, setTotalPages] = useState(0);
  const currentPage = parseInt(router.query.page || '1', 10);

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Yükleme durumu için state

  useEffect(() => {
    const fetchCategoriesAndValidateTab = async () => {
      setCategoriesLoading(true);
      try {
        const response = await axios.get(API_ROUTES.MUSHAF_KATEGORI_ACTIVE);
        const categories = response.data;

        // Kategorileri başarıyla çektikten sonra
        setKategoriler(categories);

        // URL'deki `tab` parametresini URL dostu bir string'e çevir
        const tabUrlFriendly = router.query.tab ? convertToUrlFriendly(router.query.tab) : null;

        // URL'deki `tab`'ın geçerli olup olmadığını kontrol et
        const isValidTab = categories.some(category => convertToUrlFriendly(category.baslik) === tabUrlFriendly);

        if (tabUrlFriendly && !isValidTab) {
          // Hata sayfasına yönlendirme
          router.push('/hata-sayfasi');
          // İlk kategori baz alınarak aktif tab ayarlanır
          const fakeInitialTab = categories.length > 0 ? convertToUrlFriendly(categories[0].baslik) : '';
          setActiveTab(fakeInitialTab);
        } else {
          // Eğer `tab` geçerliyse veya `tab` belirtilmemişse, initial tab'ı set et
          const initialTab = tabUrlFriendly || convertToUrlFriendly(categories[0]?.baslik);
          setActiveTab(initialTab);
        }

        setCategoriesError(null);
      } catch (error) {
        console.error('Kategoriler yüklenirken hata:', error);
        setCategoriesError('Veriler yüklenirken beklenmeyen bir sorun oluştu. Lütfen daha sonra tekrar deneyin.');
      } finally {
        setCategoriesLoading(false);
      }
    };

    fetchCategoriesAndValidateTab();
  }, [router.query.tab]); // router.query.tab değiştiğinde useEffect tekrar çalışır






  const fetchBooks = async (kategoriId,page) => {
    setIsLoading(true)
    try {
      const kitapResponse = await axios.get(API_ROUTES.MUSHAFLAR_KATEGORI_FILTER.replace("seciliKategori", kategoriId).replace("currentPage",page));
      setMushaflar(kitapResponse.data.results);
      setTotalPages(Math.ceil(kitapResponse.data.count / 10));
      setError(null);
    } catch (error) {
      console.error("Veri yükleme sırasında bir hata oluştu:", error);
      if (error.response && error.response.status === 404 && error.response.data.detail === "Invalid page.") {
        // 'Invalid page' detayını kontrol eden ve buna göre hata mesajı döndüren koşul
        setError('Geçersiz sayfa. Bu sayfa mevcut değil veya sayfa numarası hatalı. Lütfen sayfa numarasını kontrol edin.');
      } else {
        setError('Veriler yüklenirken beklenmeyen bir sorun oluştu. Lütfen daha sonra tekrar deneyin.');
      }
    }finally {
      setIsLoading(false); // Yükleme işlemi tamamlandığında veya hata oluştuğunda
    }
  };



  // Aktif tab veya kategoriler değiştiğinde personellerı fetch etme
  useEffect(() => {
    if (activeTab && kategoriler.length > 0) {
      const selectedKategori = kategoriler.find(k => convertToUrlFriendly(k.baslik) === activeTab);
      if (selectedKategori) {
        fetchBooks(selectedKategori.id,currentPage);
      }
      
    }
  }, [kategoriler]);

  useEffect(() => {
    if (router.query.tab && kategoriler.length > 0) {
      const selectedKategori = kategoriler.find(k => convertToUrlFriendly(k.baslik) === router.query.tab);
      if (selectedKategori) {
        fetchBooks(selectedKategori.id,currentPage);
      }
      
    }
  }, [kategoriler,currentPage]);
  
  

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    const selectedKategori = kategoriler.find(k => convertToUrlFriendly(k.baslik) === newValue);
    if (selectedKategori) {
      fetchBooks(selectedKategori.id,1);
    }
    router.push(`/kuran-i-kerim/mushaflar?tab=${newValue}`, undefined, { shallow: true });
  };

  const handleDownloadPDF = (pdfData) => {
    window.open(pdfData.url, '_blank');
  };

  const handlePageChange = (event, value) => {
    const selectedKategori = kategoriler.find(k => convertToUrlFriendly(k.baslik) === activeTab);
    if (selectedKategori) {
      fetchBooks(selectedKategori.id,value);
    }
    router.push(`/kuran-i-kerim/mushaflar?tab=${activeTab}&page=${value}`);
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



  return (
    <>
      <Head>
        <title>Mushaflar | Kuramer</title>
        <link rel="icon" href="/kuramerlogo.png" />
      </Head>

      <BaslikGorselDetay metin={"Mushaflar"} link={"/kuran-i-kerim"} />

      { categoriesLoading ? (
        <div className={styles.loader}>
        <CircularProgress /> 
        </div>)
        : categoriesError ? (
        <div className={styles.errorMessage}>{categoriesError}</div>
      )
      : kategoriler.length > 0 ? (

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
                {isLoading ? (
                    <div className={styles.loader}>
                      <CircularProgress /> {/* Yükleme göstergesi */}
                    </div>
                    ) : error ? (
                      <div className={styles.errorMessage}>{error}</div>
                    ) : mushaflar.length > 0 ? (
                <div className={styles.cardContainer}>
                    {mushaflar.map((yayin, index) => (
                    <CardOge key={index} yayin={yayin} handleDownloadPDF={handleDownloadPDF} />
                    ))}
                </div>
                ) : (
                  <div className={styles.noDataMessage}>Kayıtlı veri bulunmamaktadır.</div> // Veri yoksa bu mesaj gösterilir
                )
                
                }
                {!isLoading && !error && totalPages > 0 && (
                    <Stack spacing={2} alignItems="center" className={styles.paginationContainer}>
                      <Pagination
                        count={totalPages}
                        page={currentPage}
                        onChange={handlePageChange}
                        variant="outlined"
                        shape="rounded"
                        sx={{
                          '& .MuiPaginationItem-root': { color: 'inherit' },
                          '& .MuiPaginationItem-page.Mui-selected': {
                            backgroundColor: '#2e5077',
                            color: '#fff',
                            '&:hover': {
                              backgroundColor: '#1a365d',
                            },
                          },
                        }}
                      />
                    </Stack>
                  )}
              </TabPanel>
            ))}
          </div>
        </div>
      </div>
      ): (
        <div className={styles.infoMessage}>Kayıtlı Mushaf Kategori verisi bulunmamaktadır.</div>)
      }
    </>
  );
}

export default Mushaflar;