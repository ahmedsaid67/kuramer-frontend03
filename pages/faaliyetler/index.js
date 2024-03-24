// TemelKonuKavramlar.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Tab, Tabs, Typography, Pagination} from '@mui/material';
import TabPanel from '../../compenent/TabPanel';
import styles from '../../styles/TemelKonularKavram.module.css';
import { useRouter } from 'next/router';
import Head from 'next/head';
import BaslikGorsel from '../../compenent/BaslikGorsel';
import { API_ROUTES } from '../../utils/constants';
import SempozyumCard from '../../compenent/SempozyumCard';
import CalistayCard from '../../compenent/CalistayCard';
import KonferansCard from '../../compenent/KonferansCard';
import ArastirmaCard from '../../compenent/ArastirmaCard';
import EgitimCard from '../../compenent/EgitimlerCard';

import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress'; // Yükleme göstergesi için ekleyin


function Index() {
  const [sempozyumlar, setSempozyumlar] = useState([]);
  const [calistay, setCalistay] = useState([]);
  const [konferanslar, setKonferanslar] = useState([]);
  const [arastirmalar, setArastirmalar] = useState([]);
  const [egitimler, setEgitimler] = useState([]);

  const [activeTab, setActiveTab] = useState('faaliyetler');
  const router = useRouter();
  const [orientation, setOrientation] = useState('vertical'); // Default olarak 'vertical'

  const currentPage = parseInt(router.query.page || '1', 10);
  const tab = router.query.tab || 'faaliyetler';
  const [totalPagesSempozyumlar, setTotalPagesSempozyumlar] = useState(0);
  const [totalPagesCalistay, setTotalPagesCalistay] = useState(0);
  const [totalPagesKonferanslar, setTotalPagesKonferanslar] = useState(0);
  const [totalPagesArastirmalar, setTotalPagesArastirmalar] = useState(0);
  const [totalPagesEgitimler, setTotalPagesEgitimler] = useState(0);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Yükleme durumu için state

  const [isScrolTab, setIsScrolTab] = useState(false);
  const [variant, setVariant] = useState('fullWidth');


  const fetchData = async (tab, currentPage) => {
    setIsLoading(true);
    try {
      let response;
      if (tab === "sempozyumlar") {
        const sempozyumlarUrl = API_ROUTES.SEMPOZYUMLAR_ACTIVE.replace('currentPage', currentPage);
        response = await axios.get(sempozyumlarUrl);
        setSempozyumlar(response.data.results);
        setTotalPagesSempozyumlar(Math.ceil(response.data.count / 10));
      } else if (tab === "calistay") {
        const calistayUrl = API_ROUTES.CALISTAYLAR_ACTIVE.replace('currentPage', currentPage);
        response = await axios.get(calistayUrl);
        setCalistay(response.data.results);
        setTotalPagesCalistay(Math.ceil(response.data.count / 10));
      } else if (tab === "konferanslar") {
        const konferanslarUrl = API_ROUTES.KONFERANSLAR_ACTIVE.replace('currentPage', currentPage);
        response = await axios.get(konferanslarUrl);
        setKonferanslar(response.data.results);
        setTotalPagesKonferanslar(Math.ceil(response.data.count / 10));
      } else if (tab === "arastirmalar") {
        const arastirmalarUrl = API_ROUTES.ARASTIRMALAR_ACTIVE.replace('currentPage', currentPage);
        response = await axios.get(arastirmalarUrl);
        setArastirmalar(response.data.results);
        setTotalPagesArastirmalar(Math.ceil(response.data.count / 10));
      }
      else if (tab === "egitimler") {
        const egitimlerUrl = API_ROUTES.EGITIMLER_ACTIVE.replace('currentPage', currentPage);
        response = await axios.get(egitimlerUrl);
        setEgitimler(response.data.results);
        setTotalPagesEgitimler(Math.ceil(response.data.count / 10));
      }
      setError(null);
    } catch (error) {
      console.error("Veri yüklenirken bir hata oluştu", error);
      setError('Veriler yüklenirken bir sorun oluştu.');
    } finally {
      setIsLoading(false);
    }
  };

  // İlk yükleme için veri alma
  useEffect(() => {
    fetchData(tab, currentPage);
  }, []); // Boş dizi, bu effect'in sadece bileşen mount edildiğinde çalışacağını garanti eder


  
  


  useEffect(() => {
    const handleRouteChange = () => {
      const newTab = router.query.tab;
      const validTabs = ['faaliyetler', 'sempozyumlar', 'calistay','konferanslar','arastirmalar','egitimler']; // Geçerli tab değerlerinin listesi
  
      if (validTabs.includes(newTab)) {
        setActiveTab(newTab);
        fetchData(newTab, currentPage);
      } else if (newTab) {
        router.push('/hata-sayfasi');
      }

    };

    handleRouteChange()

  
  }, [router.query.tab,currentPage]); // router.query.tab'e bağlı olarak çalışacak



  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1100) {
        setOrientation('horizontal');
      } else {
        setOrientation('vertical');
      }

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
    setActiveTab(newValue);
    fetchData(newValue, 1); // Sekme değiştiğinde, 1. sayfadan başlayarak veri yükle
    router.push(`/faaliyetler?tab=${newValue}`, undefined, { shallow: true });
  };

  const handleDownloadPDF = (pdfData) => {
    window.open(pdfData.url, '_blank');
  };

  const handleChangePage = (event, value) => {
    fetchData(activeTab, value);
    router.push(`/faaliyetler?tab=${activeTab}&page=${value}`, undefined, { shallow: true });
  };



  useEffect(() => {
    const calculateTabWidths = () => {
      const containerWidth = window.innerWidth; 
      const maxTabWidth = 200; 
      const minTabWidth = 100;
      const tabPadding = 30; 
    
      let tabWidth = Math.max(containerWidth / 5 - tabPadding, minTabWidth);
      

      if (tabWidth > maxTabWidth) {
        tabWidth = maxTabWidth;
      }
      

      const totalTabsWidth = 5 * (tabWidth + tabPadding);
  


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
  }, []); 

  

  return (
    <>
      <Head>
        <title>Faaliyetler | Kuramer</title>
        <link rel="icon" href="/kuramerlogo.png" />
      </Head>
      
      <BaslikGorsel metin={"Faaliyetler"} />

      

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
          <Tab
            className={styles.tab}
            label={
              <Typography className={styles.tabLabel}>
                {("Faaliyetler").toLocaleUpperCase('tr-TR')}
              </Typography>
            }
            value="faaliyetler"
          />
          <Tab
            className={styles.tab}
            label={
              <Typography className={styles.tabLabel}>
                Sempozyumlar
              </Typography>
            }
            value="sempozyumlar"
          />
          <Tab
            className={styles.tab}
            label={
              <Typography className={styles.tabLabel}>
                Çalıştaylar
              </Typography>
            }
            value="calistay"
          />
          <Tab
            className={styles.tab}
            label={
              <Typography className={styles.tabLabel}>
                Konferanslar
              </Typography>
            }
            value="konferanslar"
          />
          <Tab
            className={styles.tab}
            label={
              <Typography className={styles.tabLabel}>
                Araştırmalar
              </Typography>
            }
            value="arastirmalar"
          />
          <Tab
            className={styles.tab}
            label={
              <Typography className={styles.tabLabel}>
                {("Eğitimler").toLocaleUpperCase('tr-TR')}
              </Typography>
            }
            value="egitimler"
          />
        </Tabs>
        </div>

        <div className={styles.rightContainer}>
          <div className={styles.verticalTabsContent}>
          <TabPanel value={activeTab} index="faaliyetler">
            <h2>Faaliyetler</h2>
              <p>
                KURAMER, İslâmî düşünce alanında faaliyet gösteren veya o alana ilgi duyan muhtelif düşünce kuruluşları, 
                üniversiteler, sivil toplum kurumları ve vakıflarla çeşitli düzeylerde görüş alışverişleri, düzenlenen ilmî faaliyetlere 
                katılım ve katkıda bulunma, ortak etkinlikler vb. gibi muhtelif şekillerde işbirlikleri gerçekleştirmektedir. 
              </p>
              <p>
                Bunlar arasında İngiltere’de faaliyet gösteren prestijli bir düşünce kuruluşu olan 
                International Institute of Islamic Thought (IIIT) (Uluslararası İslami Düşünce Enstitüsü) ile ortak bir sempozyumun
                (29 Nisan 2017’de yapılan Modern Dünyada Kur’an’ın Yeri: Makāsıdî Tefsire Doğru sempozyumu) gerçekleştirilmesi; İslâmî veya sosyal bilimler 
                alanında faaliyet gösteren kurum ve kuruluşlarla diyalog ve ortak çalışmalar; KURAMER yönetici ve Bilim Kurulu üyelerinin münferiden veya KURAMER çalışmalarına 
                katkıda bulunan bazı ilim adamlarıyla birlikte İstanbul, Ankara, İzmir, Malatya, Elazığ, Samsun, Gaziantep, Sakarya vd. birçok ilde üniversiteler ve 
                ilmi kuruluşlarca düzenlenen dinî ilimler alanıyla ilgili sempozyumlara katılması sayılabilir. KURAMER yöneticilerinin ve Bilim Kurulu üyelerinin zaman zaman 
                gazete ve televizyonlarda genel olarak dinî düşünce ve dinî hayatın meseleleri, özelde KURAMER çalışmaları konusunda çeşitli mülakat ve yayınlarının 
                yer alması da kamuoyunda ilgi ve takdirle karşılanmaktadır.
              </p>
            </TabPanel>
            <TabPanel value={activeTab} index="sempozyumlar">
              <h2>Sempozyumlar</h2>
                {isLoading ? (
                  <div className={styles.loader}>
                    <CircularProgress />
                  </div>
                ) : error ? (
                  <div className={styles.errorMessage}>
                    {error}
                  </div>
                ) : sempozyumlar.length > 0 ? (
                  <div className={styles.cardContainer}>
                    {sempozyumlar.map((yayin, index) => (
                      <SempozyumCard key={index} data={yayin} handleDownloadPDF={handleDownloadPDF} />
                    ))}
                  </div>
                ) : (
                  <div className={styles.noDataMessage}>
                    Kayıtlı veri bulunmamaktadır.
                  </div> 
                )}
                {!isLoading && !error && totalPagesSempozyumlar > 0 && (
                  <Stack spacing={2} alignItems="center" className={styles.paginationContainer}>
                    <Pagination 
                      count={totalPagesSempozyumlar} 
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

            <TabPanel value={activeTab} index="calistay">
              <h2>Çalıştaylar</h2>
              {isLoading ? (
                  <div className={styles.loader}>
                    <CircularProgress />
                  </div>
                ) : error ? (
                  <div className={styles.errorMessage}>
                    {error}
                  </div>
                ) : calistay.length > 0 ? (
                  <div className={styles.cardContainer}>
                    {calistay.map((yayin, index) => (
                      <CalistayCard  key={index} data={yayin} handleDownloadPDF={handleDownloadPDF} />
                    ))}
                  </div>
                ) : (
                  <div className={styles.noDataMessage}>
                    Kayıtlı veri bulunmamaktadır.
                  </div> 
                )}
                {!isLoading && !error && totalPagesCalistay > 0 && (
                  <Stack spacing={2} alignItems="center" className={styles.paginationContainer}>
                    <Pagination 
                      count={totalPagesCalistay} 
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

            <TabPanel value={activeTab} index="konferanslar">
              <h2>Konferanslar</h2>
              {isLoading ? (
                  <div className={styles.loader}>
                    <CircularProgress />
                  </div>
                ) : error ? (
                  <div className={styles.errorMessage}>
                    {error}
                  </div>
                ) : konferanslar.length > 0 ? (
                  <div className={styles.cardContainer}>
                    {konferanslar.map((yayin, index) => (
                      <KonferansCard key={index} data={yayin} handleDownloadPDF={handleDownloadPDF} />
                    ))}
                  </div>
                ) : (
                  <div className={styles.noDataMessage}>
                    Kayıtlı veri bulunmamaktadır.
                  </div> 
                )}
                {!isLoading && !error && totalPagesKonferanslar > 0 && (
                  <Stack spacing={2} alignItems="center" className={styles.paginationContainer}>
                    <Pagination 
                      count={totalPagesKonferanslar} 
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

            <TabPanel value={activeTab} index="arastirmalar">
              <h2>Araştırmalar</h2>
              {isLoading ? (
                  <div className={styles.loader}>
                    <CircularProgress />
                  </div>
                ) : error ? (
                  <div className={styles.errorMessage}>
                    {error}
                  </div>
                ) : arastirmalar.length > 0 ? (
                  <div className={styles.cardContainer}>
                    {arastirmalar.map((yayin, index) => (
                      <ArastirmaCard key={index} data={yayin} handleDownloadPDF={handleDownloadPDF} />
                    ))}
                  </div>
                ) : (
                  <div className={styles.noDataMessage}>
                    Kayıtlı veri bulunmamaktadır.
                  </div> 
                )}
                {!isLoading && !error && totalPagesArastirmalar > 0 && (
                  <Stack spacing={2} alignItems="center" className={styles.paginationContainer}>
                    <Pagination 
                      count={totalPagesArastirmalar} 
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
            
            <TabPanel value={activeTab} index="egitimler">
              <h2>Eğitimler</h2>
              {isLoading ? (
                  <div className={styles.loader}>
                    <CircularProgress />
                  </div>
                ) : error ? (
                  <div className={styles.errorMessage}>
                    {error}
                  </div>
                ) : egitimler.length > 0 ? (
                  <div className={styles.cardContainer}>
                    {egitimler.map((yayin, index) => (
                      <EgitimCard key={index} data={yayin} handleDownloadPDF={handleDownloadPDF} />
                    ))}
                  </div>
                ) : (
                  <div className={styles.noDataMessage}>
                    Kayıtlı veri bulunmamaktadır.
                  </div> 
                )}
                {!isLoading && !error && totalPagesEgitimler > 0 && (
                  <Stack spacing={2} alignItems="center" className={styles.paginationContainer}>
                    <Pagination 
                      count={totalPagesEgitimler} 
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