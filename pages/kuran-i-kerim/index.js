// TemelKonuKavramlar.js
import React, { useState, useEffect } from 'react';
import { Button, Tab, Tabs, Typography,Pagination } from '@mui/material';
import TabPanel from '../../compenent/TabPanel';
import styles from '../../styles/TemelKonularKavram.module.css';
import { useRouter } from 'next/router';
import axios from 'axios';
import CardOge from '../../compenent/CardOge';
import Head from 'next/head';
import BaslikGorsel from "../../compenent/BaslikGorsel";
import { API_ROUTES } from '../../utils/constants';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress'; 

function Index() {
  const [mushafFarklari,setMushafFarklari] = useState([]); // Değişken adını güncelle
  const [activeTab, setActiveTab] = useState('kuran-i-kerim');
  const router = useRouter();
  const [orientation, setOrientation] = useState('vertical'); // Default olarak 'vertical'

  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true); // Yükleme durumu için state
  const [error, setError] = useState(null);
  const currentPage = parseInt(router.query.page || '1', 10);


  const fetchData = async (page) => {
    setIsLoading(true); 
    try {
      const response1 = await axios.get(API_ROUTES.MUSHAF_FARKLARI_ACTIVE.replace('currentPage', page));
      setMushafFarklari(response1.data.results); // Değişken adını güncelle
      setTotalPages(Math.ceil(response1.data.count / 10));
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

  useEffect(() => {
    if (router.query.tab) {
      const validTabs = ['kuran-i-kerim', 'mushaf-farklari']; 
      if (!validTabs.includes(router.query.tab)) {
        router.push('/hata-sayfasi');
      }else{
        setActiveTab(router.query.tab);
        if (router.query.tab=="mushaf-farklari"){
          fetchData(currentPage);
        }
      }     
    } else {
      setActiveTab('kuran-i-kerim');
    }
    
  }, [router.query.tab,currentPage]);

  useEffect(() => {
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
    }else if (newValue === 'mushaf-farklari'){
      fetchData(1);
      router.push(`/kuran-i-kerim?tab=${newValue}`, undefined, { shallow: true });
    }
    else {
      const newUrl = `/kuran-i-kerim?tab=${newValue}`;
      router.push(newUrl, undefined, { shallow: true });
    }
  };

  const handleDownloadPDF = (pdfData) => {
    window.open(pdfData.url, '_blank');
  };

  const handleChangePage = (event, value) => {
    fetchData(value);
    router.push(`/kuran-i-kerim?tab=${activeTab}&page=${value}`, undefined, { shallow: true });
  };

  return (
    <>
      <Head>
        <title>Kuran-ı Kerim | Kuramer</title>
        <link rel="icon" href="/kuramerlogo.png" />
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
          <Tab sx={{
              borderBottom: 1,
              borderColor: 'divider',
              color: 'black',
              '&.Mui-selected': {
                color: 'black', 
              },
            }}
            label={
              <Typography sx={{
                fontWeight: 'bold',
                '@media (max-width: 767px)': {
                  fontSize: '13px', 
                },
                '@media (min-width: 768px) and (max-width: 1100px)': {
                  fontSize: '13px', 
                },
                '@media (min-width: 1101px)': {
                  fontSize: '14px', 
                },
              }}>
                Kuran-ı Kerim
              </Typography>
            }
            value="kuran-i-kerim"
          />
          <Tab sx={{
              borderBottom: 1,
              borderColor: 'divider',
              color: 'black',
              '&.Mui-selected': {
                color: 'black', 
              },
            }}
            label={
              <Typography sx={{
                fontWeight: 'bold',
                '@media (max-width: 767px)': {
                  fontSize: '13px', 
                },
                '@media (min-width: 768px) and (max-width: 1100px)': {
                  fontSize: '13px', 
                },
                '@media (min-width: 1101px)': {
                  fontSize: '14px', 
                },
              }}>
                Mushaflar
              </Typography>
            }
            value="mushaflar"
          />
          <Tab sx={{
              borderBottom: 1,
              borderColor: 'divider',
              color: 'black',
              '&.Mui-selected': {
                color: 'black', 
              },
            }}
            label={
              <Typography sx={{
                fontWeight: 'bold',
                '@media (max-width: 767px)': {
                  fontSize: '13px', 
                },
                '@media (min-width: 768px) and (max-width: 1100px)': {
                  fontSize: '13px', 
                },
                '@media (min-width: 1101px)': {
                  fontSize: '14px', 
                },
              }}>
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
              {isLoading ? (
                <div className={styles.loader}>
                  <CircularProgress />
                </div>
              ) : error ? (
                <div className={styles.errorMessage}>
                  {error}
                </div>
              ) : mushafFarklari.length > 0 ? (
                <div className={styles.cardContainer}>
                  {mushafFarklari.map((yayin, index) => (
                    <CardOge key={index} yayin={yayin} handleDownloadPDF={handleDownloadPDF} />
                  ))}
                </div>
              ) : (
                <div className={styles.noDataMessage}>
                  Kayıtlı veri bulunmamaktadır.
                </div> 
              )}
              {!isLoading && !error && totalPages > 0 && (
                <Stack spacing={2} alignItems="center" className={styles.paginationContainer}>
                  <Pagination 
                    count={totalPages} 
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