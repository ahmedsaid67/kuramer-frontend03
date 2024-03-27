// TemelKonuKavramlar.js
import React, { useState, useEffect } from 'react';
import { Button, Tab, Tabs, Typography,  Pagination} from '@mui/material';
import BaslikGorsel from '../../compenent/BaslikGorsel';
import TabPanel from '../../compenent/TabPanel';
import styles from '../../styles/TemelKonularKavram.module.css';
import { useRouter } from 'next/router';
import axios from 'axios';
import CardOge from '../../compenent/CardOge';
import Head from 'next/head';
import { API_ROUTES } from '../../utils/constants';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress'; 



function Index() {
  const [bultenler, setBultenler] = useState([]); // Değişken adını güncelle
  const [brosurler, setBrosurler] = useState([]);
  const [activeTab, setActiveTab] = useState('yayinlar');
  const router = useRouter();
  const [orientation, setOrientation] = useState('vertical'); // Default olarak 'vertical'
  const currentPage = parseInt(router.query.page || '1', 10);
  const [totalPagesBulten, setTotalPagesBulten] = useState(0);
  const [totalPagesBrosur, setTotalPagesBrosur] = useState(0);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Yükleme durumu için state
  const tab = router.query.tab || 'yayinlar';


  const fetchData = async (tab, page) => {
    setIsLoading(true);
    try {
      let response;
      if (tab === "kuramerBultenler") {
        const bultenlerUrl = API_ROUTES.BULTENLER_ACTIVE.replace('currentPage', page);
        response = await axios.get(bultenlerUrl);
        setBultenler(response.data.results);
        setTotalPagesBulten(Math.ceil(response.data.count / 10));
      } else if (tab === "kuramerBrosurler") {
        const brosurlerUrl = API_ROUTES.BROSURLER_ACTIVE.replace('currentPage', page);
        response = await axios.get(brosurlerUrl);
        setBrosurler(response.data.results);
        setTotalPagesBrosur(Math.ceil(response.data.count / 10));
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

  useEffect(() => {
    fetchData(tab, currentPage);
  }, []); 
  

  useEffect(() => {

    const handleRouteChange = () => {

      const newTab = router.query.tab;
      const validTabs = ['yayinlar','kuramerBultenler', 'kuramerBrosurler', 'kitaplar']; // Geçerli tab değerlerinin listesi
  
      if (validTabs.includes(newTab)) {
          setActiveTab(newTab);
          fetchData(newTab, currentPage);
      }else if(newTab){
        router.push('/hata-sayfasi');
      }
    };
    handleRouteChange()
  }, [router.query.tab]);



  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    // Yönlendirme işlemini burada düzenleyin
    if (newValue === 'kitaplar') {
      router.push('/yayinlar/kitaplar');
    } else {
      fetchData(newValue, 1); 
      const newUrl = `/yayinlar?tab=${newValue}`;
      router.push(newUrl, undefined, { shallow: true });
    }
  };

  const handleDownloadPDF = (pdfData) => {
    window.open(pdfData.url, '_blank');
  };

  const handleChangePage = (event, value) => {
    fetchData(activeTab, value);
    router.push(`/yayinlar?tab=${activeTab}&page=${value}`, undefined, { shallow: true });
  };




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



  return (
    <>
      <Head>
        <title>Yayınlar | Kuramer</title>
        <link rel="icon" href="/kuramerlogo.png" />
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
                Yayınlar
              </Typography>
            }
            value="yayinlar"
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
                Bültenler
              </Typography>
            }
            value="kuramerBultenler"
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
                Broşürler
              </Typography>
            }
            value="kuramerBrosurler"
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
                {("Kitaplar").toLocaleUpperCase('tr-TR')}
              </Typography>
            }
            value="kitaplar"
          />
        </Tabs>

        </div>

        <div className={styles.rightContainer}>
          <div className={styles.verticalTabsContent}>
          <TabPanel value={activeTab} index="yayinlar">
              <h2>Yayınlar</h2>
              <p>
                KURAMER, yukarıda özetle temas edilen araştırma projeleri, sempozyum, çalıştay ve konferans faaliyetlerini gerçekleştirme ve 
                bunların ürünlerini yayımlamanın yanı sıra, muhtelif konularda ilim adamları tarafından kaleme alınmış tez çalışmalarını ve 
                araştırma eserlerini yayımlamayı da önemsemekte ve bunu ülkemizdeki ilmî birikimin gelişmesi açısından önemli görmektedir. 
                Aynı şekilde İslam ilahiyatı alanında Türkçe dışındaki dillerde yayınlanan ve ülkemiz ilim insanlarının muttali olup çalışmalarında 
                göz önüne almasında yarar görülen kitapların Türkçeye tercümelerinin yayımlanmasını da aynı mülahaza ile önemsemektedir. 
              </p>
              
            </TabPanel>
            <TabPanel value={activeTab} index="kuramerBultenler">
              <h2>Bültenler</h2>
              {isLoading ? (
                <div className={styles.loader}>
                  <CircularProgress />
                </div>
              ) : error ? (
                <div className={styles.errorMessage}>
                  {error}
                </div>
              ) : bultenler.length > 0 ? (
                <div className={styles.cardContainer}>
                  {bultenler.map((yayin, index) => (
                    <CardOge key={index} yayin={yayin} handleDownloadPDF={handleDownloadPDF} />
                  ))}
                </div>
              ) : (
                <div className={styles.noDataMessage}>
                  Kayıtlı veri bulunmamaktadır.
                </div> 
              )}

              {!isLoading && !error && totalPagesBulten > 0 && (
                <Stack spacing={2} alignItems="center" className={styles.paginationContainer}>
                  <Pagination 
                    count={totalPagesBulten} 
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


            <TabPanel value={activeTab} index="kuramerBrosurler">
              <h2>Broşürler</h2>
              {isLoading ? (
                <div className={styles.loader}>
                  <CircularProgress />
                </div>
              ) : error ? (
                <div className={styles.errorMessage}>
                  {error}
                </div>
              ) : brosurler.length > 0 ? (
                <div className={styles.cardContainer}>
                  {brosurler.map((yayin, index) => (
                    <CardOge key={index} yayin={yayin} handleDownloadPDF={handleDownloadPDF} />
                  ))}
                </div>
              ) : (
                <div className={styles.noDataMessage}>
                  Kayıtlı veri bulunmamaktadır.
                </div>
              )}
              {!isLoading && !error && totalPagesBrosur > 0 && (
                <Stack spacing={2} alignItems="center" className={styles.paginationContainer}>
                  <Pagination 
                    count={totalPagesBrosur} 
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

            <TabPanel value={activeTab} index="kitaplar">
            </TabPanel>
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;