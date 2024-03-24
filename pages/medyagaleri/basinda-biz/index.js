import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Tab, Tabs, Typography, Pagination} from '@mui/material';
import TabPanel from '../../../compenent/TabPanel';
import styles from '../../../styles/TemelKonularKavram.module.css';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { API_ROUTES } from '../../../utils/constants';
import BaslikGorsel from '../../../compenent/BaslikGorsel';
import BasindaBizCardOge from '../../../compenent/BasindaBizCardOge';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import GorselBasinCardOge from "../../../compenent/GorselBasinCardOge"

function Index() {
  const [yaziliBasin, setYaziliBasin] = useState([]);
  const [gorselBasin, setGorselBasin] = useState([]);
  const [activeTab, setActiveTab] = useState('basinda-biz');
  const router = useRouter();
  const [orientation, setOrientation] = useState('vertical'); // Default olarak 'vertical'
  const currentPage = parseInt(router.query.page || '1', 10);
  const [totalPagesYazili, setTotalPagesYazili] = useState(0);
  const [totalPagesGorsel, setTotalPagesGorsel] = useState(0);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false); 
  const tab = router.query.tab || 'basinda-biz';



  // Veri alma işlemini yapan fonksiyon
  const fetchData = async (tab, page) => {
    setIsLoading(true);
    try {
      let response;
      if (tab === "yazili-basin") {
        const yaziliBasinUrl = API_ROUTES.YAZILI_BASIN_ACTIVE.replace('currentPage', page);
        response = await axios.get(yaziliBasinUrl);
        setYaziliBasin(response.data.results);
        setTotalPagesYazili(Math.ceil(response.data.count / 10));
      } else if (tab === "gorsel-basin") {
        const gorselBasinUrl = API_ROUTES.GORSEL_BASIN_ACTIVE.replace('currentPage', page);
        response = await axios.get(gorselBasinUrl);
        setGorselBasin(response.data.results);
        setTotalPagesGorsel(Math.ceil(response.data.count / 10));
      }
      setError(null);
    } catch (error) {
      console.error("Veri yükleme sırasında bir hata oluştu:", error);
      if (error.response && error.response.status === 404 && error.response.data.detail === "Invalid page.") {
        // 'Invalid page' detayını kontrol eden ve buna göre hata mesajı döndüren koşul
        setError('Geçersiz sayfa. Bu sayfa mevcut değil veya sayfa numarası hatalı. Lütfen sayfa numarasını kontrol edin.');
      } else {
        setError('Veriler yüklenirken beklenmeyen bir sorun oluştu. Lütfen daha sonra tekrar deneyin.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // İlk yükleme için veri alma
  useEffect(() => {
    fetchData(tab, currentPage);
  }, []); // Boş dizi, bu effect'in sadece bileşen mount edildiğinde çalışacağını garanti eder

  

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    fetchData(newValue, 1);
    router.push(`/medyagaleri/basinda-biz?tab=${newValue}`, undefined, { shallow: true });
  };

  const handleChangePage = (event, value) => {
    fetchData(activeTab, value);
    router.push(`/medyagaleri/basinda-biz?tab=${activeTab}&page=${value}`, undefined, { shallow: true });
  };


  useEffect(() => {
    const handleRouteChange = () => {
      const newTab = router.query.tab;
      const validTabs = ['basinda-biz', 'yazili-basin', 'gorsel-basin']; // Geçerli tab değerlerinin listesi
  
      if (validTabs.includes(newTab)) {
        setActiveTab(newTab);
        fetchData(newTab, currentPage);
      } else if (newTab) {
        router.push('/hata-sayfasi');
      }

    };

    handleRouteChange()

  
  }, [router.query.tab,currentPage]); // router.query.tab'e bağlı olarak çalışacak
  
  
    // Ekran boyutuna göre sekme yönünü ayarlama
    useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth <= 1100) {
          setOrientation('horizontal');
        } else {
          setOrientation('vertical');
        }
      };
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);


  

  return (
    <>
      <Head>
        <title>Basında Biz | Kuramer</title>
        <link rel="icon" href="/kuramerlogo.png" />
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
                {("Basında Biz").toLocaleUpperCase('tr-TR')}
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
              {isLoading ? (
                <div className={styles.loader}>
                  <CircularProgress />
                </div>
              ) : error ? (
                <div className={styles.errorMessage}>
                  {error}
                </div>
              ) : yaziliBasin.length > 0 ? (
                <div className={styles.cardContainer}>
                  {yaziliBasin.map((yayin, index) => (
                    <BasindaBizCardOge key={index} yayin={yayin}/>
                  ))}
                </div>
              ) : (
                <div className={styles.noDataMessage}>
                  Kayıtlı veri bulunmamaktadır.
                </div>
              )}
              {!isLoading && !error && totalPagesYazili > 0 && (
                <Stack spacing={2} alignItems="center" className={styles.paginationContainer}>
                  <Pagination 
                    count={totalPagesYazili} 
                    page={currentPage} 
                    onChange={handleChangePage} 
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

            <TabPanel value={activeTab} index="gorsel-basin">
              <h2>Görsel Basın</h2>
              {isLoading ? (
                <div className={styles.loader}>
                  <CircularProgress />
                </div>
              ) : error ? (
                <div className={styles.errorMessage}>
                  {error}
                </div>
              ) : gorselBasin.length > 0 ? (
                <div className={styles.cardContainer}>
                  {gorselBasin.map((yayin, index) => (
                    <GorselBasinCardOge key={index} yayin={yayin}/>
                  ))}
                </div>
              ) : (
                <div className={styles.noDataMessage}>
                  Kayıtlı veri bulunmamaktadır.
                </div>
              )}
              {!isLoading && !error && totalPagesGorsel > 0 && (
                <Stack spacing={2} alignItems="center" className={styles.paginationContainer}>
                  <Pagination 
                    count={totalPagesGorsel} 
                    page={currentPage} 
                    onChange={handleChangePage} 
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
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;